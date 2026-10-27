import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#243328] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-[#3E5244] max-w-sm">
        <CheckCircle2 className="w-5 h-5 text-[#86EFAC] flex-shrink-0" />
        <span className="text-xs sm:text-sm font-medium leading-snug">
          {message}
        </span>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white text-xs ml-2 font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
