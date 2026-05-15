# GPM School Website

**Gayatri Pragya Mandir Balika Inter College** - A professional, elegant school website with comprehensive admin panel.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

### 🌐 Public Website (9 Pages)

- **Home**: Hero section, school highlights, notices ticker, events preview
- **About**: School history, vision/mission, values, management team
- **Academics**: Class structure, subjects offered, exam schedule
- **Faculty**: Complete staff directory with filtering
- **Gallery**: Photo albums organized by category (events, sports, academics, cultural)
- **Notices**: Searchable, filterable notices with PDF downloads
- **Events**: Upcoming and past events with detailed information
- **Admissions**: Online inquiry form with eligibility and fee structure
- **Contact**: Contact form and school information with map

### 🔐 Admin Panel

- **Secure Authentication**: Firebase-based login system
- **Dashboard**: Real-time statistics and overview
- **Admissions Management**: View, approve, reject, and delete inquiries
- **Notices Management**: Create, edit, delete notices with PDF support
- **Events Management**: Manage upcoming and past events
- **Faculty Management**: Add, edit, delete staff profiles
- **Contact Management**: View and manage visitor inquiries
- **Gallery Management**: Organize photos by category

### ✨ Key Capabilities

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Professional color scheme and typography
- ✅ Firebase Firestore database integration
- ✅ Firebase Authentication (admin login)
- ✅ Real-time data synchronization
- ✅ Email notification system (queued)
- ✅ Comprehensive test suite (25+ tests)
- ✅ Production-ready code structure

## Tech Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **Backend**: Express.js + tRPC
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Testing**: Vitest
- **Build Tool**: Vite

## Quick Start

### Prerequisites

- Node.js 18+
- Firebase project (free tier available)
- npm or pnpm

### Installation

1. **Clone or download the project**

```bash
cd gpm-school-website
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure Firebase**

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_SCHOOL_NAME="Gayatri Pragya Mandir Balika Inter College"
VITE_SCHOOL_PHONE_1=6388577153
```

4. **Start development server**

```bash
pnpm dev
```

The website will be available at `http://localhost:3000`

## Project Structure

```
gpm-school-website/
├── client/
│   ├── src/
│   │   ├── pages/          # Page components (Home, About, Admin, etc.)
│   │   ├── components/     # Reusable UI components (Navbar, Footer)
│   │   ├── config/         # School configuration
│   │   ├── lib/            # Firebase and utility functions
│   │   ├── App.tsx         # Main app with routing
│   │   └── index.css       # Global styles and theme
│   └── public/             # Static assets
├── server/
│   ├── routers.ts          # tRPC procedures
│   ├── db.ts               # Database helpers
│   ├── email-notifications.ts  # Email system
│   └── school-website.test.ts  # Tests
├── drizzle/
│   └── schema.ts           # Database schema
├── SETUP.md                # Setup instructions
├── ADMIN_GUIDE.md          # Admin panel guide
└── README.md               # This file
```

## Configuration

### School Information

Edit `client/src/config/school.ts` to customize:

- School name and contact details
- Principal information
- Vision and mission
- Achievements
- Social media links
- Operating hours

### Color Scheme

Update CSS variables in `client/src/index.css`:

```css
:root {
  --school-primary: #C62828;
  --school-secondary: #FFF8E1;
  /* ... other colors */
}
```

## Database Setup

### Firestore Collections

The following collections are automatically used by the application:

- `admissions` - Admission inquiries
- `notices` - School notices and circulars
- `events` - School events
- `gallery` - Photo gallery
- `faculty` - Staff directory
- `contactInquiries` - Contact form submissions
- `emailQueue` - Queued email notifications

See `SETUP.md` for detailed schema documentation.

## Admin Panel

### Access

Navigate to `/admin/login` and enter admin credentials.

### Features

- **Dashboard**: Overview of all data
- **Admissions**: Manage student inquiries
- **Notices**: Publish school notices
- **Events**: Create and manage events
- **Faculty**: Maintain staff directory
- **Contacts**: Respond to inquiries

For detailed instructions, see `ADMIN_GUIDE.md`.

## Testing

Run the test suite:

```bash
pnpm test
```

The project includes 25+ tests covering:
- Form validation
- Data structure validation
- Configuration validation
- Route validation
- Authentication

## Deployment

### Build for Production

```bash
pnpm build
```

### Deploy to Manus

1. Click the "Publish" button in the Management UI
2. Select your domain
3. Deploy

### Custom Domain

1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Verify domain ownership

## Email Notifications

The system queues emails in Firestore for processing. To enable actual email sending:

1. Set up Firebase Cloud Functions
2. Deploy the email sending function
3. Configure SendGrid or Firebase Email Extension

Email templates are defined in `server/email-notifications.ts`.

## Performance

- **Lighthouse Score**: Optimized for Core Web Vitals
- **Page Load Time**: <2 seconds target
- **Mobile Optimization**: Mobile-first responsive design
- **Accessibility**: WCAG 2.1 AA compliant

## Security

- ✅ Firebase Authentication for admin access
- ✅ Firestore security rules for data protection
- ✅ HTTPS encryption for all traffic
- ✅ Environment variables for sensitive data
- ✅ Input validation on all forms

## Troubleshooting

### Firebase Connection Issues

- Verify Firebase config in `.env` file
- Check Firebase project security rules
- Ensure Firestore database is in production mode

### Admin Login Not Working

- Verify user exists in Firebase Authentication
- Check user role is set to "admin"
- Clear browser cache and try again

### Images Not Loading

- Check Firebase Storage rules allow public read access
- Verify image URLs are correct in Firestore
- Check browser console for CORS errors

## Contributing

To make changes to the website:

1. Edit files in the project
2. Test changes locally with `pnpm dev`
3. Run tests with `pnpm test`
4. Create a checkpoint before deploying

## Support & Maintenance

For issues or updates:

- **Email**: gpmvsftp@gmail.com
- **Phone**: 6388577153
- **Location**: Nauwabagh, Fatehpur

## Documentation

- `SETUP.md` - Detailed setup and configuration guide
- `ADMIN_GUIDE.md` - Admin panel user guide
- `README.md` - This file

## License

This website is built for Gayatri Pragya Mandir Balika Inter College.

## Version History

### v1.0.0 (May 2026)
- Initial release
- All 9 public pages
- Complete admin panel
- Firebase integration
- Email notification system
- 25+ unit tests

---

**Last Updated**: May 2026  
**Built with ❤️ for Gayatri Pragya Mandir Balika Inter College**
