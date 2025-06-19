import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Form, { FormInput } from "../components/common/Form";
import AuthIcon from "../assets/AuthIcon";

const SignUpForm = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
      repeatPassword: "",
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
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
      isValid = false;
    }

    if (!repeatPassword) {
      errors.repeatPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== repeatPassword) {
      errors.repeatPassword = "Passwords do not match";
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
      const success = await signUp(email, password);
      if (success) {
        navigate("/");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      title="Create an account to continue"
      subtitle="Create an account to access all the features on this app"
      submitText="Sign Up"
      onSubmit={handleSubmit}
      icon={<AuthIcon />}
      bottomText="Already have an account?"
      bottomLinkText="Sign In"
      bottomLinkHref="/signin"
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
    </Form>
  );
};

export default SignUpForm;
