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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = signUp(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password.");
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
      <FormInput
        type="password"
        placeholder="Enter your password again"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        required
      />
    </Form>
  );
};

export default SignUpForm;
