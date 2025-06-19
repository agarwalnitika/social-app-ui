import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-4 bg-gray-100 border-b">
      <Link to="/" className="font-bold text-lg">
        AuthApp
      </Link>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.email}</span>
            <button
              onClick={() => {
                signOut();
                navigate("/");
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="text-blue-600 mr-3">
              Sign In
            </Link>
            <Link to="/signup" className="text-blue-600">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
