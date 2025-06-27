# Hiddekel Investments Real Estate Platform

## Overview

This is a full-stack real estate web application for Hiddekel Investments, a Zimbabwe-based land development company. The platform serves as both a public website showcasing available residential stands and an admin dashboard for content management.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **API Style**: REST API
- **Development**: tsx for TypeScript execution in development

### Database & ORM
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM with Zod validation
- **Migrations**: Drizzle Kit for schema management
- **Provider**: Neon Database (serverless PostgreSQL)

## Key Components

### Public Features
- **Home Page**: Hero section with featured stands and company information
- **About Page**: Company vision, mission, and core values
- **Stands Listing**: Filterable property listings with detailed views
- **Gallery**: Categorized image gallery with lightbox functionality
- **Blog**: Published articles and company news
- **Contact**: Contact form with message submission

### Admin Features
- **Dashboard**: Overview statistics and quick access to management tools
- **Stands Management**: CRUD operations for property listings
- **Blog Management**: Create, edit, and publish blog posts
- **Gallery Management**: Upload and organize gallery images
- **Message Management**: View and manage contact form submissions
- **Authentication**: Basic admin login system

### UI Components
- **Design System**: shadcn/ui components with custom Hiddekel branding
- **Color Scheme**: Gold (#E8B923) and gray (#2D2D2D) brand colors
- **Responsive**: Mobile-first design with breakpoint adaptations
- **Animations**: CSS transitions and hover effects

## Data Flow

### Public Data Flow
1. Client requests data via TanStack Query
2. API routes serve filtered/published content
3. Data rendered in React components
4. Real-time updates through query invalidation

### Admin Data Flow
1. Admin authenticates via login form
2. Protected routes verify authentication
3. CRUD operations through admin API endpoints
4. Optimistic updates with query invalidation
5. Toast notifications for user feedback

### Contact Form Flow
1. User submits contact form
2. Data validated on client and server
3. Message stored in database
4. Admin receives unread message notification

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **@hookform/resolvers**: Form validation with Zod schemas

### UI Dependencies
- **@radix-ui/***: Headless UI primitives for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds
- **vite**: Development server and build tool

## Deployment Strategy

### Development Environment
- **Replit Integration**: Configured for Replit development environment
- **Hot Reload**: Vite HMR for instant updates
- **Development Server**: Express serves both API and static files
- **Port Configuration**: Development on port 5000

### Production Build
1. **Frontend Build**: Vite bundles React application to `dist/public`
2. **Backend Build**: esbuild bundles server to `dist/index.js`
3. **Static Serving**: Express serves built frontend files
4. **Database**: Production PostgreSQL via environment variables

### Replit Deployment
- **Autoscale Deployment**: Configured for Replit's autoscale infrastructure
- **Environment**: Node.js 20 with PostgreSQL 16 module
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- June 27, 2025: Integrated PostgreSQL database
  - Replaced in-memory storage with DatabaseStorage using Drizzle ORM
  - All admin sections now properly display data from database
  - Added missing GET /api/admin/gallery endpoint
  - Populated database with sample stands, blog posts, and gallery images
  - Fixed admin dashboard display issues

## Changelog

- June 24, 2025: Initial setup
- June 27, 2025: Database integration and admin dashboard fixes