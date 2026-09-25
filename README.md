# Mattevägen

Math game for children aged 6–8 (förskoleklass–åk 2). World 1 · Gröna dalen, 7 levels that cover all five areas of *centralt innehåll* for åk 1–3 (Lgr22).

## Getting started
```bash
npm install
npm run dev
```

Build a PWA (installable on iOS, Android and desktop): `npm run build && npm run preview`.

### Demo states
- `/?start=halvvags` – levels 1–3 done, auto support on
- `/?start=klart` – whole world done
- `/?start=ny` – reset
- `/?layout=mobil` / `/?layout=desktop` – force a layout
- `/?support=pa` / `/?support=av` – support setting (Alltid på / Av)

Progress is saved in `localStorage` (`mattevagen:v1`).

## Architecture
See [AGENTS.md](AGENTS.md). The components follow Atomic Design: atoms → molecules → organisms → templates → pages.
