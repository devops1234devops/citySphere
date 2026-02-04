# City Sphere | Your Hub for Urban Experiences

City Sphere is a modern, full-stack event discovery platform that aggregates the latest events from multiple sources across Sydney. It features a stunning, responsive user interface and a robust administrative dashboard for event management.

## 🚀 Features

- **Multi-Source Scraper**: Automatically aggregates events from Sydney Opera House, What's On Sydney, and Time Out Sydney.
- **Dynamic Event Feed**: A beautiful, magazine-style layout for discovering local experiences.
- **Admin Dashboard**: Secure management interface for tracking new events, status updates, and lead management.
- **Lead Capture**: Seamlessly integrated lead generation for event ticket inquiries.
- **MVC Architecture**: Backend organized into Models, Views (API responses), and Controllers for maximum maintainability.
- **Rebrandable Design**: Fully customized branding with a premium abstract aesthetic.

## 🛠️ Tech Stack

### Frontend
- **React**: Modern component-based UI.
- **Vite**: High-performance build tool.
- **Lucide React**: Premium icon set.
- **Date-fns**: Elegant date formatting.
- **Vanilla CSS**: Bespoke, high-performance styling with premium aesthetics.

### Backend
- **Node.js (ES Modules)**: Modern, scalable runtime.
- **Express**: Fast, unopinionated web framework.
- **MongoDB & Mongoose**: Flexible document-based data storage.
- **Cheerio**: Powerful web scraping logic.
- **Node-Cron**: Reliable scheduled task management.

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB instance)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your credentials:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

For deployment, it is recommended to host the **Backend on Render** and the **Frontend on Vercel**. Refer to the project's [Deployment Guide](DEPLOYMENT.md) for step-by-step instructions.

## 📝 License
This project is for assignment purposes. All rights reserved.
