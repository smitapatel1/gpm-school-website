import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";

/**
 * Upload a file to Firebase Storage
 * @param path - Storage path (e.g., "gallery/events/image.jpg")
 * @param file - File to upload
 * @returns Download URL
 */
export async function uploadFile(path: string, file: File): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

/**
 * Upload a file with a unique timestamp
 * @param folder - Folder name (e.g., "gallery", "notices", "admissions")
 * @param file - File to upload
 * @returns Download URL
 */
export async function uploadFileWithTimestamp(
  folder: string,
  file: File
): Promise<string> {
  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name}`;
  const path = `${folder}/${filename}`;
  return uploadFile(path, file);
}

/**
 * Delete a file from Firebase Storage
 * @param path - Storage path
 */
export async function deleteFile(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}

/**
 * Upload gallery image
 * @param category - Gallery category (events, sports, academics, cultural)
 * @param file - Image file
 * @returns Download URL
 */
export async function uploadGalleryImage(
  category: string,
  file: File
): Promise<string> {
  return uploadFileWithTimestamp(`gallery/${category}`, file);
}

/**
 * Upload notice PDF
 * @param file - PDF file
 * @returns Download URL
 */
export async function uploadNoticePDF(file: File): Promise<string> {
  return uploadFileWithTimestamp("notices", file);
}

/**
 * Upload admission document
 * @param file - Document file
 * @returns Download URL
 */
export async function uploadAdmissionDocument(file: File): Promise<string> {
  return uploadFileWithTimestamp("admissions", file);
}

/**
 * Upload faculty photo
 * @param file - Photo file
 * @returns Download URL
 */
export async function uploadFacultyPhoto(file: File): Promise<string> {
  return uploadFileWithTimestamp("faculty", file);
}

/**
 * Upload event image
 * @param file - Image file
 * @returns Download URL
 */
export async function uploadEventImage(file: File): Promise<string> {
  return uploadFileWithTimestamp("events", file);
}
