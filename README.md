# THE BROMINE VENDING MACHINE — Website 14

A self-contained, responsive digital gift vending machine. Open `index.html` using VS Code Live Server or another local web server. Some browsers restrict audio/download behaviour when opening files directly with `file://`.

## 1. Quick start

1. Extract the ZIP.
2. Keep the folder structure intact.
3. Add the images and MP3 files described below.
4. Open the folder in VS Code.
5. Run `index.html` with **Live Server**.
6. Test the machine on both desktop and a phone-sized viewport.

No build step, npm install, or framework is required. The Google Fonts import is optional; the page falls back to system fonts if offline.

## 2. Folder structure

```text
WEBSITE_14_BROMINE_VENDING_MACHINE/
├── index.html
├── content.js                 # Editable names, captions, descriptions and text
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── countdown.js            # Asia/Kolkata birthday timer + birthday lock
│   ├── products.js             # Product catalogue
│   └── machine.js              # Shelf, selection, dispensing and product behaviour
└── assets/
    ├── images/
    │   ├── shinchan.png
    │   ├── palak-certificate.png
    │   ├── doodles/
    │   │   ├── doodle-01.png
    │   │   ├── doodle-02.png
    │   │   └── doodle-03.png
    │   └── stickers/
    │       ├── sticker-01.png
    │       ├── sticker-02.png
    │       ├── sticker-03.png
    │       ├── sticker-04.png
    │       ├── sticker-05.png
    │       ├── sticker-06.png
    │       ├── sticker-07.png
    │       └── sticker-08.png
    └── audio/
        ├── tapes/
        │   ├── volume-1.mp3
        │   ├── volume-2.mp3
        │   ├── volume-3.mp3
        │   └── volume-4.mp3
        └── soundboard/
            ├── boing.mp3
            ├── dramatic-reveal.mp3
            ├── record-scratch.mp3
            ├── notification.mp3
            ├── bonk.mp3
            ├── victory.mp3
            ├── error.mp3
            └── applause.mp3
```

**Important:** filenames and folder names are case-sensitive on many hosting services. Keep them exactly as written.

---

## 3. Images to add

### A. Shinchan machine sticker

**Filename:** `shinchan.png`  
**Folder:** `assets/images/`

- Use a transparent PNG.
- A full-body or waist-up Shinchan sticker works best.
- Keep the character fairly small in the image, with a little transparent padding around it.
- Suggested source image dimensions: around 500–900 px tall.
- It appears as a small sticker near the lower corner of the vending machine.
- If this file is missing, the machine simply hides the sticker.

### B. Three drawings

**Folder:** `assets/images/doodles/`

| Exact filename | Used for | Suggested artwork |
|---|---|---|
| `doodle-01.png` | Doodle No. 001 | A small, funny character/creature doodle; expressive and loose |
| `doodle-02.png` | Doodle No. 002 | A chaotic little scene, object, or absurd illustration |
| `doodle-03.png` | Doodle No. 003 | A different visual style or subject so the three feel like a mini collection |

Artwork guidance:
- Transparent PNG is ideal, but JPG or WebP can be used if you also change the file extension in `content.js`.
- Recommended canvas: 1000 × 1000 px or 1200 × 900 px.
- Leave some breathing room around the subject.
- Avoid putting important text right against the edge.
- The artwork is displayed inside a framed gallery area and can be downloaded.

To change the drawing captions or filenames, edit the `doodles` section in `content.js`.

### C. Certificate

**Filename:** `palak-certificate.png`  
**Folder:** `assets/images/`

- This is the certificate artwork YOU design.
- Use PNG for crisp text and decorative details.
- Recommended landscape canvas: 1600 × 1100 px (or another landscape ratio).
- Keep the certificate's important text away from the edges.
- The image is previewed inside Palak Special Delivery and has a download link.
- If the file is missing, the product shows a clear reminder instead of a broken image.

### D. Eight downloadable stickers

**Folder:** `assets/images/stickers/`

The machine randomly selects one sticker whenever the Sticker Dispenser is used.

| Exact filename | Sticker slot |
|---|---|
| `sticker-01.png` | Sticker 1 |
| `sticker-02.png` | Sticker 2 |
| `sticker-03.png` | Sticker 3 |
| `sticker-04.png` | Sticker 4 |
| `sticker-05.png` | Sticker 5 |
| `sticker-06.png` | Sticker 6 |
| `sticker-07.png` | Sticker 7 |
| `sticker-08.png` | Sticker 8 |

Sticker artwork guidance:
- Use transparent PNGs.
- Make each sticker a single cut-out subject, not a full sheet containing all eight.
- Recommended canvas: 700 × 700 px or 1000 × 1000 px.
- Keep the subject centred with transparent padding so it does not get clipped.
- Aim for a consistent visual family, but give each sticker a different pose, expression, object, or joke.
- If you want a white sticker-cutline effect, include it in the PNG artwork itself.
- Each dispense randomly chooses one of the eight files and provides a download link for that exact sticker.
- Repeated purchases can select the same sticker again; this is random selection, not a guaranteed collection-completion system.

If a selected sticker image is missing, the machine tells the visitor the exact missing filename.

---

## 4. Audio to add

Use MP3 files. Keep them reasonably compressed (roughly 128–192 kbps is plenty for this site). Short sound effects should ideally be 1–3 seconds. Music tapes can be longer.

Only use audio you created, recorded, or have permission to use. Do not download commercial songs or copyrighted soundtrack recordings without permission. You can use your own compositions, royalty-free tracks with a licence that permits this use, or recordings made for this gift.

### A. Four SUPER EPIC MUSIC tapes

**Folder:** `assets/audio/tapes/`

| Exact filename | Tape |
|---|---|
| `volume-1.mp3` | SUPER EPIC MUSIC · Vol. 1 — The Grand Entrance |
| `volume-2.mp3` | SUPER EPIC MUSIC · Vol. 2 — Chaos, But Make It Soundtrack |
| `volume-3.mp3` | SUPER EPIC MUSIC · Vol. 3 — Suspiciously Cinematic |
| `volume-4.mp3` | SUPER EPIC MUSIC · Vol. 4 — The Final Boss of Vibes |

Audio suggestions:
- **Vol. 1:** triumphant, energetic, opening-credits kind of instrumental.
- **Vol. 2:** playful, chaotic, bouncy instrumental with a comic feel.
- **Vol. 3:** mysterious/cinematic instrumental, as if a ridiculous reveal is happening.
- **Vol. 4:** big finale energy: dramatic build-up and satisfying ending.

These are mood descriptions, not requests to imitate a specific artist, film, show, or existing song. Original instrumentals are ideal. The interface includes Play and Stop controls; it does not autoplay.

If you want multiple tracks per tape, combine your permitted tracks into one MP3 per volume, or edit the code to build a multi-track playlist later. The current player expects one MP3 per volume.

### B. Eight-button Noise Laboratory soundboard

**Folder:** `assets/audio/soundboard/`

| Exact filename | Sound to find/create | Ideal duration |
|---|---|---:|
| `boing.mp3` | Cartoon springy boing / bounce | 0.5–2 sec |
| `dramatic-reveal.mp3` | Short orchestral sting or suspense reveal | 1–3 sec |
| `record-scratch.mp3` | Classic abrupt record-scratch effect | 0.5–2 sec |
| `notification.mp3` | Odd, suspicious little digital notification | 0.5–2 sec |
| `bonk.mp3` | Soft cartoon bonk / wooden tap | 0.5–1.5 sec |
| `victory.mp3` | Tiny celebratory fanfare | 1–3 sec |
| `error.mp3` | Retro computer error beep/buzzer | 0.5–2 sec |
| `applause.mp3` | Short crowd applause | 1–3 sec |

Use short, clean sound effects. Avoid excessively loud peaks; normalise the files so one button is not dramatically louder than the others. Each button plays only when clicked. The soundboard does not autoplay.

---

## 5. Editing the words and labels

Open `content.js`. It contains:
- Recipient name and birthday message.
- Four tape titles, subtitles, descriptions and tracklists.
- Three doodle captions and image paths.
- Three text-product bodies.
- Random roast lines.
- Simulation prompts, options and outcomes.

You can change the writing without editing the layout or machine mechanics. Keep quote marks and commas valid JavaScript.

The product IDs and shelf order live in `js/products.js`. If you change the product count or order, update that file carefully so the 20 physical slots remain aligned.

---

## 6. Birthday countdown behaviour

The countdown uses **Asia/Kolkata (IST)** rather than the visitor's device timezone.

- Counts down to November 20 at 12:00 AM IST.
- On November 20 IST, the countdown display changes to birthday mode.
- Product 17, Birthday Override, unlocks for the full November 20 IST calendar day.
- At November 21, 12:00 AM IST, birthday mode ends and the countdown targets the next November 20.
- The date logic handles leap years and year changes.

To change the birthday date, edit `birthdayMonth` and `birthdayDay` in `content.js`. `birthdayMonth` uses JavaScript's zero-based month numbering: November is `10`.

---

## 7. Collection and testing

- Collection is saved in this browser using `localStorage`.
- Collected products can be reopened from the COLLECTION button.
- Collection is local to the browser/device. It does not automatically sync between phones or computers.
- Clearing browser site data may clear the collection.
- The birthday-only product can be tested by temporarily changing the birthday date in `content.js`, then changing it back to November 20.
- Missing optional images/audio do not prevent the rest of the machine from working.

## 8. Final pre-share checklist

- [ ] `shinchan.png` added.
- [ ] Three doodle PNGs added with exact filenames.
- [ ] Your certificate PNG added.
- [ ] Eight individual sticker PNGs added.
- [ ] Four tape MP3s added.
- [ ] Eight soundboard MP3s added.
- [ ] Test every product from 01 to 20.
- [ ] Test collection: collect an item, close it, reopen it from COLLECTION.
- [ ] Test sticker random dispense and download.
- [ ] Test soundboard buttons and tape play/stop.
- [ ] Test on a phone-sized screen and a laptop.
- [ ] Confirm birthday lock and countdown date before sharing.

**Machine policy:** no refunds, no guarantees, and absolutely no explanation for the pigeons.
