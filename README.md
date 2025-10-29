# 🌾 FarmAssist - Smart Farming Companion# 🌾 FarmAssist - Smart Farming Companion



**Simple, Intelligent Agricultural Assistant for Farmers****Simple, Intelligent Agricultural Assistant for Farmers**



FarmAssist is a user-friendly web platform designed specifically for farmers to manage their crops effectively. Get week-by-week guidance, AI-powered solutions for farming issues, and access to agricultural knowledge - all in one simple interface.FarmAssist is a user-friendly web platform designed specifically for farmers to manage their crops effectively. Get week-by-week guidance, AI-powered solutions for farming issues, and access to agricultural knowledge - all in one simple interface.



------



## 🌟 Why FarmAssist?## 🌟 Why FarmAssist?



Traditional farming relies on experience and trial-and-error. FarmAssist brings modern technology to farmers through:Traditional farming relies on experience and trial-and-error. FarmAssist brings modern technology to farmers through:

- **Simple Interface**: Easy to use, designed with farmers in mind- **Simple Interface**: Easy to use, designed with farmers in mind

- **Week-by-Week Guidance**: Clear action plans from sowing to harvest- **Week-by-Week Guidance**: Clear action plans from sowing to harvest

- **AI Solutions**: Get location-specific advice for crop issues- **AI Solutions**: Get location-specific advice for crop issues

- **Government-Approved Resources**: Access verified fertilizers and pesticides information- **Government-Approved Resources**: Access verified fertilizers and pesticides information



------



## ✨ Key Features for Farmers## ✨ Key Features for Farmers



1. **🌱 Crop Planning**1. **🌱 Crop Planning**

   - Select your crop, state, and season   - Select your crop, state, and season

   - Enter sowing date and land area   - Enter sowing date and land area

   - Get personalized timeline instantly   - Get personalized timeline instantly



2. **📅 Weekly Timeline**2. **📅 Weekly Timeline**

   - See what to do each week   - See what to do each week

   - Mark tasks as complete   - Mark tasks as complete

   - Add your own notes and observations   - Add your own notes and observations

   - Get product recommendations   - Get product recommendations



3. **🚨 Report Issues**3. **🚨 Report Issues**

   - Report problems (pests, weather, diseases)   - Report problems (pests, weather, diseases)

   - Get expert-defined solutions   - Get expert-defined solutions

   - Access AI-powered recommendations based on your location   - Access AI-powered recommendations based on your location

   - Regenerate solutions for different approaches   - Regenerate solutions for different approaches



4. **🤖 AI-Powered Help**4. **🤖 AI-Powered Help**

   - Location-aware advice   - Location-aware advice

   - Considers local climate and soil   - Considers local climate and soil

   - Works even without internet (fallback solutions)   - Works even without internet (fallback solutions)

   - Available in simple language   - Available in simple language



5. **📚 Knowledge Base**5. **📚 Knowledge Base**

   - Government-approved fertilizers   - Government-approved fertilizers

   - Pesticides information   - Pesticides information

   - Product prices and vendors   - Product prices and vendors

   - Search easily   - Search easily



6. **📊 Track Progress**6. **📊 Track Progress**

   - View all your crops in one place   - View all your crops in one place

   - Monitor week-by-week progress   - Monitor week-by-week progress

   - Manage multiple crops   - Manage multiple crops



------



## 🛠️ Tech Stack## 🛠️ Tech Stack



**Frontend:** React.js, Vite, CSS3  <<<<<<< HEAD

**Backend:** Node.js, Express.js, MongoDB  **Frontend:** React.js, Vite, CSS3  

**AI:** Hugging Face Inference API (Free)  =======

**Security:** JWT Authentication, bcrypt**Frontend:** React.js, CSS3  

>>>>>>> 63d5cfc5e1e5ed4e257be90b5db1fc7c6f96449c

---**Backend:** Node.js, Express.js, MongoDB  

**AI:** Hugging Face Inference API (Free)  

## 📋 Prerequisites**Security:** JWT Authentication, bcrypt



- **Node.js** (v14+) - [Download](https://nodejs.org/)---

- **MongoDB** - Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free)

- **Git** (optional)## 📋 Prerequisites



---- **Node.js** (v14+) - [Download](https://nodejs.org/)

- **MongoDB** - Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free)

## 🚀 Installation & Setup- **Git** (optional)



### 1. Clone or Download the Project---



```bash## 🚀 Installation & Setup

git clone https://github.com/itsgowtham14/farm-assist.git

cd farm-assist### 1. Clone or Download the Project

```

```bash

### 2. Install Dependenciesgit clone https://github.com/itsgowtham14/farm-assist.git

cd farm-assist

```bash```

# Frontend

npm install### 2. Install Dependencies



# Backend```bash

cd server# Frontend

npm installnpm install

cd ..

```# Backend

cd server

### 3. Set Up MongoDBnpm install

cd ..

- Install MongoDB or create free account on MongoDB Atlas```

- Start MongoDB service (if local)

### 3. Set Up MongoDB

### 4. Configure Environment

- Install MongoDB or create free account on MongoDB Atlas

Create `server/.env` file:- Start MongoDB service (if local)



```env### 4. Configure Environment

MONGO_URI=mongodb://localhost:27017/farmassist

JWT_SECRET=your_secret_key_change_thisCreate `server/.env` file:

HUGGINGFACE_API_KEY=your_key_here_optional

PORT=5000```env

```MONGO_URI=mongodb://localhost:27017/farmassist

JWT_SECRET=your_secret_key_change_this

**Note:** Hugging Face API key is optional - the system works with fallback solutions!HUGGINGFACE_API_KEY=your_key_here_optional

PORT=5000

---```



## 🏃 Running the Application**Note:** Hugging Face API key is optional - the system works with fallback solutions!



**Terminal 1 - Backend:**---

```bash

cd server/src## 🏃 Running the Application

nodemon server.js

```**Terminal 1 - Backend:**

```bash

**Terminal 2 - Frontend:**cd server/src

```bashnodemon server.js

npm run dev```

```

**Terminal 2 - Frontend:**

Open browser: `http://localhost:5173````bash

npm run dev

---```



## 🌐 Deployment to VercelOpen browser: `http://localhost:5173`



### Prerequisites for Deployment---



- Vercel account (free) - [Sign up](https://vercel.com/signup)<<<<<<< HEAD

- MongoDB Atlas account - [Create free cluster](https://www.mongodb.com/cloud/atlas)## � Deployment to Vercel

- GitHub account with your repository

### Prerequisites for Deployment

### Step 1: Deploy Backend

- Vercel account (free) - [Sign up](https://vercel.com/signup)

1. **Go to [Vercel Dashboard](https://vercel.com)**- MongoDB Atlas account - [Create free cluster](https://www.mongodb.com/cloud/atlas)

2. Click "Add New" → "Project"- GitHub account with your repository

3. Import your GitHub repository

4. Set **Root Directory** to `server`### Step 1: Deploy Backend

5. Add Environment Variables:

   ```1. **Go to [Vercel Dashboard](https://vercel.com)**

   MONGO_URI=your_mongodb_atlas_connection_string2. Click "Add New" → "Project"

   JWT_SECRET=your_strong_random_secret3. Import your GitHub repository

   HUGGINGFACE_API_KEY=your_key_optional4. Set **Root Directory** to `server`

   NODE_ENV=production5. Add Environment Variables:

   FRONTEND_URL=https://your-frontend-app.vercel.app   ```

   ```   MONGO_URI=your_mongodb_atlas_connection_string

6. Click "Deploy"   JWT_SECRET=your_strong_random_secret

7. **Copy your backend URL** (e.g., `https://farm-assist-api.vercel.app`)   HUGGINGFACE_API_KEY=your_key_optional

   NODE_ENV=production

### Step 2: Deploy Frontend   FRONTEND_URL=https://your-frontend-app.vercel.app

   ```

1. **Update `.env` file** with backend URL:6. Click "Deploy"

   ```7. **Copy your backend URL** (e.g., `https://farm-assist-api.vercel.app`)

   VITE_API_URL=https://your-backend-app.vercel.app/api

   ```### Step 2: Deploy Frontend

2. Commit and push to GitHub

3. Go to Vercel Dashboard1. **Update `.env` file** with backend URL:

4. Click "Add New" → "Project"   ```

5. Import the same repository   VITE_API_URL=https://your-backend-app.vercel.app/api

6. Set **Root Directory** to `.` (root)   ```

7. Add Environment Variable:2. Commit and push to GitHub

   ```3. Go to Vercel Dashboard

   VITE_API_URL=https://your-backend-app.vercel.app/api4. Click "Add New" → "Project"

   ```5. Import the same repository

8. Click "Deploy"6. Set **Root Directory** to `.` (root)

7. Add Environment Variable:

### Step 3: Update Backend CORS   ```

   VITE_API_URL=https://your-backend-app.vercel.app/api

After frontend is deployed, update backend environment variable:   ```

```8. Click "Deploy"

FRONTEND_URL=https://your-actual-frontend-url.vercel.app

```### Step 3: Update Backend CORS



**Important Notes:**After frontend is deployed, update backend environment variable:

- Backend and frontend are deployed as separate projects```

- MongoDB Atlas IP whitelist: Add `0.0.0.0/0` for Vercel accessFRONTEND_URL=https://your-actual-frontend-url.vercel.app

- Keep `.env` files safe - never commit them to GitHub```



---**Important Notes:**

- Backend and frontend are deployed as separate projects

## 🎯 How to Use- MongoDB Atlas IP whitelist: Add `0.0.0.0/0` for Vercel access

- Keep `.env` files safe - never commit them to GitHub

### For Farmers:

---

1. **Register/Login** - Create your account

2. **Select Crop** - Choose state, season, crop, and sowing date## �🎯 How to Use

3. **View Timeline** - See week-by-week tasks

4. **Report Issues** - Get help when problems occur### For Farmers:

5. **Track Progress** - Mark weeks complete, add notes

1. **Register/Login** - Create your account

### For Agricultural Experts/Administrators:2. **Select Crop** - Choose state, season, crop, and sowing date

3. **View Timeline** - See week-by-week tasks

The system includes an admin panel for agricultural experts to:4. **Report Issues** - Get help when problems occur

- Add crops, states, and timeline tasks5. **Track Progress** - Mark weeks complete, add notes

- Define common farming issues and solutions

- Manage fertilizer/pesticide database### For Agricultural Experts/Administrators:

- Provide week-specific guidance

The system includes an admin panel for agricultural experts to:

**Admin Access:** `admin@outlook.in` / `admin123`- Add crops, states, and timeline tasks

- Define common farming issues and solutions

---- Manage fertilizer/pesticide database

- Provide week-specific guidance

## 🔐 Session Management

**Admin Access:** `admin@outlook.in` / `admin123`

- Automatic logout after 10 minutes of inactivity

- Secure JWT-based authentication---

- Separate sessions for farmers and administrators

## 🔐 Session Management

---

- Automatic logout after 10 minutes of inactivity

## 📞 Contact & Support- Secure JWT-based authentication

- Separate sessions for farmers and administrators

For help, feedback, or suggestions:

---

📧 **Email:** 231fa04094@vignan.ac.in

## 📞 Contact & Support

**We can help with:**

- Login/password issuesFor help, feedback, or suggestions:

- Feature requests

- Bug reports📧 **Email:** 231fa04094@vignan.ac.in

- Suggestions for improvement

=======

---## 🎯 How to Use



## 👥 Authors### For Farmers:



**Developed by:**  1. **Register/Login** - Create your account

[Your Name]  2. **Select Crop** - Choose state, season, crop, and sowing date

Roll Number: 231FA04094  3. **View Timeline** - See week-by-week tasks

Vignan University4. **Report Issues** - Get help when problems occur

5. **Track Progress** - Mark weeks complete, add notes

**Project Guide:** [Professor Name]

### For Agricultural Experts/Administrators:

---

The system includes an admin panel for agricultural experts to:

## 🙏 Acknowledgments- Add crops, states, and timeline tasks

- Define common farming issues and solutions

- **Hugging Face** - Free AI inference API- Manage fertilizer/pesticide database

- **MongoDB** - Database solution- Provide week-specific guidance

- **React & Vite** - Modern web development

- **Indian Farmers** - For inspiration**Admin Access:** `admin@outlook.in` / `admin123`



------



## 📄 License## 🔐 Session Management



Developed as part of academic curriculum at Vignan University.- Automatic logout after 10 minutes of inactivity

- Secure JWT-based authentication

- ✅ Free for educational use- Separate sessions for farmers and administrators

- ⚠️ Contact authors for commercial use

- ✅ Modifications allowed with attribution---



---## 📞 Contact & Support



## 🐛 Future EnhancementsFor help, feedback, or suggestions:



- [ ] Multi-language support (Hindi, Telugu, Tamil)📧 **Email:** 231fa04094@vignan.ac.in

- [ ] Mobile app version

- [ ] Weather integration>>>>>>> 63d5cfc5e1e5ed4e257be90b5db1fc7c6f96449c

- [ ] SMS notifications**We can help with:**

- [ ] Offline mode- Login/password issues

- [ ] Community forum- Feature requests

- Bug reports

---- Suggestions for improvement



**Happy Farming! 🌾🚜**---



*Built with ❤️ for Indian Farmers*## 👥 Authors


**Developed by:**  
[Your Name]  
Roll Number: 231FA04094  
Vignan University

**Project Guide:** [Professor Name]

---

## 🙏 Acknowledgments

- **Hugging Face** - Free AI inference API
- **MongoDB** - Database solution
- **React & Vite** - Modern web development
- **Indian Farmers** - For inspiration

---

## 📄 License

Developed as part of academic curriculum at Vignan University.

- ✅ Free for educational use
- ⚠️ Contact authors for commercial use
- ✅ Modifications allowed with attribution

---

## 🐛 Future Enhancements

- [ ] Multi-language support (Hindi, Telugu, Tamil)
- [ ] Mobile app version
- [ ] Weather integration
- [ ] SMS notifications
- [ ] Offline mode
- [ ] Community forum

---

**Happy Farming! 🌾🚜**

*Built with ❤️ for Indian Farmers*
