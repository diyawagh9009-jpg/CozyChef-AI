# 🍓 Mochi Bites

A cozy recipe generator that feels like a cute game, built with React, Vite, TailwindCSS, Framer Motion, and an Express backend using OpenAI.

## Features
- Cozy UI inspired by cute mobile games and Sanrio.
- Ingredient chips and playful mascot interactions.
- Streaming recipe generation through OpenAI.
- Smooth micro-animations and sound effects.
- Responsive layout for desktop, tablet, and mobile.
- Docker-ready deployment.

## Structure
- `client/` — React + Tailwind frontend.
- `server/` — Express API server.
- `public/` — static assets and placeholders.
- `Dockerfile` / `docker-compose.yml` — container setup.

## Setup
1. Copy `.env.example` to `.env`.
2. Set `OPENAI_API_KEY` in `.env`.
3. Install dependencies:
   - `cd client && npm install`
   - `cd ../server && npm install`

## Run locally
- Start backend: `cd server && npm run start`
- Start frontend: `cd client && npm run dev`

## Docker
- Build and run: `docker compose up --build`

## AWS App Runner deployment
1. Push repository to GitHub.
2. Create a new App Runner service.
3. Connect to GitHub repository.
4. Use `Dockerfile` as build configuration.
5. Set environment variables:
   - `OPENAI_API_KEY`
   - `PORT=4000`
6. Deploy the service.

## Notes
- API key stays on server only.
- Sound can be muted with the toggle.
- Recipe results are parsed from markdown into collectible recipe cards.
