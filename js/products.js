
(() => {
  const C = window.BVM_CONTENT;

  const products = [
    ...C.tapes.map((x, i) => ({
      id: i + 1,
      title: x.title,
      type: "AUDIO CASSETTE",
      icon: "▰",
      kind: "tape",
      data: x
    })),

    ...C.doodles.map((x, i) => ({
      id: i + 5,
      title: x.title,
      type: "PAPER DRAWING",
      icon: "✎",
      kind: "doodle",
      data: x
    })),

    {
      id: 8,
      title: "INCIDENT REPORT 001",
      type: "INTERACTIVE FILE",
      icon: "☄",
      kind: "simulator",
      data: 0
    },
    {
      id: 9,
      title: "TEST ENVIRONMENT",
      type: "INTERACTIVE FILE",
      icon: "⌁",
      kind: "simulator",
      data: 1
    },
    {
      id: 10,
      title: "A MATHEMATICAL DISAGREEMENT",
      type: "THEORETICAL DOCUMENT",
      icon: "◉",
      kind: "proof",
      data: 0
    },
    {
      id: 11,
      title: "NOTES ON UNLIKELY EVENTS",
      type: "THEORETICAL DOCUMENT",
      icon: "∿",
      kind: "proof",
      data: 1
    },

    ...C.texts.map((x, i) => ({
      id: i + 12,
      title: x.title,
      type: "PAPERWORK",
      icon: "▤",
      kind: "text",
      data: x
    })),

    {
      id: 15,
      title: "UNCLAIMED PARCEL",
      type: "SEALED DELIVERY",
      icon: "✉",
      kind: "certificate"
    },
    {
      id: 16,
      title: "UNSOLICITED OPINION",
      type: "OPINION GENERATOR",
      icon: "♨",
      kind: "roast"
    },
    {
      id: 17,
      title: "DATE EXCEPTION",
      type: "RESTRICTED ACCESS",
      icon: "✦",
      kind: "birthday"
    },
    {
      id: 18,
      title: "ADHESIVE SAMPLES",
      type: "STICKER COLLECTION",
      icon: "★",
      kind: "sticker"
    },
    {
      id: 19,
      title: "ISSUE 00",
      type: "MINI PUBLICATION",
      icon: "▧",
      kind: "zine"
    },
    {
      id: 20,
      title: "AUDIO TEST",
      type: "SOUND ARCHIVE",
      icon: "♫",
      kind: "soundboard"
    }
  ];

  window.BVM_PRODUCTS = products;
})();
