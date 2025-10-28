# 🌾 FarmAssist - Smart Farming Companion

**Your Intelligent Agricultural Assistant for Crop Management and Precision Farming**

FarmAssist is a comprehensive web-based platform designed to empower farmers with data-driven insights, AI-powered solutions, and week-by-week crop management guidance. The application helps farmers optimize their agricultural practices through personalized timelines, issue tracking, and location-specific recommendations.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Features in Detail](#features-in-detail)
- [Admin Dashboard](#admin-dashboard)
- [Authors](#authors)
- [Contact](#contact)
- [License](#license)

---

## 🌟 About the Project

FarmAssist bridges the gap between traditional farming practices and modern technology. It provides farmers with:

- **Personalized Crop Timelines**: Week-by-week action plans tailored to specific crops, seasons, and locations
- **AI-Powered Solutions**: Location-specific, intelligent recommendations for farming issues using advanced AI models
- **Issue Tracking & Management**: Report and track crop issues with admin-defined solutions and AI alternatives
- **Knowledge Base**: Access to government-approved fertilizers, pesticides, and farming best practices
- **Progress Tracking**: Mark tasks as complete and monitor crop development stages
- **Session Management**: Secure authentication with automatic logout after 10 minutes of inactivity

### Why FarmAssist?

Traditional farming often relies on generational knowledge and trial-and-error. FarmAssist modernizes this approach by:
- Providing scientifically-backed, week-specific guidance
- Adapting to unexpected situations (heavy rainfall, pest attacks, droughts)
- Offering AI-generated, location-aware solutions
- Centralizing agricultural knowledge in an accessible format
- Enabling farmers to make data-driven decisions

---

## ✨ Key Features

### For Farmers

1. **🌱 Crop Selection & Planning**
   - Select crops based on state, season, and local availability
   - Input sowing date and land area for personalized planning
   - View crop-specific requirements and recommendations

2. **📅 Week-by-Week Timeline**
   - Detailed weekly tasks for entire crop lifecycle
   - Mark weeks as complete to track progress
   - Add custom notes for each week
   - Recommended products for each stage

3. **🚨 Issue Reporting & Solutions**
   - Report crop issues with detailed descriptions
   - Get admin-predefined solutions (general + week-specific)
   - Access AI-powered, location-specific recommendations
   - Regenerate AI solutions for alternative approaches

4. **🤖 AI-Tailored Solutions**
   - Powered by Hugging Face's free inference API
   - Location-aware recommendations
   - Considers local climate, soil, and pest patterns
   - Fallback rule-based solutions for reliability

5. **📚 Knowledge Base**
   - Government-approved fertilizers and pesticides
   - Product details including active ingredients, pricing, and vendors
   - Searchable database of agricultural resources

6. **📊 Personal Dashboard**
   - Overview of all selected crops
   - Quick access to timelines and progress
   - Manage multiple crops simultaneously

### For Administrators

1. **🔧 Admin Dashboard**
   - Manage states, crops, timeline tasks, and products
   - Create and edit issue templates with week-specific solutions
   - Add weekly variations for different crop stages
   - Secure admin authentication

2. **📝 Issue Templates Management**
   - Define common agricultural issues
   - Set general solutions and week-specific variations
   - Help farmers get instant, relevant guidance

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **CSS3** - Custom styling with gradients and animations
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling

### AI & APIs
- **Hugging Face Inference API** - Free AI model hosting (google/flan-t5-large)
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

### Development Tools
- **nodemon** - Auto-restart server on changes
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

---

## 📁 Project Structure

```
farmassist/
├── public/
│   └── index.jpeg                 # Banner image
├── src/
│   ├── components/
│   │   ├── Header.jsx             # App header
│   │   ├── Navigation.jsx         # Navigation bar
│   │   └── Footer.jsx             # App footer
│   ├── pages/
│   │   ├── Home.jsx               # Landing page with services
│   │   ├── Login.jsx              # User authentication
│   │   ├── AdminLogin.jsx         # Admin authentication
│   │   ├── SelectCrop.jsx         # Crop selection form
│   │   ├── Dashboard.jsx          # User dashboard
│   │   ├── Timeline.jsx           # Week-by-week crop timeline
│   │   ├── KnowledgeBase.jsx      # Products database
│   │   └── AdminDashboard.jsx     # Admin management panel
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # Global styles
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Base styles
├── server/
│   ├── src/
│   │   ├── models/
│   │   │   ├── user.js            # User schema
│   │   │   ├── selection.js       # Crop selection schema
│   │   │   ├── state.js           # State schema
│   │   │   ├── crop.js            # Crop schema
│   │   │   ├── timelineTask.js    # Timeline task schema
│   │   │   ├── product.js         # Product schema
│   │   │   ├── note.js            # Notes schema
│   │   │   ├── issue.js           # Issue schema
│   │   │   └── issueTemplate.js   # Issue template schema
│   │   ├── routes/
│   │   │   ├── auth.js            # Authentication routes
│   │   │   ├── selections.js      # Crop selection routes
│   │   │   ├── metadata.js        # States/crops metadata
│   │   │   ├── timeline.js        # Timeline routes
│   │   │   ├── products.js        # Products routes
│   │   │   ├── notes.js           # Notes routes
│   │   │   ├── issues.js          # Issues routes
│   │   │   ├── issueTemplates.js  # Issue templates routes
│   │   │   ├── aiSolution.js      # AI solution generation
│   │   │   └── admin.js           # Admin CRUD operations
│   │   └── server.js              # Express server setup
│   ├── .env                       # Environment variables
│   └── package.json               # Server dependencies
├── package.json                   # Frontend dependencies
├── vite.config.js                 # Vite configuration
└── README.md                      # This file
```

---

## 📋 Prerequisites

Before running FarmAssist, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - Running locally on `mongodb://localhost:27017/farmassist`
  - Or use MongoDB Atlas (cloud database)
- **Git** (optional, for cloning)

### System Requirements
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **OS**: Windows, macOS, or Linux

---

## 🚀 Installation & Setup

### 1. Clone the Repository (or download ZIP)

```bash
git clone https://github.com/yourusername/farmassist.git
cd farmassist
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB Community Edition
- Start MongoDB service:
  ```bash
  # Windows (run as Administrator)
  net start MongoDB
  
  # macOS
  brew services start mongodb-community
  
  # Linux
  sudo systemctl start mongod
  ```

**Option B: MongoDB Atlas (Cloud)**
- Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get connection string and use in `.env`

---

## ⚙️ Environment Configuration

Create a `.env` file in the `server/` directory:

```bash
cd server
```

Create `.env` file with the following content:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/farmassist
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/farmassist

# JWT Secret (change this to a random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_this

# Hugging Face API Key (optional - fallback solutions work without it)
HUGGINGFACE_API_KEY=your_huggingface_api_key_here

# Server Port
PORT=5000
```

### How to Get API Keys:

**Hugging Face API Key** (Optional - for AI solutions):
1. Visit [Hugging Face](https://huggingface.co/)
2. Sign up for free account
3. Go to Settings → Access Tokens
4. Create new token
5. Copy and paste in `.env`

**Note**: The AI solution feature has intelligent fallback rules, so it works even without the API key!

---

## 🏃 Running the Application

### Method 1: Run Both Services Simultaneously

**Terminal 1 - Backend Server:**
```bash
cd server/src
nodemon server.js
```
Server runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173` (or port shown in terminal)

### Method 2: Using npm scripts (if configured)

```bash
# Backend
npm run server

# Frontend
npm run dev
```

### Verify Installation

1. Open browser to `http://localhost:5173`
2. You should see FarmAssist home page
3. Backend API at `http://localhost:5000/api`

---

## 📡 API Documentation

### Authentication Endpoints

```
POST /api/auth/register
POST /api/auth/login
```

### User Endpoints

```
GET    /api/selections           # Get user's crop selections
POST   /api/selections           # Create new crop selection
GET    /api/timeline/:selectionId # Get timeline for selection
```

### Metadata Endpoints

```
GET    /api/metadata/states      # Get all states
GET    /api/metadata/crops       # Get all crops
```

### Issue Management

```
GET    /api/issue-templates      # Get all issue templates
POST   /api/issue-templates      # Create issue template (admin)
PUT    /api/issue-templates/:id  # Update issue template (admin)
DELETE /api/issue-templates/:id  # Delete issue template (admin)

GET    /api/issues               # Get issues for selection
POST   /api/issues               # Report new issue
```

### AI Solutions

```
POST   /api/ai-solution          # Generate AI solution for issue
Body: {
  issueType, cropName, week, season, location, details
}
```

### Products

```
GET    /api/products             # Get all products
GET    /api/products/search?q=   # Search products
```

### Notes

```
GET    /api/notes/:selectionId/:week  # Get notes for week
POST   /api/notes                     # Create/update note
```

### Admin Endpoints (Protected)

```
GET    /api/admin/states
POST   /api/admin/states
PUT    /api/admin/states/:id
DELETE /api/admin/states/:id

# Similar CRUD for: crops, timelineTasks, products
```

---

## 🎯 Features in Detail

### 1. Crop Timeline Management

- **Dynamic Task Generation**: Based on crop type, season, and region
- **Week Tracking**: Mark weeks as complete
- **Custom Notes**: Add observations for each week
- **Product Recommendations**: Fertilizers/pesticides for each stage

### 2. AI-Powered Solutions

**How It Works:**
1. User reports issue (e.g., "Heavy rainfall affecting rice crop")
2. System sends to Hugging Face AI with context:
   - Crop name
   - Location/state
   - Season
   - Week number
   - Issue details
3. AI generates location-specific solution
4. Fallback rules activate if API unavailable

**AI Prompt Includes:**
- Local climate considerations
- Regional soil types
- Available local products
- Season-specific advice

### 3. Issue Templates & Solutions

**Admin-Defined Templates:**
- Common issues (pests, weather, diseases)
- General solution (applies to all weeks)
- Week-specific solutions (e.g., Week 3 vs Week 10)

**Solution Priority:**
1. Week-specific admin solution (if exists)
2. General admin solution
3. AI-generated solution
4. Rule-based fallback

### 4. Session Management

**Security Features:**
- JWT-based authentication
- Password hashing with bcrypt
- Separate tokens for users and admins
- Auto-logout after 10 minutes inactivity
- Activity tracking (mouse, keyboard, scroll)

**Inactivity Timer:**
- Resets on any user action
- Alerts before logout
- Clears sensitive data

### 5. Knowledge Base

**Product Database:**
- Government-approved fertilizers
- Pesticides and active ingredients
- Pricing information (MRP)
- Vendor details
- Search functionality

---

## 🔐 Admin Dashboard

### Access Admin Panel

**Default Credentials:**
- Email: `admin@outlook.in`
- Password: `admin123`

**⚠️ Security Note**: Change these credentials in production!

### Admin Capabilities

1. **States Management**: Add/edit Indian states
2. **Crops Management**: Define crops with seasons and allowed states
3. **Timeline Tasks**: Create week-by-week tasks for each crop
4. **Products**: Manage fertilizer/pesticide database
5. **Issue Templates**: Define common issues and solutions
6. **Weekly Solutions**: Add week-specific solution variations

### Logout

Click the red "🚪 Logout" button in the admin dashboard header.

---

## 👥 Authors

**Project developed by:**
- [Your Name]
- [Team Member 2]
- [Team Member 3]

**Institution:** Vignan University
**Roll Number:** 231FA04094

**Project Guide:** [Professor Name]

---

## 📞 Contact

For queries, feedback, password issues, or development ideas:

📧 **Email**: 231fa04094@vignan.ac.in

**Support For:**
- Login/Registration issues
- Password reset requests
- Feature requests
- Bug reports
- Collaboration opportunities
- Development ideas

---

## 📄 License

This project is developed as part of academic curriculum at Vignan University.

**Usage Guidelines:**
- Educational purposes: ✅ Free to use
- Commercial use: ⚠️ Contact authors
- Modifications: ✅ Allowed with attribution
- Redistribution: ✅ Allowed with attribution

---

## 🙏 Acknowledgments

- **Hugging Face** - For free AI inference API
- **MongoDB** - For flexible database solution
- **React & Vite** - For modern frontend development
- **Express.js** - For robust backend framework
- **Indian Farmers** - For inspiration and validation

---

## 🐛 Known Issues & Future Enhancements

### Current Limitations
- AI solution generation depends on external API availability
- Limited to crops in database (admin can add more)
- Single language support (English only)

### Planned Features
- [ ] Multi-language support (Hindi, Telugu, Tamil, etc.)
- [ ] Weather API integration
- [ ] Marketplace for farm products
- [ ] Community forum for farmers
- [ ] Mobile application (React Native)
- [ ] Offline mode with PWA
- [ ] SMS/WhatsApp notifications
- [ ] Export reports as PDF
- [ ] Data analytics and insights

---

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Hugging Face Models](https://huggingface.co/models)
- [Indian Agricultural Guidelines](https://agricoop.nic.in/)

---

## 🌟 Star This Project

If you find FarmAssist helpful, please consider giving it a star ⭐ on GitHub!

---

**Happy Farming! 🌾🚜**

*Built with ❤️ for Indian Farmers*
