# Backend (planned)

Backend implementation has not started. This directory intentionally contains documentation only; it does not contain placeholder routes, controllers, models, or server code.

## Planned stack

- Node.js and Express.js
- MongoDB with Mongoose
- JWT authentication and bcryptjs password hashing
- Cloudinary for property image storage

Initialize the backend as an independent Node.js application in this directory when backend work begins. Keep its dependencies, environment variables, scripts, and generated files separate from `frontend/`.

## Frontend integration notes

The frontend already separates API calls in `frontend/src/services/`. Set `VITE_USE_MOCK=false` and configure `VITE_API_URL` in `frontend/.env.local` when a compatible API is ready. The current property service expects list responses shaped as `{ data: Property[], total?: number }`; create responses must include a property `id` directly or under `data` or `property`. Update and delete operations currently use `/properties/:id`.

Property records should retain the frontend's current shape: string `id`, title and type, numeric rent/deposit/bedrooms/bathrooms/area, nested `location`, image URL array, amenities, availability/verification fields, and nested owner details. Authentication requests currently attach the `nf_token` value; coordinate the eventual login response/token storage contract before enabling real authentication.

Wishlist storage is currently demo-only browser persistence. Define a server-side wishlist contract before replacing that adapter. Do not treat localStorage demo listings, inquiries, visits, or authentication as production data.
