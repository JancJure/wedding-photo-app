'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { getEventById, EventData } from '@/lib/supabaseEvent';

export default function EventPage({ params }: { params: { eventId: string } }) {
  const router = useRouter();
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      const data = await getEventById(params.eventId);
      if (!data) {
        router.push('/');
        return;
      }
      setEventData(data);
      fetchPhotos();
    }
    fetchEvent();
    // eslint-disable-next-line
  }, [params.eventId]);

  async function fetchPhotos() {
    const { data, error } = await supabase
      .storage
      .from('event-photos')
      .list(`${params.eventId}/`, { limit: 100, offset: 0 });
    if (error) return;
    if (data) {
      const urls = data
        .filter((item) => item.name.match(/\.(jpg|jpeg|png|gif)$/i))
        .map((item) =>
          supabase.storage.from('event-photos').getPublicUrl(`${params.eventId}/${item.name}`).data.publicUrl
        );
      setPhotos(urls);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB.');
      return;
    }
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${params.eventId}/${fileName}`;
    const { error: uploadError } = await supabase.storage.from('event-photos').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });
    setUploading(false);
    if (uploadError) {
      setError('Upload failed.');
      return;
    }
    fetchPhotos();
  }

  if (!eventData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {eventData.partner1Name} & {eventData.partner2Name}
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {new Date(eventData.weddingDate).toLocaleDateString()}
          </p>
          <p className="text-lg text-gray-600 mb-8">
            {eventData.venue} at {eventData.time}
          </p>

          {eventData.specialMessage && (
            <div className="mb-12 p-6 bg-pink-50 rounded-2xl">
              <p className="italic text-gray-700">{eventData.specialMessage}</p>
            </div>
          )}

          <div className="mt-8 mb-8 flex justify-center">
            <label htmlFor="photo-upload" className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center cursor-pointer">
              {uploading ? 'Uploading...' : 'Upload Photos'}
            </label>
            <input
              type="file"
              accept="image/*"
              id="photo-upload"
              style={{ display: 'none' }}
              onChange={handleUpload}
              disabled={uploading}
            />
            {error && <div className="mt-4 text-red-600">{error}</div>}
          </div>

          {photos.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              {photos.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Uploaded photo ${idx + 1}`}
                  className="rounded-lg object-cover w-full h-48"
                />
              ))}
            </div>
          )}

          <p className="text-sm text-gray-500 mt-8">
            Coming soon! Share your memories from this special day.
          </p>
        </div>
      </div>
    </div>
  );
} 