# FarmAssist - Backend

This folder contains a minimal Express + Mongoose backend for the FarmAssist app.

Prerequisites
- Node.js 18+ (or current LTS)
- MongoDB (local or Atlas)

Quick start

1. Install dependencies

```powershell
cd server
npm install
```

2. Create a `.env` file in the `server` folder if you want to set `MONGO_URI` and `PORT`.

3. Seed sample data

```powershell
npm run seed
```

4. Start the server

```powershell
npm run dev
# or
npm start
```

The backend will run on port 5000 by default. Endpoints:
- GET /api/metadata/states
- GET /api/metadata/seasons
- GET /api/metadata/crops?state=<stateId>&season=<season>
- GET /api/products
- POST /api/products
- POST /api/selections
- GET /api/selections/:id
- GET /api/timeline?cropId=<id>&season=<season>&sowingDate=YYYY-MM-DD
- POST /api/issues

Next steps: add authentication, admin UI, and more advanced schedule adjustment rules.
