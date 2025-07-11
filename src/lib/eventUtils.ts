import { db } from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export interface EventData {
  id: string;
  eventId: string;
  eventName: string;
  createdBy: string;
  eventDate?: string;
  description?: string;
  createdAt: Timestamp;
}

export function generateEventId(eventName: string): string {
  return eventName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function createEvent(eventData: Omit<EventData, 'id' | 'createdAt'>) {
  try {
    const eventsRef = collection(db, 'events');
    const docRef = await addDoc(eventsRef, {
      ...eventData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
} 