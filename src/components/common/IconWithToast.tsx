import { useToast } from "../../context/ToastContext";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthModals from "./AuthModals";

interface IconWithToastProps {
  icon: React.ReactNode;
}

export const IconWithToast = ({ icon }: IconWithToastProps) => {
  const showToast = useToast();
  const { user } = useAuth();
  const [authModal, setAuthModal] = useState<"signIn" | "signUp" | null>(null);

  const handleClick = () => {
    if (!user) {
      setAuthModal("signIn");
    } else {
      showToast("Function not implemented");
    }
  };

  return (
    <>
      <div className="flex items-center" onClick={handleClick}>
        {icon}
      </div>
      <AuthModals open={authModal} onClose={() => setAuthModal(null)} />
    </>
  );
};
