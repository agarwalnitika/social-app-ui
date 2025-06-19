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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = signIn(email, password);
    if (success) {
      onSubmit?.();
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <Form
      title="Sign in to continue"
      subtitle="Sign in to access all the features on this app"
      submitText="Sign In"
      onSubmit={handleSubmit}
      bottomText="Do not have and account?"
      bottomLinkText="Sign Up"
      bottomLinkHref="/signup"
      icon={<AuthIcon />}
      error={error}
    >
      <FormInput
        type="email"
        placeholder="Enter your email or username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormInput
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </Form>
  );
};

export default SignInForm;
