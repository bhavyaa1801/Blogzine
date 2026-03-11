# Blogzine

Blogzine is a modern full-stack blogging platform where users can create, publish, and interact with blog posts. It provides authentication, post management, likes, and comments using **React, Appwrite, and TailwindCSS**.

---

## Features

### Authentication

* User Signup and Login
* Secure authentication using **Appwrite Auth**
* Protected routes for authenticated users

### Blog Management

* Create blog posts
* Edit posts
* Delete posts
* View all posts

### Social Interactions

* Like / Unlike posts
* Comment on posts
* Real-time like count

### Media Support

* Upload featured images for blog posts
* Image storage using **Appwrite Storage**

### Modern UI

* Responsive design
* Clean landing page
* TailwindCSS styling
* Mobile-friendly layout

---

## Tech Stack

**Frontend**

* React
* React Router
* Redux Toolkit
* TailwindCSS

**Backend / BaaS**

* Appwrite

**Other Libraries**

* html-react-parser
* Vite

---

## Project Structure

```
Blogzine
│
├── public
│   └── favicon / images
│
├── src
│   ├── appwrite        # Appwrite configuration and services
│   ├── components      # Reusable UI components
│   ├── pages           # Page components (Home, Post, AddPost etc.)
│   ├── store           # Redux state management
│   ├── assets          # Images and icons
│   └── main.jsx        # App entry point
│
└── index.html
```

---

## Installation

Clone the repository:

```bash[
git clone https://github.com/bhavyaa1801/Blogzine
```

Navigate to the project folder:

```bash
cd blogzine
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Environment Setup

Create a **.env** file and add your Appwrite configuration:

```
VITE_APPWRITE_URL=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_posts_collection
VITE_APPWRITE_LIKE_COLLECTION_ID=your_likes_collection
VITE_APPWRITE_COMMENT_COLLECTION_ID=your_comments_collection
VITE_APPWRITE_BUCKET_ID=your_storage_bucket
```

---

## Appwrite Database Structure

### Posts Collection

```
title
content
featuredimage
userid
status
```

### Likes Collection

```
postid
userid
```

Unique index:

```
postid + userid
```

### Comments Collection

```
postid
userid
username
content
```
---

## Future Improvements
* Post categories and tags
* Rich text editor improvements
* Notifications system

---
