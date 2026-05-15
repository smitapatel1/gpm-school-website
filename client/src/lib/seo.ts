/**
 * SEO Meta Tags Helper
 * Manages meta tags for all pages to improve search engine optimization
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "organization";
}

/**
 * Update document meta tags for SEO
 */
export function setSEOTags(config: SEOConfig) {
  // Title
  document.title = config.title;
  updateMetaTag("og:title", config.title);
  updateMetaTag("twitter:title", config.title);

  // Description
  updateMetaTag("description", config.description);
  updateMetaTag("og:description", config.description);
  updateMetaTag("twitter:description", config.description);

  // Keywords
  if (config.keywords && config.keywords.length > 0) {
    updateMetaTag("keywords", config.keywords.join(", "));
  }

  // Image
  if (config.image) {
    updateMetaTag("og:image", config.image);
    updateMetaTag("twitter:image", config.image);
  }

  // URL
  if (config.url) {
    updateMetaTag("og:url", config.url);
  }

  // Type
  if (config.type) {
    updateMetaTag("og:type", config.type);
  }

  // Twitter Card
  updateMetaTag("twitter:card", "summary_large_image");
}

/**
 * Update or create a meta tag
 */
function updateMetaTag(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`) ||
    document.querySelector(`meta[property="${name}"]`) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement("meta") as HTMLMetaElement;
    const isProperty = name.startsWith("og:") || name.startsWith("twitter:");
    if (isProperty) {
      tag.setAttribute("property", name);
    } else {
      tag.setAttribute("name", name);
    }
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

/**
 * SEO configurations for each page
 */
export const pageConfig = {
  home: {
    title: "Gayatri Pragya Mandir Balika Inter College - Excellence in Education",
    description:
      "Welcome to GPM School - Nurturing minds and building futures. Excellence in education for all students.",
    keywords: [
      "school",
      "education",
      "college",
      "inter college",
      "Fatehpur",
      "admissions",
    ],
  },

  about: {
    title: "About Us - Gayatri Pragya Mandir Balika Inter College",
    description:
      "Learn about our school's history, vision, mission, and achievements. Dedicated to excellence in education.",
    keywords: [
      "about school",
      "school history",
      "vision mission",
      "achievements",
      "management",
    ],
  },

  academics: {
    title: "Academics - Curriculum & Subjects | GPM School",
    description:
      "Explore our comprehensive curriculum, subjects offered, and examination schedule for all classes.",
    keywords: [
      "curriculum",
      "subjects",
      "classes",
      "examination",
      "timetable",
      "academics",
    ],
  },

  faculty: {
    title: "Faculty & Staff Directory | GPM School",
    description:
      "Meet our experienced and dedicated teaching staff. View faculty profiles and qualifications.",
    keywords: ["faculty", "teachers", "staff", "qualifications", "experience"],
  },

  gallery: {
    title: "Photo Gallery | GPM School",
    description:
      "View our photo gallery showcasing school events, sports, academics, and cultural activities.",
    keywords: ["gallery", "photos", "events", "sports", "academics", "cultural"],
  },

  notices: {
    title: "Notices & Circulars | GPM School",
    description:
      "Stay updated with latest school notices, circulars, and important announcements.",
    keywords: ["notices", "circulars", "announcements", "updates", "school news"],
  },

  events: {
    title: "Events | GPM School",
    description:
      "Discover upcoming and past school events, celebrations, and activities.",
    keywords: ["events", "activities", "celebrations", "sports day", "cultural"],
  },

  admissions: {
    title: "Admissions | GPM School",
    description:
      "Apply online for admission. Learn about eligibility criteria, fee structure, and admission process.",
    keywords: [
      "admissions",
      "apply",
      "eligibility",
      "fees",
      "admission process",
      "enrollment",
    ],
  },

  contact: {
    title: "Contact Us | GPM School",
    description:
      "Get in touch with us. Find our location, contact details, and send us a message.",
    keywords: ["contact", "location", "phone", "email", "address", "inquiry"],
  },
};

/**
 * Schema.org structured data for rich snippets
 */
export function setSchemaMarkup(schema: Record<string, any>) {
  let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script") as HTMLScriptElement;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schema);
}

/**
 * Organization schema for homepage
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Gayatri Pragya Mandir Balika Inter College",
  url: "https://gpmschool.com",
  logo: "https://gpmschool.com/logo.png",
  description:
    "Gayatri Pragya Mandir Balika Inter College - Excellence in education",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nauwabagh",
    addressLocality: "Fatehpur",
    addressRegion: "Uttar Pradesh",
    postalCode: "212601",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    telephone: "+91-6388577153",
  },
  sameAs: [
    "https://facebook.com/gpmschool",
    "https://twitter.com/gpmschool",
    "https://instagram.com/gpmschool",
  ],
};

/**
 * School event schema
 */
export function createEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    location: {
      "@type": "Place",
      name: event.location,
    },
    image: event.image,
    organizer: {
      "@type": "Organization",
      name: "Gayatri Pragya Mandir Balika Inter College",
    },
  };
}
