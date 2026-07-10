/* ==========================================================================
   RECO Reimagined — application
   i18n (EN/ES), hash router, theme, demo data, SVG charts, island map.
   All account/outage figures are simulated for the concept demo.
   ========================================================================== */
(function () {
"use strict";

/* ---------------- i18n ---------------- */

var LANG = localStorage.getItem("reco-lang") ||
  ((navigator.language || "en").toLowerCase().indexOf("es") === 0 ? "es" : "en");

var T = {
  en: {
    monthsShort: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    mix: { gas: "LPG plant", wind: "Wind", solar: "Solar", batt: "Battery" },
    demand: "Demand", solarOut: "Solar output",
    zoneStatus: { ok: "Energized", planned: "Planned work", out: "Outage" },
    activeOutage: "OUTAGE", plannedWork: "PLANNED", restored: "RESTORED",
    kwhUsed: "kWh", billAmount: "Amount",
    paid: "Paid", due: "Due",
    view: "View", download: "PDF",
    vsPrev: ["% less than last month", "% more than last month", "same as last month"],
    dueBy: "Due by ", customer: "Account holder",
    energyCharge: "Energy charge", fuelAdj: "Fuel adjustment", fixedCharge: "Fixed charge",
    streetLight: "Street lighting", totalDue: "Total this month",
    approx: "≈ US$ ",
    blockNote: function (r) { return r + " L/kWh"; },
    calcRows: { energy: "Energy charge", fuel: "Fuel adjustment", fixed: "Fixed charge", street: "Street lighting", bundleR: "Energy, fuel & service (R-1)", muni: "Municipal tax (IMU)", cre: "Regulator fee (CREE)" },
    calcNoteReal: "Residential rates reconstructed from real 2026 RECO bills — this matches an actual bill to the centavo.",
    calcNoteSample: "Commercial and industrial rates are samples pending the official tariff sheet.",
    billExplain: {
      energy: "The electricity you used, measured by your meter. Residential use is priced in blocks: the first 100 kWh cost less than the next 200, which cost less than everything above 300 — so light users pay the lowest rates.",
      fuel: "The cost of the LPG fuel burned to generate your energy. It is recalculated every month from the actual landed fuel price and published with its source numbers — when fuel gets cheaper, this line goes down.",
      fixed: "A flat monthly charge that covers reading your meter, producing your bill, and account service. It is the same no matter how much you use.",
      street: "A municipal levy that funds public lighting in Roatán and Santos Guardiola, collected on the municipality's behalf.",
      total: "Energy + fuel + fixed + street lighting. Pay online, by app, at partner banks, or at any office."
    },
    sampleBillNote: "Sample bill: residential, 350 kWh",
    trackSteps: ["Request received", "Site inspection", "Quote & payment", "Installation"],
    trackDates: ["Jul 8 ✓", "Scheduled Jul 14", "Pending", "Pending"],
    demoToast: "This is a concept demo — in the real site this would open the full flow.",
    tipList: [
      "Air conditioning is ~60% of a typical island bill. Each degree cooler adds ~6% — set it to 24 °C and clean the filter monthly.",
      "A worn fridge door seal can add 25 kWh a month. Close the door on a paper bill — if it slides out easily, replace the seal.",
      "Pool pumps don't need to run all day. 4–6 hours on a timer keeps water clear and can save hundreds of lempiras a month."
    ],
    langAria: "Cambiar idioma a español",
    donutAria: "Energy mix right now: ",
    usageAria: "Bar chart of monthly electricity use over the last 12 months",
    demandAria: "Line chart of island demand and solar output across today",
    crew: ["Reported", "Crew assigned", "En route", "On site", "Restored"],
    crewLabel: "Crew status: ",
    rel90: function (n, m) { return n + " outages · " + m + " min in the last 90 days"; },
    projected: "Projected month-end: ",
    dayOf: function (d) { return "Day " + d + " of 31"; },
    soFar: " so far",
    fanStrong: "Strong trade winds at Brass Hill — members are saving right now",
    fanLight: "Light winds — standard rate applies",
    fanOn: "−15% now",
    fanOff: "standard rate",
    fanUnit: " generating",
    stripTip: "Today's best window: 10:00 – 15:00 (solar peak). If you can, avoid 6 – 9 pm.",
    daysSuffix: " days",
    toastTopup: "✓ Top-up received — balance and days updated. (Demo — no charge was made.)",
    toastPref: "✓ Preferences saved. (Demo)",
    toastDue: "✓ Due date updated — your next bill will be due on that day. (Demo)",
    fuelAria: "Bar chart of the fuel adjustment over the last 12 months",
    sparkAria: "Trend of monthly outage minutes over the last 12 months",
    burnAria: "Bar chart of daily prepaid spending over the last 14 days",
    perMonth: "/month",
    trackTech: "Technician: Marco A. · Tue Jul 14 · arrives ≈ 10:40 am · you're #3 on the route",
    nowLabel: "Happening now",
    nowGo: "Outage center →",
    simZero: "Flip a switch to see the effect on the bill.",
    simVerdict: function (mo) { return "You'd save about " + mo + " a month — " + this.simYr + " a year."; },
    coco: {
      tag: "RECO assistant · demo",
      hi: "Hi! I'm Coco 🦎 I can check outages, balances, and payments — or hand you to a human. What do you need?",
      chips: { outage: "Outage in my zone?", balance: "My balance", pay: "How do I pay?", report: "Report a problem", human: "Talk to a human" },
      aOutageHead: "Right now on the island:",
      aBalance: "Demo account · West Bay: <strong>L 17,514.88</strong> due June 12 (L 8,809.49 is this month, the rest is carried balance). Prepaid demo meter: <strong>L 342.50</strong> ≈ 8 days. <a href='#/billing'>Open my account →</a>",
      aPay: "Fastest way: pay right here, two minutes, no login — card, Tigo Money, or bank. Partial payments count too. <a href='#/billing#paynow'>Pay now →</a>",
      aReport: "Tap your zone on the <a href='#/outages'>outage map</a>, or WhatsApp us at +504 9448-8542 with a landmark (\"near the Punta Gorda dock\"). ⚠ If a line is down, stay 10 m away and call 2405-1130 first.",
      aHuman: "Real people, no phone trees: ☎ 2407-2170 / 79 (ext. 1108, 1110, 1112) · WhatsApp +504 9448-8542. Your neighborhood has one assigned team — the same five people every time. Emergencies are answered 24/7."
    },
    wiz: {
      prepaid: { h: "Switch to RECO Prepaid", p: "Top up as money comes in — no monthly bill, no deposit. Old debt moves to the humane path: 10% of each recharge pays it down at zero interest, and power stays on at night and on weekends even at L 0." },
      installment: { h: "Installment plan", p: "Split the past-due balance into 3–12 equal monthly payments. No down payment, no interest. Set it up online in two minutes — no office visit, no explaining yourself." },
      extension: { h: "Due-date extension", p: "Ten extra days on this bill, instantly and free, up to twice a year. Sometimes that's all it takes." },
      budget: { h: "Steady Bill", p: "Pay your 12-month average every month — around L 8,990 for this account — so AC season stops hitting like a wave." },
      family: { h: "Safety Net + guest pay", p: "Your relative abroad can receive copies of due-date alerts and pay this account directly with just its number — no login, receipts to both of you." },
      ac: { h: "Free AC check-up", p: "AC is over half this home's bill (~L 156/day). A free efficiency visit — filters, seals, thermostat — typically trims 10–15% off the total." }
    },
    payDoneBalance: "L 0.00"
  },
  es: {
    monthsShort: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],
    mix: { gas: "Planta GLP", wind: "Eólica", solar: "Solar", batt: "Batería" },
    demand: "Demanda", solarOut: "Generación solar",
    zoneStatus: { ok: "Energizada", planned: "Trabajo programado", out: "Corte" },
    activeOutage: "CORTE", plannedWork: "PROGRAMADO", restored: "RESTABLECIDO",
    kwhUsed: "kWh", billAmount: "Monto",
    paid: "Pagada", due: "Pendiente",
    view: "Ver", download: "PDF",
    vsPrev: ["% menos que el mes pasado", "% más que el mes pasado", "igual que el mes pasado"],
    dueBy: "Vence el ", customer: "Titular de la cuenta",
    energyCharge: "Cargo por energía", fuelAdj: "Ajuste por combustible", fixedCharge: "Cargo fijo",
    streetLight: "Alumbrado público", totalDue: "Total del mes",
    approx: "≈ US$ ",
    blockNote: function (r) { return r + " L/kWh"; },
    calcRows: { energy: "Cargo por energía", fuel: "Ajuste por combustible", fixed: "Cargo fijo", street: "Alumbrado público", bundleR: "Energía, combustible y servicio (R-1)", muni: "Impuesto municipal (IMU)", cre: "Tasa del regulador (CREE)" },
    calcNoteReal: "Tarifas residenciales reconstruidas de facturas reales de RECO 2026 — coincide con una factura real al centavo.",
    calcNoteSample: "Las tarifas comercial e industrial son muestras, pendientes del pliego tarifario oficial.",
    billExplain: {
      energy: "La electricidad que usted usó, medida por su contador. El consumo residencial se cobra por bloques: los primeros 100 kWh cuestan menos que los siguientes 200, y estos menos que todo lo que pase de 300 — quien consume poco paga las tarifas más bajas.",
      fuel: "El costo del GLP quemado para generar su energía. Se recalcula cada mes con el precio real de importación y se publica con sus cifras de origen — cuando el combustible baja, esta línea baja.",
      fixed: "Un cargo mensual fijo que cubre la lectura del medidor, la emisión de su factura y la atención de su cuenta. Es igual sin importar cuánto consuma.",
      street: "Una tasa municipal que financia el alumbrado público de Roatán y Santos Guardiola, cobrada en nombre de la municipalidad.",
      total: "Energía + combustible + cargo fijo + alumbrado. Pague en línea, por app, en bancos aliados o en cualquier oficina."
    },
    sampleBillNote: "Factura de muestra: residencial, 350 kWh",
    trackSteps: ["Solicitud recibida", "Inspección del sitio", "Cotización y pago", "Instalación"],
    trackDates: ["8 jul ✓", "Programada 14 jul", "Pendiente", "Pendiente"],
    demoToast: "Esto es una demo conceptual — en el sitio real aquí se abriría el trámite completo.",
    tipList: [
      "El aire acondicionado es ~60% de una factura típica en la isla. Cada grado más frío suma ~6% — ajústelo a 24 °C y limpie el filtro cada mes.",
      "Un sello de refrigerador gastado puede sumar 25 kWh al mes. Cierre la puerta sobre un papel — si se desliza fácil, cambie el sello.",
      "La bomba de la piscina no necesita correr todo el día. 4–6 horas con temporizador mantienen el agua limpia y ahorran cientos de lempiras al mes."
    ],
    langAria: "Switch language to English",
    donutAria: "Mezcla de energía en este momento: ",
    usageAria: "Gráfico de barras del consumo mensual de los últimos 12 meses",
    demandAria: "Gráfico de líneas de la demanda de la isla y la generación solar de hoy",
    crew: ["Reportado", "Cuadrilla asignada", "En camino", "En el sitio", "Restablecido"],
    crewLabel: "Estado de la cuadrilla: ",
    rel90: function (n, m) { return n + " cortes · " + m + " min en los últimos 90 días"; },
    projected: "Proyección a fin de mes: ",
    dayOf: function (d) { return "Día " + d + " de 31"; },
    soFar: " hasta hoy",
    fanStrong: "Vientos alisios fuertes en Brass Hill — los miembros ahorran ahora mismo",
    fanLight: "Vientos suaves — aplica la tarifa estándar",
    fanOn: "−15% ahora",
    fanOff: "tarifa estándar",
    fanUnit: " generando",
    stripTip: "La mejor ventana de hoy: 10:00 – 15:00 (pico solar). Si puede, evite de 6 a 9 pm.",
    daysSuffix: " días",
    toastTopup: "✓ Recarga recibida — saldo y días actualizados. (Demo — no se hizo ningún cobro.)",
    toastPref: "✓ Preferencias guardadas. (Demo)",
    toastDue: "✓ Fecha de pago actualizada — su próxima factura vencerá ese día. (Demo)",
    fuelAria: "Gráfico de barras del ajuste por combustible de los últimos 12 meses",
    sparkAria: "Tendencia de minutos de corte por mes en los últimos 12 meses",
    burnAria: "Gráfico de barras del gasto prepago diario de los últimos 14 días",
    perMonth: "/mes",
    trackTech: "Técnico: Marco A. · mar 14 jul · llega ≈ 10:40 am · usted es el #3 de la ruta",
    nowLabel: "Ahora mismo",
    nowGo: "Centro de cortes →",
    simZero: "Active un interruptor para ver el efecto en la factura.",
    simVerdict: function (mo) { return "Ahorraría cerca de " + mo + " al mes — " + this.simYr + " al año."; },
    coco: {
      tag: "asistente de RECO · demo",
      hi: "¡Hola! Soy Coco 🦎 Puedo revisar cortes, saldos y pagos — o pasarle con una persona. ¿Qué necesita?",
      chips: { outage: "¿Corte en mi zona?", balance: "Mi saldo", pay: "¿Cómo pago?", report: "Reportar un problema", human: "Hablar con una persona" },
      aOutageHead: "Ahora mismo en la isla:",
      aBalance: "Cuenta demo · West Bay: <strong>L 17,514.88</strong> vence el 12 de junio (L 8,809.49 es este mes, el resto es saldo anterior). Medidor prepago demo: <strong>L 342.50</strong> ≈ 8 días. <a href='#/billing'>Abrir mi cuenta →</a>",
      aPay: "Lo más rápido: pague aquí mismo, dos minutos, sin cuenta — tarjeta, Tigo Money o banco. Los pagos parciales también cuentan. <a href='#/billing#paynow'>Pagar ahora →</a>",
      aReport: "Toque su zona en el <a href='#/outages'>mapa de cortes</a>, o escríbanos por WhatsApp al +504 9448-8542 con una referencia (\"cerca del muelle de Punta Gorda\"). ⚠ Si hay una línea caída, manténgase a 10 m y llame primero al 2405-1130.",
      aHuman: "Personas reales, sin menús telefónicos: ☎ 2407-2170 / 79 (ext. 1108, 1110, 1112) · WhatsApp +504 9448-8542. Su vecindario tiene un equipo asignado — las mismas cinco personas siempre. Las emergencias se atienden 24/7."
    },
    wiz: {
      prepaid: { h: "Cámbiese a RECO Prepago", p: "Recargue conforme llega el dinero — sin factura mensual, sin depósito. La deuda vieja pasa al camino humano: el 10% de cada recarga la abona a cero intereses, y la luz sigue de noche y los fines de semana aunque esté en L 0." },
      installment: { h: "Plan de cuotas", p: "Divida el saldo vencido en 3–12 pagos mensuales iguales. Sin prima, sin intereses. Se configura en línea en dos minutos — sin ir a la oficina, sin dar explicaciones." },
      extension: { h: "Extensión de fecha de pago", p: "Diez días más para esta factura, al instante y gratis, hasta dos veces al año. A veces con eso basta." },
      budget: { h: "Cuota Fija", p: "Pague su promedio de 12 meses cada mes — unos L 8,990 para esta cuenta — para que la temporada de aire deje de golpear como ola." },
      family: { h: "Red de Apoyo + pago de terceros", p: "Su familiar en el extranjero puede recibir copias de los avisos de vencimiento y pagar esta cuenta directamente solo con el número — sin cuenta, recibos para ambos." },
      ac: { h: "Revisión gratuita del aire", p: "El aire es más de la mitad de la factura de este hogar (~L 156/día). Una visita de eficiencia gratuita — filtros, sellos, termostato — típicamente recorta 10–15% del total." }
    },
    payDoneBalance: "L 0.00"
  }
};

function t() { return T[LANG]; }

function applyStaticLang() {
  document.documentElement.lang = LANG;
  var els = document.querySelectorAll("[data-en]");
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    var txt = el.dataset[LANG];
    if (txt != null) el.textContent = txt;
  }
  document.querySelectorAll(".lang-opt").forEach(function (o) {
    o.classList.toggle("is-active", o.dataset.langOpt === LANG);
  });
  var lt = document.getElementById("lang-toggle");
  if (lt) lt.setAttribute("aria-label", t().langAria);
}

/* ---------------- demo data ---------------- */

var FX = 26.3; // L per USD (sample)
var TARIFF = {
  res: { blocks: [{ upTo: 100, rate: 5.90 }, { upTo: 300, rate: 7.45 }, { upTo: Infinity, rate: 8.85 }] },
  com: { blocks: [{ upTo: Infinity, rate: 9.77 }] },
  ind: { blocks: [{ upTo: Infinity, rate: 8.17 }] },
  fuel: 1.44, fixed: 62.00, street: 0.301
};

/* Town positions derived from reference maps of Roatán and pinned to the
   traced outline's actual shores (programmatically verified on land). */
var ZONES = [
  { id: "west-bay",    en: "West Bay",        es: "West Bay",        x: 22,  y: 356, status: "ok",      lbl: "b" },
  { id: "west-end",    en: "West End",        es: "West End",        x: 34,  y: 309, status: "ok",      lbl: "t" },
  { id: "flowers-bay", en: "Flowers Bay",     es: "Flowers Bay",     x: 92,  y: 293, status: "ok",      lbl: "b" },
  { id: "sandy-bay",   en: "Sandy Bay",       es: "Sandy Bay",       x: 128, y: 237, status: "planned", lbl: "t" },
  { id: "coxen-hole",  en: "Coxen Hole",      es: "Coxen Hole",      x: 165, y: 268, status: "planned", lbl: "b" },
  { id: "brick-bay",   en: "Brick Bay",       es: "Brick Bay",       x: 281, y: 207, status: "ok",      lbl: "b" },
  { id: "french-hbr",  en: "French Harbour",  es: "French Harbour",  x: 321, y: 189, status: "ok",      lbl: "b" },
  { id: "parrot-tree", en: "Parrot Tree",     es: "Parrot Tree",     x: 378, y: 172, status: "ok",      lbl: "b" },
  { id: "politilly",   en: "Politilly Bight", es: "Politilly Bight", x: 407, y: 123, status: "ok",      lbl: "t" },
  { id: "punta-gorda", en: "Punta Gorda",     es: "Punta Gorda",     x: 489, y: 83,  status: "out",     lbl: "t" },
  { id: "jonesville",  en: "Jonesville",      es: "Jonesville",      x: 489, y: 115, status: "ok",      lbl: "b" },
  { id: "oak-ridge",   en: "Oak Ridge",       es: "Oak Ridge",       x: 529, y: 90,  status: "ok",      lbl: "b" },
  { id: "camp-bay",    en: "Camp Bay",        es: "Camp Bay",        x: 732, y: 49,  status: "ok",      lbl: "t" },
  { id: "santa-elena", en: "Santa Elena",     es: "Santa Elena",     x: 822, y: 53,  status: "ok",      lbl: "b" },
  /* minor communities — shown when zoomed in */
  { id: "palmetto",    en: "Palmetto Bay",    es: "Palmetto Bay",    x: 248, y: 191,   status: "ok", lbl: "t", minor: true, side: "n" },
  { id: "milton",      en: "Milton Bight",    es: "Milton Bight",    x: 372, y: 138,   status: "ok", lbl: "t", minor: true, side: "n" },
  { id: "punta-blanca",en: "Punta Blanca",    es: "Punta Blanca",    x: 515, y: 75,   status: "ok", lbl: "t", minor: true, side: "n" },
  { id: "diamond-rock",en: "Diamond Rock",    es: "Diamond Rock",    x: 558, y: 58,   status: "ok", lbl: "t", minor: true, side: "n" },
  { id: "port-royal",  en: "Port Royal",      es: "Port Royal",      x: 622, y: 73,   status: "ok", lbl: "b", minor: true, side: "s" }
];

/* Zone coverage areas — traced by a local on the accurate island outline
   via ?trace=1. Pending final verification against on-the-ground knowledge. */
var ZONE_AREAS = {"west-bay": [[8, 342.7], [1, 362.8], [1, 390], [39.2, 362.3]], "west-end": [[8.6, 337.3], [42.3, 318.2], [35, 281.8], [8.8, 302.5]], "flowers-bay": [[58.9, 342], [54.9, 330.5], [94.9, 288.8], [101.5, 296.2]], "coxen-hole": [[106, 295.4], [99.3, 286.8], [132.2, 263.5], [151.3, 247.6], [171.4, 238.9], [199.2, 236.7], [232.1, 240.2], [243.6, 244], [251, 255.5], [247.1, 265.1], [227.1, 274.9], [219.5, 264.7], [220.1, 255.5], [210.8, 262.2], [210.5, 268.9], [187.6, 280.4], [187.5, 280.3], [143.7, 295.9], [131.3, 292.1]], "sandy-bay": [[149.7, 213.6], [155.3, 224.8], [63.3, 272.3], [58.7, 264.2]], "palmetto": [[224.7, 180.9], [242.6, 193.7], [257.4, 186], [245.7, 174.2]], "brick-bay": [[278.6, 224], [266.9, 210.8], [282.7, 200.5], [293.4, 211.8]], "french-hbr": [[297.2, 207.8], [291.1, 198.1], [347.3, 176.1], [353.9, 186.3]], "parrot-tree": [[384.6, 184.8], [375.7, 188.3], [373.1, 171], [385.6, 168.5]], "jonesville": [[487.6, 132.3], [479.9, 116.5], [498.9, 108.8], [498.9, 126.7]], "oak-ridge": [[524, 123.6], [523, 96.5], [532.2, 91.4], [539.3, 113.8]], "port-royal": [[647.5, 76.3], [619.3, 77.8], [617.8, 87.6], [643.9, 83.5]], "camp-bay": [[701.3, 31.3], [702.9, 44.1], [771.4, 45.6], [771.4, 39]], "santa-elena": [[807.5, 45.5], [801.9, 73.1], [882.1, 48.6], [866.8, 31.2]], "diamond-rock": [[546.7, 57.1], [549.9, 65.7], [568.1, 56.4], [563, 50.3]], "punta-blanca": [[525, 57.1], [517.6, 79.1], [505.1, 60.6]], "punta-gorda": [[499.4, 64.7], [507.4, 80], [470.1, 93.6], [464.3, 79.1]], "politilly": [[415.2, 106.9], [409.4, 132], [393.6, 112.1]], "milton": [[371.4, 121.2], [380.4, 145.6], [371.4, 145.6], [363, 134]]};

/* Landmarks — appear when zoomed in; not outage zones */
var LANDMARKS = [
  { id: "lm-airport",  en: "✈ Juan Manuel Gálvez Intl. Airport", es: "✈ Aeropuerto Intl. Juan Manuel Gálvez", x: 205, y: 246, dy: -14, side: "s" },
  { id: "lm-portroa",  en: "🚢 Port of Roatán (cruise)",          es: "🚢 Puerto de Roatán (cruceros)",        x: 158, y: 286, dy: 16,  side: "coast-s" },
  { id: "lm-ferry",    en: "⛴ Ferry terminal (Galaxy Wave)",     es: "⛴ Terminal de ferry (Galaxy Wave)",    x: 222, y: 271, dy: 16,  side: "coast-s" },
  { id: "lm-mahogany", en: "🚢 Mahogany Bay (cruise)",            es: "🚢 Mahogany Bay (cruceros)",            x: 240, y: 266, dy: 30,  side: "coast-s" }
];

/* per-zone reliability, last 90 days: [outage count, total minutes] (demo) */
var REL90 = {
  "west-bay": [1, 44], "west-end": [2, 71], "sandy-bay": [3, 126], "flowers-bay": [1, 38],
  "coxen-hole": [2, 65], "brick-bay": [1, 52], "french-hbr": [2, 58], "parrot-tree": [1, 31],
  "politilly": [2, 84], "punta-gorda": [5, 216], "jonesville": [3, 102], "oak-ridge": [3, 95],
  "camp-bay": [2, 77], "santa-elena": [2, 88],
  "palmetto": [2, 66], "milton": [2, 74], "punta-blanca": [3, 118], "diamond-rock": [2, 81], "port-royal": [1, 47]
};

/* Fuel adjustment (the bill's "AC" line): Aug 2025 anchored to a real bill —
   L2,857.15 / 1,876 kWh = L1.523/kWh. Other months illustrative around it. */
var FUEL_HIST = [1.52, 1.58, 1.55, 1.50, 1.47, 1.51, 1.48, 1.45, 1.42, 1.46, 1.43, 1.44]; // Aug 25 → Jul 26
var OUTAGE_MIN_HIST = [148, 132, 165, 121, 96, 88, 104, 92, 78, 84, 71, 63]; // monthly outage minutes

/* Events based on RECO's real published outage notices (June–July 2026) */
var EVENTS = [
  {
    zone: "coxen-hole", type: "planned",
    cause: { en: "Scheduled maintenance — Coxen Hole & central zones (real RECO notice, Jul 10)", es: "Mantenimiento programado — Coxen Hole y zonas centrales (aviso real de RECO, 10 jul)" },
    meta:  { en: "Today 9:00 am – 1:00 pm · incl. Dixon Cove, the airport, Flowers Bay, Brass Hill, Spring Garden", es: "Hoy 9:00 am – 1:00 pm · incl. Dixon Cove, el aeropuerto, Flowers Bay, Brass Hill, Spring Garden" },
    eta:   { en: "Power back by 1:00 pm", es: "Energía de vuelta a la 1:00 pm" }
  },
  {
    zone: "punta-gorda", type: "out", stage: 3,
    cause: { en: "Tree on the line near the main road", es: "Árbol sobre la línea cerca de la carretera principal" },
    meta:  { en: "Started 14:20 · 312 customers affected · crew on site", es: "Inició 14:20 · 312 clientes afectados · cuadrilla en el sitio" },
    eta:   { en: "Estimated restoration: 6:30 pm today", es: "Restablecimiento estimado: 6:30 pm hoy" }
  },
  {
    zone: "sandy-bay", type: "planned",
    cause: { en: "Sandy Bay Double-Circuit Project — next work window", es: "Proyecto Doble Circuito Sandy Bay — próxima ventana de trabajo" },
    meta:  { en: "Tue Jul 14 · 9:00 am – 1:00 pm · West End & West Bay may see brief blinks", es: "Mar 14 jul · 9:00 am – 1:00 pm · West End y West Bay pueden ver parpadeos breves" },
    eta:   { en: "", es: "" }
  },
  {
    zone: "oak-ridge", type: "restored",
    cause: { en: "Salt buildup on insulators", es: "Acumulación de sal en aisladores" },
    meta:  { en: "Restored 11:05 am · out for 42 min", es: "Restablecido 11:05 am · 42 min sin servicio" },
    eta:   { en: "", es: "" }
  }
];

var NEWS = [
  { tag: "notice", date: "2026-07-08",
    title: { en: "Planned maintenance: Oak Ridge transformer, tonight 10 pm", es: "Mantenimiento programado: transformador de Oak Ridge, hoy 10 pm" },
    body:  { en: "Crews will replace aging switchgear feeding Oak Ridge and Diamond Rock. Expected window 10:00 pm – 1:00 am; subscribers were notified by WhatsApp.", es: "Las cuadrillas reemplazarán equipo de maniobra que alimenta Oak Ridge y Diamond Rock. Ventana estimada 10:00 pm – 1:00 am; los suscriptores fueron avisados por WhatsApp." } },
  { tag: "rates", date: "2026-07-01",
    title: { en: "July fuel adjustment drops 4% as LPG prices ease", es: "El ajuste por combustible de julio baja 4% por menores precios del GLP" },
    body:  { en: "This month's fuel adjustment is L 1.12/kWh, down from L 1.17. The full calculation, cargo receipts included, is published on the rates page.", es: "El ajuste de este mes es L 1.12/kWh, desde L 1.17. El cálculo completo, con recibos de embarque, está publicado en la página de tarifas." } },
  { tag: "company", date: "2026-06-22",
    title: { en: "Battery expansion study: shifting more solar into the evening", es: "Estudio de ampliación de baterías: más solar hacia la noche" },
    body:  { en: "Engineering is evaluating a second GEMS battery bank so midday solar can cover the dinner-hour peak — the hours when fuel burn is highest.", es: "Ingeniería evalúa un segundo banco de baterías GEMS para que el sol del mediodía cubra el pico de la cena — las horas de mayor quema de combustible." } },
  { tag: "notice", date: "2026-06-15",
    title: { en: "Hurricane season: our readiness plan and yours", es: "Temporada de huracanes: nuestro plan de preparación y el suyo" },
    body:  { en: "Vegetation trimming is complete on the main east–west feeder. Read the checklist: what we do before a storm, and how to prepare your home.", es: "La poda de vegetación está completa en el alimentador principal este–oeste. Lea la lista: qué hacemos antes de una tormenta y cómo preparar su hogar." } },
  { tag: "company", date: "2026-05-30",
    title: { en: "Roatán bets on renewables: wind, solar and storage today", es: "Roatán apuesta por las renovables: viento, solar y baterías hoy" },
    body:  { en: "From the Trade Winds turbines at Brass Hill to the 7 MW solar park, a look at how the island's clean fleet grew — and what comes next.", es: "De las turbinas Trade Winds en Brass Hill al parque solar de 7 MW, un repaso de cómo creció la flota limpia de la isla — y lo que sigue." } },
  { tag: "rates", date: "2026-05-01",
    title: { en: "May tariff sheet published — with a plain-language guide", es: "Pliego tarifario de mayo publicado — con guía en lenguaje claro" },
    body:  { en: "Every component of the tariff, its legal basis, and a worked example bill, in English and Spanish. Transparency is policy, not a slogan.", es: "Cada componente de la tarifa, su base legal y un ejemplo de factura calculado, en español e inglés. La transparencia es política, no eslogan." } }
];

/* Real 13-month history from an actual May 2026 West Bay residential bill */
var USAGE_KWH = [445, 432, 1306, 1876, 1817, 1101, 920, 769, 774, 708, 664, 999, 1011];
var USAGE_START = { y: 2025, m: 4 }; // May 2025 (0-based month index 4)

/* Residential pricing reconstructed from two real bills (Aug 2025 + May 2026):
   R-1 energy+fuel+fixed bundle L8.3555/kWh, street lighting (AP) L0.301/kWh,
   municipal tax (IMU) L0.0355/kWh, regulator fee (CRE) L0.0216/kWh.
   Reproduces the May 2026 bill to the centavo: 1,011 kWh -> L8,809.49 */
var RATE = { energy: 8.3555, ap: 0.301, imu: 0.0355, cre: 0.0216 };
function realBillFor(kwh) {
  return kwh * (RATE.energy + RATE.ap + RATE.imu + RATE.cre);
}

/* ---------------- helpers ---------------- */

function $(sel, root) { return (root || document).querySelector(sel); }
function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

function fmtL(n) {
  return "L " + n.toLocaleString(LANG === "es" ? "es-HN" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtUSD(n) {
  return (n / FX).toLocaleString(LANG === "es" ? "es-HN" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function monthLabel(y, m) {
  return t().monthsShort[m] + " " + String(y).slice(2);
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function zoneById(id) {
  for (var i = 0; i < ZONES.length; i++) if (ZONES[i].id === id) return ZONES[i];
  return null;
}
function energyChargeFor(kwh, cls) {
  var blocks = TARIFF[cls].blocks, rem = kwh, prev = 0, sum = 0;
  for (var i = 0; i < blocks.length && rem > 0; i++) {
    var span = Math.min(rem, blocks[i].upTo - prev);
    sum += span * blocks[i].rate;
    rem -= span; prev = blocks[i].upTo;
  }
  return sum;
}
function billTotalFor(kwh, cls) {
  return energyChargeFor(kwh, cls) + kwh * TARIFF.fuel + TARIFF.fixed + kwh * TARIFF.street;
}

/* tooltip */
var tipEl = null;
function showTip(html, x, y) {
  if (!tipEl) tipEl = $("#viz-tooltip");
  tipEl.innerHTML = html;
  tipEl.hidden = false;
  var pad = 14, w = tipEl.offsetWidth, h = tipEl.offsetHeight;
  var left = Math.min(Math.max(8, x + pad), window.innerWidth - w - 8);
  var top = y - h - pad; if (top < 8) top = y + pad;
  tipEl.style.left = left + "px";
  tipEl.style.top = top + "px";
}
function hideTip() { if (!tipEl) tipEl = $("#viz-tooltip"); tipEl.hidden = true; }

/* toast */
var toastEl = null, toastTimer = null;
function showToast(msg) {
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.className = "viz-tooltip";
    toastEl.style.pointerEvents = "none";
    toastEl.style.left = "50%";
    toastEl.style.transform = "translateX(-50%)";
    toastEl.style.bottom = "24px";
    toastEl.style.top = "auto";
    toastEl.setAttribute("role", "status");
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  toastEl.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toastEl.hidden = true; }, 3500);
}

/* ---------------- live grid model (deterministic by hour) ---------------- */

function gridNow() {
  var h = new Date().getHours() + new Date().getMinutes() / 60;
  // demand: overnight low ~19 MW, day ~26, evening peak ~31
  var demand = 19
    + 7 * Math.exp(-Math.pow(h - 14, 2) / 28)
    + 8 * Math.exp(-Math.pow(h - 19.5, 2) / 7);
  // solar: bell centered 12:30, max 6.2 MW
  var solar = Math.max(0, 6.2 * Math.exp(-Math.pow(h - 12.5, 2) / 9));
  var wind = 2.4 + 0.8 * Math.sin(h / 3.1);
  var batt = h >= 17.5 && h <= 21 ? 1.8 : (h >= 10 && h <= 15 ? -0.6 : 0.2);
  if (batt < 0) batt = 0; // charging → not shown as supply
  var gas = Math.max(0, demand - solar - wind - batt);
  return { demand: demand, solar: solar, wind: wind, batt: batt, gas: gas };
}

/* ---------------- charts ---------------- */

function polar(cx, cy, r, deg) {
  var rad = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}
function arcPath(cx, cy, r, a0, a1) {
  var p0 = polar(cx, cy, r, a0), p1 = polar(cx, cy, r, a1);
  var large = a1 - a0 > 180 ? 1 : 0;
  return "M " + p0[0].toFixed(2) + " " + p0[1].toFixed(2) +
         " A " + r + " " + r + " 0 " + large + " 1 " + p1[0].toFixed(2) + " " + p1[1].toFixed(2);
}

function renderMixDonut() {
  var host = $("#mix-donut"), legend = $("#mix-legend");
  if (!host) return;
  var g = gridNow();
  var series = [
    { key: "gas",   val: g.gas,   color: "var(--s-gas)" },
    { key: "wind",  val: g.wind,  color: "var(--s-wind)" },
    { key: "solar", val: g.solar, color: "var(--s-solar)" },
    { key: "batt",  val: g.batt,  color: "var(--s-batt)" }
  ];
  var total = 0;
  series.forEach(function (s) { total += s.val; });
  var cx = 70, cy = 70, r = 52, gapDeg = 3, a = 0;
  var paths = "";
  series.forEach(function (s) {
    var sweep = s.val / total * 360;
    if (sweep <= gapDeg) { a += sweep; return; }
    paths += '<path d="' + arcPath(cx, cy, r, a + gapDeg / 2, a + sweep - gapDeg / 2) +
      '" fill="none" stroke="' + s.color + '" stroke-width="21" stroke-linecap="butt"/>';
    a += sweep;
  });
  var renewPct = Math.round((g.solar + g.wind + g.batt) / total * 100);
  host.innerHTML =
    '<svg viewBox="0 0 140 140" width="140" height="140">' + paths +
    '<text x="70" y="66" text-anchor="middle" font-size="21" font-weight="700" fill="var(--ink)" font-family="var(--font-display)">' + total.toFixed(1) + "</text>" +
    '<text x="70" y="84" text-anchor="middle" font-size="11" fill="var(--ink-2)">MW</text></svg>';
  var ariaBits = series.map(function (s) { return t().mix[s.key] + " " + Math.round(s.val / total * 100) + "%"; });
  host.setAttribute("aria-label", t().donutAria + ariaBits.join(", "));

  legend.innerHTML = series.map(function (s) {
    return "<li><span class='swatch' style='background:" + s.color + "'></span>" +
      esc(t().mix[s.key]) + "<span class='val'>" + s.val.toFixed(1) + " MW · " + Math.round(s.val / total * 100) + "%</span></li>";
  }).join("");

  var sd = $("#stat-demand"), sr = $("#stat-renew");
  if (sd) sd.textContent = g.demand.toFixed(1) + " MW";
  if (sr) sr.textContent = renewPct + "%";
}

function renderUsageChart(hostSel) {
  var host = $(hostSel || "#usage-chart");
  if (!host) return;
  var W = 560, H = 220, L = 44, R = 10, TOP = 18, B = 30;
  var iw = W - L - R, ih = H - TOP - B;
  var max = Math.max.apply(null, USAGE_KWH);
  var yMax = Math.ceil(max / 400) * 400; // keeps the 4 gridline steps on round numbers
  var n = USAGE_KWH.length;
  var slot = iw / n, bw = Math.min(26, slot * 0.62);

  var out = "";
  // gridlines
  for (var gV = 0; gV <= yMax; gV += yMax / 4) {
    var gy = TOP + ih - gV / yMax * ih;
    out += '<line x1="' + L + '" y1="' + gy + '" x2="' + (W - R) + '" y2="' + gy + '" stroke="var(--grid-line)" stroke-width="1"/>';
    out += '<text x="' + (L - 7) + '" y="' + (gy + 3.5) + '" text-anchor="end" font-size="10" fill="var(--axis-ink)" style="font-variant-numeric:tabular-nums">' + gV + "</text>";
  }
  var labels = "";
  for (var i = 0; i < n; i++) {
    var v = USAGE_KWH[i];
    var x = L + slot * i + (slot - bw) / 2;
    var bh = Math.max(2, v / yMax * ih);
    var y = TOP + ih - bh;
    var last = i === n - 1;
    var rr = Math.min(4, bh / 2);
    var d = "M" + x + " " + (TOP + ih) +
      " V" + (y + rr) +
      " Q" + x + " " + y + " " + (x + rr) + " " + y +
      " H" + (x + bw - rr) +
      " Q" + (x + bw) + " " + y + " " + (x + bw) + " " + (y + rr) +
      " V" + (TOP + ih) + " Z";
    out += '<path d="' + d + '" fill="var(--brand)" opacity="' + (last ? 1 : 0.55) + '" data-i="' + i + '" class="u-bar grow" style="animation-delay:' + (i * 45) + 'ms"/>';
    if (last) {
      out += '<text x="' + (x + bw / 2) + '" y="' + (y - 6) + '" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)" style="font-variant-numeric:tabular-nums">' + v + "</text>";
    }
    var mIdx = (USAGE_START.m + i) % 12;
    var yy = USAGE_START.y + Math.floor((USAGE_START.m + i) / 12);
    if (i % 2 === 0 || last) {
      labels += '<text x="' + (x + bw / 2) + '" y="' + (H - 10) + '" text-anchor="middle" font-size="10" fill="var(--axis-ink)">' + monthLabel(yy, mIdx) + "</text>";
    }
  }
  out += '<line x1="' + L + '" y1="' + (TOP + ih) + '" x2="' + (W - R) + '" y2="' + (TOP + ih) + '" stroke="var(--axis-ink)" stroke-width="1"/>';
  host.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(t().usageAria) + '">' + out + labels + "</svg>";

  $all(".u-bar", host).forEach(function (bar) {
    function tip(e) {
      var i = +bar.dataset.i;
      var mIdx = (USAGE_START.m + i) % 12;
      var yy = USAGE_START.y + Math.floor((USAGE_START.m + i) / 12);
      var pt = e.touches ? e.touches[0] : e;
      showTip("<strong>" + monthLabel(yy, mIdx) + "</strong><br>" + USAGE_KWH[i] + " kWh · " + fmtL(realBillFor(USAGE_KWH[i])), pt.clientX, pt.clientY);
    }
    bar.addEventListener("mousemove", tip);
    bar.addEventListener("mouseleave", hideTip);
    bar.addEventListener("touchstart", tip, { passive: true });
    bar.addEventListener("touchend", hideTip);
  });
}

function demandAt(h) {
  return 19 + 7 * Math.exp(-Math.pow(h - 14, 2) / 28) + 8 * Math.exp(-Math.pow(h - 19.5, 2) / 7);
}
function solarAt(h) {
  return Math.max(0, 6.2 * Math.exp(-Math.pow(h - 12.5, 2) / 9));
}

function renderDemandChart() {
  var host = $("#demand-chart");
  if (!host) return;
  var W = 640, H = 250, L = 40, R = 12, TOP = 16, B = 30;
  var iw = W - L - R, ih = H - TOP - B;
  var yMax = 35;
  function X(h) { return L + h / 23 * iw; }
  function Y(v) { return TOP + ih - v / yMax * ih; }

  var out = "";
  for (var gV = 0; gV <= yMax; gV += 7) {
    out += '<line x1="' + L + '" y1="' + Y(gV) + '" x2="' + (W - R) + '" y2="' + Y(gV) + '" stroke="var(--grid-line)"/>';
    out += '<text x="' + (L - 7) + '" y="' + (Y(gV) + 3.5) + '" text-anchor="end" font-size="10" fill="var(--axis-ink)" style="font-variant-numeric:tabular-nums">' + gV + "</text>";
  }
  var dLine = "", sArea = "M " + X(0) + " " + Y(0);
  for (var h = 0; h <= 23; h += 0.5) {
    dLine += (h === 0 ? "M " : " L ") + X(h).toFixed(1) + " " + Y(demandAt(h)).toFixed(1);
    sArea += " L " + X(h).toFixed(1) + " " + Y(solarAt(h)).toFixed(1);
  }
  sArea += " L " + X(23) + " " + Y(0) + " Z";
  out += '<path d="' + sArea + '" fill="var(--s-solar)" opacity="0.30"/>';
  out += '<path d="' + sArea + '" fill="none"/>';
  out += '<path id="dc-line" d="' + dLine + '" fill="none" stroke="var(--brand)" stroke-width="2.5" stroke-linejoin="round"/>';
  // endpoint emphasis at current hour
  var nowH = Math.min(23, new Date().getHours() + new Date().getMinutes() / 60);
  out += '<circle cx="' + X(nowH) + '" cy="' + Y(demandAt(nowH)) + '" r="4.5" fill="var(--brand)" stroke="var(--card)" stroke-width="2"/>';
  [0, 6, 12, 18, 23].forEach(function (hh) {
    out += '<text x="' + X(hh) + '" y="' + (H - 10) + '" text-anchor="middle" font-size="10" fill="var(--axis-ink)">' + (hh === 23 ? "23:00" : hh + ":00") + "</text>";
  });
  out += '<line x1="' + L + '" y1="' + (TOP + ih) + '" x2="' + (W - R) + '" y2="' + (TOP + ih) + '" stroke="var(--axis-ink)"/>';
  // crosshair
  out += '<line id="dc-cross" x1="0" x2="0" y1="' + TOP + '" y2="' + (TOP + ih) + '" stroke="var(--axis-ink)" stroke-dasharray="3 3" visibility="hidden"/>';
  out += '<rect id="dc-hit" x="' + L + '" y="' + TOP + '" width="' + iw + '" height="' + ih + '" fill="transparent"/>';

  var legend =
    '<g font-size="11" fill="var(--ink-2)">' +
    '<line x1="' + (L + 6) + '" y1="' + (TOP + 4) + '" x2="' + (L + 26) + '" y2="' + (TOP + 4) + '" stroke="var(--brand)" stroke-width="2.5"/>' +
    '<text x="' + (L + 32) + '" y="' + (TOP + 8) + '">' + esc(t().demand) + " (MW)</text>" +
    '<rect x="' + (L + 130) + '" y="' + (TOP - 2) + '" width="14" height="10" fill="var(--s-solar)" opacity="0.35"/>' +
    '<text x="' + (L + 150) + '" y="' + (TOP + 8) + '">' + esc(t().solarOut) + "</text></g>";

  host.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(t().demandAria) + '">' + out + legend + "</svg>";

  var svg = host.firstChild, cross = $("#dc-cross", host), hit = $("#dc-hit", host);
  function move(e) {
    var rect = svg.getBoundingClientRect();
    var pt = e.touches ? e.touches[0] : e;
    var fx = (pt.clientX - rect.left) / rect.width * W;
    var h = Math.max(0, Math.min(23, (fx - L) / iw * 23));
    var hh = Math.round(h * 2) / 2;
    cross.setAttribute("x1", X(hh)); cross.setAttribute("x2", X(hh));
    cross.setAttribute("visibility", "visible");
    var hr = Math.floor(hh), mn = hh % 1 ? "30" : "00";
    showTip("<strong>" + hr + ":" + mn + "</strong><br>" +
      esc(t().demand) + ": " + demandAt(hh).toFixed(1) + " MW<br>" +
      esc(t().solarOut) + ": " + solarAt(hh).toFixed(1) + " MW", pt.clientX, pt.clientY);
  }
  function leave() { cross.setAttribute("visibility", "hidden"); hideTip(); }
  hit.addEventListener("mousemove", move);
  hit.addEventListener("mouseleave", leave);
  hit.addEventListener("touchstart", move, { passive: true });
  hit.addEventListener("touchmove", move, { passive: true });
  hit.addEventListener("touchend", leave);
}

/* ---------------- island map ---------------- */

/* The real island: traced from the official "Roatan Island Outline.svg"
   (18 subpaths: main island, Helene, Barbareta and the cays), minified to
   0.1px precision. ViewBox 0 0 1025 394. */
var MAP_W = 1025, MAP_H = 394;
var ISLAND_D = "M 0 378.2 L 0 361.5 L 2.7 356.6 C 6.3 350 7.8 342.7 9.1 326.5 C 10 316.4 10 312.9 9.2 312.1 C 7.6 310.5 7.9 309.9 10.2 310 C 13 310.1 13.7 306.1 11 305.4 C 8.1 304.6 8 302.6 10.8 299.5 L 13.3 296.6 L 14.8 299 C 15.6 300.4 17 302.5 17.7 303.8 C 20.3 308 21 305.1 19.5 297.5 C 17.8 289.6 18.4 287.7 22.5 288.1 C 24.5 288.3 24.9 288 24.8 286.3 C 24.7 282.3 27.7 284.9 28.6 289.6 C 29.3 293 29.9 293.1 33.4 290.1 C 36.8 287.2 36.9 286.4 34 284.1 C 31.3 282 31 280.6 33.2 280.6 C 34.1 280.6 35.9 279.6 37.3 278.2 C 39.6 276 42.9 273.5 53.1 266.2 C 55.5 264.4 59.6 260.9 62.2 258.5 C 77.1 244.1 89.5 234.9 102.7 228.4 C 105.1 227.2 109.4 224.5 112.3 222.6 C 118.5 218.1 123.4 216.9 126.9 218.7 C 129.7 220.1 131.9 219.6 132.6 217.3 C 132.9 216.5 133.9 214.9 134.9 213.9 C 136.3 212.3 137.4 212.1 140 212.5 C 142.6 212.9 144.5 212.4 149.4 209.9 C 152.8 208.2 156 206 156.5 204.8 C 157.8 202.3 159.4 202.2 159.4 204.6 C 159.4 205.6 159.9 206.4 160.6 206.4 C 161.3 206.4 163.4 207.6 165.2 209.1 C 168.9 212.1 170.2 212 170.2 208.7 C 170.2 207.6 171 205.7 171.9 204.5 C 175.1 200.4 175.9 198.2 174.8 196.9 C 173.9 195.9 174.5 195.3 177.5 193.7 C 179.6 192.7 181.5 192 181.7 192.2 C 181.9 192.5 181.5 194 180.6 195.5 C 179.3 198.2 179.3 198.5 180.7 200.1 C 182.8 202.4 184.9 202.3 190 199.6 C 192.3 198.4 194.8 197.4 195.5 197.4 C 196.2 197.4 198.6 196.3 200.7 195 C 202.9 193.8 206.3 192.2 208.4 191.4 C 210.4 190.7 212.9 189.1 213.8 187.9 C 214.8 186.7 216.1 185.9 216.8 186.1 C 217.5 186.4 218.9 186.2 219.9 185.7 C 221.9 184.6 224 179.6 222.7 178.8 C 221.2 177.8 221.8 175.7 224.1 174.2 C 227.4 172 233.7 172.2 237 174.6 C 240.6 177.1 242.8 177 247.5 174.3 C 249.6 173.1 253.1 171.4 255.4 170.5 C 257.6 169.7 261.5 167.6 264 166 C 266.4 164.4 269.5 162.8 270.7 162.5 C 273.2 161.9 279.3 157.7 287 151.4 C 290.3 148.8 292.6 147.6 294.5 147.6 C 296 147.6 297.7 146.9 298.3 146.1 C 299.3 144.8 299.7 144.9 302.2 147 C 303.9 148.5 306.1 149.4 307.8 149.4 C 309.5 149.4 312 150.3 313.7 151.7 C 317.3 154.4 317.3 154.4 334.6 148.7 C 344.3 145.6 344.7 145.4 346.4 141.8 C 348.5 137.2 348.6 137.2 356 134.9 C 362.2 133 364.2 131.3 368.8 124.1 C 370.2 121.9 372 120.6 374.8 119.7 C 378.8 118.3 379.2 118.4 385 120.8 C 386.3 121.3 387.1 120.5 389 116.4 C 391.7 110.6 394 109.6 403.3 109.5 C 410.9 109.5 417.5 104.9 417.8 99.2 C 417.9 98.1 419.6 96.4 422.4 94.7 C 424.9 93.1 428.3 90.6 429.8 88.9 C 431.4 87.3 433.1 86 433.7 86 C 435.2 86 434.8 88 432.7 90.2 L 430.8 92.2 L 434.3 93.2 C 436.2 93.8 439.2 94.2 441 94 C 443.8 93.7 444.4 93.2 446.2 89.4 C 448.4 84.9 452.6 81.5 456 81.5 C 457.1 81.5 459.4 80.9 461.2 80.1 C 463 79.4 465.7 78.8 467.2 78.8 C 468.8 78.8 471.5 78 473.4 77.1 C 475.2 76.1 477.8 75.1 479.1 74.8 C 480.5 74.5 484 72.4 487.1 70.1 C 490.3 67.6 495 65.1 498.3 64.1 C 505.4 61.9 519.1 58.8 521.8 58.8 C 523.1 58.8 525.3 57.4 527.5 55.2 C 529.4 53.2 531.5 51.6 532.1 51.6 C 532.8 51.6 533.9 52.8 534.7 54.3 C 537.5 59.8 542.3 61.2 545.2 57.5 C 546.2 56.3 548.3 55 550 54.7 C 552.2 54.3 553.2 53.5 554 51.4 C 554.9 48.8 555.2 48.7 558.4 49.4 C 560.3 49.8 565.3 50.1 569.6 49.9 C 576.3 49.7 577.5 49.4 579.1 47.6 C 581.4 44.9 582.9 44.5 586.6 45.5 C 590.2 46.5 598.2 45 604 42.3 C 611.1 39 611.9 38.7 612.8 39.2 C 613.3 39.5 613.6 39.2 613.6 38.4 C 613.6 37.7 613.3 37.1 612.9 37.1 C 612.5 37.1 612.1 36.1 612.1 34.8 C 612.1 31.9 614.3 31.9 619.5 34.8 C 624.5 37.7 626.4 37.7 629.4 34.7 C 632.2 32.1 635.7 31.7 660.1 31.3 C 666.8 31.2 677.6 30.4 684.1 29.6 C 699.1 27.6 706.3 28.2 710.8 31.8 C 712.6 33.2 716.8 35.6 720.3 37.2 C 726 39.8 727.5 40.1 734.5 40.1 C 739.3 40 745.8 39.1 751.7 37.8 C 760.5 35.7 762.1 35.6 778 36.1 C 793.7 36.6 795 36.8 797 38.6 C 798.5 40 799.8 40.4 801.5 40.1 C 802.8 39.9 805.1 40.3 806.6 41.1 C 810.5 43.1 812.3 42.9 817.4 40.2 C 820.7 38.4 822.6 38 825.3 38.3 C 830.5 39 860 33.3 865 30.6 C 866 30.1 866.6 30.1 866.6 30.8 C 866.6 31.3 868.6 32.7 871.1 33.8 C 874.4 35.3 876.2 36.8 878.3 40.1 C 879.8 42.5 881.1 44.6 881.1 44.8 C 881.1 45 880.1 45.9 878.9 46.6 C 876.9 48 876.3 47.9 871.4 45.9 C 868.5 44.6 863.2 43.4 859.7 43 L 853.3 42.4 L 847 49.1 C 841.3 55.3 840.5 55.9 837.9 55.5 C 835.6 55.1 834.6 55.5 832.9 57.4 C 831.7 58.7 829.4 61.2 827.6 63 C 825.9 64.7 824.1 66.6 823.6 67.1 C 818.9 72.2 816 74.4 811.7 76 C 803.1 79.2 802.7 79.1 802.6 73.4 C 802.5 70.5 801.7 66.8 800.5 64.3 C 798.7 60.5 797.7 59.6 792 56.8 C 782.4 52.1 777.2 51.1 772 52.9 C 769.4 53.8 764.7 54.3 759.8 54.3 C 752.7 54.3 751.3 54.6 746.4 57.1 L 741 59.9 L 733.4 58.8 C 728.9 58.2 723.8 56.9 721.1 55.5 C 718.4 54.2 715.6 53.5 714.7 53.8 C 712.1 54.6 708.6 58.7 705.4 64.6 C 703.9 67.5 702 70.8 701.2 72 C 699.9 73.9 700 74.2 701.7 75.1 C 704.1 76.4 704.1 77.8 701.8 77.8 C 700.8 77.8 698.4 76.2 696.4 74.3 C 693.6 71.5 691.9 70.6 688.5 70.1 C 686.1 69.7 682.6 68.7 680.8 67.8 C 677.1 65.9 674.3 65.5 662.2 64.7 L 653.8 64.2 L 650.2 67.5 L 646.6 70.8 L 647.1 76.1 C 647.6 80.4 647.4 81.5 646.4 81.5 C 645.7 81.5 642.7 82.6 639.8 84.1 C 635.3 86.3 634 86.5 631.3 85.8 C 623.5 83.9 620.5 83.9 618 85.9 C 615.9 87.5 614.8 87.7 610.7 87.2 C 606.2 86.7 605.8 86.8 605.4 88.8 C 600.3 111.9 600.5 111.5 591.2 112.5 C 568.4 114.9 567.8 114.7 567.8 107.3 C 567.8 103.9 567 100.7 565.1 96.6 C 562.5 90.7 562.5 90.7 563.9 85.1 C 564.6 82.1 565.1 79.4 564.8 79.1 C 563.9 78.2 560.3 81.9 558.2 86.2 C 556.2 90.1 556.1 90.7 557.2 92.6 C 557.9 93.7 558.8 98.1 559.1 102.3 C 559.6 109.1 559.9 110.2 561.9 111.6 C 563.1 112.6 564.1 113.9 564.1 114.6 C 564.1 116.2 563.7 116.2 560 114.4 C 557.4 113.2 556.9 112.5 556.9 109.9 C 556.9 105.6 554.7 105.9 552.4 110.4 C 551 113.2 549.9 114.1 547.6 114.5 C 537.9 116.1 533 116.7 532.2 116.2 C 531.7 115.9 531.6 113.9 532 111.7 C 532.4 108.4 532.2 107.2 530.6 104.9 C 527.7 100.9 526.8 103 527.5 111.8 L 528.1 119 L 521.4 122.5 C 517.8 124.4 514.1 126.4 513.3 127 C 512.2 127.7 511.3 127.6 509.6 126.5 C 507.4 125.1 506.2 120.7 506.2 114 C 506.2 111.3 503.9 108.3 502.4 109.2 C 502 109.4 501.6 111.4 501.6 113.5 C 501.7 118.8 500.7 123.8 499.5 124.7 C 498.4 125.6 487.4 130.4 486.5 130.4 C 486.3 130.4 486.3 129.2 486.6 127.7 C 486.9 126.2 486.7 124.7 486.2 124.4 C 485.6 124.1 485.4 122.9 485.7 121.7 C 486.1 120.1 485.8 119.5 484.4 119 C 483.4 118.7 482.6 118 482.6 117.4 C 482.5 116.8 482.2 117.2 481.7 118.4 C 480.5 121.3 477.5 121 475.8 117.7 C 475.1 116.2 474 115 473.6 115 C 472.4 115 472.4 119.2 473.7 121.5 C 474.5 123.1 474.4 123.6 473.1 124.6 C 471.6 125.7 471.7 125.9 474.4 126.4 C 476.5 126.8 477.6 127.7 478.5 129.8 C 479.1 131.4 480.5 133.4 481.6 134.3 C 482.7 135.3 483.5 136.4 483.5 136.8 C 483.5 138 478.4 140.3 475.7 140.3 C 472.1 140.4 469.9 142.3 470.6 144.7 C 471.3 147.5 468.3 147.3 467.2 144.4 C 466.8 143.1 464.7 139.9 462.7 137.1 C 459.5 132.8 458.8 132.3 457.3 133.1 C 452.7 135.5 452.6 140.4 456.9 146.6 L 460.1 151.3 L 456.9 157.1 C 455.1 160.3 453.2 163.1 452.7 163.4 C 452.2 163.7 451.8 164.7 451.8 165.5 C 451.8 167.5 446.4 172.9 444.3 172.9 C 442.2 172.9 439.1 171.1 437.1 168.6 C 436.2 167.5 435 166.6 434.5 166.6 C 433.9 166.6 433 166 432.5 165.2 C 431.7 164.2 430.6 164 427.5 164.5 C 422.8 165.4 422.3 166.7 426.3 167.9 C 427.9 168.4 429.2 169.2 429.2 169.7 C 429.2 171.3 421.4 173.6 414.5 174.2 L 408.4 174.6 L 408.9 172.1 C 409.3 170.4 409 169.2 407.9 168.3 C 406.6 167.3 406.2 167.3 405.9 168.2 C 405.7 168.8 404.5 169.3 403.3 169.3 C 400.7 169.3 400.3 172.5 402.7 174.3 C 404.1 175.3 404.1 175.7 402.6 179.5 C 400.5 185.1 398.3 186.8 393.7 186.6 C 388.5 186.4 387.7 185.3 390.2 181.9 C 392.9 178.2 393.5 174 391.8 169.9 C 390.3 166.3 387.8 165.5 385.7 167.9 C 384.8 169.1 384.9 169.6 386.1 171 C 387.7 172.7 387.4 176.6 385.5 179 C 385 179.6 384.8 182 385 184.2 C 385.3 188.3 385.3 188.3 382.5 188.3 C 380.9 188.3 377.2 189.1 374.1 190.1 C 368.6 191.8 360.1 191.8 359 190 C 358.7 189.6 358.9 187.7 359.4 185.8 C 360.5 182.1 359.4 179.9 357.5 181.8 C 356.7 182.6 356.1 182.5 354.8 181.4 C 353.3 180 353.1 180 352.6 182.8 C 352.3 184.4 351.8 185.4 351.5 185.2 C 351.3 184.9 350.5 185.1 349.8 185.7 C 349.2 186.3 347.3 187.4 345.7 188.2 C 343.6 189.2 342.7 190.3 342.7 191.8 C 342.7 193.4 342.1 194.2 340.5 194.7 C 339.2 195 336.4 195.8 334.1 196.5 C 331.9 197.1 327.9 198.6 325.4 199.7 C 319.7 202.3 320 202.3 319.4 200.1 C 318.9 198.3 318.8 198.3 315.4 199.7 C 310 201.9 308.8 203.4 310 206 L 311 208.1 L 312.7 204.9 C 314.5 201.5 315.5 201.7 316.5 205.7 C 317.2 208.5 314.9 210.4 309.7 211.3 C 307.9 211.6 305.8 212.7 304.9 213.6 C 303 215.8 301.3 216 299.6 214 C 298.6 212.8 298.7 212.1 300 209.8 C 301.2 207.8 301.3 206.7 300.6 206.1 C 299.9 205.4 297 207.8 290.3 214.6 C 285.2 219.8 279.8 224.7 278.4 225.4 C 277 226.2 273.2 229.3 270.1 232.5 C 263.6 238.9 262.4 239.5 253.3 240.9 C 249.7 241.5 246 242.3 245.2 242.7 C 243.6 243.5 241.7 248.8 242.4 250.1 C 242.9 251.1 247 250.9 247.6 249.9 C 248.4 248.6 250.6 249.8 251.1 251.8 C 251.4 252.9 251.1 253.8 250.3 254.1 C 249.6 254.3 248.4 256.7 247.7 259.2 C 245.5 266.6 242.4 270.5 238.4 271.1 C 236.5 271.4 234 271.8 232.7 272 C 231.5 272.2 229.8 272.6 228.9 273 C 227.8 273.4 227 272.8 226 270.8 C 225.2 269.2 224.1 268 223.7 268 C 222.5 268 224.6 273.6 226.3 275 C 227.5 275.9 227.4 276.1 225.5 276.1 C 224.2 276.1 222.7 275.8 222.1 275.4 C 220.5 274.4 219 269 220.1 268.4 C 220.6 268.1 220.3 266.7 219.5 265.1 C 218.2 262.5 218.2 262 219.6 258.3 C 221.5 253.4 220.8 252.4 217.5 255.5 C 216.2 256.7 213.9 258.5 212.6 259.4 C 210.5 260.7 210.1 261.6 210.1 264.7 L 210.1 268.5 L 205.3 269.4 C 201.1 270.1 200.4 270.6 199.2 273.3 C 197.9 276.3 197.9 276.3 192.7 275.9 C 188.3 275.6 187.4 275.8 187 277.1 C 186.7 278 185.1 278.9 183.4 279.2 C 181.7 279.5 175.9 282 170.5 284.6 C 155 292.2 143.9 296.4 143 295 C 142.6 294.4 142.5 293.5 142.8 293.1 C 143.4 292 140.4 288.8 138.8 288.8 C 138.1 288.8 136.4 289.6 135.2 290.6 C 132.2 293 129 292.9 127.3 290.5 C 126.1 288.8 125.5 288.6 123 289.3 C 121.3 289.8 119.6 291.1 119.1 292.2 C 118 294.7 117 294.7 114.4 292.3 C 112.4 290.4 112.2 290.4 109.2 291.8 C 107.5 292.6 105.7 293.3 105.2 293.3 C 103.6 293.3 97.8 300.8 94.9 306.7 C 92.8 311 89.7 314.7 82 322.1 C 76.5 327.4 70 333 67.5 334.6 C 64.5 336.4 62.4 338.5 61.3 340.7 C 60.4 342.6 58.7 344.5 57.5 344.9 C 56.2 345.4 55 346.4 54.7 347.2 C 54.4 347.9 52.1 350.2 49.6 352.2 C 46.3 354.8 44.2 355.8 42 355.8 C 38.6 355.8 38.5 355.9 40.1 358.6 C 41.1 360.3 40.8 360.8 37.6 363.3 C 35.7 364.9 30.4 369.5 25.9 373.5 C 19.2 379.4 6.7 389.8 1.1 394.1 C 0.2 394.7 0 391.5 0 378.2 Z M 131.7 301.2 C 131.1 299.5 133.5 295.1 135 295.1 C 137.1 295.1 136.9 298.1 134.6 300.3 C 132.6 302.4 132.2 302.5 131.7 301.2 Z M 55.5 259.3 C 55.2 258.5 55.5 257.5 56.2 257 C 57.5 256.3 59.1 258.6 58.2 260 C 57.6 261.2 56.1 260.8 55.5 259.3 Z M 264.2 245.6 C 264.9 245.4 265.7 245.4 266 245.7 C 266.3 246 265.7 246.2 264.8 246.2 C 263.7 246.1 263.5 245.9 264.2 245.6 Z M 274.4 234.6 C 274.4 233.8 280.1 228.1 281 228.1 C 282.4 228.1 281.5 231.6 279.5 233.4 C 277.5 235.3 274.4 236.1 274.4 234.6 Z M 292.5 217.7 C 293.7 216.2 296.1 215.9 296.1 217.2 C 296.1 218 294 219.1 292.3 219.1 C 291.7 219.1 291.8 218.5 292.5 217.7 Z M 331.4 207.3 C 331.4 205.3 333.7 204.8 334.4 206.8 C 335 208.3 334.3 209.1 332.6 209.1 C 332 209.1 331.4 208.3 331.4 207.3 Z M 161.6 199.2 C 161.9 198.7 162.4 198.3 162.6 198.3 C 162.8 198.3 163 198.7 163 199.2 C 163 199.7 162.6 200.1 162 200.1 C 161.5 200.1 161.3 199.7 161.6 199.2 Z M 346.5 194.9 C 344.2 194.3 345 191.8 348 190.1 C 350.3 188.8 350.6 188.9 351.8 190.5 C 353.6 192.9 353.5 193.7 351.3 193.7 C 350.3 193.7 349.5 194.1 349.5 194.6 C 349.5 195.6 349.2 195.6 346.5 194.9 Z M 535 119.5 L 532.9 117.7 L 534.9 117.7 C 538.9 117.6 541.2 119.6 538.4 120.7 C 537.6 121 536.1 120.4 535 119.5 Z M 675.5 92.2 C 673.8 90.8 671.7 89.6 670.9 89.6 C 669.1 89.6 667.8 87 669.1 85.7 C 669.6 85.2 671.5 86 674.4 88.1 C 679.2 91.6 680.8 92.1 682.6 90.4 C 683.8 89.1 685 89.9 684.1 91.4 C 683.8 91.9 682.4 92.9 681.1 93.6 C 678.8 94.8 678.4 94.7 675.5 92.2 Z M 847.1 69.3 C 845.6 67.8 844.8 66.1 844.8 64 L 844.8 60.9 L 856.8 60.3 C 863.4 60 870.3 59.5 872 59.2 C 874.9 58.8 874.7 59 868.9 62.9 C 865.4 65.2 861.5 67.3 860.3 67.6 C 859 67.9 857 68.9 855.8 69.8 C 852.8 72.1 849.7 71.9 847.1 69.3 Z M 723 68.8 C 722.4 67.7 724.1 65.2 725.4 65.2 C 726.7 65.2 726.4 67.6 724.9 68.7 C 724 69.5 723.5 69.5 723 68.8 Z M 727.1 63.6 C 727.2 63.2 728.2 62.2 729.5 61.2 C 731.2 60 732.1 59.8 732.8 60.5 C 733.4 61.2 733.5 61.8 733 62.3 C 731.8 63.4 727.1 64.4 727.1 63.6 Z M 879.4 47.8 C 879.9 46.4 881.9 46.2 882 47.5 C 882 48 881.4 48.6 880.5 48.7 C 879.6 48.9 879.2 48.6 879.4 47.8 Z M 890.6 35.7 C 888.9 35 886.3 34.7 883.9 35 C 879.6 35.6 877.8 34.3 879.3 31.6 C 879.8 30.7 880.2 28.6 880.2 26.9 C 880.2 24.1 880.7 23.4 884.5 21 C 890.5 17.1 893.3 16.5 894.6 18.9 C 895.6 20.8 895.9 33.3 895 35.7 C 894.3 37.4 894.1 37.4 890.6 35.7 Z M 892.3 31.7 C 892.6 31.3 890.8 30.2 888.2 29.4 C 884 28 883.5 28 882.2 29.3 C 880.5 30.9 881.1 31.3 886 32 C 891 32.6 891.8 32.6 892.3 31.7 Z M 930.6 33.1 C 928.5 31.5 928.6 29.4 931.2 23.8 C 932.9 20.3 934.9 18.1 939.3 14.8 C 942.5 12.4 945.9 9.3 946.8 8 C 947.7 6.7 949.6 4.9 951 4.1 C 957.1 0.5 961.8 0 994 0 C 1011.1 0 1025 0.3 1025 0.7 C 1025 2.4 1008.1 16.3 993.2 26.9 C 988 30.6 985.2 31.7 985.2 30 C 985.2 29.5 983.3 27.1 981 24.6 C 976.1 19 971.6 17.3 966.4 18.8 C 964.5 19.3 961.3 20 959.2 20.4 C 957.1 20.7 954.4 21.7 953.3 22.5 C 950.1 25 934 34.4 933 34.4 C 932.6 34.3 931.5 33.8 930.6 33.1 Z";

function zoneAreasSvg() {
  var out = '<g id="zone-areas">';
  ZONES.forEach(function (z) {
    var pts = ZONE_AREAS[z.id];
    if (!pts) return;
    var fill, op, extra = "";
    if (z.status === "out") { fill = "var(--danger)"; op = ".30"; extra = '<animate attributeName="fill-opacity" values=".2;.4;.2" dur="2.4s" repeatCount="indefinite"/>'; }
    else if (z.status === "planned") { fill = "var(--warn)"; op = ".28"; }
    else { fill = "var(--brand)"; op = ".10"; }
    out += '<polygon class="z-area' + (z.status === "ok" ? " z-area-ok" : "") + '" data-zone="' + z.id + '" points="' +
      pts.map(function (p) { return p.join(","); }).join(" ") +
      '" fill="' + fill + '" fill-opacity="' + op + '" stroke="' + fill + '" stroke-opacity=".55" stroke-width="1">' + extra + "</polygon>";
  });
  return out + "</g>";
}

var mapView = { x: 0, y: 0, w: MAP_W, h: MAP_H };
var mapSvg = null;

function mapApplyView() {
  if (!mapSvg) return;
  mapSvg.setAttribute("viewBox", mapView.x + " " + mapView.y + " " + mapView.w + " " + mapView.h);
  var s = Math.max(0.32, mapView.w / MAP_W);
  $all(".zone-dot", mapSvg).forEach(function (g) {
    var r0 = +(g.dataset.r || 8), fs0 = +(g.dataset.fs || 13);
    var c = g.querySelector("circle.z-dot");
    if (c) { c.setAttribute("r", r0 * Math.max(s, 0.4)); c.setAttribute("stroke-width", 2 * Math.max(s, 0.5)); }
    var txt = g.querySelector("text");
    if (txt) txt.setAttribute("font-size", fs0 * Math.max(s, 0.5));
  });
  $all("#lm-layer text", mapSvg).forEach(function (txt) {
    txt.setAttribute("font-size", 10 * Math.max(s, 0.45));
  });
  var sea = $("#map-sea-label", mapSvg);
  if (sea) sea.setAttribute("opacity", mapView.w / MAP_W > 0.85 ? "1" : "0");
  // landmarks + minor communities fade in as you zoom
  var zoomedIn = mapView.w / MAP_W <= 0.62;
  var lm = $("#lm-layer", mapSvg);
  if (lm) lm.setAttribute("opacity", zoomedIn ? "1" : "0");
  $all(".zone-dot.z-minor", mapSvg).forEach(function (g) {
    var st = zoneById(g.dataset.zone).status;
    g.setAttribute("opacity", zoomedIn || st !== "ok" ? "1" : "0");
  });
  $all(".z-area-ok", mapSvg).forEach(function (poly) {
    poly.setAttribute("opacity", zoomedIn ? "1" : "0");
  });
}

function mapZoomTo(cx, cy, w, animate) {
  var maxW = MAP_W, minW = MAP_W / 6;
  w = Math.max(minW, Math.min(maxW, w));
  var h = w * MAP_H / MAP_W;
  var tx = Math.max(-40, Math.min(MAP_W + 40 - w, cx - w / 2));
  var ty = Math.max(-40, Math.min(MAP_H + 40 - h, cy - h / 2));
  if (!animate || REDUCE_MOTION) {
    mapView = { x: tx, y: ty, w: w, h: h };
    mapApplyView();
    return;
  }
  var from = { x: mapView.x, y: mapView.y, w: mapView.w, h: mapView.h };
  var t0 = null;
  function frame(ts) {
    if (!t0) t0 = ts;
    var p = Math.min(1, (ts - t0) / 420);
    var e = 1 - Math.pow(1 - p, 3);
    mapView = {
      x: from.x + (tx - from.x) * e, y: from.y + (ty - from.y) * e,
      w: from.w + (w - from.w) * e, h: from.h + (h - from.h) * e
    };
    mapApplyView();
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function mapFlyToZone(id) {
  var z = zoneById(id);
  if (!z) return;
  mapZoomTo(z.x, z.y, MAP_W / 3.2, true);
  var dot = document.querySelector('.zone-dot[data-zone="' + id + '"] circle.z-dot');
  if (dot) {
    dot.classList.remove("z-focus");
    void dot.getBoundingClientRect();
    dot.classList.add("z-focus");
  }
}

function renderMap() {
  var host = $("#island-map");
  if (!host) return;
  var statusColor = { ok: "var(--ok)", planned: "var(--warn)", out: "var(--danger)" };
  var dots = ZONES.map(function (z) {
    var above = z.lbl === "t";
    var minor = !!z.minor;
    var fs = minor ? 10.5 : 13, r0 = minor ? 5.5 : 8, off = minor ? [12, 20] : [15, 25];
    var anchor = z.x > 900 ? "end" : (z.x < 45 ? "start" : "middle");
    var lx = anchor === "end" ? z.x + 12 : (anchor === "start" ? z.x - 12 : z.x);
    var label = '<text x="' + lx + '" y="' + (above ? z.y - off[0] : z.y + off[1]) + '" text-anchor="' + anchor + '" font-size="' + fs + '" font-weight="600" fill="var(--ink-2)" paint-order="stroke" stroke="var(--card)" stroke-width="3" stroke-linejoin="round">' + esc(z[LANG]) + "</text>";
    var ring = z.status === "out" ? '<circle cx="' + z.x + '" cy="' + z.y + '" r="12" fill="none" stroke="var(--danger)" opacity="0.5"><animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite"/></circle>' : "";
    return '<g class="zone-dot' + (minor ? " z-minor" : "") + '" tabindex="0" role="button" data-zone="' + z.id + '" data-r="' + r0 + '" data-fs="' + fs + '" aria-label="' + esc(z[LANG]) + ": " + esc(t().zoneStatus[z.status]) + '">' +
      ring +
      '<circle class="z-dot" cx="' + z.x + '" cy="' + z.y + '" r="' + r0 + '" fill="' + statusColor[z.status] + '" stroke="var(--card)" stroke-width="2"/>' +
      label + "</g>";
  }).join("");

  var lms = LANDMARKS.map(function (m) {
    var d = "M " + m.x + " " + (m.y - 5.5) + " L " + (m.x + 5.5) + " " + m.y + " L " + m.x + " " + (m.y + 5.5) + " L " + (m.x - 5.5) + " " + m.y + " Z";
    return '<g class="landmark" data-lm="' + m.id + '">' +
      '<path d="' + d + '" fill="var(--deep)" stroke="var(--card)" stroke-width="1.5"/>' +
      '<text x="' + m.x + '" y="' + (m.y + m.dy) + '" text-anchor="middle" font-size="10" fill="var(--ink-2)" paint-order="stroke" stroke="var(--card)" stroke-width="3" stroke-linejoin="round">' + esc(m[LANG]) + "</text></g>";
  }).join("");

  host.innerHTML =
    '<svg viewBox="0 0 ' + MAP_W + " " + MAP_H + '" class="roatan-svg" role="application" aria-label="Roatán outage map. Use the plus and minus buttons to zoom.">' +
    '<path d="' + ISLAND_D + '" fill="color-mix(in srgb, var(--brand) 22%, var(--card))" stroke="var(--brand)" stroke-opacity="0.5" stroke-width="1"/>' +
    '<text id="map-sea-label" x="620" y="330" font-size="15" fill="var(--axis-ink)" letter-spacing="3" opacity="1">MAR CARIBE · CARIBBEAN SEA</text>' +
    zoneAreasSvg() +
    '<g id="lm-layer" opacity="0">' + lms + "</g>" +
    dots + "</svg>" +
    '<div class="map-zoom" role="group" aria-label="Zoom">' +
    '<button type="button" data-mz="in" aria-label="Zoom in">+</button>' +
    '<button type="button" data-mz="out" aria-label="Zoom out">−</button>' +
    '<button type="button" data-mz="reset" aria-label="Reset view">⌂</button></div>';

  mapSvg = host.querySelector("svg");
  mapApplyView();

  /* zoom buttons */
  $all("[data-mz]", host).forEach(function (b) {
    b.addEventListener("click", function () {
      var cx = mapView.x + mapView.w / 2, cy = mapView.y + mapView.h / 2;
      if (b.dataset.mz === "in") mapZoomTo(cx, cy, mapView.w / 1.6, true);
      else if (b.dataset.mz === "out") mapZoomTo(cx, cy, mapView.w * 1.6, true);
      else mapZoomTo(MAP_W / 2, MAP_H / 2, MAP_W, true);
    });
  });

  /* wheel zoom centered on cursor */
  mapSvg.addEventListener("wheel", function (e) {
    e.preventDefault();
    var r = mapSvg.getBoundingClientRect();
    var fx = mapView.x + (e.clientX - r.left) / r.width * mapView.w;
    var fy = mapView.y + (e.clientY - r.top) / r.height * mapView.h;
    var k = e.deltaY > 0 ? 1.25 : 0.8;
    var w = Math.max(MAP_W / 6, Math.min(MAP_W, mapView.w * k));
    var ratio = w / mapView.w;
    mapView = { x: fx - (fx - mapView.x) * ratio, y: fy - (fy - mapView.y) * ratio, w: w, h: w * MAP_H / MAP_W };
    mapApplyView();
  }, { passive: false });

  /* drag pan + pinch zoom */
  var pointers = {};
  var panStart = null, pinchStart = null;
  mapSvg.addEventListener("pointerdown", function (e) {
    pointers[e.pointerId] = e;
    mapSvg.setPointerCapture(e.pointerId);
    var keys = Object.keys(pointers);
    if (keys.length === 1) {
      panStart = { px: e.clientX, py: e.clientY, vx: mapView.x, vy: mapView.y };
    } else if (keys.length === 2) {
      var a = pointers[keys[0]], b = pointers[keys[1]];
      pinchStart = { d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), w: mapView.w, cx: mapView.x + mapView.w / 2, cy: mapView.y + mapView.h / 2 };
      panStart = null;
    }
  });
  mapSvg.addEventListener("pointermove", function (e) {
    if (!pointers[e.pointerId]) return;
    pointers[e.pointerId] = e;
    var keys = Object.keys(pointers);
    var r = mapSvg.getBoundingClientRect();
    if (keys.length === 2 && pinchStart) {
      var a = pointers[keys[0]], b = pointers[keys[1]];
      var d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      if (d > 0) mapZoomTo(pinchStart.cx, pinchStart.cy, pinchStart.w * pinchStart.d / d, false);
    } else if (panStart) {
      var dx = (e.clientX - panStart.px) / r.width * mapView.w;
      var dy = (e.clientY - panStart.py) / r.height * mapView.h;
      mapView.x = panStart.vx - dx;
      mapView.y = panStart.vy - dy;
      mapApplyView();
    }
  });
  function endPointer(e) {
    delete pointers[e.pointerId];
    if (Object.keys(pointers).length < 2) pinchStart = null;
    if (Object.keys(pointers).length < 1) panStart = null;
  }
  mapSvg.addEventListener("pointerup", endPointer);
  mapSvg.addEventListener("pointercancel", endPointer);
  mapSvg.addEventListener("dblclick", function (e) {
    var r = mapSvg.getBoundingClientRect();
    var fx = mapView.x + (e.clientX - r.left) / r.width * mapView.w;
    var fy = mapView.y + (e.clientY - r.top) / r.height * mapView.h;
    mapZoomTo(fx, fy, mapView.w / 2, true);
  });

  $all(".zone-dot", host).forEach(function (dot) {
    var z = zoneById(dot.dataset.zone);
    function tip(e) {
      var ev = null;
      for (var i = 0; i < EVENTS.length; i++) if (EVENTS[i].zone === z.id && EVENTS[i].type !== "restored") ev = EVENTS[i];
      var extra = ev ? "<br>" + esc(ev.cause[LANG]) + (ev.eta[LANG] ? "<br>" + esc(ev.eta[LANG]) : "") : "";
      var rel = REL90[z.id];
      if (rel) extra += '<br><span style="opacity:.75">' + esc(t().rel90(rel[0], rel[1])) + "</span>";
      var pt = e.touches ? e.touches[0] : (e.clientX != null ? e : null);
      var rect = dot.getBoundingClientRect();
      var x = pt ? pt.clientX : rect.left + rect.width / 2;
      var y = pt ? pt.clientY : rect.top;
      showTip("<strong>" + esc(z[LANG]) + "</strong> — " + esc(t().zoneStatus[z.status]) + extra, x, y);
    }
    dot.addEventListener("mousemove", tip);
    dot.addEventListener("mouseleave", hideTip);
    dot.addEventListener("focus", tip);
    dot.addEventListener("blur", hideTip);
    dot.addEventListener("click", function () { mapFlyToZone(z.id); });
    dot.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); mapFlyToZone(z.id); } });
  });

  $all(".z-area", host).forEach(function (poly) {
    var z = zoneById(poly.dataset.zone);
    poly.addEventListener("mousemove", function (e) {
      showTip("<strong>" + esc(z[LANG]) + "</strong> — " + esc(t().zoneStatus[z.status]), e.clientX, e.clientY);
    });
    poly.addEventListener("mouseleave", hideTip);
    poly.addEventListener("click", function () { mapFlyToZone(z.id); });
  });

  $all(".landmark", host).forEach(function (g) {
    var m = null;
    LANDMARKS.forEach(function (x) { if (x.id === g.dataset.lm) m = x; });
    g.addEventListener("mousemove", function (e) { showTip(esc(m[LANG]), e.clientX, e.clientY); });
    g.addEventListener("mouseleave", hideTip);
  });
}

function renderOutageList() {
  var host = $("#outage-list");
  if (!host) return;
  var tagFor = { out: ["out", t().activeOutage], planned: ["planned", t().plannedWork], restored: ["ok", t().restored] };
  host.innerHTML = EVENTS.map(function (ev) {
    var z = zoneById(ev.zone);
    var tag = tagFor[ev.type];
    var crew = "";
    if (ev.type === "out" && ev.stage != null) {
      var segs = "";
      for (var s = 0; s < 5; s++) segs += '<span class="crew-seg' + (s <= ev.stage ? " done" : "") + '"></span>';
      crew = '<div class="crew-bar" aria-hidden="true">' + segs + "</div>" +
        '<div class="oe-meta crew-line"><strong>' + esc(t().crewLabel) + esc(t().crew[ev.stage]) + "</strong> (" + (ev.stage + 1) + "/5)</div>";
    }
    return '<div class="outage-event" data-zone="' + ev.zone + '" role="button" tabindex="0"><div class="oe-head"><span class="key-dot ' + tag[0] + '"></span>' +
      esc(z[LANG]) + ' <span class="news-tag">' + esc(tag[1]) + "</span></div>" +
      '<div class="oe-meta">' + esc(ev.cause[LANG]) + "</div>" +
      '<div class="oe-meta">' + esc(ev.meta[LANG]) + "</div>" +
      crew +
      (ev.eta[LANG] ? '<div class="oe-eta">' + esc(ev.eta[LANG]) + "</div>" : "") +
      '<div class="oe-map-link">' + (LANG === "es" ? "Ver en el mapa →" : "Show on the map →") + "</div>" +
      "</div>";
  }).join("");
  $all(".outage-event", host).forEach(function (card) {
    function go() {
      mapFlyToZone(card.dataset.zone);
      var mc = document.querySelector(".map-card");
      if (mc && window.innerWidth < 961) mc.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    card.addEventListener("click", go);
    card.addEventListener("keydown", function (e) { if (e.key === "Enter") go(); });
  });
}

function fillZoneSelects() {
  ["rep-zone", "al-zone"].forEach(function (id) {
    var sel = document.getElementById(id);
    if (!sel) return;
    var prev = sel.value;
    sel.innerHTML = ZONES.map(function (z) {
      return '<option value="' + z.id + '">' + esc(z[LANG]) + "</option>";
    }).join("");
    if (prev) sel.value = prev;
  });
}

/* ---------------- news ---------------- */

var newsFilter = "all";
function newsCard(item) {
  var tagNames = {
    notice: { en: "Service notice", es: "Aviso de servicio" },
    rates: { en: "Rates", es: "Tarifas" },
    company: { en: "Company", es: "Empresa" }
  };
  var d = new Date(item.date + "T12:00:00");
  var dateStr = d.toLocaleDateString(LANG === "es" ? "es-HN" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  return '<article class="news-item card"><span class="news-tag">' + esc(tagNames[item.tag][LANG]) + "</span>" +
    "<time datetime='" + item.date + "'>" + esc(dateStr) + "</time>" +
    "<h3>" + esc(item.title[LANG]) + "</h3><p>" + esc(item.body[LANG]) + "</p></article>";
}
function renderNewsNow() {
  var host = $("#news-now");
  if (!host) return;
  var rows = "";
  EVENTS.forEach(function (ev) {
    if (ev.type === "restored") return;
    var z = zoneById(ev.zone);
    rows += '<a class="now-row ' + (ev.type === "out" ? "out" : "planned") + '" href="#/outages">' +
      "<strong>" + esc(z[LANG]) + "</strong><span>" + esc(ev.cause[LANG]) +
      (ev.eta[LANG] ? " · " + esc(ev.eta[LANG]) : "") + '</span><span class="now-go">' + esc(t().nowGo) + "</span></a>";
  });
  host.innerHTML = '<div class="news-now"><span class="now-label">' + esc(t().nowLabel) + "</span>" + rows + "</div>";
}

function renderNews() {
  var home = $("#home-news");
  if (home) home.innerHTML = NEWS.slice(0, 3).map(newsCard).join("");
  renderNewsNow();
  var list = $("#news-list");
  if (list) {
    var items = NEWS.filter(function (n) { return newsFilter === "all" || n.tag === newsFilter; });
    var tagNames = {
      notice: { en: "Service notice", es: "Aviso de servicio" },
      rates: { en: "Rates", es: "Tarifas" },
      company: { en: "Company", es: "Empresa" }
    };
    var html = "", lastMonth = "";
    items.forEach(function (item) {
      var d = new Date(item.date + "T12:00:00");
      var monthKey = d.toLocaleDateString(LANG === "es" ? "es-HN" : "en-US", { year: "numeric", month: "long" });
      if (monthKey !== lastMonth) {
        html += '<div class="tl-month">' + esc(monthKey) + "</div>";
        lastMonth = monthKey;
      }
      var dateStr = d.toLocaleDateString(LANG === "es" ? "es-HN" : "en-US", { month: "long", day: "numeric" });
      html += '<article class="tl-item"><span class="news-tag">' + esc(tagNames[item.tag][LANG]) + "</span>" +
        "<time datetime='" + item.date + "'>" + esc(dateStr) + "</time>" +
        "<h3>" + esc(item.title[LANG]) + "</h3><p>" + esc(item.body[LANG]) + "</p></article>";
    });
    list.innerHTML = html;
  }
}

/* ---------------- interactive bill doc ---------------- */

var BD_INFO = {
  month: {
    en: "L 8,809.49 is May's charges: 1,011 kWh of energy plus street lighting, the municipal tax and the regulator's fee — every line itemized below.",
    es: "L 8,809.49 son los cargos de mayo: 1,011 kWh de energía más alumbrado público, el impuesto municipal y la tasa del regulador — cada línea detallada abajo."
  },
  carried: {
    en: "L 8,705.39 was already owed before this bill arrived. The current bill never says this — it just quietly adds it into 'Total'. If paying it all at once is hard, 'Split it into payments' below exists for exactly this.",
    es: "L 8,705.39 ya se debían antes de que llegara esta factura. La factura actual nunca lo dice — solo lo suma al 'Total' sin explicar. Si pagarlo todo de una vez es difícil, 'Dividirlo en pagos' abajo existe exactamente para esto."
  }
};

function renderOdometers() {
  $all(".odometer").forEach(function (o) {
    if (o.dataset.done) return;
    var val = o.dataset.value, html = "";
    for (var i = 0; i < val.length; i++) {
      html += '<span class="odo-digit"><span class="odo-strip" data-d="' + val[i] + '" style="transition-delay:' + (200 + i * 140) + 'ms">' +
        "0123456789".split("").map(function (d) { return "<i>" + d + "</i>"; }).join("") +
        "</span></span>";
    }
    o.innerHTML = html;
    o.dataset.done = "1";
  });
}

function animateBillDoc() {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  $all("#bill-doc .odo-strip").forEach(function (strip) {
    var d = +strip.dataset.d;
    if (reduce) strip.style.transition = "none";
    strip.style.transform = "translateY(" + (-d * 1.5) + "em)";
  });
}

function setupBillDoc() {
  var doc = $("#bill-doc");
  if (!doc) return;
  function hl(k, on) {
    $all('#bill-doc [data-k="' + k + '"]').forEach(function (x) { x.classList.toggle("hot", on); });
  }
  $all("#bill-doc .bd-row, #bill-doc .bd-seg").forEach(function (el) {
    el.addEventListener("mouseenter", function () { hl(el.dataset.k, true); });
    el.addEventListener("mouseleave", function () { hl(el.dataset.k, false); });
  });
  $all("#bill-doc .bd-part").forEach(function (b) {
    b.addEventListener("click", function () {
      var info = $("#bd-info");
      var txt = BD_INFO[b.dataset.bdinfo];
      info.dataset.en = txt.en;
      info.dataset.es = txt.es;
      info.textContent = txt[LANG];
      $all("#bill-doc .bd-part").forEach(function (x) { x.classList.toggle("is-active", x === b); });
    });
  });
}

/* ---------------- calculator ---------------- */

function renderCalc() {
  var host = $("#calc-breakdown");
  if (!host) return;
  var kwh = +($("#calc-kwh").value);
  var cls = ($("input[name='calc-class']:checked") || {}).value || "res";
  $("#calc-kwh-label").textContent = kwh + " kWh";
  var parts, note;
  if (cls === "res") {
    // real reconstructed residential structure
    parts = [
      { key: "bundleR", amt: kwh * RATE.energy, color: "var(--brand)" },
      { key: "street", amt: kwh * RATE.ap, color: "var(--s-solar)" },
      { key: "muni", amt: kwh * RATE.imu, color: "var(--s-batt)" },
      { key: "cre", amt: kwh * RATE.cre, color: "var(--s-wind)" }
    ];
    note = t().calcNoteReal;
  } else {
    var energy = energyChargeFor(kwh, cls);
    parts = [
      { key: "energy", amt: energy, color: "var(--brand)" },
      { key: "fuel", amt: kwh * TARIFF.fuel, color: "var(--s-gas)" },
      { key: "fixed", amt: TARIFF.fixed, color: "var(--s-solar)" },
      { key: "street", amt: kwh * TARIFF.street, color: "var(--s-batt)" }
    ];
    note = t().calcNoteSample;
  }
  var total = parts.reduce(function (s, p) { return s + p.amt; }, 0);
  var bar = parts.map(function (p) {
    return '<span class="seg" style="width:' + (p.amt / total * 100).toFixed(2) + "%;background:" + p.color + '" title="' + esc(t().calcRows[p.key]) + '"></span>';
  }).join("");
  var rows = parts.map(function (p) {
    return '<div class="calc-row"><span class="swatch" style="background:' + p.color + '"></span>' +
      esc(t().calcRows[p.key]) + '<span class="amt">' + fmtL(p.amt) + "</span></div>";
  }).join("");
  host.innerHTML = '<div class="calc-bar">' + bar + "</div>" +
    '<div class="calc-rows">' + rows + "</div>" +
    '<div class="calc-total"><span>' + esc(t().totalDue) + '</span><span>' + fmtL(total) +
    ' <span class="usd">' + esc(t().approx) + fmtUSD(total) + "</span></span></div>" +
    '<p class="muted small" style="margin-top:10px">' + esc(note) + "</p>";
}

/* ---------------- portal ---------------- */

var portalOpen = false, portalAcct = "";

function openPortal(acct) {
  portalOpen = true;
  portalAcct = acct || "104-2213";
  $("#portal-login").hidden = true;
  $("#portal-dash").hidden = false;
  renderPortal();
}
function closePortal() {
  portalOpen = false;
  $("#portal-login").hidden = false;
  $("#portal-dash").hidden = true;
  $("#pay-done").hidden = true;
}
function renderPortal() {
  if (!portalOpen) return;
  $("#dash-name").textContent = LANG === "es" ? "Cuenta demo — West Bay" : "Demo account — West Bay";
  $("#dash-acct").textContent = (LANG === "es" ? "Cuenta " : "Account ") + portalAcct;
  var lastK = USAGE_KWH[USAGE_KWH.length - 1], prevK = USAGE_KWH[USAGE_KWH.length - 2];
  var bal = realBillFor(lastK);
  var paid = $("#pay-done").hidden === false;
  $("#dash-balance").textContent = paid ? "L 0.00" : fmtL(bal);
  $("#dash-due").textContent = paid ? "—" : t().dueBy + (LANG === "es" ? "12 jun 2026" : "Jun 12, 2026");
  $("#dash-kwh").textContent = lastK + " kWh";
  var diff = Math.round((lastK - prevK) / prevK * 100);
  $("#dash-kwh-diff").textContent = diff === 0 ? t().vsPrev[2] : Math.abs(diff) + (diff < 0 ? t().vsPrev[0] : t().vsPrev[1]);

  // this cycle so far (day 14 of 31, trending slightly above last month)
  var cycleDay = 14, cycleLen = 31;
  var soFarK = Math.round(lastK * 1.08 * cycleDay / cycleLen);
  var projK = Math.round(soFarK / cycleDay * cycleLen);
  $("#dash-sofar").textContent = soFarK + " kWh" + t().soFar;
  $("#dash-projected").textContent = t().projected + fmtL(realBillFor(projK));
  $("#cycle-fill").style.width = Math.round(cycleDay / cycleLen * 100) + "%";
  $("#cycle-day").textContent = t().dayOf(cycleDay);

  renderUsageChart("#usage-chart");

  var tbody = $("#bill-table tbody");
  var rows = "";
  for (var i = USAGE_KWH.length - 1; i >= 0; i--) {
    var mIdx = (USAGE_START.m + i) % 12;
    var yy = USAGE_START.y + Math.floor((USAGE_START.m + i) / 12);
    var amt = realBillFor(USAGE_KWH[i]);
    var isLatest = i === USAGE_KWH.length - 1;
    var pill = isLatest && !paid ? '<span class="pill due">' + esc(t().due) + "</span>" : '<span class="pill paid">' + esc(t().paid) + "</span>";
    rows += "<tr><td>" + monthLabel(yy, mIdx) + '</td><td class="num">' + USAGE_KWH[i] +
      '</td><td class="num">' + fmtL(amt) + "</td><td>" + pill +
      '</td><td><a href="#/billing" class="text-link bill-pdf">' + esc(t().download) + "</a></td></tr>";
  }
  tbody.innerHTML = rows;
  $all(".bill-pdf", tbody).forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); showToast(t().demoToast); });
  });
}

/* ---------------- fuel chart & reliability spark ---------------- */

function renderFuelChart() {
  var host = $("#fuel-chart");
  if (!host) return;
  var W = 520, H = 200, L = 40, R = 8, TOP = 16, B = 28;
  var iw = W - L - R, ih = H - TOP - B;
  var yMax = 2.0;
  var n = FUEL_HIST.length;
  var slot = iw / n, bw = Math.min(24, slot * 0.6);
  var startM = 7, startY = 2025; // Aug 2025
  var out = "";
  [0, 0.5, 1.0, 1.5, 2.0].forEach(function (gv) {
    var gy = TOP + ih - gv / yMax * ih;
    out += '<line x1="' + L + '" y1="' + gy + '" x2="' + (W - R) + '" y2="' + gy + '" stroke="var(--grid-line)"/>';
    out += '<text x="' + (L - 6) + '" y="' + (gy + 3.5) + '" text-anchor="end" font-size="10" fill="var(--axis-ink)">' + gv.toFixed(1) + "</text>";
  });
  var labels = "";
  for (var i = 0; i < n; i++) {
    var v = FUEL_HIST[i];
    var x = L + slot * i + (slot - bw) / 2;
    var bh = v / yMax * ih, y = TOP + ih - bh;
    var last = i === n - 1;
    out += '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + bh + '" rx="3" fill="var(--s-gas)" opacity="' + (last ? 1 : 0.5) + '" class="f-bar grow" data-i="' + i + '" style="animation-delay:' + (i * 45) + 'ms"/>';
    if (last) out += '<text x="' + (x + bw / 2) + '" y="' + (y - 6) + '" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">' + v.toFixed(2) + "</text>";
    var mIdx = (startM + i) % 12, yy = startY + Math.floor((startM + i) / 12);
    if (i % 2 === 0 || last) labels += '<text x="' + (x + bw / 2) + '" y="' + (H - 8) + '" text-anchor="middle" font-size="10" fill="var(--axis-ink)">' + monthLabel(yy, mIdx) + "</text>";
  }
  out += '<line x1="' + L + '" y1="' + (TOP + ih) + '" x2="' + (W - R) + '" y2="' + (TOP + ih) + '" stroke="var(--axis-ink)"/>';
  host.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(t().fuelAria) + '">' + out + labels + "</svg>";
  $all(".f-bar", host).forEach(function (bar) {
    function tip(e) {
      var i = +bar.dataset.i;
      var mIdx = (startM + i) % 12, yy = startY + Math.floor((startM + i) / 12);
      var pt = e.touches ? e.touches[0] : e;
      showTip("<strong>" + monthLabel(yy, mIdx) + "</strong><br>L " + FUEL_HIST[i].toFixed(2) + "/kWh", pt.clientX, pt.clientY);
    }
    bar.addEventListener("mousemove", tip);
    bar.addEventListener("mouseleave", hideTip);
    bar.addEventListener("touchstart", tip, { passive: true });
  });
}

function renderScoreSpark() {
  var host = $("#score-spark");
  if (!host) return;
  var W = 220, H = 64, P = 6;
  var max = Math.max.apply(null, OUTAGE_MIN_HIST);
  var n = OUTAGE_MIN_HIST.length;
  var pts = OUTAGE_MIN_HIST.map(function (v, i) {
    var x = P + i / (n - 1) * (W - 2 * P);
    var y = H - P - v / max * (H - 2 * P);
    return [x, y];
  });
  var line = pts.map(function (p, i) { return (i ? "L " : "M ") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" ");
  var area = line + " L " + pts[n - 1][0].toFixed(1) + " " + (H - P) + " L " + pts[0][0].toFixed(1) + " " + (H - P) + " Z";
  var last = pts[n - 1];
  host.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(t().sparkAria) + '">' +
    '<path d="' + area + '" fill="var(--brand)" opacity="0.12"/>' +
    '<path d="' + line + '" fill="none" stroke="var(--brand)" stroke-width="2" stroke-linejoin="round"/>' +
    '<circle cx="' + last[0] + '" cy="' + last[1] + '" r="3.5" fill="var(--brand)"/>' +
    '<text x="' + (last[0] - 8) + '" y="' + (last[1] - 6) + '" text-anchor="end" font-size="11" font-weight="700" fill="var(--ink)">' + OUTAGE_MIN_HIST[n - 1] + " min</text></svg>";
}

/* ---------------- prepaid ---------------- */

var PP_BURN = [38, 42, 35, 44, 47, 39, 36, 40, 45, 52, 43, 38, 37, 41]; // L/day, last 14 days
var ppBalance = 342.50;

function ppAvgBurn() {
  var s = 0;
  for (var i = PP_BURN.length - 7; i < PP_BURN.length; i++) s += PP_BURN[i];
  return s / 7;
}

function renderPrepaid() {
  var bal = $("#pp-balance");
  if (!bal) return;
  bal.textContent = fmtL(ppBalance);
  $("#pp-days").textContent = (ppBalance / ppAvgBurn()).toFixed(1).replace(/\.0$/, "") + t().daysSuffix;

  var host = $("#pp-burn");
  var W = 480, H = 120, P = 6, B = 18;
  var max = 60, n = PP_BURN.length;
  var slot = (W - 2 * P) / n, bw = slot * 0.62;
  var out = "";
  for (var i = 0; i < n; i++) {
    var x = P + slot * i + (slot - bw) / 2;
    var bh = PP_BURN[i] / max * (H - B - P);
    var y = H - B - bh;
    var last = i === n - 1;
    out += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="3" fill="var(--brand)" opacity="' + (last ? 1 : 0.45) + '" class="grow" style="animation-delay:' + (i * 40) + 'ms"/>';
    if (last) out += '<text x="' + (x + bw / 2) + '" y="' + (y - 5) + '" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">L ' + PP_BURN[i] + "</text>";
  }
  out += '<line x1="' + P + '" y1="' + (H - B) + '" x2="' + (W - P) + '" y2="' + (H - B) + '" stroke="var(--axis-ink)"/>';
  host.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(t().burnAria) + '">' + out + "</svg>";

  var bc = $(".barcode");
  if (bc && !bc.dataset.done) {
    var widths = [3,1,2,1,1,3,1,2,2,1,3,1,1,2,3,1,2,1,3,2,1,1,2,3,1,2,1,1,3,2,1,2,1,3,1,1,2,1,3,2];
    var x2 = 4, bars = "";
    widths.forEach(function (w, i) {
      if (i % 2 === 0) bars += '<rect x="' + x2 + '" y="2" width="' + (w * 2.2) + '" height="44" fill="var(--ink)"/>';
      x2 += w * 2.2 + 2.2;
    });
    bc.innerHTML = bars;
    bc.dataset.done = "1";
  }
}

/* ---------------- fan club & green hours ---------------- */

function windOutputNow() {
  var h = new Date().getHours() + new Date().getMinutes() / 60;
  return Math.max(0.3, 2.4 + 0.9 * Math.sin(h / 3.1)); // MW, demo
}

function renderFanClub() {
  var out = $("#fan-output");
  if (!out) return;
  var mw = windOutputNow();
  var active = mw >= 2.4;
  out.textContent = mw.toFixed(1) + " MW" + t().fanUnit;
  $("#fan-status").textContent = active ? t().fanStrong : t().fanLight;
  var d = $("#fan-discount");
  d.textContent = active ? t().fanOn : t().fanOff;
  d.classList.toggle("active", active);
}

function greenLevel(h) {
  if (h >= 18 && h < 21) return "peak";
  if (solarAt(h + 0.5) > 3.5) return "best";
  if ((h >= 22 || h < 6)) return "good";
  return "mid";
}

function renderGreenStrip() {
  var host = $("#green-strip");
  if (!host) return;
  var nowH = new Date().getHours();
  var cells = "";
  for (var h = 0; h < 24; h++) {
    cells += '<span class="cell lv-' + greenLevel(h) + (h === nowH ? " now" : "") + '" title="' + h + ':00"></span>';
  }
  host.innerHTML = cells;
  $("#strip-tip").textContent = t().stripTip;
}

/* ---------------- rate plans (shadow bill) ---------------- */

function fmtL0(n) {
  return "L " + Math.round(n).toLocaleString(LANG === "es" ? "es-HN" : "en-US");
}

function renderPlans() {
  var std = $("#plan-std");
  if (!std) return;
  var last12 = USAGE_KWH.slice(-12);
  var total = 0;
  last12.forEach(function (k) { total += realBillFor(k); });
  std.textContent = fmtL0(total);
  $("#plan-pre").textContent = fmtL0(total * 0.905); // 8–12% visibility effect, midpoint
  $("#plan-avg").textContent = fmtL0(total / 12) + t().perMonth;
  $("#plan-tou").textContent = fmtL0(total * 0.9625); // ~15% of load shifted at ~25% cheaper
}

/* ---------------- assistance wizard ---------------- */

function wizAnswer(name) {
  var el = $("input[name='" + name + "']:checked");
  return el ? el.value : "";
}

function runWizard() {
  var behind = wizAnswer("wz1"), income = wizAnswer("wz2"), small = wizAnswer("wz3"),
      ac = wizAnswer("wz4"), payer = wizAnswer("wz5");
  var recs = [];
  if (behind === "2") {
    recs.push("prepaid", "installment");
  } else if (behind === "1") {
    recs.push("extension", "installment");
  } else {
    if (income === "seasonal" || small === "yes") recs.push("prepaid");
    else recs.push("budget");
  }
  if (income === "seasonal" && recs.indexOf("prepaid") === -1) recs.push("prepaid");
  if (payer === "family") recs.push("family");
  if (ac === "yes") recs.push("ac");
  recs = recs.slice(0, 3);
  var host = $("#wiz-result");
  host.innerHTML = recs.map(function (k) {
    var r = t().wiz[k];
    return '<div class="wiz-rec"><h4>' + esc(r.h) + "</h4><p>" + esc(r.p) + "</p></div>";
  }).join("");
  host.hidden = false;
}

/* ---------------- pay flow ---------------- */

var pfAmount = 17514.88;

function pfShow(id) {
  ["pf-1", "pf-2", "pf-3", "pf-proc", "pf-4"].forEach(function (p) {
    var el = document.getElementById(p);
    if (el) el.hidden = p !== id;
  });
  var stepFor = { "pf-1": 1, "pf-2": 2, "pf-3": 3, "pf-proc": 3, "pf-4": 4 };
  var cur = stepFor[id];
  $all(".pf-step").forEach(function (st) {
    var n = +st.dataset.pf;
    st.classList.toggle("is-on", n === cur);
    st.classList.toggle("is-done", n < cur);
  });
}

function setupPayFlow() {
  var fa = $("#pf-form-acct");
  if (!fa) return;
  fa.addEventListener("submit", function (e) {
    e.preventDefault();
    $("#pf-acct-echo").textContent = ($("#pf-acct").value.trim() || "R0012492").toUpperCase();
    pfShow("pf-2");
  });
  $("#pf-to-method").addEventListener("click", function () {
    var sel = $("input[name='pf-amt']:checked");
    pfAmount = sel ? +sel.value : 17514.88;
    pfShow("pf-3");
  });
  $("#pf-pay").addEventListener("click", function () {
    pfShow("pf-proc");
    setTimeout(function () {
      $("#pf-rc-amt").textContent = fmtL(pfAmount);
      $("#pf-rc-acct").textContent = $("#pf-acct-echo").textContent;
      $("#pf-rc-bal").textContent = fmtL(Math.max(0, 17514.88 - pfAmount));
      pfShow("pf-4");
    }, 1400);
  });
  $("#pf-again").addEventListener("click", function () { pfShow("pf-1"); });
}

/* ---------------- Coco chat assistant ---------------- */

var cocoBuilt = false;

function cocoOutageAnswer() {
  var bits = [esc(t().coco.aOutageHead)];
  EVENTS.forEach(function (ev) {
    if (ev.type === "restored") return;
    var z = zoneById(ev.zone);
    var icon = ev.type === "out" ? "🔴" : "🟠";
    bits.push(icon + " <strong>" + esc(z[LANG]) + "</strong> — " + esc(ev.cause[LANG]) +
      (ev.eta[LANG] ? " · " + esc(ev.eta[LANG]) : ""));
  });
  bits.push('<a href="#/outages">' + (LANG === "es" ? "Ver el mapa completo →" : "See the full map →") + "</a>");
  return bits.join("<br>");
}

function cocoAnswer(k) {
  if (k === "outage") return cocoOutageAnswer();
  if (k === "balance") return t().coco.aBalance;
  if (k === "pay") return t().coco.aPay;
  if (k === "report") return t().coco.aReport;
  return t().coco.aHuman;
}

function cocoMsg(html, who) {
  var m = document.createElement("div");
  m.className = "coco-msg " + who;
  m.innerHTML = html;
  $("#coco-msgs").appendChild(m);
  $("#coco-msgs").scrollTop = 99999;
}

function cocoReset() {
  if (!cocoBuilt) return;
  $("#coco-msgs").innerHTML = "";
  $(".coco-head strong").textContent = "Coco";
  $(".coco-head .small").textContent = t().coco.tag;
  cocoMsg(esc(t().coco.hi), "bot");
  var chips = $("#coco-chips");
  chips.innerHTML = "";
  ["outage", "balance", "pay", "report", "human"].forEach(function (k) {
    var b = document.createElement("button");
    b.className = "coco-chip";
    b.type = "button";
    b.textContent = t().coco.chips[k];
    b.addEventListener("click", function () {
      cocoMsg(esc(t().coco.chips[k]), "user");
      setTimeout(function () { cocoMsg(cocoAnswer(k), "bot"); }, 350);
    });
    chips.appendChild(b);
  });
}

function buildCoco() {
  var fab = document.createElement("button");
  fab.className = "coco-fab";
  fab.type = "button";
  fab.setAttribute("aria-label", "Coco — chat assistant");
  fab.innerHTML = "💬";
  var panel = document.createElement("div");
  panel.className = "coco-panel";
  panel.hidden = true;
  panel.innerHTML =
    '<div class="coco-head"><span class="coco-avatar">🦎</span><div><strong>Coco</strong><span class="small"></span></div>' +
    '<button class="coco-close" type="button" aria-label="Close">×</button></div>' +
    '<div class="coco-msgs" id="coco-msgs"></div>' +
    '<div class="coco-chips" id="coco-chips"></div>';
  document.body.appendChild(panel);
  document.body.appendChild(fab);
  cocoBuilt = true;
  cocoReset();
  fab.addEventListener("click", function () { panel.hidden = !panel.hidden; });
  panel.querySelector(".coco-close").addEventListener("click", function () { panel.hidden = true; });
  // route links inside chat close the panel
  panel.addEventListener("click", function (e) {
    if (e.target.tagName === "A") panel.hidden = true;
  });
}

/* ---------------- scroll animations ---------------- */

var REDUCE_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function runCountUp(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = "1";
  if (REDUCE_MOTION) return;
  var text = el.textContent;
  var m = text.match(/-?\d[\d,]*\.?\d*/);
  if (!m) return;
  var raw = m[0];
  var target = parseFloat(raw.replace(/,/g, ""));
  if (isNaN(target)) return;
  var decimals = (raw.split(".")[1] || "").length;
  var hasComma = raw.indexOf(",") !== -1;
  var prefix = text.slice(0, m.index), suffix = text.slice(m.index + raw.length);
  var t0 = null, dur = 950;
  function frame(ts) {
    if (!t0) t0 = ts;
    var p = Math.min(1, (ts - t0) / dur);
    var eased = 1 - Math.pow(1 - p, 3);
    var v = target * eased;
    var s = v.toFixed(decimals);
    if (hasComma) s = (+s).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    el.textContent = prefix + s + suffix;
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = text;
  }
  requestAnimationFrame(frame);
}

function drawDemandLine() {
  var host = $("#demand-chart");
  if (!host || REDUCE_MOTION) return;
  var path = $("#dc-line", host);
  if (!path || path.dataset.drawn) return;
  path.dataset.drawn = "1";
  try {
    var len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.getBoundingClientRect(); // reflow
    path.style.transition = "stroke-dashoffset 1.3s ease .15s";
    path.style.strokeDashoffset = "0";
  } catch (e) { /* non-rendered SVG */ }
}

var revealIO = null;
function setupAnimations() {
  // choose reveal targets and stagger them within their parent
  var targets = [];
  $all(".section .card, .qa-card, .hero-panel").forEach(function (el) {
    if (targets.indexOf(el) === -1) targets.push(el);
  });
  $all(".chart-anim").forEach(function (el) { if (targets.indexOf(el) === -1) targets.push(el); });
  $all("#demand-chart").forEach(function (el) { if (targets.indexOf(el) === -1) targets.push(el); });

  var byParent = {};
  targets.forEach(function (el) {
    el.classList.add("reveal");
    var pk = el.parentElement ? (el.parentElement.dataset.rvKey || (el.parentElement.dataset.rvKey = Math.random().toString(36).slice(2))) : "x";
    byParent[pk] = (byParent[pk] || 0);
    el.style.transitionDelay = Math.min(byParent[pk] * 70, 420) + "ms";
    byParent[pk]++;
  });

  if (!("IntersectionObserver" in window) || REDUCE_MOTION) {
    targets.forEach(function (el) { el.classList.add("in"); el.classList.remove("reveal"); el.style.transitionDelay = ""; });
    animateBillDoc();
    return;
  }

  revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add("in");
      revealIO.unobserve(el);
      // after the entrance completes, return the element to its natural CSS
      // so hover transitions aren't slowed by the reveal transition
      el.addEventListener("transitionend", function h(ev) {
        if (ev.target !== el) return;
        el.classList.remove("reveal");
        el.style.transitionDelay = "";
        el.removeEventListener("transitionend", h);
      });
      if (el.id === "bill-doc") animateBillDoc();
      if (el.id === "demand-chart" || $("#demand-chart", el)) drawDemandLine();
      $all(".ready-tile .tile-value, .stat-value", el).forEach(runCountUp);
      if (el.classList.contains("ready-tile")) $all(".tile-value", el).forEach(runCountUp);
    });
  }, { threshold: 0.05, rootMargin: "0px 0px 25% 0px" });
  targets.forEach(function (el) { revealIO.observe(el); });

  // safety: never leave charts invisible
  setTimeout(function () {
    $all(".chart-anim").forEach(function (el) { el.classList.add("in"); });
  }, 3000);
}

/* ---------------- router ---------------- */

var ROUTES = ["home", "outages", "storm", "billing", "prepaid", "rates", "service", "energy", "news", "contact"];

function parseHash() {
  var raw = location.hash || "#/";
  var m = raw.match(/^#\/([a-z-]*)(?:#(.+))?$/);
  if (!m) return { page: "home", anchor: null };
  var page = m[1] || "home";
  if (ROUTES.indexOf(page) === -1) page = "home";
  return { page: page, anchor: m[2] || null };
}

function route() {
  var r = parseHash();
  $all(".page").forEach(function (p) { p.hidden = p.dataset.page !== r.page; });
  $all(".main-nav a").forEach(function (a) {
    if (a.dataset.route === r.page) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  var nav = $("#main-nav");
  nav.classList.remove("is-open");
  $("#nav-burger").setAttribute("aria-expanded", "false");
  hideTip();
  if (r.anchor) {
    var el = document.getElementById(r.anchor);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
  }
  window.scrollTo({ top: 0, behavior: "auto" });
}

/* ---------------- render-all (on lang change) ---------------- */

function renderDynamic() {
  renderMixDonut();
  renderDemandChart();
  renderMap();
  renderOutageList();
  fillZoneSelects();
  renderNews();
  renderOdometers();
  renderUsageChart("#bill-usage-chart");
  renderCalc();
  renderPlans();
  if (!$("#wiz-result").hidden) runWizard();
  renderPortal();
  renderFuelChart();
  renderScoreSpark();
  renderPrepaid();
  renderFanClub();
  renderGreenStrip();
  rotateTip(true);
}

function setLang(lang) {
  LANG = lang;
  localStorage.setItem("reco-lang", lang);
  applyStaticLang();
  renderDynamic();
  cocoReset();
  if (window.runSim) window.runSim();
}

/* ---------------- tips rotator ---------------- */

var tipIdx = 0, tipTimer = null;
function rotateTip(keep) {
  var el = $("#tip-rotator");
  if (!el) return;
  if (!keep) tipIdx = (tipIdx + 1) % t().tipList.length;
  el.textContent = t().tipList[tipIdx];
}

/* ---------------- init ---------------- */

function init() {
  /* theme */
  var savedTheme = localStorage.getItem("reco-theme");
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  $("#theme-toggle").addEventListener("click", function () {
    var cur = document.documentElement.dataset.theme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = cur === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("reco-theme", next);
    renderDynamic(); // charts pick up new token values via var(), but rebuild for map mix colors
  });

  /* language */
  applyStaticLang();
  $("#lang-toggle").addEventListener("click", function () {
    setLang(LANG === "en" ? "es" : "en");
  });

  /* nav */
  $("#nav-burger").addEventListener("click", function () {
    var nav = $("#main-nav");
    var open = nav.classList.toggle("is-open");
    this.setAttribute("aria-expanded", String(open));
  });

  /* router */
  window.addEventListener("hashchange", route);
  route();

  /* forms: demo submit */
  [["report-form"], ["alerts-form"], ["contact-form"]].forEach(function (pair) {
    var f = document.getElementById(pair[0]);
    if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var done = f.querySelector(".form-done");
      if (done) done.hidden = false;
    });
  });

  /* demo buttons */
  $all("[data-demo-alert]").forEach(function (b) {
    b.addEventListener("click", function () { showToast(t().demoToast); });
  });

  /* portal */
  $("#portal-form").addEventListener("submit", function (e) {
    e.preventDefault();
    openPortal($("#portal-acct").value.trim() || "104-2213");
  });
  $("#portal-logout").addEventListener("click", closePortal);
  $("#dash-pay").addEventListener("click", function () {
    $("#pay-done").hidden = false;
    renderPortal();
  });

  /* track form */
  $("#track-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var host = $("#track-result");
    var id = $("#track-id").value.trim() || "REQ-2026-0148";
    var steps = t().trackSteps, dates = t().trackDates;
    var html = '<div class="track-status"><p class="mono small muted">' + esc(id) + "</p>";
    for (var i = 0; i < steps.length; i++) {
      var dotCls = i === 0 ? "ok" : (i === 1 ? "planned" : "pending");
      html += '<div class="track-step"><span class="key-dot ' + dotCls + '"></span><strong>' + esc(steps[i]) + "</strong><span class='muted'>" + esc(dates[i]) + "</span></div>";
    }
    html += '<p class="form-note" style="margin-top:6px">🛻 ' + esc(t().trackTech) + "</p>";
    host.innerHTML = html + "</div>";
    host.hidden = false;
  });

  /* calculator */
  $("#calc-kwh").addEventListener("input", renderCalc);
  $all("input[name='calc-class']").forEach(function (r) { r.addEventListener("change", renderCalc); });

  /* prepaid top-up */
  $all(".pp-amt").forEach(function (b) {
    b.addEventListener("click", function () {
      ppBalance += +b.dataset.amt;
      renderPrepaid();
      showToast(t().toastTopup);
    });
  });

  /* guest pay */
  var gf = $("#guest-form");
  if (gf) gf.addEventListener("submit", function (e) {
    e.preventDefault();
    gf.querySelector(".form-done").hidden = false;
  });

  /* preference center + due date */
  var ps = $("#pref-save");
  if (ps) ps.addEventListener("click", function () { showToast(t().toastPref); });
  var dd = $("#opt-duedate");
  if (dd) dd.addEventListener("change", function () { showToast(t().toastDue); });

  /* dynamic content */
  renderDynamic();

  /* bill doc interactions + scroll animations */
  setupBillDoc();
  setupAnimations();

  /* assistance wizard */
  var wg = $("#wiz-go");
  if (wg) wg.addEventListener("click", runWizard);

  /* pay flow + Coco */
  setupPayFlow();
  buildCoco();

  /* service chooser tabs */
  $all(".svc-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      $all(".svc-tab").forEach(function (x) {
        x.classList.toggle("is-on", x === tab);
        x.setAttribute("aria-selected", x === tab ? "true" : "false");
      });
      $all(".svc-panel").forEach(function (p) { p.hidden = p.id !== "svc-" + tab.dataset.svc; });
    });
  });

  /* what-if savings simulator */
  function runSim() {
    var base = 8809.49, save = 0;
    $all(".sim-opt").forEach(function (o) { if (o.checked) save += +o.dataset.save; });
    var now = base - save;
    var fill = $("#sim-fill");
    if (!fill) return;
    fill.style.width = Math.max(32, now / base * 100) + "%";
    $("#sim-newbill").textContent = fmtL0(now);
    var v = $("#sim-verdict");
    if (!save) { v.textContent = t().simZero; }
    else {
      t().simYr = fmtL0(save * 12);
      v.textContent = t().simVerdict(fmtL0(save));
    }
  }
  $all(".sim-opt").forEach(function (o) { o.addEventListener("change", runSim); });
  runSim();
  window.runSim = runSim;

  /* PWA */
  if ("serviceWorker" in navigator && location.protocol === "https:" &&
      location.hostname.indexOf("claude.ai") === -1) {
    navigator.serviceWorker.register("sw.js").catch(function () { /* not fatal */ });
  }

  /* news filter */
  $all("[data-newsfilter]").forEach(function (b) {
    b.addEventListener("click", function () {
      newsFilter = b.dataset.newsfilter;
      $all("[data-newsfilter]").forEach(function (x) { x.classList.toggle("is-active", x === b); });
      renderNews();
    });
  });

  /* gentle live refresh + tip rotation */
  setInterval(function () { renderMixDonut(); }, 60000);
  setInterval(function () { rotateTip(false); }, 9000);
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();

})();
