# IDPA_FLMI

Quick start

Build and run locally with Docker Compose:

```bash
# build image and run in foreground
docker compose up --build

# run in background
docker compose up --build -d

# stop
docker compose down
```

Open http://localhost:8080 in your browser.

Notes
- Tailwind is loaded directly from the Play CDN in `index.html` for simplicity. For production sites or heavy customization, add a Tailwind build step.
- The site is intentionally framework-free.

Customization
- Edit `index.html`, `assets/css/styles.css` and `assets/js/main.js` to change content and behavior.

License
See the repository `LICENSE` file.
