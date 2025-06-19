import { useState, useEffect } from "react";
import Modal from "./Modal";
import AuthForm from "../AuthForm";

type AuthModalType = "signIn" | "signUp";

interface AuthModalsProps {
  open: AuthModalType | null;
  onClose: () => void;
}

const AuthModals = ({ open, onClose }: AuthModalsProps) => {
  const [activeModal, setActiveModal] = useState<AuthModalType | null>(open);

  useEffect(() => {
    setActiveModal(open);
  }, [open]);

  const handleClose = () => {
    setActiveModal(null);
    onClose();
  };

  const switchToSignIn = () => setActiveModal("signIn");
  const switchToSignUp = () => setActiveModal("signUp");

  return (
    <>
      <Modal isOpen={activeModal === "signIn"} onClose={handleClose}>
        <AuthForm
          type="signIn"
          onSubmit={handleClose}
          isModal={true}
          onBottomLinkClick={switchToSignUp}
        />
      </Modal>

      <Modal isOpen={activeModal === "signUp"} onClose={handleClose}>
        <AuthForm
          type="signUp"
          onSubmit={handleClose}
          isModal={true}
          onBottomLinkClick={switchToSignIn}
        />
      </Modal>
    </>
  );
};

export default AuthModals;
