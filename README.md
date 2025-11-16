# IDPA_FLMI — Static Tailwind Site (Dockerized)

A minimal static website scaffold inside this repository. It's framework-free and uses Tailwind via the Play CDN, vanilla JavaScript, and nginx inside Docker for serving.

What you get
- `index.html` — the main page using Tailwind Play CDN
- `assets/css/styles.css` — tiny custom CSS
- `assets/js/main.js` — small JS for interactivity
- `Dockerfile` — nginx-based image that serves the static files
- `docker-compose.yml` — convenience compose file that exposes port 8080

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
# IDPA_FLMI
IDPA
