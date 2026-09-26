import React, { useState, useRef } from 'react';
import exifr from 'exifr';
import { Upload, MapPin, Calendar, Camera, Info, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

export const ExifPhoto: React.FC = () => {
  const { addAchievement } = useAppContext();
  const [photoData, setPhotoData] = useState<{
    url: string;
    date: string | null;
    make: string | null;
    model: string | null;
    latitude: number | null;
    longitude: number | null;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCleaned, setIsCleaned] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setIsCleaned(false);

    try {
      // 1. Create Object URL for display
      const objectUrl = URL.createObjectURL(file);
      
      // 2. Parse EXIF data using exifr (Runs locally in browser)
      const exifData = await exifr.parse(file, { tiff: true, exif: true, gps: true });
      
      if (!exifData) {
        setError('Бұл суретте EXIF деректері жоқ немесе олар өшірілген.');
        setPhotoData({ url: objectUrl, date: null, make: null, model: null, latitude: null, longitude: null });
        setIsProcessing(false);
        addAchievement('exif');
        return;
      }

      setPhotoData({
        url: objectUrl,
        date: exifData.DateTimeOriginal ? new Date(exifData.DateTimeOriginal).toLocaleString('kk-KZ') : null,
        make: exifData.Make || null,
        model: exifData.Model || null,
        latitude: exifData.latitude || null,
        longitude: exifData.longitude || null,
      });
      
      addAchievement('exif');

    } catch (err) {
      console.error(err);
      setError('Суретті оқу кезінде қате пайда болды.');
    } finally {
      setIsProcessing(false);
    }
  };

  const cleanMetadata = () => {
    if (!photoData || !canvasRef.current) return;
    
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        // Canvas-қа салынған соң, toDataURL арқылы алынған суретте EXIF болмайды.
        const cleanUrl = canvas.toDataURL('image/jpeg', 0.9);
        setPhotoData(prev => prev ? { ...prev, url: cleanUrl, date: null, make: null, model: null, latitude: null, longitude: null } : null);
        setIsCleaned(true);
      }
    };
    img.src = photoData.url;
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-5xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Фотодағы жасырын ақпарат</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-4">
          Фотосуреттер тек бейнені ғана емес, сонымен қатар түсірілген күнді, телефон моделін және тіпті <strong>орналасқан жерді (GPS)</strong> сақтайды. Бұл мәліметтер <strong>EXIF метадеректері</strong> деп аталады.
        </p>
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-200 font-medium text-sm text-left">
          <ShieldCheck size={20} className="shrink-0" />
          <span>Сенің фотоң ешқайда жіберілмейді. Барлық тексеру тек осы браузердің ішінде өтеді.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
          {photoData ? (
            <div className="w-full flex flex-col items-center gap-4">
              <div className="relative rounded-xl overflow-hidden shadow-md max-h-[350px] w-full flex justify-center bg-gray-100">
                <img src={photoData.url} alt="Uploaded" className="max-h-[350px] object-contain" />
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => { setPhotoData(null); setError(null); setIsCleaned(false); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition"
                >
                  Басқа фото таңдау
                </button>
                {(!isCleaned && (photoData.date || photoData.latitude)) && (
                  <button 
                    onClick={cleanMetadata}
                    className="px-4 py-2 bg-[var(--color-warning)] hover:bg-rose-500 text-white rounded-lg font-bold transition flex items-center gap-2"
                  >
                    Метадеректерді өшіру
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-full min-h-[300px] border-4 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-4 text-gray-400 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-purple-50 transition cursor-pointer"
            >
              <Upload size={48} />
              <div className="text-center">
                <p className="font-bold text-lg mb-1">Фотосуретті жүктеп көріңіз</p>
                <p className="text-sm">Телефонмен түсірілген түпнұсқа суретті таңдаңыз (.jpg немесе .heic)</p>
              </div>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/jpeg, image/png, image/webp" 
            className="hidden" 
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b-2 border-gray-200 pb-2">
            <Info size={24} className="text-blue-500" />
            Метадеректер (EXIF)
          </h2>

          {isProcessing ? (
            <div className="flex items-center justify-center h-40 text-gray-500 font-medium">Оқылуда...</div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-40 text-rose-500 text-center gap-2">
              <AlertTriangle size={32} />
              <p>{error}</p>
            </div>
          ) : !photoData ? (
            <div className="flex items-center justify-center h-40 text-gray-500 text-center">
              Фотосурет жүктелмеген. Мәліметтерді көру үшін сол жаққа фото қосыңыз.
            </div>
          ) : isCleaned ? (
            <div className="flex flex-col items-center justify-center h-40 text-emerald-600 text-center gap-2">
              <ShieldCheck size={40} />
              <p className="font-bold">Метадеректер сәтті өшірілді!</p>
              <p className="text-sm text-gray-600">Енді бұл фотосуретті интернетке қауіпсіз жариялауға болады.</p>
              <a href={photoData.url} download="cleaned_photo.jpg" className="mt-2 text-[var(--color-accent)] underline text-sm font-bold">Осы таза фотоны жүктеп алу</a>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <Calendar size={24} className="text-purple-500 shrink-0 mt-1" />
                <div>
                  <div className="text-sm text-gray-500 font-bold">Түсірілген уақыты</div>
                  <div className="text-lg">{photoData.date || 'Табылмады'}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <Camera size={24} className="text-blue-500 shrink-0 mt-1" />
                <div>
                  <div className="text-sm text-gray-500 font-bold">Құрылғы (Камера)</div>
                  <div className="text-lg">
                    {photoData.make && photoData.model ? `${photoData.make} ${photoData.model}` : 'Табылмады'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <MapPin size={24} className={photoData.latitude ? "text-rose-500 shrink-0 mt-1" : "text-gray-400 shrink-0 mt-1"} />
                <div className="w-full">
                  <div className="text-sm text-gray-500 font-bold">Геолокация (GPS)</div>
                  <div className="text-lg mb-2">
                    {photoData.latitude && photoData.longitude 
                      ? `${photoData.latitude.toFixed(5)}, ${photoData.longitude.toFixed(5)}` 
                      : 'Табылмады'}
                  </div>
                  {photoData.latitude && photoData.longitude && (
                    <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        scrolling="no" 
                        marginHeight={0} 
                        marginWidth={0} 
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${photoData.longitude-0.01}%2C${photoData.latitude-0.01}%2C${photoData.longitude+0.01}%2C${photoData.latitude+0.01}&layer=mapnik&marker=${photoData.latitude}%2C${photoData.longitude}`}
                      ></iframe>
                    </div>
                  )}
                  {photoData.latitude && (
                    <p className="text-xs text-rose-500 mt-2 flex gap-1 items-start">
                      <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                      Бұл өте қауіпті! Фото арқылы сенің қайда жүргеніңді білуге болады.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
