# Gemini Project Context: IDPA_FLMI

## Project Overview

This project is a static website designed to provide educational content and visualizations related to Large Language Models (LLMs). The main entry point (`index.html`) serves as a landing page, linking to different sub-topics.

The project is containerized using Docker and served with `nginx`. It is intentionally built without a front-end framework, relying on plain HTML and Tailwind CSS for styling (loaded via the Play CDN).

The content includes:
- A page explaining and visualizing **Backpropagation**.
- A page with information about the **Transformer** architecture.

## Building and Running

The project is run using Docker Compose.

- **To build and run the application:**
  ```bash
  docker compose up --build
  ```
- **To run in the background:**
  ```bash
  docker compose up --build -d
  ```
- **To stop the application:**
  ```bash
  docker compose down
  ```

Once running, the website is accessible at `http://localhost:8080`.

The `docker-compose.yml` is configured to watch for file changes and automatically rebuild the service, streamlining development.

## Development Conventions

- **Framework-Free:** The project intentionally avoids any JavaScript frameworks.
- **Styling:** Styling is primarily handled by Tailwind CSS, included via a CDN in the HTML files. A small set of custom styles and overrides are located in `assets/css/styles.css`.
- **Structure:**
    - `index.html`: The main landing page and directory.
    - `LLM/`: Contains the educational content, with each sub-directory representing a topic.
    - `assets/`: Contains static assets like CSS.
    - `Dockerfile`: Defines the `nginx` container for serving the site.
    - `docker-compose.yml`: Orchestrates the build and run process.
