# NextFind

NextFind is a rental marketplace frontend built with React, Vite, and Tailwind CSS v4. The repository is organized as a monorepo so backend development can be added independently without changing the frontend's application structure.

## Repository layout

```text
NextFind/
├── frontend/   Existing React + Vite application
├── backend/    Backend project notes; implementation is pending
├── .gitignore
└── README.md
```

## Run the frontend

From the repository root:

```powershell
cd frontend
npm install
Copy-Item .env.example .env.local
npm run dev
```

The environment file is optional for demo mode. Edit `frontend/.env.local` to configure the API URL or switch `VITE_USE_MOCK` to `false` when a compatible backend is available.

## Frontend checks

Run these commands from `frontend/`:

```powershell
npm run build
npm run lint
```

See [backend/README.md](./backend/README.md) for the planned backend stack and integration notes.
