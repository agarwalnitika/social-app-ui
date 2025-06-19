import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/Logo";
import AuthIcon from "../../assets/AuthIcon";
import type { ReactNode, MouseEventHandler } from "react";

// Reusable navigation button
interface NavButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
}
const NavButton = ({ onClick, children, className = "" }: NavButtonProps) => (
  <button
    onClick={onClick}
    className={`bg-transparent px-3 py-1 rounded cursor-pointer ${className}`}
  >
    {children}
  </button>
);

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div className="flex justify-between p-4 mx-7">
      <Link to="/">
        <Logo />
      </Link>
      <div>
        {isAuthPage ? (
          <NavButton onClick={() => navigate("/")}>Back to Home</NavButton>
        ) : user ? (
          <NavButton
            onClick={() => {
              signOut();
              navigate("/");
            }}
          >
            <div className="flex gap-2">
              <span className="inline-flex">Sign out</span>
              <span className="inline-flex">
                <AuthIcon />
              </span>
            </div>
          </NavButton>
        ) : (
          <NavButton onClick={() => navigate("/signin")}>
            <div className="flex gap-2">
              <span className="inline-flex">Login</span>
              <span className="inline-flex">
                <AuthIcon />
              </span>
            </div>
          </NavButton>
        )}
      </div>
    </div>
  );
};

export default Navbar;
