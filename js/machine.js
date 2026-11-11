(() => {
  const $ = id => document.getElementById(id);
  const products = window.BVM_PRODUCTS;
  const shelves = $("shelves");

  let selected = null;
  let typed = "";
  let dispensed = null;

  let collected = JSON.parse(localStorage.getItem("bvm-collection") || "[]");

  const soundFiles = [
    "boing.mp3",
    "dramatic-reveal.mp3",
    "record-scratch.mp3",
    "notification.mp3",
    "bonk.mp3",
    "victory.mp3",
    "error.mp3",
    "applause.mp3"
  ];

  const soundNames = [
    " ",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ];

  const soundIcons = ["↗", "‼", "⟲", "✉", "●", "★", "⚠", "🥀"];

  function renderShelves() {
    shelves.innerHTML = "";

    for (let r = 0; r < 5; r++) {
      const shelf = document.createElement("div");
      shelf.className = "shelf";

      products.slice(r * 4, r * 4 + 4).forEach(p => {
        const b = document.createElement("button");

        b.className = "product-slot";
        b.dataset.product = p.id;

        b.innerHTML = `
          <span class="product-code">${String(p.id).padStart(2, "0")}</span>
          <span class="product-art">${p.icon}</span>
          <span class="product-name">${p.title}</span>
          <span class="product-kind">${p.type}</span>
        `;

        b.addEventListener("click", () => select(p.id));
        shelf.appendChild(b);
      });

      shelves.appendChild(shelf);
    }

    updateBirthdayLock();
    updateCollectionCount();
  }

  function updateBirthdayLock() {
    document.querySelectorAll('[data-product="17"]').forEach(b => {
      const locked = !window.BVM_BIRTHDAY_ACTIVE;

      b.classList.toggle("locked", locked);

      b.title = locked
        ? "Available November 20, India Standard Time"
        : "Birthday Override available";
    });
  }

  function select(id) {
    const p = products.find(x => x.id === id);

    if (!p) return;

    if (p.kind === "birthday" && !window.BVM_BIRTHDAY_ACTIVE) {
      message(
        "BIRTHDAY LOCKED",
        "Come back on November 20, India Standard Time."
      );
      return;
    }

    selected = p;
    typed = String(id).padStart(2, "0");

    document.querySelectorAll(".product-slot").forEach(b => {
      b.classList.toggle("selected", +b.dataset.product === id);
    });

    $("selectedName").textContent = p.title;
    $("selectedType").textContent = p.type;
    $("screenCode").textContent = typed;
    $("screenMessage").textContent = "Selection confirmed. Probably.";
    $("typedCode").textContent = typed;
    $("dispenseButton").disabled = false;
  }

  function message(code, msg) {
    $("screenCode").textContent = code;
    $("screenMessage").textContent = msg;
  }

  document.querySelectorAll("[data-key]").forEach(b => {
    b.addEventListener("click", () => {
      const k = b.dataset.key;

      if (k === "clear") {
        typed = "";
        $("typedCode").textContent = "— —";
        return;
      }

      if (k === "enter") {
        if (typed.length) select(+typed);
        return;
      }

      if (typed.length >= 2) typed = "";

      typed += k;
      $("typedCode").textContent = typed.padEnd(2, "—");

      if (typed.length === 2) {
        const p = products.find(x => x.id === +typed);

        if (p) {
          select(p.id);
        } else {
          message("INVALID CODE", "This item does not exist. Yet.");
        }
      }
    });
  });

  $("dispenseButton").addEventListener("click", () => {
    if (!selected) return;

    dispensed = selected;

    $("screenStatus").textContent = "DISPENSING...";
    $("screenCode").textContent = "PLEASE WAIT";
    $("screenMessage").textContent = "A highly technical process is underway.";
    $("chuteMessage").textContent =
      "ITEM DISPENSED: " + String(selected.id).padStart(2, "0");

    $("dispenseButton").disabled = true;

    setTimeout(() => {
      openProduct(dispensed);

      $("screenStatus").textContent = "MACHINE READY";
      $("screenCode").textContent = "ITEM DELIVERED";
      $("screenMessage").textContent = "Enjoy your purchase.";
    }, 650);
  });

  function openOverlay(id) {
    $(id).classList.add("open");
    $(id).setAttribute("aria-hidden", "false");
  }

  function closeOverlay(id) {
    $(id).classList.remove("open");
    $(id).setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll("[data-close]").forEach(b => {
    b.addEventListener("click", () => closeOverlay(b.dataset.close));
  });

  document.querySelectorAll(".overlay").forEach(o => {
    o.addEventListener("click", e => {
      if (e.target === o) closeOverlay(o.id);
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      document.querySelectorAll(".overlay.open").forEach(o => {
        closeOverlay(o.id);
      });
    }
  });

  $("collectionButton").addEventListener("click", () => {
    renderCollection();
    openOverlay("collectionOverlay");
  });

  $("helpButton").addEventListener("click", () => {
    openOverlay("helpOverlay");
  });

  $("secretButton").addEventListener("click", () => {
    openOverlay("secretOverlay");
  });

  function openProduct(p) {
    if (!p) return;

    $("revealKicker").textContent =
      `ITEM ${String(p.id).padStart(2, "0")} · DISPENSED`;

    $("revealTitle").textContent = p.title;
    $("revealContent").innerHTML = productHTML(p);

    $("collectButton").textContent = collected.includes(p.id)
      ? "IN YOUR COLLECTION ✓"
      : "ADD TO COLLECTION";

    $("collectButton").onclick = () => {
      if (!collected.includes(p.id)) {
        collected.push(p.id);
      }

      saveCollection();
      $("collectButton").textContent = "COLLECTED ✓";
    };

    bindProduct(p);
    openOverlay("productOverlay");
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));
  }

  function productHTML(p) {
    if (p.kind === "tape") {
      const t = p.data;
      const index = p.id;

      return `
        <div class="cassette">
          <div class="cassette-label">${esc(t.subtitle)}</div>
          <div class="cassette-window">
            <i class="cassette-reels"></i>
            <span>▶</span>
            <i class="cassette-reels"></i>
          </div>
          <div style="text-align:center;font:9px DM Mono;margin-top:5px">
            SIDE A · B.V.M. AUDIO DIVISION
          </div>
        </div>

        <p>${esc(t.description)}</p>

        <ol class="track-list">
          ${t.tracks.map((x, i) => `
            <li>${i + 1}. ${esc(x)}</li>
          `).join("")}
        </ol>

        <div class="audio-controls">
          <button id="tapePlay">▶ PLAY TAPE</button>
          <button id="tapeStop">■ STOP</button>
        </div>

        <audio
          id="tapeAudio"
          preload="none"
          src="assets/audio/tapes/volume-${index}.mp3">
        </audio>
      `;
    }

    if (p.kind === "doodle") {
      const d = p.data;

      return `
        <p>${esc(d.caption)}</p>

        <img
          class="artwork"
          src="${esc(d.file)}"
          alt="${esc(d.title)}"
          onerror="this.outerHTML='<div class=&quot;proof-box&quot;>ARTWORK UNAVAILABLE</div>'">

        <a class="download-link" href="${esc(d.file)}" download>
          DOWNLOAD DRAWING
        </a>
      `;
    }

    if (p.kind === "simulator") {
      const sim = window.BVM_CONTENT.simulatorChoices[p.data];

      return `
        <div class="sim-question">${esc(sim.prompt)}</div>

        <div class="sim-options">
          ${sim.options.map((x, i) => `
            <button class="choice-button" data-choice="${i}">
              ${esc(x)}
            </button>
          `).join("")}
        </div>

        <div id="simResult" class="sim-result hidden"></div>
      `;
    }

    if (p.kind === "proof") {
      if (p.data === 0) {
        return `
          <p>
            We present a completely serious explanation of the
            <b>Hairy Ball Theorem</b>, a real result in topology.
          </p>

          <div class="proof-box">
            <b>THE THEOREM, IN HUMAN LANGUAGE</b><br>
            Imagine trying to comb the hair on a hairy sphere smoothly
            and continuously. Somewhere, there must be at least one
            point where the hair sticks up or vanishes into a cowlick.
            You cannot comb a sphere completely flat without a singularity.
          </div>

          <p>
            In other words: the sphere has a mandatory bad-hair day.          </p>

          <p class="muted">
            Actual mathematics btw
          </p>
        `;
      }

      return `
       
<p>
  Today's subject: a quantum phenomenon that makes observation
  sound suspiciously powerful.
</p>

<div class="proof-box">
  <b>THE QUANTUM ZENO EFFECT</b><br>
  <span style="font-size:12px;">QUANTUM MECHANICS · QUANTUM MEASUREMENT</span>

  <p>
    A quantum system can naturally evolve from one state into
    another over time.
  </p>

  <p>
    But if you measure it repeatedly, at sufficiently short
    intervals, you can suppress that evolution.
  </p>

  <div style="font-size:22px;text-align:center;padding:15px 0;">
    MORE MEASUREMENTS<br>
    ↓<br>
    LESS EVOLUTION
  </div>

  <p>
    In certain conditions, repeatedly checking a quantum system
    can effectively keep it in its initial state.
  </p>
</div>

<p><b>WHY IS THIS SO STRANGE?</b></p>

<p>
  In everyday life, checking whether something has changed
  doesn't normally stop it from changing. In quantum mechanics,
  however, the measurement process can affect the system's
  evolution.
</p>

<p>
  <b>THE CATCH:</b> This does not mean simply looking at an object
  freezes it. The effect depends on quantum measurements,
  the system's dynamics and how frequently measurements occur.
</p>

<p class="muted">
  The universe apparently behaves differently when you keep
  checking on it. Relatable, honestly.
</p>

      `;
    }

    if (p.kind === "text") {
      return `
        <div class="proof-box" style="white-space:pre-line">
          ${esc(p.data.body.replace(/\\n/g, "\n"))}
        </div>
      `;
    }

    if (p.kind === "certificate") {
      return `
        <p>
          A sealed delivery, addressed to
          ${esc(window.BVM_CONTENT.recipientName)}.
        </p>

        <img
          id="certificateImage"
          class="certificate-img"
          src="assets/images/palak-certificate.png"
          alt="Certificate">

        <a
          id="certificateDownload"
          class="download-link"
          href="assets/images/palak-certificate.png"
          download>
          DOWNLOAD CERTIFICATE
        </a>
      `;
    }

    if (p.kind === "roast") {
      return `
        <p>
          here comes savage ahh roasts.
        </p>

        <div id="roastText" class="proof-box">
          Press the button to receive your highly unofficial assessment.
        </div>

        <button id="roastAgain" class="choice-button">
          GENERATE ANOTHER ROAST
        </button>
      `;
    }

    if (p.kind === "birthday") {
      return `
        <div class="birthday-lock">
          <b>THE BIRTHDAY OVERRIDE</b>

          <p>${esc(window.BVM_CONTENT.birthdayMessage)}</p>

          <p>
            Today the machine has waived all rules, fees and dignity.
            Happy birthday, ${esc(window.BVM_CONTENT.recipientName)}.
          </p>

          <div style="font-size:35px;text-align:center">
            ✦ ✷ ★ ✷ ✦
          </div>
        </div>
      `;
    }

    if (p.kind === "sticker") {
      return `
        <p>
          The machine will randomly select one sticker from the
          eight-sticker collection. Each dispense picks one at random.
        </p>

        <div id="stickerResult" class="proof-box">
          STICKER SLOT: READY
        </div>

        <img
          id="stickerImage"
          class="sticker-preview hidden"
          alt="Your sticker">

        <button id="stickerDispense" class="choice-button">
          DISPENSE RANDOM STICKER
        </button>

        <a
          id="stickerDownload"
          class="download-link hidden"
          download>
          DOWNLOAD THIS STICKER
        </a>
      `;
    }

    if (p.kind === "zine") {
      return `
        <p>
          A pocket-sized publication from a publication that should not exist(wifies ref btw).
        </p>

        <div class="zine-pages">
          <div class="zine-page">
            <b>THE BROMINE TIMES</b>
            <small>VOL. 01 · UNVERIFIED NEWS</small>
            <p>Local vending machine develops opinions.</p>
          </div>

          <div class="zine-page">
            <b>BREAKING</b>
            <small>EXCLUSIVE</small>
            <p>47 pigeons reportedly form committee.</p>
          </div>

          <div class="zine-page">
            <b>STYLE</b>
            <small>FIELD REPORT</small>
            <p>Today's look: inexplicably iconic.</p>
          </div>

          <div class="zine-page">
            <b>WEATHER</b>
            <small>FORECAST</small>
            <p>100% chance of unnecessary drama.</p>
          </div>
        </div>

        <button id="zineDownload" class="choice-button">
          DOWNLOAD MINI-ZINE (HTML)
        </button>
      `;
    }

    if (p.kind === "soundboard") {
      return `
        <p>Eight buttons. Eight sound effects. No context required.</p>

        <div class="sound-grid">
          ${soundNames.map((n, i) => `
            <button class="sound-button" data-sound="${i}">
              <span>${soundIcons[i]}</span>
              ${esc(n)}
            </button>
          `).join("")}
        </div>

        <p class="muted">
          Sound only plays when a button is pressed.
        </p>
      `;
    }

    return `<p>Product unavailable.</p>`;
  }

  function bindProduct(p) {
    if (p.kind === "certificate") {
      $("certificateImage").onerror = () => {
        $("certificateImage").outerHTML =
          '<div class="birthday-lock">CERTIFICATE UNAVAILABLE</div>';

        $("certificateDownload").classList.add("hidden");
      };
    }

    if (p.kind === "tape") {
      const a = $("tapeAudio");

      $("tapePlay").onclick = () => {
        a.play().catch(() => {
          alert("Audio file missing or could not be played.");
        });
      };

      $("tapeStop").onclick = () => {
        a.pause();
        a.currentTime = 0;
      };
    }

    if (p.kind === "simulator") {
      const sim = window.BVM_CONTENT.simulatorChoices[p.data];

      document.querySelectorAll("[data-choice]").forEach(b => {
        b.onclick = () => {
          $("simResult").textContent = sim.outcomes[+b.dataset.choice];
          $("simResult").classList.remove("hidden");
        };
      });
    }

    if (p.kind === "roast") {
      const go = () => {
        $("roastText").textContent =
          window.BVM_CONTENT.roastTemplates[
            Math.floor(Math.random() * window.BVM_CONTENT.roastTemplates.length)
          ];
      };

      $("roastAgain").onclick = go;
      go();
    }

    if (p.kind === "sticker") {
      $("stickerDispense").onclick = () => {
        const n = Math.floor(Math.random() * 8) + 1;

        const src =
          `assets/images/stickers/sticker-${String(n).padStart(2, "0")}.png`;

        $("stickerResult").textContent =
          `STICKER ${String(n).padStart(2, "0")} SELECTED`;

        $("stickerImage").src = src;
        $("stickerImage").classList.remove("hidden");

        $("stickerImage").onerror = () => {
          $("stickerImage").classList.add("hidden");
          $("stickerResult").textContent = "STICKER UNAVAILABLE";
          $("stickerDownload").classList.add("hidden");
        };

        $("stickerDownload").href = src;
        $("stickerDownload").download =
          `bromine-sticker-${String(n).padStart(2, "0")}.png`;

        $("stickerDownload").classList.remove("hidden");
      };
    }

    if (p.kind === "soundboard") {
      document.querySelectorAll("[data-sound]").forEach(b => {
        b.onclick = () => {
          const i = +b.dataset.sound;
          const a = new Audio(`assets/audio/soundboard/${soundFiles[i]}`);

          a.play().catch(() => {
            message("SOUND FILE MISSING", soundFiles[i] + " — ");
          });
        };
      });
    }

    if (p.kind === "zine") {
      $("zineDownload").onclick = () => {
        const html = `
          <!doctype html>
          <meta charset="utf-8">
          <title>The Bromine Times</title>

          <style>
            body {
              font-family: Georgia;
              background: #f5ecd9;
              color: #3a3028;
              max-width: 700px;
              margin: 40px auto;
              padding: 20px;
            }

            .page {
              border: 2px solid #8c302c;
              padding: 25px;
              margin: 15px 0;
              min-height: 170px;
            }

            h1 {
              font-size: 40px;
            }
          </style>

          <h1>THE BROMINE TIMES</h1>
          <p>VOL. 01 · UNVERIFIED NEWS</p>

          <section class="page">
            <h2>BREAKING</h2>
            Local vending machine develops opinions.
          </section>

          <section class="page">
            <h2>EXCLUSIVE</h2>
            47 pigeons reportedly form committee.
          </section>

          <section class="page">
            <h2>STYLE</h2>
            Today's look: inexplicably iconic.
          </section>

          <section class="page">
            <h2>WEATHER</h2>
            100% chance of unnecessary drama.
          </section>
        `;

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "the-bromine-times.html";
        a.click();

        URL.revokeObjectURL(url);
      };
    }
  }

  function saveCollection() {
    localStorage.setItem("bvm-collection", JSON.stringify(collected));
    updateCollectionCount();
  }

  function updateCollectionCount() {
    $("collectionCount").textContent = collected.length;
  }

  function renderCollection() {
    const list = $("collectionList");
    list.innerHTML = "";

    if (!collected.length) {
      list.innerHTML =
        '<p class="muted">Nothing collected yet. Dispense something first.</p>';
      return;
    }

    collected.sort((a, b) => a - b).forEach(id => {
      const p = products.find(x => x.id === id);

      if (!p) return;

      const b = document.createElement("button");
      b.className = "collection-item";

      b.innerHTML = `
        <strong>${esc(p.title)}</strong>
        <span>ITEM ${String(id).padStart(2, "0")} · ${esc(p.type)}</span>
      `;

      b.onclick = () => {
        closeOverlay("collectionOverlay");
        openProduct(p);
      };

      list.appendChild(b);
    });
  }

  renderShelves();
  updateCollectionCount();
})();

// NIGHT SHIFT TOGGLE

const themeButton = document.getElementById("themeButton");

if (themeButton) {
  const savedTheme = localStorage.getItem("bvm-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  function updateThemeButton() {
    const dark = document.body.classList.contains("dark-mode");

    themeButton.textContent = dark
      ? "☀ DAY SHIFT"
      : "☾ NIGHT SHIFT";
  }

  updateThemeButton();

  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const dark = document.body.classList.contains("dark-mode");

    localStorage.setItem("bvm-theme", dark ? "dark" : "light");

    updateThemeButton();
  });
}