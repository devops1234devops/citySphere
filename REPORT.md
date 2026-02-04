# Project Report: City Sphere
**Your Hub for Urban Experiences**

## 1. Project Overview
City Sphere is a full-stack, real-time event discovery platform designed to aggregate and showcase local experiences in a modern, metropolitan environment. The platform addresses the fragmentation of event information by scraping data from major urban cultural hubs and presenting it through a premium, responsive interface.

## 2. Technical Architecture
The application follows a decoupled client-server architecture, optimized for deployment and scalability.

### 2.1 Backend (MVC Pattern)
The backend was transitioned from a monolithic structure to a robust **Model-View-Controller (MVC)** pattern using **ES Modules**.
- **Models**: Defines strict schemas for `Events`, `Leads`, and `Users` using Mongoose.
- **Controllers**: Houses business logic for scraping, user synchronization, and lead capturing.
- **Routes**: Clean API endpoints for data retrieval and administrative operations.
- **Services**: Specialized modules for web scraping (`Cheerio`) and automated task scheduling (`Node-Cron`).

### 2.2 Frontend
Built with **React** and **Vite**, the frontend prioritizes "vibrant aesthetics" and "visual excellence":
- **Responsive Design**: Mobile-first layout using bespoke Vanilla CSS and modern Typography (Inter).
- **Infinite Discovery**: A magazine-style event grid with dynamic filtering and search capabilities.
- **State Management**: Optimized using `@tanstack/react-query` for high-performance data fetching.

## 3. Core Features
### 3.1 Advanced Multi-Source Scraper
A custom scraping engine that collects data from:
- **Sydney Opera House** (Direct API/Web scrap)
- **What's On Sydney** (Sitemap & Detail page extraction)
- **Time Out Sydney** (Category-based crawling)
The engine includes smart deduplication and status tracking (`new`, `updated`, `inactive`).

### 3.2 Authentication & Security
- **Auth0 Integration**: Secure Google OAuth flow for administrative access.
- **Database Synchronization**: Real-time syncing of Auth0 profiles with the local MongoDB user store.
- **Protected Routes**: Secure access to the Admin Dashboard.

### 3.3 Admin Dashboard
A dedicated control center for:
- Monitoring scraper performance and data health.
- Managing user leads and ticket inquiries.
- Visualizing platform growth and event coverage.

## 4. Deployment & Infrastructure
The project is architected for zero-cost, high-reliability hosting:
- **Database**: MongoDB Atlas (Cloud-hosted NoSQL).
- **Backend API**: Render (Auto-redeploying on Git push).
- **Frontend**: Vercel (Edge-optimized delivery).
- **Version Control**: Git (GitHub) with automated CI/CD pipelines.

## 5. Conclusion
City Sphere demonstrates a sophisticated integration of modern web technologies. By combining automated data collection with a premium user experience, it provides a scalable blueprint for urban information hubs.

---
**Prepared by:** Antigravity AI
**Project:** City Sphere v1.0
