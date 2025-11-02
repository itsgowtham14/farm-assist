# 🌾 FarmAssist - Smart Farming Companion

**Simple, Intelligent Agricultural Assistant for Farmers**

FarmAssist is a user-friendly web platform designed specifically for farmers to manage their crops effectively. Get week-by-week guidance, AI-powered solutions for farming issues, and access to agricultural knowledge - all in one simple interface.

---

## 🌟 Why FarmAssist?

Traditional farming relies on experience and trial-and-error. FarmAssist brings modern technology to farmers through:
- **Simple Interface**: Easy to use, designed with farmers in mind
- **Week-by-Week Guidance**: Clear action plans from sowing to harvest
- **AI Solutions**: Get location-specific advice for crop issues
- **Government-Approved Resources**: Access verified fertilizers and pesticides information

---

## ✨ Key Features for Farmers

1. **🌱 Crop Planning**
   - Select your crop, state, and season
   - Enter sowing date and land area
   - Get personalized timeline instantly

2. **📅 Weekly Timeline**
   - See what to do each week
   - Mark tasks as complete
   - Add your own notes and observations
   - Get product recommendations

3. **🚨 Report Issues**
   - Report problems (pests, weather, diseases)
   - Get expert-defined solutions
   - Access AI-powered recommendations based on your location
   - Regenerate solutions for different approaches

4. **🤖 AI-Powered Help**
   - Location-aware advice
   - Considers local climate and soil
   - Works even without internet (fallback solutions)
   - Available in simple language

5. **📚 Knowledge Base**
   - Government-approved fertilizers
   - Pesticides information
   - Product prices and vendors
   - Search easily

6. **📊 Track Progress**
   - View all your crops in one place
   - Monitor week-by-week progress
   - Manage multiple crops

---

## 🛠️ Tech Stack

**Frontend:** React.js, Vite, CSS3  
**Backend:** Node.js, Express.js, MongoDB  
**AI:** Hugging Face Inference API (Free)  
**Security:** JWT Authentication, bcrypt

---

## 📋 Prerequisites

- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **MongoDB** - Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free)
- **Git** (optional)

---

## 🚀 Installation & Setup

### 1. Clone or Download the Project

```bash
git clone https://github.com/itsgowtham14/farm-assist.git
cd farm-assist
```

### 2. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### 3. Set Up MongoDB

- Install MongoDB or create free account on MongoDB Atlas
- Start MongoDB service (if local)

### 4. Configure Environment

Create `server/.env` file:

```env
MONGO_URI=mongodb://localhost:27017/farmassist
JWT_SECRET=your_secret_key_change_this
HUGGINGFACE_API_KEY=your_key_here_optional
PORT=5000
```

**Note:** Hugging Face API key is optional - the system works with fallback solutions!

---

## 🏃 Running the Application

**Terminal 1 - Backend:**
```bash
cd server/src
nodemon server.js
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Open browser: `http://localhost:5173`

---

## 🎯 How to Use

### For Farmers:

1. **Register/Login** - Create your account
2. **Select Crop** - Choose state, season, crop, and sowing date
3. **View Timeline** - See week-by-week tasks
4. **Report Issues** - Get help when problems occur
5. **Track Progress** - Mark weeks complete, add notes

### For Agricultural Experts/Administrators:

The system includes an admin panel for agricultural experts to:
- Add crops, states, and timeline tasks
- Define common farming issues and solutions
- Manage fertilizer/pesticide database
- Provide week-specific guidance

**Admin Access:** `admin@outlook.in` / `admin123`

---

## 🔐 Session Management

- Automatic logout after 10 minutes of inactivity
- Secure JWT-based authentication
- Separate sessions for farmers and administrators

---

## 📞 Contact & Support

For help, feedback, or suggestions:

📧 **Email:** 231fa04094@vignan.ac.in

**We can help with:**
- Login/password issues
- Feature requests
- Bug reports
- Suggestions for improvement

---

## 👥 Authors

**Developed by:**  
Gowtham Challapalli (231FA04094)
Mary Satvika (231FA04434)
Venkateswari (231FA04837)
Jaswika (231FA04A73)


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
