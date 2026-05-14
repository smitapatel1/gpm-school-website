/**
 * Firestore Collections Schema for GPM School Website
 * This file documents the structure of all Firestore collections
 */

// Admissions Collection
export interface Admission {
  id: string;
  studentName: string;
  parentName: string;
  class: string;
  phone: string;
  address: string;
  email?: string;
  documentUrl?: string; // Firebase Storage URL
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

// Notices Collection
export interface Notice {
  id: string;
  title: string;
  description: string;
  category: string;
  pdfUrl?: string; // Firebase Storage URL
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Events Collection
export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  location: string;
  imageUrl?: string; // Firebase Storage URL
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

// Gallery Collection
export interface GalleryImage {
  id: string;
  title: string;
  imageUrl: string; // Firebase Storage URL
  category: "events" | "sports" | "academics" | "cultural";
  description?: string;
  uploadedAt: Date;
}

// Faculty Collection
export interface Faculty {
  id: string;
  name: string;
  designation: string;
  subject?: string;
  photoUrl?: string; // Firebase Storage URL
  email?: string;
  phone?: string;
  qualification?: string;
  experience?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Contact Inquiries Collection
export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
}

// School Info Collection (Single document)
export interface SchoolInfo {
  name: string;
  shortName: string;
  location: string;
  phone1: string;
  phone2?: string;
  phone3?: string;
  phone4?: string;
  email: string;
  website?: string;
  principalMessage?: string;
  visionMission?: string;
  history?: string;
  achievements?: string[];
  updatedAt: Date;
}

// Notifications Collection (for admin alerts)
export interface Notification {
  id: string;
  type: "admission" | "contact" | "system";
  title: string;
  message: string;
  relatedId?: string; // ID of related document (admission, contact, etc.)
  read: boolean;
  createdAt: Date;
}
