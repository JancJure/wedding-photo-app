import QRCodeComponent from '../QRCode';

interface ClassicTemplateProps {
  url: string;
  eventName: string;
}

export default function ClassicTemplate({ url, eventName }: ClassicTemplateProps) {
  return (
    <div className="relative w-[300px] h-[400px] bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{eventName}</h2>
      <div className="border-4 border-gray-800 p-4 rounded-lg">
        <QRCodeComponent url={url} size={200} />
      </div>
      <p className="mt-4 text-gray-600 text-center">
        Scan to share your photos
      </p>
    </div>
  );
} 