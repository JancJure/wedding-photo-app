'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaCamera, FaQrcode, FaImages, FaMobileAlt, FaHeart, FaDownload } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">WeddingShare</h1>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">
                How it Works
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link 
                href="/create-event"
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Create Event
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Capture Every Moment
                <span className="block text-blue-600 mt-2">Of Your Special Day</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Create a beautiful photo sharing experience for your wedding. 
                Let guests easily share their photos and relive the memories together.
              </p>
              <div className="space-y-4">
                <Link 
                  href="/create-event"
                  className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started Free
                </Link>
                <p className="text-sm text-gray-500">No credit card required</p>
              </div>
            </div>

            {/* Right side - Image grid */}
            <div className="relative grid grid-cols-2 gap-6 h-[600px]">
              {/* Top left image */}
              <div className="relative h-[280px] rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 bg-gray-100">
                <Image
                  src="/images/wedding-1.jpg"
                  alt="Wedding celebration with champagne tower"
                  width={500}
                  height={280}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              {/* Top right image */}
              <div className="relative h-[280px] rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 mt-8 bg-gray-100">
                <Image
                  src="/images/wedding-2.jpg"
                  alt="Wedding party celebration"
                  width={500}
                  height={280}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              {/* Bottom centered image */}
              <div className="relative h-[280px] rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 mt-4 col-span-2 bg-gray-100">
                <Image
                  src="/images/wedding-3.jpg"
                  alt="Bride and groom kissing"
                  width={1024}
                  height={280}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need for Wedding Photo Sharing
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaQrcode className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom QR Code</h3>
              <p className="text-gray-600">
                Generate a unique QR code that matches your wedding style. Easy for guests to scan and start sharing.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMobileAlt className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Sharing</h3>
              <p className="text-gray-600">
                Guests can upload photos directly from their phones. No app download required.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaImages className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Gallery</h3>
              <p className="text-gray-600">
                Watch your wedding album grow in real-time as guests share their perspectives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to capture and share all your wedding memories
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                  1
                </div>
              </div>
              <div className="text-center pt-8">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold mb-4">Create Your Event</h3>
                <p className="text-gray-600">
                  Set up your wedding details and customize your QR code design in minutes
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                  2
                </div>
              </div>
              <div className="text-center pt-8">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-4">Share with Guests</h3>
                <p className="text-gray-600">
                  Display your QR code at the venue for easy and instant photo sharing
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                  3
                </div>
              </div>
              <div className="text-center pt-8">
                <div className="text-4xl mb-4">💝</div>
                <h3 className="text-xl font-semibold mb-4">Collect Memories</h3>
                <p className="text-gray-600">
                  Download all your wedding photos in high quality after the event
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Create Your Wedding Photo Experience?
          </h2>
          <Link 
            href="/create-event"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors text-lg font-semibold shadow-lg"
          >
            Get Started Free
          </Link>
          <p className="mt-4 text-sm text-blue-100">No credit card required • Free forever</p>
        </div>
      </div>
    </div>
  );
} 