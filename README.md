# MoneyPool-invite

The public invite page for **لمّة** (MoneyPool). An organizer shares an
`https://ag2273.github.io/MoneyPool-invite/?code=XXXXXXXXXX` link; this static
page resolves the code and shows the invitation, plus an "open the app" deep
link (`moneypool://join?code=…`).

Source of truth: `docs/invite/` in the private `ag2273/MoneyPool` repo. This
repo is public only because GitHub Pages needs a public source on the current
plan — the page contains no application source, and the Supabase publishable
key it uses is public by design (it grants nothing beyond row level security).

To publish an update: copy `index.html`, `app.js`, `styles.css`, and
`config.js` from `docs/invite/` here and push to `main`.
