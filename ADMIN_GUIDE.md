# Admin Panel User Guide

## Overview

The Admin Panel is a secure management interface for Gayatri Pragya Mandir Balika Inter College. It allows authorized administrators to manage admissions, notices, events, faculty, and contact inquiries.

## Accessing the Admin Panel

1. Navigate to `https://your-domain.com/admin/login`
2. Enter your email and password
3. Click "Login"

**Note:** Only users with admin credentials can access the admin panel.

## Dashboard

The Dashboard provides a quick overview of your school's data:

- **Admissions**: Number of admission inquiries received
- **Notices**: Total notices and circulars published
- **Events**: Upcoming and past events
- **Gallery**: Total photos in the gallery
- **Faculty**: Number of staff members
- **Contact Inquiries**: Messages from visitors

### Recent Activity

The dashboard shows recent actions taken on the platform, helping you stay updated on important events.

---

## Managing Admissions

### View Admissions

1. Click "Admissions" in the sidebar
2. All admission inquiries are displayed in a table
3. Use the status filters to view: All, Pending, Approved, or Rejected inquiries

### View Admission Details

1. Click the **Eye icon** next to an admission
2. A modal window will show complete details:
   - Student name and parent name
   - Class and contact information
   - Address
   - Current status

### Approve an Admission

1. Find a pending admission in the table
2. Click the **Green checkmark icon**
3. The status will change to "Approved"

### Reject an Admission

1. Find a pending admission in the table
2. Click the **Red X icon**
3. The status will change to "Rejected"

### Delete an Admission

1. Click the **Trash icon** next to any admission
2. Confirm the deletion when prompted

---

## Managing Notices & Circulars

### Add a New Notice

1. Click "Notices" in the sidebar
2. Click the **"Add New Notice"** button
3. Fill in the form:
   - **Title**: Notice heading (e.g., "Annual Examination Schedule")
   - **Description**: Full notice text
   - **Category**: Select from Academic, Admission, Event, or General
   - **PDF URL** (optional): Link to a downloadable PDF file
4. Click "Create"

### Edit a Notice

1. Click the **Edit icon** next to a notice
2. Modify the details in the form
3. Click "Update"

### Delete a Notice

1. Click the **Trash icon** next to a notice
2. Confirm the deletion

### View Notices

All notices are displayed as cards showing:
- Title and description
- Category tag
- PDF download link (if available)
- Edit and delete options

---

## Managing Events

### Add a New Event

1. Click "Events" in the sidebar
2. Click the **"Add New Event"** button
3. Fill in the form:
   - **Title**: Event name (e.g., "Annual Sports Day")
   - **Description**: Event details
   - **Start Date**: When the event begins
   - **End Date** (optional): When the event ends
   - **Location**: Where the event takes place
   - **Category**: Select from Sports, Cultural, Academic, or Celebration
4. Click "Create"

### Edit an Event

1. Click the **Edit icon** next to an event
2. Modify the details
3. Click "Update"

### Delete an Event

1. Click the **Trash icon** next to an event
2. Confirm the deletion

### View Events

Events are displayed as cards showing:
- Title and description
- Location
- Category tag
- Edit and delete options

---

## Managing Faculty

### Add a Staff Member

1. Click "Faculty" in the sidebar
2. Click the **"Add Staff Member"** button
3. Fill in the form:
   - **Name** *: Full name of the staff member
   - **Designation** *: Position (e.g., "Senior Teacher", "Principal")
   - **Subject**: Subject taught (if applicable)
   - **Email**: Staff email address
   - **Phone**: Contact number
   - **Qualification**: Educational qualifications (e.g., "M.Sc, B.Ed")
   - **Experience**: Years of experience (e.g., "15 years")
4. Click "Create"

### Edit Faculty Information

1. Click the **Edit icon** on a faculty card
2. Modify the details
3. Click "Update"

### Delete a Staff Member

1. Click the **Trash icon** on a faculty card
2. Confirm the deletion

### View Faculty

Faculty members are displayed as cards showing:
- Name and designation
- Subject (if applicable)
- Qualifications and experience
- Contact information
- Edit and delete options

---

## Managing Contact Inquiries

### View Contact Inquiries

1. Click "Contact Inquiries" in the sidebar
2. All inquiries are displayed with:
   - Sender's name and email
   - Subject line
   - Message preview
   - Current status (New, Read, or Replied)

### Filter by Status

Use the status buttons to view:
- **All**: All inquiries
- **New**: Unread inquiries
- **Read**: Inquiries you've reviewed
- **Replied**: Inquiries you've responded to

### View Full Details

1. Click the **Eye icon** next to an inquiry
2. A modal will show:
   - Complete message
   - Sender's contact information
   - Current status

### Mark as Read

1. For new inquiries, click the **Checkmark icon**
2. The status will change to "Read"

### Delete an Inquiry

1. Click the **Trash icon** next to an inquiry
2. Confirm the deletion

---

## Gallery Management

**Note:** Gallery upload feature is coming soon. In the meantime, you can manage gallery images through the Firestore database directly or contact technical support.

---

## Best Practices

### For Admissions
- Review pending admissions regularly
- Approve or reject inquiries promptly
- Keep records of all admissions for reference

### For Notices
- Keep notices clear and concise
- Use appropriate categories for easy filtering
- Include PDF links for detailed documents
- Update notices regularly

### For Events
- Provide complete event details
- Include accurate dates and locations
- Use consistent category naming
- Update event information if plans change

### For Faculty
- Keep staff information current
- Include qualifications and experience
- Maintain accurate contact details
- Update information when staff changes occur

### For Contact Inquiries
- Respond to inquiries promptly
- Mark inquiries as "Read" after reviewing
- Keep important inquiries for reference
- Delete resolved or spam inquiries

---

## Troubleshooting

### Can't Login?
- Verify your email and password are correct
- Check if your account has admin privileges
- Clear browser cache and try again
- Contact school management if issues persist

### Changes Not Saving?
- Check your internet connection
- Ensure you clicked the "Create" or "Update" button
- Verify all required fields are filled
- Try refreshing the page

### Can't See Data?
- Ensure you're logged in as an admin
- Check if Firestore database is properly configured
- Verify Firebase credentials in .env file
- Contact technical support

---

## Security Tips

1. **Never share your login credentials** with anyone
2. **Log out** when leaving your computer
3. **Use a strong password** with numbers and special characters
4. **Change your password** regularly
5. **Report suspicious activity** to school management immediately

---

## Support

For technical issues or questions:
- **Email**: gpmvsftp@gmail.com
- **Phone**: 6388577153

---

**Last Updated**: May 2026
**Version**: 1.0
