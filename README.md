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

### 🏠 Homepage/Feed Page (Desktop & Mobile)
<img src="https://github.com/user-attachments/assets/42086562-1e11-41c9-9dce-79485b515c84" height="250" /> <img src="https://github.com/user-attachments/assets/2d6f9e1b-ecb3-40b8-8289-09e220648a3c" height="250" />

### 💬 Post Page (Desktop & Mobile)
<img src="https://github.com/user-attachments/assets/c94f6efe-e2fe-49ac-9053-679c9b46403e" height="250" /> <img src="https://github.com/user-attachments/assets/982ae6a3-af1e-436e-b8ee-6be7b62991d4" height="250" />

### 👤 Profile Page (Desktop & Mobile)
<img src="https://github.com/user-attachments/assets/7755230c-c097-4433-bd6d-e2564bd7a754" height="250" /> <img src="https://github.com/user-attachments/assets/e06f3dfc-0420-4438-88af-920460eda924" height="250" />

### 📰 News Page (Desktop & Mobile)
<img src="https://github.com/user-attachments/assets/45a78737-351b-4191-9a97-0eb67da3ef35" height="250" /> <img src="https://github.com/user-attachments/assets/6dff0460-dc30-4011-ad2c-f9b0daf9d0ce" height="250" />

</div>

## 🧠 Engineering Highlights
- 🗂️ **Edit history** - Every edit is versioned, and readers can browse past versions of a post
- ✂️ **Image pipeline** - Cropping (1:1 avatars, 3:1 banners), client-side compression, HEIC conversion, and Cloudinary uploads
- 🔀 **Drag-to-reorder** - Reorder images before posting and sort lists with @dnd-kit
- ⚡ **Real-time feeds** - Firestore listeners keep feeds, profiles, and activity pages live
- 🔒 **Reply controls** - Authors choose who can reply to or quote each post

## ✨ Features

### Core Features
- 📝 **Posts** - Create, edit, delete, and view posts with rich text support
- 👤 **User Profiles** - Customizable profiles with bio, profile pictures, and user stats
- 🔄 **Social Interactions** - Like, repost, quote, reply, and bookmark
- 👥 **Follow System** - Follow/unfollow users and view followers/following lists
- 🔍 **Search** - Real-time search across posts and users
- 📱 **Responsive Design** - Fully responsive interface optimized for all devices

### Advanced Features
- 🔐 **Authentication** - Secure login with Google OAuth and email/password
- 🌙 **Dark/Light Mode** - Toggle between themes with persistent preferences
- 📸 **Media Upload** - Image upload and storage with Firebase Storage
- ⚡ **Real-time Updates** - Live feed updates with Firebase Firestore
- 🎨 **Modern UI** - Clean, familiar three-column interface with smooth animations
- 📊 **User Analytics** - Post counts, follower statistics, and activity tracking
- 🔔 **Notifications** - Activity alerts and interaction notifications
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
- **Storage**: Firebase Storage
- **Authentication**: NextAuth.js
- **Hosting**: Vercel

### Development Tools
- **Package Manager**: npm
- **Build Tool**: Next.js built-in
- **Code Quality**: TypeScript, ESLint (configured in Next.js)

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

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<div align="center">
  Made with ❤️ using Next.js, TypeScript, and Firebase
</div>
