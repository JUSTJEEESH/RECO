# RECO Reimagined — a concept redesign of recoroatan.com

An independent, unofficial proposal showing what the Roatán Electric Company's
website could be for the people of Roatán: bilingual, transparent, mobile-first,
and genuinely useful. **Not affiliated with or endorsed by RECO.** All rates,
outages, wait times, and account data are illustrative samples.

## View it

No build step, no dependencies. Open `index.html` in any browser, or serve the
folder statically (e.g. `python3 -m http.server`) — it also works as-is on
GitHub Pages.

## What it does that the current site doesn't

| Area | Current site | This concept |
|---|---|---|
| Language | Mixed ES pages under `/en/` | True EN/ES toggle on every word, remembered per visitor |
| Outages | Facebook posts | Live island map with 14 zones, causes, restoration ETAs, planned-work calendar, and free WhatsApp/SMS alerts per zone |
| Payments | Links out to GINIH | Pay on-site in two minutes, plus GINIH, banks, and offices with live wait times |
| Account | None | Demo portal: balance, due date, 12-month usage chart, bill history, autopay & paperless toggles |
| Rates | Not published | Full tariff in plain language + an interactive bill calculator (kWh → lempiras, with US$ equivalent) |
| Bill literacy | PDF-style "know your bill" page | Tap-to-expand explanation of every line item |
| New service | Visit the office | Requirements up front, apply online, track the request |
| Transparency | — | Live generation mix (LPG / wind / solar / battery), today's demand curve, fuel-adjustment explainer |
| Design | Desktop-era WordPress | Responsive, accessible (keyboard, ARIA, reduced motion), light & dark themes |

## Structure

- `index.html` — all pages (hash-routed: home, outages, billing, rates, service, energy, news, contact)
- `styles.css` — design system: reef-teal/amber palette, token-level light & dark themes
- `app.js` — EN/ES i18n, router, demo data, and hand-rolled SVG charts (energy-mix donut, usage bars, demand curve, outage map)

Real-world details (28 MW LPG plant with Wärtsilä engines, Trade Winds wind farm,
7 MW solar + GEMS batteries, Santa Elena submarine cable, office locations and
phone numbers) come from RECO's public materials; everything dynamic is simulated
client-side so the demo runs anywhere.
