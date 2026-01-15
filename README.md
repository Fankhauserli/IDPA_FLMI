# IDPA_FLMI

This is the website for our "Interdisziplinäre Projektarbeit" (interdisciplinary project).

## Release

If commited to main a github action creates an docker image and publish it. Every 5 minutes a job deployes the lastest docker image to the following pages:

- <https://f3o.ch>
- <https://www.f3o.ch>
- <https://idpa.voyagera.ch>

## Testing

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

Open <http://localhost:8080> in your browser.

Notes

- Tailwind is loaded directly from the Play CDN in `index.html` for simplicity. For production sites or heavy customization, add a Tailwind build step.
- The site is intentionally framework-free.

Customization

- Edit `index.html`, `assets/css/styles.css` and `assets/js/main.js` to change content and behavior.

License
See the repository `LICENSE` file.
