# React Blog WebApp

## Project Overview

A blog application built with React that allows users to create, read, update, and delete blog posts.

## Features

### Core Functionality
- **Create Posts**: Add new blog posts with title, content, and author information
- **Read Posts**: View all blog posts in a clean, organized list format
- **Update Posts**: Edit existing blog posts with real-time updates
- **Delete Posts**: Remove blog posts with confirmation prompts

### Technical Features
- **Client-side Routing**: Navigate between pages using React Router
- **Local Storage Persistence**: Data persists across browser sessions
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Immediate reflection of changes without page reload

## Technology Stack

- **Frontend**: React 18
- **Routing**: React Router DOM v6
- **Styling**: Custom CSS with minimalistic design
- **Data Storage**: Browser localStorage API
- **Build Tool**: Create React App

## Project Structure

```
src/
├── components/
│   ├── BlogList.js       # Display all blog posts
│   ├── BlogPost.js       # Individual blog post view
│   ├── CreatePost.js     # Form for creating new posts
│   ├── EditPost.js       # Form for editing existing posts
│   └── Navbar.js         # Navigation component
├── services/
│   └── localStorage.js   # Data management service
├── App.js                # Main application component
├── App.css               # Global styles
└── index.js              # Application entry point
```

## Design Philosophy

The application follows a minimalistic design approach with:

- **Clean Typography**: Easy-to-read fonts and proper spacing
- **Monochromatic Theme**: Black and white color scheme for focus
- **Intuitive Navigation**: Simple navbar with clear sections
- **Responsive Layout**: Adapts to different screen sizes
- **User-Friendly Forms**: Clear input fields and validation

## Installation & Setup

1. Navigate to the project directory
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Home Page**: View all existing blog posts
2. **Write Post**: Click to create a new blog post
3. **Edit**: Click edit button on any post to modify it
4. **Delete**: Click delete button to remove a post (with confirmation)
5. **Navigation**: Use the navbar to switch between sections
