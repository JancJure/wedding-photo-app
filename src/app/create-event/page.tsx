'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaCalendar, FaMapMarkerAlt, FaClock, FaHeart } from 'react-icons/fa';
import { createEvent } from '@/lib/supabaseEvent';

export default function CreateEvent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    partner1Name: '',
    partner2Name: '',
    weddingDate: '',
    venue: '',
    time: '',
    specialMessage: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const eventId = await createEvent(formData);
      console.log('Supabase returned eventId:', eventId);
      if (!eventId) {
        alert('Failed to create event. Please try again.');
        return;
      }
      router.push(`/qr-design/${eventId}`);
    } catch (err: any) {
      console.error('Error in handleSubmit:', err);
      alert('Unexpected error: ' + (err?.message || err));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50">
      {/* Background decorative images */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[url('/images/wedding-1.jpg')] bg-cover opacity-10 blur-2xl transform rotate-12"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[url('/images/wedding-2.jpg')] bg-cover opacity-10 blur-2xl transform -rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button and progress indicator */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Wedding Event</h1>
          <p className="text-lg text-gray-600 mb-8">Fill in the details below to get your custom QR code</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Couple Details */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partner 1 Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter name"
                    value={formData.partner1Name}
                    onChange={(e) => setFormData({ ...formData, partner1Name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partner 2 Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter name"
                    value={formData.partner2Name}
                    onChange={(e) => setFormData({ ...formData, partner2Name: e.target.value })}
                  />
                </div>
              </div>

              {/* Wedding Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wedding Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  />
                  <FaCalendar className="input-icon absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                    placeholder="Enter venue address"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  />
                  <FaMapMarkerAlt className="input-icon absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ceremony Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                  <FaClock className="input-icon absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Message for Guests
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-32 resize-none"
                  placeholder="Enter a welcome message or special instructions for your guests..."
                  value={formData.specialMessage}
                  onChange={(e) => setFormData({ ...formData, specialMessage: e.target.value })}
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-150 flex items-center"
              >
                <span>Continue to QR Design</span>
                <FaHeart className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 