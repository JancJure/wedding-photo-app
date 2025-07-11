import React, { useEffect, useRef } from 'react';
import { templates } from '@/lib/templates';

interface CanvasTemplateProps {
  template: string;
  customization: {
    background: string;
    border: string;
    text: string;
    topText?: string;
    bottomText?: string;
    // Add more fields as needed
  };
  eventData: {
    partner1Name: string;
    partner2Name: string;
    weddingDate: string;
  };
  qrUrl: string;
}

const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 500;

export default function CanvasTemplate({ template, customization, eventData, qrUrl }: CanvasTemplateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Determine canvas size based on template
  const tpl = templates.find(t => t.id === template);
  const canvasWidth = tpl?.width ?? CANVAS_WIDTH;
  const canvasHeight = tpl?.height ?? CANVAS_HEIGHT;

  useEffect(() => {
    if (!tpl) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Load SVG as background (base64)
    fetch(tpl.image)
      .then(res => res.text())
      .then(svgText => {
        const svgBase64 = 'data:image/svg+xml;base64,' + btoa(svgText);
        const bgImg = new window.Image();
        bgImg.onload = () => {
          ctx.drawImage(bgImg, 0, 0, canvasWidth, canvasHeight);
          // Draw QR code
          if (qrUrl) {
            const img = new window.Image();
            img.onload = () => {
              ctx.drawImage(
                img,
                tpl.qr.x ?? 0,
                tpl.qr.y ?? 0,
                tpl.qr.size ?? 240,
                tpl.qr.size ?? 240
              );
              // Draw names and date centered under QR code with padding
              if (tpl.names && tpl.qr && tpl.date) {
                // Center X is center of QR code
                const centerX = tpl.qr.x + (tpl.qr.size ?? 240) / 2;
                // Names Y: bottom of QR + 30px
                const namesY = tpl.qr.y + (tpl.qr.size ?? 240) + 30;
                // Date Y: namesY + 35px
                const dateY = namesY + 35;
                ctx.font = "28px 'Playfair Display', serif";
                ctx.fillStyle = '#333';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(
                  `${eventData.partner1Name} & ${eventData.partner2Name}`,
                  centerX,
                  namesY,
                  canvasWidth * 0.7
                );
                ctx.font = "20px 'Playfair Display', serif";
                ctx.fillStyle = '#444';
                ctx.fillText(
                  new Date(eventData.weddingDate).toLocaleDateString(),
                  centerX,
                  dateY,
                  canvasWidth * 0.7
                );
              }
            };
            img.src = qrUrl;
          }
        };
        bgImg.src = svgBase64;
      });
  }, [template, customization, eventData, qrUrl, canvasWidth, canvasHeight, tpl]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{ borderRadius: 16, boxShadow: '0 2px 16px #0001', background: '#fff', width: '100%', height: 'auto', maxWidth: 400 }}
    />
  );
} 