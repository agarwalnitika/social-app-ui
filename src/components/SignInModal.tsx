// src/App.tsx or your page file
import { useState } from "react";
import SignInForm from "./SigninForm";
import SignUpForm from "./SignupForm";
import Modal from "./common/Modal";

export default function HomePage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="space-x-4">
        <button
          onClick={() => setShowSignIn(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Sign In
        </button>
        <button
          onClick={() => setShowSignUp(true)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Sign Up
        </button>
      </div>

      <Modal isOpen={showSignIn} onClose={() => setShowSignIn(false)}>
        <SignInForm onClose={() => setShowSignIn(false)} />
      </Modal>

      <Modal isOpen={showSignUp} onClose={() => setShowSignUp(false)}>
        <SignUpForm onClose={() => setShowSignUp(false)} />
      </Modal>
    </div>
  );
}
