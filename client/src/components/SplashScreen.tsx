import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-white flex items-center justify-center z-50 ${isVisible ? "" : "splash-fade-out"}`}>
      <div className="text-center">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center pulse-scale overflow-hidden">
            <img 
              src="/logo.webp" 
              alt="Logo SMPN 17 Malang" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>

        {/* School Name */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">SPMN 17 Malang</h1>
        <p className="text-gray-500 text-lg mb-8">Membangun Masa Depan Cerah</p>

        {/* Loading Indicator */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
}
