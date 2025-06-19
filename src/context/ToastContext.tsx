// src/context/ToastContext.tsx
import { createContext, useContext, useState } from "react";
import Toast from "../components/common/Toast";

const ToastContext = createContext<(msg: string) => void>(() => {});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setMessage(msg);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {message && <Toast message={message} onClose={() => setMessage(null)} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
