import QRCodeComponent from '../QRCode';

interface FloralTemplateProps {
  url: string;
  eventName: string;
}

export default function FloralTemplate({ url, eventName }: FloralTemplateProps) {
  return (
    <div className="relative w-[300px] h-[400px] bg-rose-50 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 w-20 h-20 bg-[url('/floral-corner.png')] bg-contain bg-no-repeat opacity-50" />
      <div className="absolute top-0 right-0 w-20 h-20 bg-[url('/floral-corner.png')] bg-contain bg-no-repeat transform rotate-90 opacity-50" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-[url('/floral-corner.png')] bg-contain bg-no-repeat transform -rotate-90 opacity-50" />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-[url('/floral-corner.png')] bg-contain bg-no-repeat transform rotate-180 opacity-50" />
      
      <h2 className="text-2xl font-serif text-rose-800 mb-4">{eventName}</h2>
      <div className="border-4 border-rose-300 p-4 rounded-lg bg-white">
        <QRCodeComponent url={url} size={200} />
      </div>
      <p className="mt-4 text-rose-700 text-center font-serif">
        Scan to share your photos
      </p>
    </div>
  );
} 