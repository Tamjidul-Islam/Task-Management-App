# Task Management App — Lab_2

Simple Node/Express app used for Lab 2. This project exposes a small HTTP API and demonstrates mounting a router from `routes/tasks.js`.

## Files
- `server.js`: Express application entrypoint. Parses JSON, mounts the `routes/tasks` router at `/`, and provides a couple of basic endpoints (`/` and `/health`).
- `package.json`: Project metadata and `start` script (`node server.js`). Depends on `express`.
- `routes/tasks.js`: Router containing task-related routes (mounted at root by `server.js`).

## Requirements
- Node.js (v16+ recommended)
- npm (bundled with Node.js)

## Install
Open PowerShell in the `Lab_2` folder and run:

```powershell
npm install
```

## Run
# Lab 2 — Task Management App

I built a simple Node.js + Express server for Lab 2. It mounts the router in `routes/tasks.js` and exposes a few endpoints for testing.

Files
- `server.js` — app entry point; parses JSON, mounts the router, and starts the server on port 3000.
- `package.json` — project metadata and `start` script (`node server.js`).
- `routes/tasks.js` — task-related routes (create/read/update/delete).

Run
Start the server with:

```powershell
npm start
```

The server listens on port `3000` by default. You should see:

```
Server runs on http://localhost:3000
```

Endpoints
- `GET /` — returns a short hello message.
- `GET /health` — returns JSON with `status` and `uptime`.
- Task endpoints — see `routes/tasks.js` for the exact routes and payloads.

Quick examples

```powershell
curl http://localhost:3000/
curl http://localhost:3000/health
```

Notes
- If you add or change dependencies, run `npm install` again.
- If port 3000 is taken, either stop the other process or change the `PORT` value in `server.js`.

Copyright
© 2025 Tamjidul-Islam. All rights reserved.



