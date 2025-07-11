'use client';

import React, { useState, useRef } from 'react';
import QRCode from './QRCode';
import Image from 'next/image';

interface QRCodeTemplateProps {
  url: string;
  size?: number;
}

interface Template {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  className: string;
}

const templates: Template[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Simple and elegant design',
    previewImage: '/templates/classic.svg',
    className: 'bg-white p-8 rounded-lg shadow-sm border border-gray-200'
  },
  {
    id: 'floral',
    name: 'Floral',
    description: 'Romantic floral border',
    previewImage: '/templates/floral.svg',
    className: 'bg-white p-8 rounded-lg shadow-sm border-2 border-rose-200 bg-[url("/templates/floral-bg.svg")] bg-contain bg-no-repeat bg-center'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and minimalist',
    previewImage: '/templates/modern.svg',
    className: 'bg-gradient-to-br from-cyan-50 to-white p-8 rounded-lg shadow-sm border border-cyan-100'
  }
];

export default function QRCodeTemplate({ url, size = 200 }: QRCodeTemplateProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('classic');
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4 text-black">QR Code</h3>
      
      {/* QR Code Display with Template */}
      <div ref={printRef} className={`print-only ${selectedTemplateData?.className}`}>
        <QRCode url={url} size={size} />
      </div>

      {/* Template Selection */}
      <div className="mt-6 w-full no-print">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Choose a Template</h4>
        <div className="grid grid-cols-3 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`p-3 rounded-lg border transition-all ${
                selectedTemplate === template.id
                  ? 'border-cyan-500 ring-2 ring-cyan-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="aspect-square w-full bg-gray-100 rounded-md mb-2 overflow-hidden">
                <Image
                  src={template.previewImage}
                  alt={template.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm font-medium text-gray-900">{template.name}</div>
              <div className="text-xs text-gray-500">{template.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mt-6 bg-cyan-500 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-cyan-600 transition-colors w-full no-print"
      >
        Print QR Code
      </button>
    </div>
  );
} 