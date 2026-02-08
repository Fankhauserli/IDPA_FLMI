# Project Overview

This project hosts a static website for an "Interdisziplinäre Projektarbeit" (IDPA). The website is served by Nginx within a Docker container, and its deployment is automated through GitHub Actions.

# Building and Running

The project can be built and run locally using Docker Compose.

**Quick Start:**

*   **Build image and run in foreground:**
    ```bash
    docker compose up --build
    ```
*   **Run in background:**
    ```bash
    docker compose up --build -d
    ```
*   **Stop:**
    ```bash
    docker compose down
    ```

After running `docker compose up`, the website will be accessible at `http://localhost:8080` in your browser.

# Development Conventions

*   **Containerization:** The project leverages Docker for packaging and running the application.
*   **CI/CD:** Continuous Integration and Deployment are managed via GitHub Actions (see `.github/workflows/build-idpa.yml`).
*   **Website Technology:** The website itself is composed of static HTML, CSS, and JavaScript files.
