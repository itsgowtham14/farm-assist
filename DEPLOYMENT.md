# 🚀 Deployment Checklist for FarmAssist

## Pre-Deployment Checklist

### ✅ Environment Configuration
- [ ] Created MongoDB Atlas account and cluster
- [ ] Got MongoDB Atlas connection string
- [ ] Generated strong JWT secret key
- [ ] (Optional) Got Hugging Face API key
- [ ] Updated `.env` files are NOT committed to Git

### ✅ Code Preparation
- [ ] All hardcoded URLs replaced with environment variables
- [ ] Frontend uses `API_URL` from config
- [ ] Backend uses environment variables for sensitive data
- [ ] CORS configured for production
- [ ] Server exports default for Vercel serverless

### ✅ MongoDB Atlas Setup
1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Create database user with password
3. Whitelist IP: Add `0.0.0.0/0` for Vercel access
4. Get connection string: 
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/farmassist?retryWrites=true&w=majority
   ```

## Deployment Steps

### 🔧 Step 1: Deploy Backend (Server)

1. **Go to Vercel**: https://vercel.com
2. **Import Project** from GitHub
3. **Configure Project**:
   - Name: `farm-assist-backend` (or your choice)
   - Framework Preset: Other
   - Root Directory: `server`
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

4. **Add Environment Variables**:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/farmassist
   JWT_SECRET=your_random_strong_secret_at_least_32_chars
   HUGGINGFACE_API_KEY=hf_your_key_here
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-will-be-here.vercel.app
   ```

5. **Deploy** and copy the URL (e.g., `https://farm-assist-backend.vercel.app`)

### 🎨 Step 2: Deploy Frontend

1. **Update Frontend `.env`**:
   ```bash
   # In the root .env file
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

2. **Commit and push to GitHub**:
   ```bash
   git add .env
   git commit -m "Update API URL for production"
   git push
   ```

3. **Go to Vercel Dashboard**
4. **Import Project** (same repository)
5. **Configure Project**:
   - Name: `farm-assist` (or your choice)
   - Framework Preset: Vite
   - Root Directory: `.` (leave as root)
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

7. **Deploy** and copy the URL (e.g., `https://farm-assist.vercel.app`)

### 🔄 Step 3: Update Backend CORS

1. Go to backend project settings on Vercel
2. Update `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://your-actual-frontend-url.vercel.app
   ```
3. Redeploy backend (or it will auto-redeploy)

## Testing Deployment

### ✅ Test Backend
Visit: `https://your-backend-url.vercel.app/api/metadata/states`
- Should return JSON array of states
- Should NOT show CORS errors

### ✅ Test Frontend
1. Visit: `https://your-frontend-url.vercel.app`
2. Test features:
   - [ ] Home page loads
   - [ ] User registration works
   - [ ] Login works
   - [ ] Crop selection loads states
   - [ ] Timeline displays
   - [ ] AI solution generation works
   - [ ] Notes and issues save properly
   - [ ] Admin login works
   - [ ] Session timeout works (wait 10 mins)

## Common Issues & Fixes

### ❌ Backend: MongoDB Connection Failed
**Problem**: Can't connect to database
**Fix**: 
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify connection string has correct username/password
- Check if database user has read/write permissions

### ❌ Frontend: API Calls Failing
**Problem**: "Network Error" or "Failed to fetch"
**Fix**:
- Verify `VITE_API_URL` points to correct backend URL
- Check backend is deployed and running
- Open browser console and check actual API URL being called
- Ensure backend URL includes `/api` at the end

### ❌ CORS Errors
**Problem**: "Access-Control-Allow-Origin" error
**Fix**:
- Update `FRONTEND_URL` in backend environment variables
- Make sure it matches your actual frontend URL exactly
- Redeploy backend after updating

### ❌ 500 Internal Server Error
**Problem**: Server crashes on requests
**Fix**:
- Check Vercel backend logs: Project → Deployments → Click deployment → Runtime Logs
- Common causes:
  - Missing environment variables
  - MongoDB connection string incorrect
  - JWT_SECRET not set

### ❌ Environment Variables Not Working
**Problem**: App behaves like env vars aren't set
**Fix**:
- In Vercel, env vars need manual redeploy after changes
- Click "Redeploy" button after updating environment variables
- For Vite frontend, env vars MUST start with `VITE_`

## Maintenance

### Update Backend Code
```bash
git add .
git commit -m "your message"
git push
```
Vercel auto-deploys from GitHub!

### View Logs
- Go to Vercel Project → Deployments → Click on deployment
- View "Runtime Logs" for backend errors
- View "Build Logs" for build errors

### Update Environment Variables
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Edit variable
3. Click "Redeploy" for changes to take effect

## Security Reminders

- ✅ Never commit `.env` files
- ✅ Use strong JWT_SECRET (32+ random characters)
- ✅ Keep MongoDB credentials secure
- ✅ Don't share API keys publicly
- ✅ Regularly rotate secrets in production

## Performance Tips

- ✅ MongoDB Atlas: Use free M0 cluster for testing
- ✅ Vercel: Free tier suitable for small traffic
- ✅ Upgrade if you get 5000+ users
- ✅ Consider CDN for images (if added later)

## Support

Having deployment issues?

📧 Email: 231fa04094@vignan.ac.in
🐛 GitHub Issues: https://github.com/itsgowtham14/farm-assist/issues

---

**Deployment Status:**
- [ ] Backend deployed
- [ ] Frontend deployed  
- [ ] CORS configured
- [ ] Tested all features
- [ ] Ready for users! 🎉
