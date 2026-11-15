# NextFind frontend

## Run locally

From this directory, run `npm ci`, then `npm run dev`. Run `npm run build` for a production build and `npm run lint` for Oxlint.

## Demo persistence

When `VITE_USE_MOCK` is unset or `true`, the frontend uses curated in-memory property fixtures plus a demo persistence adapter. Owner-created listings and wishlist IDs are stored in browser localStorage; uploaded property images are stored as `Blob` records in IndexedDB. Demo account profiles and PBKDF2 password hashes are stored in localStorage, while the session stores a user ID and demo token. Passwords are never stored in plaintext. Browser-side authentication is for local demonstration only and is not production security. Data remains local to the browser profile and is not shared across devices.

The demo catalog merges new curated fixtures with existing persisted records. A persisted listing wins if its ID collides with a fixture; malformed records are reported during development and are not deleted from browser storage.

## Backend integration contracts

`services/propertyService.js`, `services/authService.js`, `services/imageService.js`, and `services/demoPersistence.js` isolate UI components from transport and demo storage. Set `VITE_USE_MOCK=false` and configure `VITE_API_URL` in an untracked `.env` file to use API mode.

The current service interfaces expect:

- `GET /properties` to return `{ data: Property[], total?: number }`.
- `GET /properties/:id` to return `{ data: Property }`.
- `POST /properties` to return `{ data: Property, message?: string }`, with a stable `id`.
- `POST /auth/login` and `POST /auth/signup` to return a user in `data` or `user`, plus a JWT in `token` or `accessToken`.
- `GET /auth/me` to return a user in `data` or `user`.
- `POST /auth/logout` to invalidate the current session when supported.
- `POST /properties/images` to accept repeated `images` multipart fields and return `{ images: ImageReference[] }` (or `{ data: { images: ImageReference[] } }`). Each reference should be a stable URL or object with a `url` field.

The backend should validate all fields and credentials independently. Client-side validation, local demo authentication, localStorage, and IndexedDB are not substitutes for API authorization, database persistence, or cloud image storage. Existing image URLs and the `images` array on the property model remain supported.
