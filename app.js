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
    calcRows: { energy: "Energy charge", fuel: "Fuel adjustment", fixed: "Fixed charge", street: "Street lighting" },
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
    dayOf: function (d) { return "Day " + d + " of 30"; },
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
    calcRows: { energy: "Cargo por energía", fuel: "Ajuste por combustible", fixed: "Cargo fijo", street: "Alumbrado público" },
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
    dayOf: function (d) { return "Día " + d + " de 30"; },
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
  fuel: 1.12, fixed: 62.00, street: 0.28
};

var ZONES = [
  { id: "west-bay",    en: "West Bay",        es: "West Bay",        x: 58,  y: 196, status: "planned", lbl: "b" },
  { id: "west-end",    en: "West End",        es: "West End",        x: 88,  y: 166, status: "ok",      lbl: "t" },
  { id: "sandy-bay",   en: "Sandy Bay",       es: "Sandy Bay",       x: 146, y: 143, status: "ok",      lbl: "t" },
  { id: "flowers-bay", en: "Flowers Bay",     es: "Flowers Bay",     x: 140, y: 212, status: "ok",      lbl: "b" },
  { id: "coxen-hole",  en: "Coxen Hole",      es: "Coxen Hole",      x: 196, y: 192, status: "ok",      lbl: "b" },
  { id: "brick-bay",   en: "Brick Bay",       es: "Brick Bay",       x: 268, y: 186, status: "ok",      lbl: "b" },
  { id: "french-hbr",  en: "French Harbour",  es: "French Harbour",  x: 330, y: 166, status: "ok",      lbl: "b" },
  { id: "parrot-tree", en: "Parrot Tree",     es: "Parrot Tree",     x: 392, y: 158, status: "ok",      lbl: "b" },
  { id: "politilly",   en: "Politilly Bight", es: "Politilly Bight", x: 468, y: 132, status: "ok",      lbl: "t" },
  { id: "punta-gorda", en: "Punta Gorda",     es: "Punta Gorda",     x: 540, y: 104, status: "out",     lbl: "t" },
  { id: "jonesville",  en: "Jonesville",      es: "Jonesville",      x: 562, y: 138, status: "ok",      lbl: "b" },
  { id: "oak-ridge",   en: "Oak Ridge",       es: "Oak Ridge",       x: 614, y: 128, status: "planned", lbl: "b" },
  { id: "camp-bay",    en: "Camp Bay",        es: "Camp Bay",        x: 692, y: 102, status: "ok",      lbl: "t" },
  { id: "santa-elena", en: "Santa Elena",     es: "Santa Elena",     x: 762, y: 108, status: "ok",      lbl: "b" }
];

/* per-zone reliability, last 90 days: [outage count, total minutes] (demo) */
var REL90 = {
  "west-bay": [1, 44], "west-end": [2, 71], "sandy-bay": [3, 126], "flowers-bay": [1, 38],
  "coxen-hole": [2, 65], "brick-bay": [1, 52], "french-hbr": [2, 58], "parrot-tree": [1, 31],
  "politilly": [2, 84], "punta-gorda": [5, 216], "jonesville": [3, 102], "oak-ridge": [3, 95],
  "camp-bay": [2, 77], "santa-elena": [2, 88]
};

var FUEL_HIST = [1.28, 1.31, 1.27, 1.24, 1.20, 1.23, 1.19, 1.21, 1.18, 1.15, 1.17, 1.12]; // Aug 25 → Jul 26
var OUTAGE_MIN_HIST = [148, 132, 165, 121, 96, 88, 104, 92, 78, 84, 71, 63]; // monthly outage minutes

var EVENTS = [
  {
    zone: "punta-gorda", type: "out", stage: 3,
    cause: { en: "Tree on the line near the main road", es: "Árbol sobre la línea cerca de la carretera principal" },
    meta:  { en: "Started 14:20 · 312 customers affected · crew on site", es: "Inició 14:20 · 312 clientes afectados · cuadrilla en el sitio" },
    eta:   { en: "Estimated restoration: 6:30 pm today", es: "Restablecimiento estimado: 6:30 pm hoy" }
  },
  {
    zone: "oak-ridge", type: "planned",
    cause: { en: "Transformer maintenance", es: "Mantenimiento de transformador" },
    meta:  { en: "Tonight 10:00 pm – 1:00 am · notified by WhatsApp 48 h ahead", es: "Hoy 10:00 pm – 1:00 am · avisado por WhatsApp con 48 h" },
    eta:   { en: "", es: "" }
  },
  {
    zone: "west-bay", type: "planned",
    cause: { en: "Line upgrade — replacing 6 poles", es: "Mejora de línea — reemplazo de 6 postes" },
    meta:  { en: "Tue Jul 14 · 9:00 am – 12:00 pm", es: "Mar 14 jul · 9:00 am – 12:00 pm" },
    eta:   { en: "", es: "" }
  },
  {
    zone: "sandy-bay", type: "restored",
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

var USAGE_KWH = [418, 396, 372, 355, 348, 361, 389, 442, 486, 512, 538, 497]; // 12 months, oldest first
var USAGE_START = { y: 2025, m: 6 }; // Jul 2025 (0-based month index 6)

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

function renderUsageChart() {
  var host = $("#usage-chart");
  if (!host) return;
  var W = 560, H = 220, L = 44, R = 10, TOP = 18, B = 30;
  var iw = W - L - R, ih = H - TOP - B;
  var max = Math.max.apply(null, USAGE_KWH);
  var yMax = Math.ceil(max / 100) * 100;
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
    out += '<path d="' + d + '" fill="var(--brand)" opacity="' + (last ? 1 : 0.55) + '" data-i="' + i + '" class="u-bar"/>';
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
      showTip("<strong>" + monthLabel(yy, mIdx) + "</strong><br>" + USAGE_KWH[i] + " kWh · " + fmtL(billTotalFor(USAGE_KWH[i], "res")), pt.clientX, pt.clientY);
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
  out += '<path d="' + dLine + '" fill="none" stroke="var(--brand)" stroke-width="2.5" stroke-linejoin="round"/>';
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

var ISLAND_PATH =
  "M 40 192 C 52 158, 104 132, 168 140 C 226 147, 288 128, 348 116 " +
  "C 410 104, 470 96, 530 86 C 592 76, 664 66, 716 84 C 754 97, 758 122, 726 138 " +
  "C 682 158, 630 148, 574 158 C 516 168, 452 176, 390 184 C 328 192, 268 204, 208 210 " +
  "C 148 216, 58 228, 40 192 Z";
var SANTA_ELENA_PATH = "M 744 104 C 752 94, 772 92, 780 102 C 788 112, 774 122, 762 120 C 750 118, 738 112, 744 104 Z";

function renderMap() {
  var host = $("#island-map");
  if (!host) return;
  var statusColor = { ok: "var(--ok)", planned: "var(--warn)", out: "var(--danger)" };
  var dots = ZONES.map(function (z) {
    var above = z.lbl === "t";
    var anchor = z.x > 700 ? "end" : "middle";
    var lx = z.x > 700 ? z.x + 14 : z.x;
    var label = '<text x="' + lx + '" y="' + (above ? z.y - 15 : z.y + 25) + '" text-anchor="' + anchor + '" font-size="13" font-weight="600" fill="var(--ink-2)">' + esc(z[LANG]) + "</text>";
    var ring = z.status === "out" ? '<circle cx="' + z.x + '" cy="' + z.y + '" r="12" fill="none" stroke="var(--danger)" opacity="0.5"><animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite"/></circle>' : "";
    return '<g class="zone-dot" tabindex="0" role="button" data-zone="' + z.id + '" aria-label="' + esc(z[LANG]) + ": " + esc(t().zoneStatus[z.status]) + '">' +
      ring +
      '<circle cx="' + z.x + '" cy="' + z.y + '" r="8" fill="' + statusColor[z.status] + '" stroke="var(--card)" stroke-width="2"/>' +
      label + "</g>";
  }).join("");

  host.innerHTML =
    '<svg viewBox="0 0 800 280">' +
    '<rect x="0" y="0" width="800" height="280" rx="14" fill="color-mix(in srgb, var(--s-wind) 9%, var(--card))"/>' +
    '<path d="' + ISLAND_PATH + '" fill="color-mix(in srgb, var(--brand) 16%, var(--card))" stroke="var(--brand)" stroke-opacity="0.35" stroke-width="1.5"/>' +
    '<path d="' + SANTA_ELENA_PATH + '" fill="color-mix(in srgb, var(--brand) 16%, var(--card))" stroke="var(--brand)" stroke-opacity="0.35" stroke-width="1.5"/>' +
    '<text x="52" y="42" font-size="12" fill="var(--axis-ink)" letter-spacing="2">MAR CARIBE · CARIBBEAN SEA</text>' +
    dots + "</svg>";

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
    dot.addEventListener("touchstart", tip, { passive: true });
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
    return '<div class="outage-event"><div class="oe-head"><span class="key-dot ' + tag[0] + '"></span>' +
      esc(z[LANG]) + ' <span class="news-tag">' + esc(tag[1]) + "</span></div>" +
      '<div class="oe-meta">' + esc(ev.cause[LANG]) + "</div>" +
      '<div class="oe-meta">' + esc(ev.meta[LANG]) + "</div>" +
      crew +
      (ev.eta[LANG] ? '<div class="oe-eta">' + esc(ev.eta[LANG]) + "</div>" : "") +
      "</div>";
  }).join("");
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
function renderNews() {
  var home = $("#home-news");
  if (home) home.innerHTML = NEWS.slice(0, 3).map(newsCard).join("");
  var list = $("#news-list");
  if (list) {
    var items = NEWS.filter(function (n) { return newsFilter === "all" || n.tag === newsFilter; });
    list.innerHTML = items.map(newsCard).join("");
  }
}

/* ---------------- bill explainer ---------------- */

function renderBillExplainer() {
  var host = $("#bill-explainer");
  if (!host) return;
  var kwh = 350;
  var energy = energyChargeFor(kwh, "res");
  var fuel = kwh * TARIFF.fuel, street = kwh * TARIFF.street;
  var total = energy + fuel + TARIFF.fixed + street;
  var lines = [
    { label: t().energyCharge, amt: energy, body: t().billExplain.energy },
    { label: t().fuelAdj, amt: fuel, body: t().billExplain.fuel },
    { label: t().fixedCharge, amt: TARIFF.fixed, body: t().billExplain.fixed },
    { label: t().streetLight, amt: street, body: t().billExplain.street }
  ];
  host.innerHTML = '<p class="muted small" style="padding-top:12px">' + esc(t().sampleBillNote) + "</p>" +
    lines.map(function (l) {
      return '<details class="bill-line"><summary>' + esc(l.label) +
        '<span class="bl-amount">' + fmtL(l.amt) + "</span></summary>" +
        '<div class="bl-body">' + esc(l.body) + "</div></details>";
    }).join("") +
    '<details class="bill-line total"><summary>' + esc(t().totalDue) +
    '<span class="bl-amount">' + fmtL(total) + "</span></summary>" +
    '<div class="bl-body">' + esc(t().billExplain.total) + " " + esc(t().approx) + fmtUSD(total) + "</div></details>";
}

/* ---------------- calculator ---------------- */

function renderCalc() {
  var host = $("#calc-breakdown");
  if (!host) return;
  var kwh = +($("#calc-kwh").value);
  var cls = ($("input[name='calc-class']:checked") || {}).value || "res";
  $("#calc-kwh-label").textContent = kwh + " kWh";
  var energy = energyChargeFor(kwh, cls);
  var fuel = kwh * TARIFF.fuel, street = kwh * TARIFF.street, fixed = TARIFF.fixed;
  var total = energy + fuel + fixed + street;
  var parts = [
    { key: "energy", amt: energy, color: "var(--brand)" },
    { key: "fuel", amt: fuel, color: "var(--s-gas)" },
    { key: "fixed", amt: fixed, color: "var(--s-solar)" },
    { key: "street", amt: street, color: "var(--s-batt)" }
  ];
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
    ' <span class="usd">' + esc(t().approx) + fmtUSD(total) + "</span></span></div>";
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
  $("#dash-name").textContent = LANG === "es" ? "Cuenta demo — Sandy Bay" : "Demo account — Sandy Bay";
  $("#dash-acct").textContent = (LANG === "es" ? "Cuenta " : "Account ") + portalAcct;
  var lastK = USAGE_KWH[USAGE_KWH.length - 1], prevK = USAGE_KWH[USAGE_KWH.length - 2];
  var bal = billTotalFor(lastK, "res");
  var paid = $("#pay-done").hidden === false;
  $("#dash-balance").textContent = paid ? "L 0.00" : fmtL(bal);
  $("#dash-due").textContent = paid ? "—" : t().dueBy + (LANG === "es" ? "24 jul 2026" : "Jul 24, 2026");
  $("#dash-kwh").textContent = lastK + " kWh";
  var diff = Math.round((lastK - prevK) / prevK * 100);
  $("#dash-kwh-diff").textContent = diff === 0 ? t().vsPrev[2] : Math.abs(diff) + (diff < 0 ? t().vsPrev[0] : t().vsPrev[1]);

  // this cycle so far (day 14 of 30, trending slightly above last month)
  var cycleDay = 14, cycleLen = 30;
  var soFarK = Math.round(lastK * 1.08 * cycleDay / cycleLen);
  var projK = Math.round(soFarK / cycleDay * cycleLen);
  $("#dash-sofar").textContent = soFarK + " kWh" + t().soFar;
  $("#dash-projected").textContent = t().projected + fmtL(billTotalFor(projK, "res"));
  $("#cycle-fill").style.width = Math.round(cycleDay / cycleLen * 100) + "%";
  $("#cycle-day").textContent = t().dayOf(cycleDay);

  renderUsageChart();

  var tbody = $("#bill-table tbody");
  var rows = "";
  for (var i = USAGE_KWH.length - 1; i >= 0; i--) {
    var mIdx = (USAGE_START.m + i) % 12;
    var yy = USAGE_START.y + Math.floor((USAGE_START.m + i) / 12);
    var amt = billTotalFor(USAGE_KWH[i], "res");
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
  var yMax = 1.5;
  var n = FUEL_HIST.length;
  var slot = iw / n, bw = Math.min(24, slot * 0.6);
  var startM = 7, startY = 2025; // Aug 2025
  var out = "";
  [0, 0.5, 1.0, 1.5].forEach(function (gv) {
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
    out += '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + bh + '" rx="3" fill="var(--s-gas)" opacity="' + (last ? 1 : 0.5) + '" class="f-bar" data-i="' + i + '"/>';
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
    out += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="3" fill="var(--brand)" opacity="' + (last ? 1 : 0.45) + '"/>';
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
  renderBillExplainer();
  renderCalc();
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
