'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaDownload, FaChevronRight } from 'react-icons/fa';
import QRCode from 'qrcode';
import CanvasTemplate from '@/components/CanvasTemplate';

const TEMPLATES = [
  { id: 'classic', name: 'Classic', description: 'Elegant and timeless' },
  { id: 'modern', name: 'Modern', description: 'Clean and minimal' },
  { id: 'floral', name: 'Floral', description: 'Romantic and decorative' },
  { id: 'template1', name: 'Template 1', description: 'PNG background example 1' },
  { id: 'template2', name: 'Template 2', description: 'PNG background example 2' },
  { id: 'template3', name: 'Template 3', description: 'PNG background example 3' },
];

interface EventData {
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  venue: string;
  time: string;
  specialMessage: string;
}

export default function TemplatePicker({ params }: { params: { eventId: string } }) {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [customization, setCustomization] = useState({
    background: 'white',
    border: 'none',
    text: 'default',
    topText: '',
    bottomText: '',
  });
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    // Load event data from localStorage
    const storedData = localStorage.getItem(`event-${params.eventId}`);
    if (!storedData) {
      router.push('/create-event');
      return;
    }
    const data = JSON.parse(storedData);
    setEventData(data);

    // Generate QR code URL with transparent background
    const eventUrl = `${window.location.origin}/event/${params.eventId}`;
    QRCode.toDataURL(eventUrl, {
      width: 512,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#00000000' // transparent background
      }
    })
      .then(url => setQrCodeUrl(url))
      .catch(err => console.error('Error generating QR code:', err));
  }, [params.eventId, router]);

  if (!eventData || !qrCodeUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button and progress indicator */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href={`/qr-design/${params.eventId}`}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to QR Design
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pick Your QR Template</h1>
          <p className="text-lg text-gray-600 mb-8">Choose a style and customize your QR code template</p>

          {/* Main layout: Preview + Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Preview Area */}
            <div className="flex flex-col items-center">
              <div className="w-[320px] h-[420px] bg-gray-100 rounded-2xl flex items-center justify-center mb-6 border-2 border-dashed border-gray-300">
                <CanvasTemplate
                  template={selectedTemplate}
                  customization={customization}
                  eventData={eventData}
                  qrUrl={qrCodeUrl}
                />
              </div>
              <button
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center mb-2"
                disabled
              >
                <FaDownload className="mr-2" />
                Download PNG (coming soon)
              </button>
            </div>

            {/* Controls */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Template Style</h2>
              <div className="grid grid-cols-1 gap-4 mb-8">
                {TEMPLATES.map((tpl) => (
                  <label key={tpl.id} className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${selectedTemplate === tpl.id ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input
                      type="radio"
                      name="template"
                      value={tpl.id}
                      checked={selectedTemplate === tpl.id}
                      onChange={() => setSelectedTemplate(tpl.id)}
                      className="form-radio mr-4"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{tpl.name}</div>
                      <div className="text-sm text-gray-500">{tpl.description}</div>
                    </div>
                  </label>
                ))}
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">Customization</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
                  <select
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                    value={customization.background}
                    onChange={e => setCustomization({ ...customization, background: e.target.value })}
                  >
                    <option value="white">White</option>
                    <option value="pink">Pink</option>
                    <option value="blue">Blue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Border</label>
                  <select
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                    value={customization.border}
                    onChange={e => setCustomization({ ...customization, border: e.target.value })}
                  >
                    <option value="none">None</option>
                    <option value="simple">Simple</option>
                    <option value="floral">Floral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Style</label>
                  <select
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                    value={customization.text}
                    onChange={e => setCustomization({ ...customization, text: e.target.value })}
                  >
                    <option value="default">Default</option>
                    <option value="serif">Serif</option>
                    <option value="handwritten">Handwritten</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Top Text</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                    placeholder="e.g. CAPTURE the Love"
                    value={customization.topText}
                    onChange={e => setCustomization({ ...customization, topText: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bottom Text</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2"
                    placeholder="e.g. Adeline & Alexander"
                    value={customization.bottomText}
                    onChange={e => setCustomization({ ...customization, bottomText: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 flex items-center"
                  onClick={() => router.push(`/event/${params.eventId}`)}
                >
                  Continue
                  <FaChevronRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 