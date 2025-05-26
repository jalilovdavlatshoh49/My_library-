# Library Backend

Backend for a library app: Express.js + TypeScript + MongoDB

## Features

- User registration & login (JWT)
- Book CRUD (admin only for create/update/delete)
- Book search & filter
- Favorites
- Image upload (local)
- Swagger API docs
- Rate limiting & security best practices

## Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/library-backend.git
   cd library-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   - Copy `.env.example` to `.env`, then fill the values.

4. **Run locally (dev mode with auto-restart):**
   ```bash
   npm run dev
   ```

5. **Build & run production:**
   ```bash
   npm run build
   npm start
   ```

6. **API Docs:**
   - After running, visit: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## Folder Structure

```
src/
  controllers/
  middleware/
  models/
  routes/
  validation/
  swagger.ts
  app.ts
  server.ts
uploads/
.env.example
```

## Notes

- For image upload, `uploads/` folder must exist and be writable.
- Default CORS allows localhost and Expo dev; change in `app.ts` if needed.
- Use [MongoDB Community Edition](https://www.mongodb.com/try/download/community) or Atlas.

---

**Front-end:** [See separate repository or folder]
