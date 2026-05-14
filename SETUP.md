# GPM School Website - Setup Guide

## Overview

This is a fully production-ready school website built with React, TypeScript, Tailwind CSS, and Firebase. It includes a public website with 9 pages and a complete admin panel for content management.

## Features

### Public Website (9 Pages)
1. **Home** - Hero section, highlights, notices ticker, events preview
2. **About** - School history, vision/mission, values, management
3. **Academics** - Class structure, subjects, exam schedule
4. **Faculty** - Staff directory with filtering
5. **Gallery** - Photo albums organized by category (events, sports, academics, cultural)
6. **Notices** - Searchable, filterable notices with PDF downloads
7. **Events** - Upcoming and past events with details
8. **Admissions** - Online inquiry form with eligibility and fee structure
9. **Contact** - Contact form and school information

### Admin Panel
- Secure Firebase authentication
- Dashboard with statistics
- Management interfaces for:
  - Admissions inquiries
  - Notices and circulars
  - Events
  - Gallery uploads
  - Faculty profiles
  - Contact inquiries

## Prerequisites

- Node.js 18+
- Firebase project (free tier available)
- npm or pnpm

## Installation & Setup

### 1. Firebase Configuration

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable the following Firebase services:
   - **Authentication** - Enable Email/Password sign-in
   - **Firestore Database** - Create a database in production mode
   - **Storage** - For file uploads (images, PDFs)

3. Get your Firebase config from Project Settings and fill in the `.env` file:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 2. School Configuration

Update the school details in `client/src/config/school.ts`:

```typescript
export const schoolConfig = {
  name: "Gayatri Pragya Mandir Balika Inter College",
  shortName: "GPM",
  location: "Nauwabagh, Fatehpur",
  contact: {
    phone1: "6388577153",
    phone2: "7081230592",
    // ... more details
  },
  // ... other config
};
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Start Development Server

```bash
pnpm dev
```

The website will be available at `http://localhost:3000`

## Firestore Database Setup

### Collections Structure

The following Firestore collections need to be created:

#### 1. **admissions**
```
{
  id: string (auto-generated)
  studentName: string
  parentName: string
  class: string
  phone: string
  address: string
  email?: string
  documentUrl?: string (Firebase Storage URL)
  status: "pending" | "approved" | "rejected"
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### 2. **notices**
```
{
  id: string
  title: string
  description: string
  category: string
  pdfUrl?: string (Firebase Storage URL)
  date: timestamp
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### 3. **events**
```
{
  id: string
  title: string
  description: string
  date: timestamp
  endDate?: timestamp
  location: string
  imageUrl?: string (Firebase Storage URL)
  category: string
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### 4. **gallery**
```
{
  id: string
  title: string
  imageUrl: string (Firebase Storage URL)
  category: "events" | "sports" | "academics" | "cultural"
  description?: string
  uploadedAt: timestamp
}
```

#### 5. **faculty**
```
{
  id: string
  name: string
  designation: string
  subject?: string
  photoUrl?: string (Firebase Storage URL)
  email?: string
  phone?: string
  qualification?: string
  experience?: string
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### 6. **contactInquiries**
```
{
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: "new" | "read" | "replied"
  createdAt: timestamp
}
```

#### 7. **schoolInfo** (Single document)
```
{
  name: string
  shortName: string
  location: string
  phone1: string
  phone2?: string
  email: string
  principalMessage?: string
  visionMission?: string
  history?: string
  achievements?: string[]
  updatedAt: timestamp
}
```

## Admin Panel Access

### Creating Admin Users

1. Go to Firebase Console → Authentication
2. Create a new user with email and password
3. Go to Firestore → users collection
4. Set the user's role to "admin"

### Admin Panel URL

```
http://localhost:3000/admin/login
```

## File Upload System

All files (images, PDFs) are stored in Firebase Storage:

- **Gallery Images**: `gallery/{category}/{timestamp}-{filename}`
- **Notice PDFs**: `notices/{timestamp}-{filename}`
- **Admission Documents**: `admissions/{timestamp}-{filename}`
- **Faculty Photos**: `faculty/{timestamp}-{filename}`
- **Event Images**: `events/{timestamp}-{filename}`

## Email Notifications

The system queues emails in Firestore for processing. To enable actual email sending:

1. Set up Firebase Cloud Functions
2. Deploy the email sending function
3. Configure SendGrid or Firebase Email Extension

Email templates are defined in `server/email-notifications.ts`

## Deployment

### Build for Production

```bash
pnpm build
```

### Deploy to Manus

The website can be deployed directly through the Manus UI:

1. Click the "Publish" button in the Management UI
2. Select your domain
3. Deploy

### Custom Domain

To use a custom domain:

1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Verify domain ownership

## Color Scheme

The website uses the following school colors:

- **Primary Red**: #C62828
- **Accent Red**: #E53935
- **Warm Cream**: #FFF8E1
- **Dark Text**: #3E2723
- **Light Background**: #FFFDF7
- **Border Gray**: #D6D6D6
- **Muted Text**: #6B7280

## Customization

### Change School Logo

Update the logo in `client/src/components/Navbar.tsx` and `client/src/components/Footer.tsx`

### Update Color Scheme

Edit CSS variables in `client/src/index.css`:

```css
:root {
  --school-primary: #C62828;
  --school-secondary: #FFF8E1;
  /* ... other colors */
}
```

### Modify Footer

Edit `client/src/components/Footer.tsx` to change social links and footer content

## Troubleshooting

### Firebase Connection Issues

- Verify Firebase config in `.env` file
- Check Firebase project security rules
- Ensure Firestore database is in production mode

### Images Not Loading

- Check Firebase Storage rules allow public read access
- Verify image URLs are correct in Firestore
- Check browser console for CORS errors

### Admin Login Not Working

- Verify user exists in Firebase Authentication
- Check user role is set to "admin" in Firestore
- Clear browser cache and try again

## Support & Maintenance

For issues or updates, contact:
- **School Email**: gpmvsftp@gmail.com
- **Phone**: 6388577153

## License

This website is built for Gayatri Pragya Mandir Balika Inter College.

---

**Last Updated**: May 2026
**Version**: 1.0.0
