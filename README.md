# Murmur

A full-stack social platform built with Next.js, TypeScript, and Firebase. Share short posts, follow people, and see your feed update in real time. Includes edit history, image cropping, and drag-to-reorder media.

<div align="center">
  <a href="https://murmur-social-media.vercel.app/">
    <img src="./public/assets/murmur-logo.svg" alt="Murmur Logo" width="80" height="80">
  </a>

  <p align="center">
    <a href="https://murmur-social-media.vercel.app/">🌐 View Live Demo</a>
    ·
    <a href="https://github.com/curlos/murmur/issues">🐛 Report Bug</a>
    ·
    <a href="https://github.com/curlos/murmur/issues">✨ Request Feature</a>
  </p>
</div>

## 📱 Screenshots

<div align="center">

### 🏠 Homepage/Feed Page
<img alt="Murmur home feed" src="https://github.com/user-attachments/assets/9c2ae268-f239-4ba1-807f-5b164c1307e0" width="100%" />

### 💬 Post Page
<img alt="Murmur post page" src="https://github.com/user-attachments/assets/2ae39503-6438-4fac-b3bc-803e2e61a28a" width="100%" />

### 👤 Profile Page
<img alt="Murmur profile page" src="https://github.com/user-attachments/assets/94a5a439-3622-43d1-9e26-289c9fc52d86" width="100%" />

### 📰 News Page
<img alt="Murmur news page" src="https://github.com/user-attachments/assets/3b438658-aa7a-415d-86bb-974a70b15c98" width="100%" />

</div>

## 🧠 Engineering Highlights
- 🗂️ **Edit history** - Every edit is versioned, and readers can browse past versions of a post
- ✂️ **Image pipeline** - Cropping (1:1 avatars, 3:1 banners), client-side compression, HEIC conversion, and Cloudinary uploads
- 🔀 **Drag-to-reorder** - Reorder images before posting and sort lists with @dnd-kit
- ⚡ **Real-time feeds** - Firestore listeners keep feeds, profiles, and activity pages live
- 🔒 **Reply controls** - Authors choose who can reply to or quote each post

## ✨ Features

### Core Features
- 📝 **Posts** - Create, edit, delete, and view posts with images and emoji
- 👤 **User Profiles** - Customizable profiles with bio, profile pictures, and user stats
- 🔄 **Social Interactions** - Like, repost, quote, reply, and bookmark
- 👥 **Follow System** - Follow/unfollow users and view followers/following lists
- 🔍 **Search** - Real-time search across posts and users
- 📱 **Responsive Design** - Fully responsive interface optimized for all devices

### Advanced Features
- 🔐 **Authentication** - Secure login with Google OAuth and email/password
- 🌙 **Dark/Light Mode** - Toggle between themes with persistent preferences
- 📸 **Media Upload** - Image uploads with cropping and compression, stored on Cloudinary
- ⚡ **Real-time Updates** - Live feed updates with Firebase Firestore
- 🎨 **Modern UI** - Clean, familiar three-column interface with smooth animations
- 📊 **User Analytics** - Post counts, follower statistics, and activity tracking
- 📚 **Bookmarks** - Save posts for later viewing
- 📰 **News** - A news page with the latest headlines

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 12 (React 18)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Recoil
- **Icons**: Heroicons, React Icons
- **UI Components**: Headless UI
- **Drag & Drop**: @dnd-kit

### Backend & Services
- **Database**: Firebase Firestore
- **Image Storage**: Cloudinary
- **Authentication**: NextAuth.js
- **Hosting**: Vercel

### Development Tools
- **Package Manager**: npm
- **Build Tool**: Next.js built-in
- **Code Quality**: TypeScript

## 🌐 Live Demo

Try Murmur directly in your browser - no installation required!

**🚀 [Visit Murmur →](https://murmur-social-media.vercel.app/)**

Simply click the link above to start using the platform immediately. Create an account or sign in with Google to start posting, following users, and exploring the full social media experience.

## 🎯 How to Use

### Getting Started on Murmur

1. **Sign Up/Login**: Create an account or sign in with Google
2. **Create Your Profile**: Add a bio, profile picture, and personalize your account
3. **Start Posting**: Use the Post button or input field to share your thoughts
4. **Discover Content**: Browse the feed to see posts from all users
5. **Connect**: Follow users you're interested in to customize your feed
6. **Interact**: Like, repost, reply to, and bookmark posts
7. **Search**: Find specific posts, topics, or users
8. **Customize**: Toggle between light and dark themes in settings

**Live Site**: [https://murmur-social-media.vercel.app/](https://murmur-social-media.vercel.app/)

## 📝 License

This project is licensed under the MIT License.

<div align="center">
  Made with ❤️ using Next.js, TypeScript, and Firebase
</div>
