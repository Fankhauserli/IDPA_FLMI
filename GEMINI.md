# Gemini Project Context: IDPA_FLMI

This document provides context for the `IDPA_FLMI` project, which is a static website.

## Project Overview

The project is a static website for an "Interdisziplinäre Projektarbeit" (interdisciplinary project). It is served using Nginx and is fully containerized with Docker.

The main technologies are:
*   **Web Server:** Nginx (from the `nginx:stable-alpine` Docker image)
*   **Containerization:** Docker
*   **Orchestration (local):** Docker Compose
*   **CI/CD:** GitHub Actions

The `Dockerfile` copies the repository's contents into the `/usr/share/nginx/html/` directory of the Nginx container, making it available to be served as a static site.

## Building and Running

### Local Development

To build and run the website locally, you need Docker and Docker Compose.

1.  **Build and run in the foreground:**
    ```bash
    docker compose up --build
    ```

2.  **Build and run in the background:**
    ```bash
    docker compose up --build -d
    ```

3.  **Stop the running containers:**
    ```bash
    docker compose down
    ```

When running locally, the website is accessible at `http://localhost:8080`.

### Deployment

Deployment is handled automatically by a GitHub Actions workflow defined in `.github/workflows/build-idpa.yml`.

When code is pushed to the `main` or `master` branch:
1.  A Docker image is built.
2.  The image is tagged with metadata (like branch name, semantic version, and commit SHA).
3.  The image is pushed to the GitHub Container Registry (`ghcr.io`).

The `README.md` mentions that a separate job, running every 5 minutes, deploys the latest Docker image to the following URLs:
*   `https://f3o.ch`
*   `https://www.f3o.ch`
*   `https://idpa.voyagera.ch`

## Development Conventions

*   All development and deployment is done via Docker.
*   The project follows a typical Git workflow where pushes to the main branches trigger a build and deployment.
*   The `docker-compose.yml` is set up to watch for file changes and automatically rebuild the service, which is useful for local development.
