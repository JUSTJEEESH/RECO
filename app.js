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

var ZONES = [
  { id: "west-bay",    en: "West Bay",        es: "West Bay",        x: 58,  y: 196, status: "ok",      lbl: "b" },
  { id: "west-end",    en: "West End",        es: "West End",        x: 88,  y: 166, status: "ok",      lbl: "t" },
  { id: "sandy-bay",   en: "Sandy Bay",       es: "Sandy Bay",       x: 146, y: 143, status: "planned", lbl: "t" },
  { id: "flowers-bay", en: "Flowers Bay",     es: "Flowers Bay",     x: 140, y: 212, status: "ok",      lbl: "b" },
  { id: "coxen-hole",  en: "Coxen Hole",      es: "Coxen Hole",      x: 196, y: 192, status: "planned", lbl: "b" },
  { id: "brick-bay",   en: "Brick Bay",       es: "Brick Bay",       x: 268, y: 186, status: "ok",      lbl: "b" },
  { id: "french-hbr",  en: "French Harbour",  es: "French Harbour",  x: 330, y: 166, status: "ok",      lbl: "b" },
  { id: "parrot-tree", en: "Parrot Tree",     es: "Parrot Tree",     x: 392, y: 158, status: "ok",      lbl: "b" },
  { id: "politilly",   en: "Politilly Bight", es: "Politilly Bight", x: 468, y: 132, status: "ok",      lbl: "t" },
  { id: "punta-gorda", en: "Punta Gorda",     es: "Punta Gorda",     x: 540, y: 104, status: "out",     lbl: "t" },
  { id: "jonesville",  en: "Jonesville",      es: "Jonesville",      x: 562, y: 138, status: "ok",      lbl: "b" },
  { id: "oak-ridge",   en: "Oak Ridge",       es: "Oak Ridge",       x: 614, y: 128, status: "ok",      lbl: "b" },
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
  }, { threshold: 0.15 });
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
