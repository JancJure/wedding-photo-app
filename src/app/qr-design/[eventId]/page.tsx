'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaDownload, FaChevronRight } from 'react-icons/fa';

interface EventData {
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  venue: string;
  time: string;
  specialMessage: string;
}

export default function QRDesign({ params }: { params: { eventId: string } }) {
  const router = useRouter();
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('classic');

  useEffect(() => {
    // Load event data from localStorage
    const storedData = localStorage.getItem(`event-${params.eventId}`);
    if (!storedData) {
      router.push('/create-event');
      return;
    }
    
    const data = JSON.parse(storedData);
    setEventData(data);

    // Generate QR code URL
    const eventUrl = `${window.location.origin}/event/${params.eventId}`;
    QRCode.toDataURL(eventUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    })
    .then(url => setQrCodeUrl(url))
    .catch(err => console.error('Error generating QR code:', err));
  }, [params.eventId, router]);

  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Simple and elegant design',
      className: 'bg-white p-8 rounded-lg shadow-lg'
    },
    {
      id: 'floral',
      name: 'Floral',
      description: 'Romantic floral border',
      className: 'bg-pink-50 p-8 rounded-lg shadow-lg border-2 border-pink-200'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and minimalist',
      className: 'bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg shadow-lg'
    }
  ];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `wedding-qr-${params.eventId}.png`;
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            href="/create-event"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Event Details
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Customize Your QR Code</h1>
          <p className="text-lg text-gray-600 mb-8">Choose a template and download your custom QR code</p>

          {/* QR Code Preview */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
            <div className={`max-w-sm mx-auto ${templates.find(t => t.id === selectedTemplate)?.className}`}>
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{eventData.partner1Name} & {eventData.partner2Name}</h3>
                <p className="text-sm text-gray-600">{new Date(eventData.weddingDate).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-center">
                <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
              </div>
              <p className="text-center mt-4 text-sm text-gray-600">Scan to share your photos</p>
            </div>
          </div>

          {/* Template Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose a Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-500">{template.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Download, Template Picker, and Event Page Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-end mt-8">
            <button
              onClick={handleDownload}
              className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-150 flex items-center justify-center"
            >
              <span>Download QR Code</span>
              <FaDownload className="ml-2" />
            </button>
            <button
              onClick={() => router.push(`/template-picker/${params.eventId}`)}
              className="flex-1 px-8 py-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transform hover:-translate-y-0.5 transition-all duration-150 flex items-center justify-center"
            >
              <span>Continue to Template Picker</span>
              <FaChevronRight className="ml-2" />
            </button>
            <button
              disabled
              className="flex-1 px-8 py-4 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center cursor-not-allowed opacity-60"
            >
              <span>Go to Event Page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 