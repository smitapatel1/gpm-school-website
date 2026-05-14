/**
 * School Configuration
 * This file contains all school-related configuration
 */

export const schoolConfig = {
  name: import.meta.env.VITE_SCHOOL_NAME || "Gayatri Pragya Mandir Balika Inter College",
  shortName: "GPM",
  location: "Nauwabagh, Fatehpur",
  
  // Contact Information
  contact: {
    phone1: import.meta.env.VITE_SCHOOL_PHONE_1 || "6388577153",
    phone2: "7081230592",
    phone3: "8546014482",
    phone4: "96211360221",
    email: import.meta.env.VITE_ADMIN_EMAIL || "gpmvsftp@gmail.com",
    adminEmail: import.meta.env.VITE_ADMIN_EMAIL || "gpmvsftp@gmail.com",
  },

  // School Details
  details: {
    type: "English Medium (PG-8), Hindi Medium (KG-12)",
    classes: "PG, LKG, UKG to Class 12",
    streams: "Science",
    coeducational: true,
  },

  // Management
  management: {
    manager: "Shiv Shagar Maurya",
    principal1: "Mrs. Sushila Devi",
    principal2: "Mrs. Nishi Shrivastav",
  },

  // Colors (Theme)
  colors: {
    primary: "#C62828", // Deep School Red
    secondary: "#FFF8E1", // Warm Cream
    accent: "#E53935", // Vermilion Red
    darkText: "#3E2723", // Rich Brown
    lightBg: "#FFFDF7", // Soft Ivory
    border: "#D6D6D6", // Light Gray
    mutedText: "#6B7280", // Slate Gray
    highlight: "#87CEEB", // Sky Blue
    groundAccent: "#E8D6B3", // Sand Beige
  },

  // Social Links (if any)
  social: {
    whatsapp: "https://wa.me/916388577153",
    facebook: "",
    instagram: "",
    twitter: "",
  },

  // Footer
  footer: {
    madeBy: "Patel Web Developer",
    madeByUrl: "https://patelwebdevloper.page.gd",
  },
};

export default schoolConfig;
