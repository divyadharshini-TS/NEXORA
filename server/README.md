# NEXORA — Server (Phase 1)

This folder contains the Node + Express backend used by the NEXORA app.

Quick setup (local development)

1. Copy the example env file and set your MongoDB connection string:

```powershell
copy server\.env.example server\.env
```

Edit `server/.env` and set `MONGODB_URI` to your MongoDB Atlas connection string. Get a free Atlas cluster at: https://www.mongodb.com/cloud/atlas

2. Install dependencies (from repo root):

```bash
npm install
```

3. Start the backend in watch mode:

```bash
npm run dev:server
```

4. Health check:

```powershell
Invoke-RestMethod -Uri 'http://localhost:3001/api/health' -Method GET | ConvertTo-Json -Compress
```

5. Test signup/login:

```powershell
Invoke-RestMethod -Uri 'http://localhost:3001/api/auth/signup' -Method POST -ContentType 'application/json' -Body (ConvertTo-Json @{name='Test User'; email='test@example.com'; password='Password123!'}) | ConvertTo-Json -Compress

Invoke-RestMethod -Uri 'http://localhost:3001/api/auth/login' -Method POST -ContentType 'application/json' -Body (ConvertTo-Json @{email='test@example.com'; password='Password123!'}) | ConvertTo-Json -Compress
```

ENV keys used by server:
- `PORT` — server port (default `3001`)
- `MONGODB_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — JWT signing secret
- `GEMINI_API_KEY` — (Phase 3) Gemini API key

Next steps for Phase 1 verification:
- Confirm `.env` is populated and the frontend can register/login users.
- If you want, I can add a Postman collection or automated test script next.
