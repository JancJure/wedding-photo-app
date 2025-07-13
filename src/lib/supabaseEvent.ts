import { supabase } from './supabaseClient';

export interface EventData {
  id?: string;
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  venue: string;
  time: string;
  specialMessage: string;
}

export async function createEvent(event: EventData): Promise<string | null> {
  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select('id')
    .single();
  if (error) {
    console.error('Error creating event:', error);
    alert('Supabase error: ' + error.message);
    return null;
  }
  if (!data || !data.id) {
    console.error('No ID returned from Supabase:', data);
    alert('No ID returned from Supabase');
    return null;
  }
  return data.id;
}

export async function getEventById(eventId: string): Promise<EventData | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', eventId)
    .single();
  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }
  return data as EventData;
} 