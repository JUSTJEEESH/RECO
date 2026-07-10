# RECO Reimagined — The World-Class Roadmap

*A plan to build the best small-utility website in the Western Hemisphere — for an island that has never seen anything like it.*

This roadmap distills deep research into America's biggest and best utility digital
experiences — FPL, Duke Energy, Georgia Power, TECO, PG&E, SCE, SDG&E, SRP, APS,
ConEd, National Grid, ComEd, Xcel, DTE — plus the innovators (Green Mountain Power,
EPB Chattanooga, Austin Energy), the island specialists (Hawaiian Electric, KIUC
Kauai, BELCO Bermuda, JPS Jamaica, FortisTCI, LUMA Puerto Rico), Latin American
WhatsApp service models (EEGSA Guatemala, CFE Mexico, ICE Costa Rica), and the
behavioral-science platforms behind them (Opower, Uplight, Bidgely).

**Every feature below is demo-able as a static site with simulated data.**
Tags: `S/M/L` = build effort · `P1/P2/P3` = build phase.

---

## Why we'll win (what the research says)

1. **The bar is low.** J.D. Power scores US utility digital experience at 611–616/1000 —
   the worst of any industry studied. 32% of US utility sites fail *basic* navigation
   standards; only 16% deliver proactive, personalized guidance. A small island utility
   can leapfrog nearly every US major.
2. **Three tasks decide everything:** viewing outages, reporting outages, and managing
   your bill/plan. The 100-point gap between the best and worst utilities is mostly these.
3. **Mobile decides satisfaction.** App-like experiences score ~60 points higher than
   mobile websites. We design phone-first, always.
4. **Transparency IS the feature.** Escalent's trust research: brand trust comes from
   *visible follow-through, genuinely listening, and communicating more* — not grid
   perfection. For a strained island grid, making cost, outages, and progress radically
   visible is the winning strategy.
5. **WhatsApp is the channel.** It's the default communication tool in Honduras. No US
   mainland utility treats it as first-class; LUMA (Puerto Rico) and EEGSA (Guatemala)
   prove the model for our region.

---

## Pillar 1 — Outage experience (the trust-maker)

- [ ] **1.1 Storm mode** *(FPL)* — during major events the outage map switches to an honest
  "under assessment" state instead of fake ETAs, with a system-wide banner. `M · P1`
- [ ] **1.2 Crew status tracking** *(Duke/EPB)* — every outage shows a 4-stage tracker:
  Reported → Crew assigned → Crew en route → On site → Restored. Package-tracking for power. `S · P1`
- [ ] **1.3 ETA-change re-notification** *(FPL)* — if a restoration estimate slips by more
  than an hour, affected subscribers are re-notified. Shown in demo alert previews. `S · P2`
- [ ] **1.4 Per-zone outage history** *(SRP)* — every zone page shows its last 90 days:
  outage count, total minutes, causes. Nobody in the Caribbean publishes this. `M · P1`
- [ ] **1.5 No-login outage lookup + subscribe by address** *(PG&E)* — anyone (renters,
  relatives in the States) can check any zone and subscribe to updates until restoration. `S · P1`
- [ ] **1.6 Planned-outage communication cadence** *(PG&E PSPS playbook)* — published promise:
  notice 48h before, 24h before, at start, at restoration — for every planned outage. `S · P1`
- [ ] **1.7 Phased storm-restoration promise** *(FPL)* — a published contract: within 24h of a
  hurricane, a system-wide estimate; 48h, zone estimates; 96h, neighborhood estimates. `S · P1`
- [ ] **1.8 Restoration-priority explainer** *(FPL/TECO)* — "who gets power back first and why":
  hospital & water systems → main feeders → neighborhoods → individual services, illustrated. `S · P1`
- [ ] **1.9 Two-way SMS shortcode** *(ComEd/Duke)* — text OUT to report, STAT for status; demo
  shows the conversation flow. Works on any phone, no data plan needed. `S · P2`
- [ ] **1.10 Predictive outage notice** *(FPL, Chartwell Gold)* — aspirational: "equipment in your
  area is showing signs of failure; maintenance scheduled Tuesday" proactive notices. `M · P3`
- [ ] **1.11 Self-healing grid storytelling** *(Duke)* — "outages avoided this year" counter that
  celebrates reliability work customers never see. `S · P2`
- [ ] **1.12 Outage map polish** — customers-affected count per event, last-updated timestamp,
  15-minute refresh promise, cause taxonomy (tree/salt/equipment/planned). Partially built. `S · P1`

## Pillar 2 — Storm & hurricane center (Roatán's signature section)

- [ ] **2.1 Permanent hurricane hub** *(FPL/TECO/FortisTCI)* — before/during/after guidance,
  printable checklist, generator safety, food-safety timers, boat & dock power safety. `M · P1`
- [ ] **2.2 Season-readiness report** *(FPL)* — what RECO did this year: kilometers of line
  trimmed, poles replaced, fuel reserve days, drills run. Published every June 1. `S · P1`
- [ ] **2.3 Storm live-status page** — single memorable URL that becomes the island's
  information hub during events: shelters, ice, charging stations, marine warnings. `M · P2`
- [ ] **2.4 Offline-capable storm pages (PWA)** — prep content cached on phones so it works
  when towers are congested or data is out. `M · P3`
- [ ] **2.5 Medical & critical-care registry** *(PG&E Medical Baseline)* — registered households
  with dialysis/oxygen/refrigerated medicine get escalating outage notifications and
  priority restoration; demo shows the signup and the promise. `M · P2`

## Pillar 3 — Billing, payments & financial dignity

- [ ] **3.1 Prepaid electricity done right** *(SRP M-Power + JPS Pay As You Go)* — the flagship:
  live balance, **"~9 days of power remaining"** projection, low-balance alerts, top-up from
  phone or with a **personal cash barcode** at any pulpería/bank agent. Prepay is already
  the Caribbean norm — SRP proves it can be a premium experience, and prepay customers
  use ~8–12% less energy. `L · P1`
- [ ] **3.2 Friendly Credit** *(SRP)* — prepaid never disconnects at night, on weekends, or
  holidays. The humane failure mode, stated as policy. `S · P1`
- [ ] **3.3 Guest pay / pay-for-someone-else** *(DTE)* — pay any account with just the account
  number, no login. Built for diaspora families in the US paying for relatives on the island. `S · P1`
- [ ] **3.4 Pick your due date** *(Duke)* — align the bill with your payday. Trivial to build,
  almost nobody offers it, hugely loved. `S · P1`
- [ ] **3.5 Payment-flexibility ladder** *(Duke)* — self-service, no phone call, no shame:
  due-date extension (10 days, 2×/year) → installment plan (split past-due over 4–12 months)
  → disconnect extension. Clear eligibility rules published. `M · P1`
- [ ] **3.6 Budget billing** *(National Grid)* — same amount every month (12-month rolling
  average), one-click enroll, visible deferred balance so it never surprises. `S · P2`
- [ ] **3.7 FlatBill** *(Georgia Power)* — a true fixed-price 12-month contract option for
  those who value certainty over optimization. `S · P3`
- [ ] **3.8 Safety Net** *(SRP)* — mirror past-due/low-balance alerts to a designated relative
  or caseworker. Perfect for elderly customers with family abroad. `S · P2`
- [ ] **3.9 Digital wallets + QR pay** *(EPB, Chartwell Gold)* — Apple Pay/Google Pay/PayPal
  alongside GINIH, cards, banks, and cash; QR code on every bill deep-links to payment. `M · P2`
- [ ] **3.10 Assistance finder wizard** *(ComEd SAM)* — a 2-minute questionnaire that routes
  struggling customers to the right program (installments, prepay, discounts) *before*
  disconnection. Huge goodwill per line of code. `M · P2`
- [ ] **3.11 Payment locations map** *(Xcel/National Grid)* — every bank, agent, and office
  that accepts RECO payments, with hours and live wait times. `S · P2`

## Pillar 4 — Usage insights & bill shock prevention

- [ ] **4.1 "How you're doing so far"** *(SDG&E — the single best dashboard idea in America)* —
  charges-to-date + projected end-of-cycle bill, front and center, updated daily. `M · P1`
- [ ] **4.2 Mid-cycle high-bill alert** *(Uplight/Duke/ComEd)* — warned *before* the bill lands:
  "you're trending 30% above normal" or past a dollar threshold **you** set; alerts at 75%
  and 100% of your budget. Cut high-bill calls 38% where deployed. `M · P1`
- [ ] **4.3 Usage dashboard with weather overlay** *(FPL Energy Dashboard)* — monthly/daily/hourly
  charts with temperature overlaid — answers "why is my bill high" visually (heat = AC). `M · P1`
- [ ] **4.4 Appliance itemization** *(Bidgely/FPL Energy Analyzer)* — "your bill, itemized":
  AC L 2,100 · fridge L 480 · water heater L 390 · always-on L 310. The proven antidote
  to "my bill doesn't match my usage." `M · P2`
- [ ] **4.5 Neighbor comparison with smiley norms** *(Opower — 1.9–2% proven savings)* — "you
  used 12% less than similar homes nearby 🙂" with efficient-homes benchmark and next steps. `M · P2`
- [ ] **4.6 Personalized top actions** *(Uplight/PG&E Energy Action Guide)* — answer 6 questions
  about your home → ranked savings list with lempira estimates per action. `M · P2`
- [ ] **4.7 Bill comparison explainer** *(ConEd)* — "this bill vs last month vs this month last
  year," with the drivers (days in cycle, weather, rate change) called out in words. `S · P1`
- [ ] **4.8 Download my data** *(Green Button)* — CSV export of your usage history. `S · P3`

## Pillar 5 — Rates & radical transparency (the trust crisis, attacked head-on)

- [ ] **5.1 Fuel transparency dashboard** *(BELCO — "we make no profit on fuel")* — the monthly
  fuel adjustment with its actual math: cargo price, gallons, generation split, the resulting
  L/kWh — and the statement that it's a pass-through. This is THE page for RECO's reputation. `M · P1`
- [ ] **5.2 Public reliability scorecard** *(US state regulators' SAIDI/SAIFI model)* — average
  outage minutes per customer, outages this month, trend vs last year, worst feeders and
  their fix plans. **No Caribbean utility volunteers this. Instant credibility.** `M · P1`
- [ ] **5.3 Rate plans as a named menu** *(Georgia Power's 5 plans)* — Standard, Prepay,
  Budget, FlatBill, Time-of-Use — presented like phone plans with "best for" labels. `M · P2`
- [ ] **5.4 Shadow bill** *(ConEd Smart Energy Plan)* — "on Time-of-Use you would have paid
  L 340 less last month" — computed from your actual usage, de-risking plan switches. `M · P2`
- [ ] **5.5 "What you'd pay on each plan" on the bill itself** *(APS)* — the comparison printed
  right on every bill. Zero-effort transparency. `S · P2`
- [ ] **5.6 How your rate is set** *(BELCO/ELPC)* — who approves rates (CREE), when they change,
  where the money goes — one illustrated page. `S · P1`
- [ ] **5.7 "You said, we did" scorecard** *(Escalent trust drivers)* — quarterly: top complaint
  themes, what changed in response. Trust = visible follow-through. `S · P2`
- [ ] **5.8 A named, dated public promise** *(Green Mountain Power "Zero Outages 2030")* —
  e.g. **"Roatán 50×30: 50% renewable by 2030"** with a progress tracker on the homepage.
  Converts infrastructure work into a story the island can root for. `M · P1`

## Pillar 6 — Clean energy & the island grid story

- [ ] **6.1 Renewable project status board** *(Hawaiian Electric)* — every project (battery
  expansion, solar phase 2) with status, MW, and expected fuel savings. `M · P2`
- [ ] **6.2 "100% renewable hours" counter** *(KIUC Kauai)* — celebrate every hour solar+wind+
  battery carried the island; monthly record tracker. Kauai went 10%→60% renewable — the
  best possible role model for Roatán, same size, same isolation. `M · P2`
- [ ] **6.3 Peak-event bill credits** *(ComEd Peak Time Savings / TECO Prime Time Plus)* —
  "reduce tonight 6–9pm, earn credits" — pure carrot, measured against your own baseline.
  On a diesel-peak island this genuinely lowers everyone's costs. `M · P2`
- [ ] **6.4 Home battery / VPP program page** *(GMP's $55/month Powerwall model)* — storage as
  a customer product that also stabilizes the grid. `M · P3`
- [ ] **6.5 Rooftop solar interconnection portal** *(HECO CIT)* — requirements, application,
  status tracking for connecting panels to the grid. `M · P3`
- [ ] **6.6 Live grid dashboard upgrades** — expand the existing energy-mix donut & demand curve:
  fuel burned today, CO₂ avoided, battery state of charge. `S · P1`

## Pillar 7 — Channels: meet people where they are

- [ ] **7.1 WhatsApp-first service** *(EEGSA "Sunny", LUMA, CFE)* — a demo WhatsApp bot
  conversation: check balance, get bill PDF, report outage by pole number, request
  reconnection, outage alerts. **The single most locally-relevant feature in this roadmap.**
  Include the verified-number anti-phishing block (CFE lesson). `M · P1`
- [ ] **7.2 Notification preference center** *(Xcel)* — one screen: every alert type ×
  WhatsApp/SMS/email/push, quiet hours, language choice. `M · P1`
- [ ] **7.3 Auto-enrolled outage alerts** *(SRP — J.D. Power #1 partly on this)* — every customer
  with a phone number on file gets outage alerts by default (opt-out, not opt-in). `S · P1`
- [ ] **7.4 Installable PWA** — add-to-homescreen app with offline shell; app-quality without
  the app store. J.D. Power: this is where the satisfaction points live. `M · P3`
- [ ] **7.5 Scoped chatbot with human handoff** *(Hydro-Québec Voltère: 27% call deflection)* —
  demo assistant answering billing/outage/service FAQs in EN/ES. `L · P3`
- [ ] **7.6 Bilingual parity + accessibility** *(National Grid/ConEd)* — keep EN/ES 100% parity
  (already built), target WCAG 2.1 AA, publish the accessibility commitment. `S · P1`

## Pillar 8 — Service & everyday tasks

- [ ] **8.1 Start/stop/move microsite** *(DTE/Evergy Chartwell Gold)* — guest-capable, scheduled
  orders, same-day connection promise if ordered by noon *(FPL)*. Expand what's built. `M · P2`
- [ ] **8.2 Technician appointment tracking** — Uber-style: your inspection is #3 in queue,
  technician Marco arrives ~10:40. `M · P3`
- [ ] **8.3 Construction & contractor portal** — technical standards PDF library, bulk
  connection requests, inspection scheduling. `M · P3`
- [ ] **8.4 Office wait times + queue ticket** — live lobby status (built), plus "take a number
  from your phone." `M · P3`
- [ ] **8.5 Report a broken streetlight / leaning pole** — with map pin + photo; closes the loop
  with repair status. `S · P2`

## Pillar 9 — Design & platform excellence (J.D. Power's four factors)

- [ ] **9.1 Task-first mobile home screen** — balance, outage status, pay button above the fold
  on every phone. `S · P1`
- [ ] **9.2 Speed budget** — < 2s first load on 3G, zero external dependencies (already true —
  keep it that way). `S · P1`
- [ ] **9.3 Personalizable dashboard widgets** *(SCE MySCE)* — customers choose what's on top:
  balance, usage, outage, solar. `M · P3`
- [ ] **9.4 Biometric-style demo login + remembered account** *(FPL/Xcel)* — smooth demo of
  passwordless entry. `S · P3`
- [ ] **9.5 Print-perfect pages** — bill explainer and storm checklist styled for printing
  (island reality: paper is shared). `S · P2`
- [ ] **9.6 Empty-states & error copy in both languages** — every dead end tells you what to
  do next. `S · P1`

## Pillar 10 — Data accuracy (make it "perfect" for the demo)

Everything below turns simulated data into real data. Gather over the coming weeks:

- [ ] **10.1 Real tariff sheet** — current residential/commercial/industrial rates, fixed
  charges, street-lighting levy, taxes. Sources: your own bill (best!), RECO office,
  CREE (Comisión Reguladora de Energía Eléctrica) publications.
- [ ] **10.2 Real fuel adjustment history** — last 12 months of the adjustment from bills or
  RECO's Facebook announcements → powers the fuel transparency chart.
- [ ] **10.3 Real service zones** — confirm the 14 zones/feeders against how RECO actually
  announces outages on Facebook; adjust the map.
- [ ] **10.4 Real office info** — locations, hours, phone numbers, WhatsApp numbers (verify
  +504 9448-8542 is still current), cs@ email.
- [ ] **10.5 Real fleet specs** — confirm 28 MW LPG / 4 Wärtsilä engines, Trade Winds 3.9 MW,
  solar park 7 MW, GEMS battery capacity; RECO press mentions + BNamericas.
- [ ] **10.6 Real outage patterns** — mine RECO's Facebook history for real outage
  announcements → realistic demo events, real causes, real durations.
- [ ] **10.7 Real payment channels** — exact bank list (Banco Atlántida? BAC? Ficohsa?),
  GINIH flow screenshots, agent locations.
- [ ] **10.8 Real bill anatomy** — photograph an actual RECO bill → make the interactive bill
  explainer match line-for-line. (Redact personal info.)
- [ ] **10.9 Exchange rate feed** — current HNL/USD for the calculator (update constant or
  note the date).
- [ ] **10.10 Photography** — real photos of the island, the plant, the wind turbines (with
  permission) beat stock imagery for the pitch.

---

## Build phases

| Phase | Theme | Headline features |
|---|---|---|
| **P1 — "The Trust Release"** (next) | Outages + transparency + prepay | Storm mode & crew tracking (1.1–1.2), hurricane hub (2.1–2.2), prepaid with days-remaining + cash barcode (3.1–3.2), guest pay (3.3), payment ladder (3.5), projected bill + high-bill alerts (4.1–4.3), fuel transparency (5.1), reliability scorecard (5.2), Roatán 50×30 promise (5.8), WhatsApp bot demo (7.1), preference center (7.2) |
| **P2 — "The Insight Release"** | Personal savings + programs | Appliance itemization (4.4), neighbor comparison (4.5), rate plan menu + shadow bill (5.3–5.5), renewable dashboards (6.1–6.3), assistance wizard (3.10), medical registry (2.5), streetlight reporting (8.5) |
| **P3 — "The Platform Release"** | App-grade polish | PWA + offline storm mode (7.4, 2.4), chatbot (7.5), appointment tracking (8.2), widgets (9.3), battery/solar portals (6.4–6.5) |

## Sources (research trail)

- J.D. Power US Utility Digital Experience Study 2025 & 2026 (SRP #1 at 660; industry 616)
- Chartwell Best Practices Awards 2024–2026 (FPL, Duke, EPB, SDG&E, TECO, Evergy, Hydro-Québec)
- Escalent/Cogent Utility Trusted Brand studies (trust drivers, communications intensity)
- Opower/Oracle behavioral research (neighbor comparisons, 1.9–2% savings); Uplight (high-bill
  alerts, −38% calls); Bidgely (disaggregation)
- Utility feature pages: fpl.com, duke-energy.com, georgiapower.com, tampaelectric.com, pge.com,
  sce.com, sdge.com, srpnet.com, aps.com, coned.com, nationalgridus.com, comed.com,
  xcelenergy.com, dteenergy.com, greenmountainpower.com, epb.com, austinenergy.com
- Island/Caribbean: hawaiianelectric.com, kiuc.coop, belco.bm, jpsco.com (Jamaica),
  fortistci.com, lumapr.com
- Latin America WhatsApp service: EEGSA "Sunny" (Guatemala), CFE (Mexico), ICE (Costa Rica)
