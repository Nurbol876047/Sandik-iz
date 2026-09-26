import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, BookOpen, Search, MonitorPlay } from 'lucide-react';

export const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [footprintCount, setFootprintCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let footprints: { x: number; y: number; opacity: number; angle: number; age: number }[] = [];
    let isDrawing = false;
    let lastTime = Date.now();
    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 400;
    };
    window.addEventListener('resize', resize);
    resize();

    const drawFootprint = (x: number, y: number, angle: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      
      ctx.fillStyle = `rgba(91, 61, 245, ${opacity})`;
      
      // Heel
      ctx.beginPath();
      ctx.ellipse(0, 10, 8, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Toes
      const toeRadii = [3, 4, 3, 2, 2];
      const toeOffsets = [
        { x: -10, y: -10 },
        { x: -4, y: -15 },
        { x: 3, y: -15 },
        { x: 9, y: -10 },
        { x: 14, y: -4 },
      ];
      
      for(let i=0; i<5; i++) {
        ctx.beginPath();
        ctx.arc(toeOffsets[i].x, toeOffsets[i].y, toeRadii[i], 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      const dt = now - lastTime;
      lastTime = now;

      footprints.forEach(fp => {
        if (fp.age > 1000) {
          fp.opacity = Math.max(0.1, fp.opacity - 0.0005 * dt); 
        }
        fp.age += dt;
        drawFootprint(fp.x, fp.y, fp.angle, fp.opacity);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    let lastDraw = {x: 0, y: 0};

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dist = Math.hypot(x - lastDraw.x, y - lastDraw.y);
      if (dist > 40) {
        const angle = Math.atan2(y - lastDraw.y, x - lastDraw.x) + Math.PI / 2;
        footprints.push({ x, y, opacity: 0.8, angle, age: 0 });
        lastDraw = {x, y};
        setFootprintCount(prev => prev + 1);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      lastDraw = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handlePointerUp = () => {
      isDrawing = false;
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerUp);

    (window as any).clearFootprints = () => {
      footprints = footprints.filter(() => Math.random() < 0.25).map(fp => ({...fp, opacity: 0.15}));
    };

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const [showMessage, setShowMessage] = useState(false);

  const handleClear = () => {
    if ((window as any).clearFootprints) {
      (window as any).clearFootprints();
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 8000);
    }
  };

  return (
    <div className="flex flex-col gap-10 animate-fade-in">
      <section className="relative w-full rounded-2xl overflow-hidden bg-white shadow-lg border-2 border-gray-100">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #17224D 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="relative z-10 p-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Сандық із:<br/>
            <span className="text-[var(--color-accent)]">интернеттегі ізіміз</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-gray-600 mb-6">
            Интернетте жасаған әрбір қадамыңыз із қалдырады. Мұнда саусағыңызды немесе тышқанды жүргізіп көріңіз!
          </p>
          
          <div className="relative w-full max-w-3xl rounded-xl border-4 border-dashed border-gray-300 bg-gray-50 overflow-hidden touch-none" style={{height: '400px'}}>
            <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full font-bold shadow text-lg border-2 border-[var(--color-accent)] text-[var(--color-accent)]">
              Ізің: {footprintCount}
            </div>
          </div>
          
          <div className="mt-6 flex flex-col items-center gap-4">
            <button 
              onClick={handleClear}
              className="bg-[var(--color-warning)] hover:bg-rose-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 cursor-pointer"
            >
              Іздерді өшіру
            </button>
            
            {showMessage && (
              <div className="bg-rose-100 text-rose-800 p-4 rounded-lg font-semibold max-w-xl text-center border border-rose-200">
                Байқадыңыз ба? Іздер толық өшкен жоқ! Интернетте де солай — сіз өшірген ақпараттың көшірмесі серверлерде сақталып қалуы мүмкін.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/theory" className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition border-2 border-transparent hover:border-[var(--color-success)] flex flex-col items-center text-center gap-4">
          <div className="p-4 rounded-full bg-emerald-100 text-[var(--color-success)] group-hover:scale-110 transition">
            <BookOpen size={32} />
          </div>
          <h3 className="font-bold text-xl">Теория</h3>
          <p className="text-gray-600 text-sm">Сандық із деген не және ол несімен қауіпті?</p>
        </Link>
        
        <Link to="/simulations" className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition border-2 border-transparent hover:border-[var(--color-accent)] flex flex-col items-center text-center gap-4">
          <div className="p-4 rounded-full bg-purple-100 text-[var(--color-accent)] group-hover:scale-110 transition">
            <MonitorPlay size={32} />
          </div>
          <h3 className="font-bold text-xl">Симуляциялар</h3>
          <p className="text-gray-600 text-sm">Интерактивті ойындар арқылы өзіңді сынап көр.</p>
        </Link>
        
        <Link to="/rules" className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition border-2 border-transparent hover:border-[#FFC53D] flex flex-col items-center text-center gap-4">
          <div className="p-4 rounded-full bg-yellow-100 text-[#d49f1f] group-hover:scale-110 transition">
            <Shield size={32} />
          </div>
          <h3 className="font-bold text-xl">Ережелер</h3>
          <p className="text-gray-600 text-sm">Интернетте қауіпсіз болудың алтын ережелері.</p>
        </Link>

        <Link to="/results" className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition border-2 border-transparent hover:border-blue-500 flex flex-col items-center text-center gap-4">
          <div className="p-4 rounded-full bg-blue-100 text-blue-500 group-hover:scale-110 transition">
            <Search size={32} />
          </div>
          <h3 className="font-bold text-xl">Зерттеу</h3>
          <p className="text-gray-600 text-sm">Мектеп оқушылары арасындағы сауалнама нәтижелері.</p>
        </Link>
      </section>
    </div>
  );
};
