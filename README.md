# IDPA_FLMI

## Our IDPA Text

> I don't see the benefit of this!

The hole research made for the IDPA can be found inside the [docs folder](./docs/).

## Website

Quick start

Build and run locally with Docker Compose:

```bash
# build image and run in foreground
docker compose up --build --watch

# run in background
docker compose up --build --watch -d

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
