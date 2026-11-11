(() => {
  const config = window.BVM_CONTENT || {};
  const el = document.getElementById("countdown");
  const note = document.getElementById("countdownNote");
  const status = document.getElementById("screenStatus");
  const birthdayDay = config.birthdayDay || 20;
  const birthdayMonth = config.birthdayMonth ?? 10;
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
  });
  function istNowParts() {
    const p = Object.fromEntries(parts.formatToParts(new Date()).map(x => [x.type, x.value]));
    return { y:+p.year, m:+p.month, d:+p.day, h:+p.hour, min:+p.minute, s:+p.second };
  }
  function istDate(y,m,d) {
    // IST is UTC+05:30; return an absolute timestamp for local midnight.
    return Date.UTC(y, m-1, d, -5, -30, 0);
  }
  function tick() {
    const n = istNowParts();
    const today = istDate(n.y,n.m,n.d);
    const start = istDate(n.y,birthdayMonth+1,birthdayDay);
    const end = istDate(n.y,birthdayMonth+1,birthdayDay+1);
    const now = Date.now();
    const isBirthday = now >= start && now < end;
    if (isBirthday) {
      el.textContent = "IT'S TODAY!";
      note.textContent = "BIRTHDAY MODE · INDIA STANDARD TIME";
      status.textContent = "BIRTHDAY OVERRIDE ACTIVE";
      document.body.classList.add("birthday-active");
      window.BVM_BIRTHDAY_ACTIVE = true;
    } else {
      const year = now < start ? n.y : n.y + 1;
      const target = istDate(year,birthdayMonth+1,birthdayDay);
      let seconds = Math.max(0, Math.floor((target-now)/1000));
      const days = Math.floor(seconds/86400); seconds%=86400;
      const hours = Math.floor(seconds/3600); seconds%=3600;
      const mins = Math.floor(seconds/60); const secs = seconds%60;
      el.textContent = `${days}d ${String(hours).padStart(2,"0")}h ${String(mins).padStart(2,"0")}m ${String(secs).padStart(2,"0")}s`;
      note.textContent = `NEXT NOVEMBER ${birthdayDay} · 12:00 AM IST`;
      status.textContent = "MACHINE READY";
      document.body.classList.remove("birthday-active");
      window.BVM_BIRTHDAY_ACTIVE = false;
    }
    document.querySelectorAll('[data-product="17"]').forEach(b => {
      b.classList.toggle("locked", !isBirthday);
      b.setAttribute("aria-label", isBirthday ? "Birthday Override, available" : "Birthday Override, locked until November 20 IST");
    });
  }
  tick(); setInterval(tick,1000);
})();