// src/components/common/Toast.tsx
import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast = ({ message, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-6 right-6 bg-[#00000008] text-yellow-800 px-4 py-3 rounded-xl shadow-lg flex items-center space-x-2 z-50 animate-fadeIn">
      <span className="text-lg">⚠️</span>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default Toast;
