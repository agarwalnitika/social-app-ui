import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import SignInForm from "./components/SigninForm";
import SignUpForm from "./components/SignupForm";
import Feed from "./pages/Feed";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </Router>
  );
}

export default App;
