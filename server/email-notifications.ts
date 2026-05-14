/**
 * Email Notification System
 * Uses Firebase Cloud Functions to send emails
 * 
 * Setup required:
 * 1. Install Firebase Admin SDK
 * 2. Configure SendGrid or Firebase Email Extension
 * 3. Set up environment variables for email service
 */

import { db } from "../client/src/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

/**
 * Send admission confirmation email to applicant
 */
export async function sendAdmissionConfirmationEmail(
  applicantEmail: string,
  applicantName: string,
  schoolName: string
) {
  try {
    // Store email task in Firestore
    // Firebase Cloud Function will pick this up and send the email
    await addDoc(collection(db, "emailQueue"), {
      type: "admission_confirmation",
      to: applicantEmail,
      subject: `Admission Inquiry Confirmation - ${schoolName}`,
      template: "admission_confirmation",
      data: {
        applicantName,
        schoolName,
      },
      createdAt: Timestamp.now(),
      sent: false,
    });

    console.log("Admission confirmation email queued for:", applicantEmail);
  } catch (error) {
    console.error("Error queuing admission confirmation email:", error);
    throw error;
  }
}

/**
 * Send admin notification about new admission inquiry
 */
export async function sendAdminAdmissionNotification(
  adminEmail: string,
  applicantName: string,
  applicantClass: string,
  applicantPhone: string
) {
  try {
    await addDoc(collection(db, "emailQueue"), {
      type: "admin_admission_notification",
      to: adminEmail,
      subject: `New Admission Inquiry - ${applicantName}`,
      template: "admin_admission_notification",
      data: {
        applicantName,
        applicantClass,
        applicantPhone,
      },
      createdAt: Timestamp.now(),
      sent: false,
    });

    console.log("Admin notification email queued for:", adminEmail);
  } catch (error) {
    console.error("Error queuing admin notification email:", error);
    throw error;
  }
}

/**
 * Send contact form confirmation to user
 */
export async function sendContactConfirmationEmail(
  userEmail: string,
  userName: string,
  schoolName: string
) {
  try {
    await addDoc(collection(db, "emailQueue"), {
      type: "contact_confirmation",
      to: userEmail,
      subject: `We received your message - ${schoolName}`,
      template: "contact_confirmation",
      data: {
        userName,
        schoolName,
      },
      createdAt: Timestamp.now(),
      sent: false,
    });

    console.log("Contact confirmation email queued for:", userEmail);
  } catch (error) {
    console.error("Error queuing contact confirmation email:", error);
    throw error;
  }
}

/**
 * Send admin notification about new contact inquiry
 */
export async function sendAdminContactNotification(
  adminEmail: string,
  senderName: string,
  senderEmail: string,
  subject: string,
  message: string
) {
  try {
    await addDoc(collection(db, "emailQueue"), {
      type: "admin_contact_notification",
      to: adminEmail,
      subject: `New Contact Inquiry: ${subject}`,
      template: "admin_contact_notification",
      data: {
        senderName,
        senderEmail,
        subject,
        message,
      },
      createdAt: Timestamp.now(),
      sent: false,
    });

    console.log("Admin contact notification email queued for:", adminEmail);
  } catch (error) {
    console.error("Error queuing admin contact notification email:", error);
    throw error;
  }
}

/**
 * Email templates for reference
 * These should be implemented in Firebase Cloud Functions
 */
export const emailTemplates = {
  admission_confirmation: {
    subject: "Admission Inquiry Confirmation",
    body: `
Dear {{applicantName}},

Thank you for submitting your admission inquiry to {{schoolName}}.

We have received your application and will review it shortly. Our admission team will contact you within 2-3 business days with further details.

If you have any questions, please feel free to contact us:
- Phone: [SCHOOL_PHONE]
- Email: [SCHOOL_EMAIL]

Best regards,
{{schoolName}} Admission Team
    `,
  },

  admin_admission_notification: {
    subject: "New Admission Inquiry",
    body: `
A new admission inquiry has been received:

Name: {{applicantName}}
Class: {{applicantClass}}
Phone: {{applicantPhone}}

Please review and respond to the applicant accordingly.
    `,
  },

  contact_confirmation: {
    subject: "We received your message",
    body: `
Dear {{userName}},

Thank you for contacting {{schoolName}}.

We have received your message and will get back to you as soon as possible.

Best regards,
{{schoolName}} Team
    `,
  },

  admin_contact_notification: {
    subject: "New Contact Inquiry",
    body: `
A new contact inquiry has been received:

From: {{senderName}} ({{senderEmail}})
Subject: {{subject}}

Message:
{{message}}

Please respond to the inquiry at your earliest convenience.
    `,
  },
};
