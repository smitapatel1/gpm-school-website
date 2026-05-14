import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Query,
  QueryConstraint,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "../client/src/lib/firebase";
import type {
  Admission,
  Notice,
  Event,
  GalleryImage,
  Faculty,
  ContactInquiry,
  SchoolInfo,
  Notification,
} from "./firestore-schema";

// ============ ADMISSIONS ============
export async function createAdmission(data: Omit<Admission, "id" | "createdAt" | "updatedAt">) {
  const docRef = await addDoc(collection(db, "admissions"), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getAdmissions(filters?: { status?: string }) {
  let q: Query = collection(db, "admissions");
  const constraints: QueryConstraint[] = [];

  if (filters?.status) {
    constraints.push(where("status", "==", filters.status));
  }
  constraints.push(orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(
    query(collection(db, "admissions"), ...constraints)
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as (Admission & { id: string })[];
}

export async function updateAdmissionStatus(id: string, status: string) {
  await updateDoc(doc(db, "admissions", id), {
    status,
    updatedAt: Timestamp.now(),
  });
}

// ============ NOTICES ============
export async function createNotice(data: Omit<Notice, "id" | "createdAt" | "updatedAt">) {
  const docRef = await addDoc(collection(db, "notices"), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getNotices(filters?: { category?: string; limit?: number }) {
  const constraints: QueryConstraint[] = [];

  if (filters?.category) {
    constraints.push(where("category", "==", filters.category));
  }
  constraints.push(orderBy("date", "desc"));
  if (filters?.limit) {
    constraints.push(limit(filters.limit));
  }

  const querySnapshot = await getDocs(
    query(collection(db, "notices"), ...constraints)
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as (Notice & { id: string })[];
}

export async function updateNotice(id: string, data: Partial<Notice>) {
  await updateDoc(doc(db, "notices", id), {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteNotice(id: string) {
  await deleteDoc(doc(db, "notices", id));
}

// ============ EVENTS ============
export async function createEvent(data: Omit<Event, "id" | "createdAt" | "updatedAt">) {
  const docRef = await addDoc(collection(db, "events"), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getEvents(filters?: { category?: string; limit?: number }) {
  const constraints: QueryConstraint[] = [];

  if (filters?.category) {
    constraints.push(where("category", "==", filters.category));
  }
  constraints.push(orderBy("date", "desc"));
  if (filters?.limit) {
    constraints.push(limit(filters.limit));
  }

  const querySnapshot = await getDocs(
    query(collection(db, "events"), ...constraints)
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as (Event & { id: string })[];
}

export async function updateEvent(id: string, data: Partial<Event>) {
  await updateDoc(doc(db, "events", id), {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteEvent(id: string) {
  await deleteDoc(doc(db, "events", id));
}

// ============ GALLERY ============
export async function createGalleryImage(data: Omit<GalleryImage, "id">) {
  const docRef = await addDoc(collection(db, "gallery"), {
    ...data,
    uploadedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getGalleryImages(category?: string) {
  const constraints: QueryConstraint[] = [];

  if (category) {
    constraints.push(where("category", "==", category));
  }
  constraints.push(orderBy("uploadedAt", "desc"));

  const querySnapshot = await getDocs(
    query(collection(db, "gallery"), ...constraints)
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as (GalleryImage & { id: string })[];
}

export async function deleteGalleryImage(id: string) {
  await deleteDoc(doc(db, "gallery", id));
}

// ============ FACULTY ============
export async function createFaculty(data: Omit<Faculty, "id" | "createdAt" | "updatedAt">) {
  const docRef = await addDoc(collection(db, "faculty"), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getFaculty() {
  const querySnapshot = await getDocs(
    query(collection(db, "faculty"), orderBy("name", "asc"))
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as (Faculty & { id: string })[];
}

export async function updateFaculty(id: string, data: Partial<Faculty>) {
  await updateDoc(doc(db, "faculty", id), {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteFaculty(id: string) {
  await deleteDoc(doc(db, "faculty", id));
}

// ============ CONTACT INQUIRIES ============
export async function createContactInquiry(
  data: Omit<ContactInquiry, "id" | "createdAt" | "status">
) {
  const docRef = await addDoc(collection(db, "contactInquiries"), {
    ...data,
    status: "new",
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getContactInquiries() {
  const querySnapshot = await getDocs(
    query(collection(db, "contactInquiries"), orderBy("createdAt", "desc"))
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as (ContactInquiry & { id: string })[];
}

export async function updateContactInquiry(id: string, status: string) {
  await updateDoc(doc(db, "contactInquiries", id), { status });
}

// ============ SCHOOL INFO ============
export async function getSchoolInfo() {
  const docSnap = await getDoc(doc(db, "schoolInfo", "main"));
  if (docSnap.exists()) {
    return docSnap.data() as SchoolInfo;
  }
  return null;
}

export async function updateSchoolInfo(data: Partial<SchoolInfo>) {
  await setDoc(
    doc(db, "schoolInfo", "main"),
    {
      ...data,
      updatedAt: Timestamp.now(),
    },
    { merge: true }
  );
}

// ============ NOTIFICATIONS ============
export async function createNotification(
  data: Omit<Notification, "id" | "createdAt">
) {
  const docRef = await addDoc(collection(db, "notifications"), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getNotifications() {
  const querySnapshot = await getDocs(
    query(collection(db, "notifications"), orderBy("createdAt", "desc"))
  );
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as (Notification & { id: string })[];
}

export async function markNotificationAsRead(id: string) {
  await updateDoc(doc(db, "notifications", id), { read: true });
}
