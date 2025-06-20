import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Header from "./components/common/Header";
import Feed from "./pages/Feed";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/signin" element={<AuthForm type="signIn" />} />
        <Route path="/signup" element={<AuthForm type="signUp" />} />
      </Routes>
    </Router>
  );
}

export default App;
