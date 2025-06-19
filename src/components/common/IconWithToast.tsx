import { useToast } from "../../context/ToastContext";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Modal from "./Modal";
import SignInForm from "../SigninForm";

interface IconWithToastProps {
  icon: React.ReactNode;
}

export const IconWithToast = ({ icon }: IconWithToastProps) => {
  const showToast = useToast();
  const { user } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);

  const handleClick = () => {
    if (!user) {
      setShowSignIn(true);
    } else {
      showToast(`Function not implemented`);
    }
  };

  return (
    <>
      <div className="flex items-center" onClick={handleClick}>
        {icon}
      </div>
      <Modal isOpen={showSignIn} onClose={() => setShowSignIn(false)}>
        <SignInForm />
      </Modal>
    </>
  );
};
