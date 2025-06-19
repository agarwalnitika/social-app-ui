import { useToast } from "../../context/ToastContext";
import React from "react";

interface IconWithToastProps {
  icon: React.ReactNode;
}

export const IconWithToast = ({ icon }: IconWithToastProps) => {
  const showToast = useToast();
  return (
    <div
      className="flex items-center"
      onClick={() => showToast(`Function not implemented`)}
    >
      {icon}
    </div>
  );
};
