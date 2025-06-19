import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Form, { FormInput } from "../components/common/Form";
import AuthIcon from "../assets/AuthIcon";

interface AuthFormProps {
  type: "signIn" | "signUp";
  onSubmit?: () => void;
  isModal?: boolean;
  onBottomLinkClick?: () => void;
}

const AuthForm = ({
  type,
  onSubmit,
  isModal,
  onBottomLinkClick,
}: AuthFormProps) => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const isSignUp = type === "signUp";

  const validateForm = () => {
    const errors = { email: "", password: "", repeatPassword: "" };
    let isValid = true;

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (isSignUp) {
      if (password.length < 8) {
        errors.password = "Password must be at least 8 characters";
        isValid = false;
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        errors.password =
          "Password must contain at least one uppercase letter, one lowercase letter, and one number";
        isValid = false;
      }
    }

    if (isSignUp) {
      if (!repeatPassword) {
        errors.repeatPassword = "Please confirm your password";
        isValid = false;
      } else if (password !== repeatPassword) {
        errors.repeatPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const authAction = isSignUp ? signUp : signIn;
      const success = await authAction(email, password);
      if (success) {
        onSubmit?.();
        if (!isModal) navigate("/");
      } else {
        setError(
          isSignUp
            ? "Failed to create account. Please try again."
            : "Invalid email or password."
        );
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formContent = (
    <Form
      title={isSignUp ? "Create an account to continue" : "Sign in to continue"}
      subtitle="Access all the features of this app"
      submitText={isSignUp ? "Sign Up" : "Sign In"}
      onSubmit={handleSubmit}
      bottomText={
        isSignUp ? "Already have an account?" : "Do not have an account?"
      }
      bottomLinkText={isSignUp ? "Sign In" : "Sign Up"}
      bottomLinkHref={isSignUp ? "/signin" : "/signup"}
      icon={<AuthIcon />}
      error={error}
      isLoading={isLoading}
      isModal={isModal}
      onBottomLinkClick={onBottomLinkClick}
    >
      <FormInput
        type="email"
        title="Email or username"
        placeholder="Enter your email or username"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setFieldErrors((prev) => ({ ...prev, email: "" }));
        }}
        required
        error={fieldErrors.email}
      />
      <FormInput
        type="password"
        title="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setFieldErrors((prev) => ({ ...prev, password: "" }));
        }}
        required
        error={fieldErrors.password}
      />
      {isSignUp && (
        <FormInput
          type="password"
          placeholder="Enter your password again"
          title="Repeat Password"
          value={repeatPassword}
          onChange={(e) => {
            setRepeatPassword(e.target.value);
            setFieldErrors((prev) => ({ ...prev, repeatPassword: "" }));
          }}
          required
          error={fieldErrors.repeatPassword}
        />
      )}
    </Form>
  );

  return isModal ? (
    formContent
  ) : (
    <div className="min-h-[calc(100vh-66px)] flex items-center justify-center">
      {formContent}
    </div>
  );
};

export default AuthForm;
