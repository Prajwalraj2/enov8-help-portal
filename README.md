# 🚀 Enov8 Help Portal

A comprehensive, full-stack help and support portal built with Node.js, Express.js, and MongoDB. The Enov8 Help Portal provides a centralized platform for managing FAQs, video tutorials, and guides to help user understand and resolve their query about Enov8 Products.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---
## 📸 Screenshots from Portal

<div align="center">
  <img src="public/Enov8 Portal Front Page.png" alt="Enov8 Portal Front Page" width="45%" style="display: inline-block; margin-right: 2%;">
  <img src="public/Enov8 FAQ .png" alt="Enov8 FAQ Page" width="45%" style="display: inline-block;">
</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚡ Quick Start](#-quick-start)
- [🐳 Docker Setup](#-docker-setup)
- [🔧 Configuration](#-configuration)
- [📡 API Endpoints](#-api-endpoints)
- [🎨 UI Components](#-ui-components)
- [📱 Responsive Design](#-responsive-design)
- [🔐 Admin Features](#-admin-features)
- [🚀 Deployment](#-deployment)
- [🧪 Development](#-development)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

---

## 🌟 Features

### Core Features
- **📚 FAQ Management**: Dynamic FAQ system with categories and search functionality
- **🎥 Video Tutorials**: YouTube video integration with category-based organization
- **📖 Guide System**: Comprehensive guide management with rich content support
- **👨‍💼 Admin Panel**: Complete administrative interface for content management
- **🔍 Smart Search**: Advanced search functionality across all content types
- **📱 Responsive Design**: Mobile-first responsive design for all devices

### Advanced Features
- **🎨 Theme System**: Light/Dark mode with persistent user preferences
- **🔗 Deep Linking**: Direct links to specific content sections
- **⚡ Real-time Updates**: Dynamic content loading without page refresh
- **🔄 Auto-refresh**: Automatic content synchronization

---

## 🛠️ Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **EJS**: Template engine for server-side rendering
- **CORS**: Cross-origin resource sharing
- **Body-parser**: Request parsing middleware
- **dotenv**: Environment variable management

### Frontend
- **Bootstrap 5.3.3**: CSS framework for responsive design
- **jQuery 3.6.0**: JavaScript library for DOM manipulation
- **Bootstrap Icons**: Icon library
- **Box Icons**: Additional icon set
- **Custom CSS**: Theme system with CSS variables

### Development & Deployment & CICD
- **Nodemon**: Development server with auto-restart
- **Docker**: Containerization platform
- **Docker Compose**: Multi-container orchestration
- **Git**: Version control system
- **Jenkin**: For CICD Pipeline

---

## 📁 Project Structure

```
enov8-help-portal/
├── 📁 config/
│   └── db.js                # Database configuration
├── 📁 controllers/          # Business logic controllers
│   ├── 📁 faq/              # FAQ controllers
│   ├── 📁 guide/            # Guide controllers
│   └── 📁 video/            # Video controllers
├── 📁 middleware/           # Custom middleware
│   └── errorHandler.js      # Global error handling
├── 📁 models/              # Database models
│   ├── 📁 faq/             # FAQ data models
│   ├── 📁 guide/           # Guide data models
│   └── 📁 video/           # Video data models
├── 📁 public/              # Static assets
│   ├── 📁 css/             # Stylesheets
│   │   ├── faq.css         # FAQ-specific styles
│   │   └── theme.css       # Global theme system
│   ├── 📁 js/              # Client-side JavaScript
│   │   ├── theme.js        # Theme switching logic
│   │   └── faq.js          # FAQ functionality
│   ├── 📁 images/          # Image assets
│   
├── 📁 routes/              # API and frontend routes
│   ├── 📁 guide/           # Guide-related routes
│   │   ├── guideCategoryRoutes.js
│   │   └── guideContentRoutes.js
│   ├── 📁 video/           # Video-related routes
│   │   ├── videoCategoryRoutes.js
│   │   └── videoRoutes.js
│   ├── faqRoutes.js        # FAQ API routes
│   └── frontendRoutes.js   # Frontend page routes
├── 📁 views/               # EJS templates
│   ├── 📁 partials/        # Reusable components
│   │   ├── header.ejs      # Navigation header
│   │   
│   ├── 📁 faq/             # FAQ pages
│   │   └── FaqPage.ejs     # Main FAQ interface
│   ├── 📁 guide/           # Guide pages
│   │   ├── GuidePage.ejs   # Guide listing page
│   │   └── GuideDetail.ejs # Individual guide view
│   ├── 📁 video/           # Video pages
│   │   ├── VideoPage.ejs   # Video gallery
│   │   └── VideoPlayer.ejs # Video player interface
│   ├── index.ejs           # Homepage
│   └── admin.ejs           # Admin dashboard
├── 📄 app.js               # Main application entry point
├── 📄 package.json         # Dependencies and scripts
├── 📄 Dockerfile           # Docker container configuration
├── 📄 docker-compose.yml   # Docker Compose setup
├── 📄 .env.example         # Environment variables template
├── 📄 .gitignore          # Git ignore rules
└── 📄 README.md           # Project documentation
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **Git**
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Prajwalraj2/enov8-help-portal.git
   cd enov8-help-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   nano .env
   ```
   Edit `.env` file with your configuration:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/enov8-help-portal
   NODE_ENV=development

   ```

4. **Start MongoDB [For Ubuntu]** 
   ```bash
   # Using MongoDB service
   sudo systemctl start mongod
   
   # Or using MongoDB Community Edition
   mongod --dbpath /path/to/your/db
   ```
   - For Windown install [mongodb client](https://www.mongodb.com/try/download/community) and [mongodb compass](https://www.mongodb.com/try/download/compass)

5. **Run the application**
   
   **Development mode (with auto-restart):**
   ```bash
   npm run dev
   ```
   
   **Production mode:**
   ```bash
   npm start
   ```

6. **Access the application**
   - Main Portal: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

---

## 🐳 Docker Setup

### Using Docker Compose (Recommended)

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Run in background**
   ```bash
   docker-compose up -d
   ```

3. **View logs**
   ```bash
   docker-compose logs -f
   ```

4. **Stop services**
   ```bash
   docker-compose down
   ```

### Using Docker Only

1. **Build the image**
   ```bash
   docker build -t enov8-help-portal .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 \
     -e MONGODB_URI=mongodb://host.docker.internal:27017/enov8-help-portal \
     enov8-help-portal
   ```

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Application port | `3000` | No |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/enov8-help-portal` | Yes |
| `NODE_ENV` | Environment mode | `development` | No |
| `CORS_ORIGIN` | Allowed CORS origins | `*` | No |

### Database Configuration

The application uses MongoDB with the following collections:

- **faqs**: FAQ entries with its respective category
- **faq_categories**: FAQ category defintion
- **guide_categories**: Guide category definitions
- **guides**: Guide content and metadata
- **video_categories**: Video category definitions
- **videos**: Video metadata and YouTube integration

---

## 📡 API Endpoints

### FAQ Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/faqs` | Get all FAQs | No |
| `GET` | `/api/faqs/:id` | Get specific FAQ | No |
| `POST` | `/api/faqs` | Create new FAQ | Yes |
| `PUT` | `/api/faqs/:id` | Update FAQ | Yes |
| `DELETE` | `/api/faqs/:id` | Delete FAQ | Yes |
| `GET` | `/api/faqs/search?q=term` | Search FAQs | No |

### Video Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/videos` | Get all videos by category | No |
| `GET` | `/api/videos/:id` | Get specific video | No |
| `POST` | `/api/videos` | Add new video | Yes |
| `PUT` | `/api/videos/:id` | Update video | Yes |
| `DELETE` | `/api/videos/:id` | Delete video | Yes |
| `GET` | `/api/video-categories` | Get video categories | No |
| `POST` | `/api/video-categories` | Create category | Yes |

### Guide Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/guides` | Get all guides | No |
| `GET` | `/api/guides/:id` | Get specific guide | No |
| `POST` | `/api/guides` | Create new guide | Yes |
| `PUT` | `/api/guides/:id` | Update guide | Yes |
| `DELETE` | `/api/guides/:id` | Delete guide | Yes |
| `GET` | `/api/guide-categories` | Get guide categories | No |
| `POST` | `/api/guide-categories` | Create category | Yes |

### Frontend Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Homepage | Main landing page |
| `/faq` | FAQ Page | FAQ interface with search |
| `/videos` | Video Gallery | Video tutorials organized by category |
| `/video/player` | Video Player | YouTube video player with metadata |
| `/guides` | Guide Library | Comprehensive guides and documentation |
| `/guides/:id` | Guide Detail | Individual guide view |
| `/admin` | Admin Panel | Content management dashboard |

---

## 🎨 UI Components

### Theme System
- **CSS Variables**: Consistent color scheme across components
- **Dark/Light Mode**: Toggle between themes with persistence
- **Responsive Breakpoints**: Mobile-first responsive design
- **Custom Animations**: Smooth transitions and hover effects

### Navigation Components
- **Responsive Sidebar**: Collapsible navigation with categories
- **Header Navigation**: Global navigation with search and theme toggle
- **Mobile Menu**: Touch-friendly mobile navigation

### Content Components
- **Video Cards**: Thumbnail, metadata, and play overlay
- **FAQ Accordion**: Expandable question-answer pairs
- **Guide Cards**: Preview cards with category tags
- **Search Interface**: Real-time search with filters

### Interactive Elements
- **Modal Dialogs**: Content preview and editing interfaces
- **Tooltips**: Contextual help and information
- **Loading States**: Skeleton loaders and progress indicators
- **Error States**: User-friendly error messages and retry options

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

### Mobile Optimizations
- **Touch-friendly**: Minimum 44px touch targets
- **Swipe Gestures**: Horizontal scrolling for content
- **Optimized Images**: Responsive images with lazy loading
- **Reduced Animations**: Respect user motion preferences

### Performance Features
- **Lazy Loading**: Images and videos load on demand
- **Code Splitting**: JavaScript bundles optimized for size
- **Caching Strategy**: Browser caching for static assets
- **Compression**: Gzip compression for faster loading

---

## 🔐 Admin Features

### Content Management
- **CRUD Operations**: Create, read, update, delete all content types
- **Media Upload**: Image and file upload with via summernote editor

---


## 🚀 Deployment

### Production Setup

1. **Server Requirements**
   - **CPU**: 2+ cores
   - **RAM**: 4GB minimum, 8GB recommended
   - **Storage**: 20GB SSD
   - **OS**: Ubuntu 20.04 LTS or CentOS 8

2. **Environment Setup**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install MongoDB
   wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   ```

3. **Application Deployment**
   ```bash
   # Clone and setup
   git clone https://github.com/your-username/enov8-help-portal.git
   cd enov8-help-portal
   npm install --production
   
   # Environment configuration
   nano .env  # Configure production settings

   # Enter these in .env file
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/enov8-help-portal
   

    # Start with PM2
    npm install -g pm2
    pm2 start app.js --name "enov8-help-portal"
    pm2 startup
    pm2 save
   ```

---


### Nginx Configuration ( to attach a domain name)

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /static/ {
        alias /path/to/enov8-help-portal/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### SSL Setup (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🧪 Development

### Development Workflow

1. **Setup Development Environment**
   ```bash
   git clone https://github.com/your-username/enov8-help-portal.git
   cd enov8-help-portal
   npm install
   nano .env

        # Enter these in .env file
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/enov8-help-portal

   ```

2. **Start Development Server**
   ```bash
   npm run dev  # Starts with nodemon for auto-restart
   ```

---

## 🤝 Contributing

I welcome contributions to the Enov8 Help Portal! Please follow these guidelines:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Ensure all tests pass**
   ```bash
   npm test
   ```
6. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
7. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### Contribution Guidelines

- **Code Quality**: Follow ESLint and Prettier configurations
- **Documentation**: Update documentation for new features
- **Testing**: Include unit and integration tests
- **Performance**: Consider performance implications
- **Security**: Follow security best practices

---

## 🙏 Acknowledgments

- **Bootstrap Team** for the excellent CSS framework
- **MongoDB Team** for the robust database solution
- **Express.js Team** for the minimalist web framework
- **YouTube API** for video integration capabilities
- **Open Source Community** for the amazing tools and libraries

---

## 🔄 Changelog

### Version 1.0.0 (Current)
- ✅ Initial release with core functionality
- ✅ FAQ system with search and categories
- ✅ Video tutorial system with YouTube integration
- ✅ Guide system with rich content support
- ✅ Admin panel for content management
- ✅ Responsive design for all devices
- ✅ Docker support for easy deployment

### Upcoming Features (v1.1.0)
- 🔄 Advanced analytics dashboard
- 🔄 Multi-language support
- 🔄 Advanced chatbot with AI integration
- 🔄 User feedback and rating system
- 🔄 Advanced search with faceted filtering
- 🔄 Content versioning and approval workflow

---

**Made with ❤️ by the Enov8 India Team**

*For more information, visit our [official website](https://enov8.com).
