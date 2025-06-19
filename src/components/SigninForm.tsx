import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Form, { FormInput } from "../components/common/Form";
import AuthIcon from "../assets/AuthIcon";

interface SignInFormProps {
  onSubmit?: () => void;
}

const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
    };
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
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const success = await signIn(email, password);
      if (success) {
        onSubmit?.();
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      title="Sign in to continue"
      subtitle="Sign in to access all the features on this app"
      submitText="Sign In"
      onSubmit={handleSubmit}
      bottomText="Do not have an account?"
      bottomLinkText="Sign Up"
      bottomLinkHref="/signup"
      icon={<AuthIcon />}
      error={error}
      isLoading={isLoading}
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
    </Form>
  );
};

export default SignInForm;
