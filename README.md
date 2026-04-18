<h1 align="center"> Jokerhut's X Clone</h1>

---

## Overview

This project is a personal project i made to make a website with X's features and functionality.

The project is currently under refactor to remove X's assets (logo, name, etc.) with different ones in order to avoid confusion.

The project is strictly non commercial and is public in the hope that others can take inspiration on how to build a similar social media site.

## Architecture Overview Guide
👉 [Architecture Overview & Contributor Guide](https://github.com/jokerhutt/x-clone/wiki/Architecture-Overview-&-Contributor-Guide)

## Key Features

- **Google OAuth login** with secure JWT authentication  
- **Image & video uploads** with preview support and cloud storage  
- **“For You” feed** powered by a custom ranking algorithm (EdgeRank-inspired)  
- **Client-side caching** with TanStack Query for fast performance  
- **Infinite scrolling** with smooth pagination on all feeds  
- **Live user search** with autosuggest and profile linking  
- **Notifications system** with unseen indicators  
- **Bookmark and Retweet** support  
- **Light/Dark mode** and persistent user theme preferences  

---
## API Routes

---

### Auth Routes – `/api/auth`

| Method | Endpoint         | Params (Body/Query/Header)  | Description             | Returns                     |
| ------ | ---------------- | ---------------------------- | ----------------------- | ----------------------------|
| POST   | `/google-login`  | `token` (body)               | Google login            | JWT token, user DTO         |
| GET    | `/me`            | `Authorization` (header)     | Get current user info   | User DTO                    |
| POST   | `/demo-signup`   | none                         | Create temp/demo user   | JWT token, user DTO         |

---

### User Routes – `/api/users`

| Method | Endpoint         | Params                       | Description             | Returns                     |
| ------ | ---------------- | ---------------------------- | ----------------------- | ----------------------------|
| GET    | `/get-user`      | `id` (query)                 | Get user by ID          | User DTO                    |
| POST   | `/get-users`     | `ids: number[]` (body)       | Get users by IDs        | List of User DTOs           |
| GET    | `/get-top-five`  | none                         | Get top 5 users         | List of user IDs            |
| GET    | `/getAdminUser`  | `id` (query)                 | Admin fetch user        | User DTO                    |
| GET    | `/search`        | `q` (query)                  | Search by name          | List of user IDs            |

---

### Follow Routes – `/api/follows`

| Method | Endpoint     | Params                       | Description         | Returns           |
| ------ | ------------ | ---------------------------- | ------------------- | ------------------|
| POST   | `/follow`    | `followedId` (body)          | Follow a user       | Followed user DTO |
| POST   | `/unfollow`  | `followedId` (body)          | Unfollow a user     | Followed user DTO |

---

### Post Routes – `/api/posts`

| Method | Endpoint         | Params                              | Description               | Returns         |
| ------ | ---------------- | ----------------------------------- | ------------------------- | ----------------|
| POST   | `/get-posts`     | `ids: number[]` (body)              | Get posts by IDs          | List of posts   |
| GET    | `/get-post/{id}` | `id` (path)                         | Get single post           | Post DTO        |
| POST   | `/create`        | `text`, `images[]`, `parentId`      | Create post               | Post DTO        |
| POST   | `/delete`        | `postId` (body)                     | Delete post               | Success / error |
| POST   | `/pin`           | `postId` (query)                    | Pin post to profile       | Updated user DTO|
| POST   | `/unpin`         | `postId` (query)                    | Unpin post                | Updated user DTO|

---

### Retweet Routes – `/api/retweets`

| Method | Endpoint     | Params                         | Description         | Returns         |
| ------ | ------------ | ------------------------------ | ------------------- | ----------------|
| POST   | `/create`    | `postId`, etc. (body)          | Retweet a post      | Retweet post DTO|
| POST   | `/delete`    | `retweetId`, etc. (body)       | Delete retweet      | Retweet post DTO|

---

### Like Routes – `/api/likes`

| Method | Endpoint     | Params             | Description       | Returns          |
| ------ | ------------ | ------------------| ----------------- | -----------------|
| POST   | `/create`    | `postId` (body)    | Like a post       | Updated post DTO |
| POST   | `/delete`    | `postId` (body)    | Unlike a post     | Updated post DTO |

---

### Bookmark Routes – `/api/bookmarks`

| Method | Endpoint     | Params             | Description          | Returns          |
| ------ | ------------ | ------------------| ---------------------| -----------------|
| POST   | `/create`    | `postId` (body)    | Bookmark a post      | Post DTO         |
| POST   | `/delete`    | `postId` (body)    | Remove bookmark      | Post DTO / state |

---

### Notification Routes – `/api/notifications`

| Method | Endpoint             | Params                   | Description                  | Returns                   |
| ------ | -------------------- | ------------------------ | ---------------------------- | --------------------------|
| GET    | `/get-unseen`        | (auth required)          | Get unseen notifications     | List of notification IDs  |
| POST   | `/get-notifications` | `ids: number[]` (body)   | Get notification details     | List of notification DTOs |

---

### Feedback Route – `/api/feedback`

| Method | Endpoint         | Params                    | Description        | Returns         |
| ------ | ---------------- | ------------------------- | ------------------ | ----------------|
| POST   | `/add-feedback`  | `text`, `type`, `userId?` | Submit feedback    | Success message |

---

### Feed & Discover Routes – `/api/feed` and `/api/users`

| Method | Endpoint            | Params                                       | Description                  | Returns           |
| ------ | ------------------- | --------------------------------------------| ---------------------------- | ------------------|
| GET    | `/feed/get-feed-page` | `type`, `cursor`, `limit`, `userId?`       | Paginated feed by type       | Paginated post IDs|
| GET    | `/users/get-discover` | `cursor`, `limit`                          | Discover top users paginated | User DTOs         |

## Stack

**Frontend**  
→ React, TypeScript, TanStack Query, Tailwind CSS  

**Backend**  
→ Java with Spring Boot  

**Database**  
→ MySQL (Google Cloud SQL)  

**Hosting & Deployment**  
- Netlify (Frontend)  
- Google Cloud VM with Docker (Backend)  
- Google Cloud SQL (Database)  
- Google Cloud Storage (Media uploads)  

---
