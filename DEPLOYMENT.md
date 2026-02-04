# Deployment Guide: City Sphere

This guide outlines the steps to deploy the **City Sphere** application to production using Render (Backend) and Vercel (Frontend).

## 1. Prepare for Deployment

Ensure both `package.json` files are up to date and all local changes are committed to a Git repository.

### Backend Checks
- Ensure `process.env.PORT` is used for `app.listen`.
- Ensure all relative imports use the `.js` extension (done during ESM migration).
- Ensure `cors` is configured to allow your frontend URL.

### Frontend Checks
- Ensure `axios` base URL or proxy is configured for the production API URL.

---

## 2. Deploy Backend (Render)

1. Create a new **Web Service** on Render and connect your GitHub repository.
2. **Root Directory**: `backend`
3. **Build Command**: `npm install`
4. **Start Command**: `node server.js`
5. **Environment Variables**:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `PORT`: 10000 (Render's default).
6. Once deployed, copy your **Web Service URL** (e.g., `https://city-sphere-api.onrender.com`).

---

## 3. Deploy Frontend (Vercel)

1. Create a new project on Vercel and connect your GitHub repository.
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Environment Variables**:
   - `VITE_API_URL`: Set this to your backend URL (e.g., `https://city-sphere-api.onrender.com`).
6. If using a proxy in `vite.config.js`, you may need to update it or use the full URL in `axios` calls.

---

## 4. Final Updates

1. **CORS**: Go back to your Render dashboard and update your backend `.env` or CORS config to allow requests from your new Vercel URL (e.g., `https://city-sphere.vercel.app`).
2. **Auth0/OAuth**: If you have Google Login or Auth0 enabled, add your Vercel URL to the **Allowed Origins** and **Callback URLs** in your provider's dashboard.

Your application should now be live and publicly accessible!
