import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { storage, db } from './firebase';

export async function uploadImage(file: File, eventId: string): Promise<string> {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const filename = `${eventId}/${timestamp}_${file.name}`;
    const storageRef = ref(storage, filename);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadUrl = await getDownloadURL(snapshot.ref);

    // Update the event document with the new photo URL
    const eventRef = doc(db, 'events', eventId);
    await updateDoc(eventRef, {
      photos: arrayUnion(downloadUrl)
    });

    return downloadUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export function validateImage(file: File): boolean {
  // Check file type
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    throw new Error('File is too large. Maximum size is 5MB.');
  }

  return true;
} 