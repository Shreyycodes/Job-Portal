# Job Portal

Live Demo: https://job-portal-client-blush-mu.vercel.app

A full-stack MERN Job Portal application that connects job seekers with employers. Users can browse jobs, apply for positions, track applications, while companies can post jobs and manage applicants through a dedicated dashboard.

## Live Demo

Frontend: https://job-portal-client-blush-mu.vercel.app

Backend: https://job-portal-backend-2z7o.onrender.com

---

## Features

### For Job Seekers
- Secure Authentication
- Browse Available Jobs
- Search and Filter Jobs
- Apply for Jobs
- Track Job Applications
- User Dashboard

### For Employers
- Company Registration & Login
- Post New Jobs
- Manage Job Listings
- View Applicants
- Update Application Status

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- Clerk Authentication

### Media Storage
- Cloudinary

### Deployment
- Vercel
- Render

---

## Project Structure

```bash
Job-Portal
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Shreyycodes/Job-Portal.git
```

### Install Dependencies

Frontend

```bash
cd client
npm install
npm run dev
```

Backend

```bash
cd server
npm install
npm start
```

---

## Environment Variables

Create a `.env` file inside the server directory:

```env
MONGODB_URI=
CLERK_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Future Enhancements

- Resume Upload & Management
- Advanced Job Filters
- Email Notifications
- Saved Jobs Feature
- Application Analytics

---

## Author

Shreyas Singh

GitHub: https://github.com/Shreyycodes

LinkedIn: https://linkedin.com/in/shreyas-singh-1515b62b7
