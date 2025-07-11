'use client';

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeProps {
  url: string;
  size?: number;
  className?: string;
}

export default function QRCodeComponent({ url, size = 200, className = '' }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          width: size,
          margin: 1,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        }
      );
    }
  }, [url, size]);

  return (
    <canvas 
      ref={canvasRef}
      className={className}
    />
  );
} 