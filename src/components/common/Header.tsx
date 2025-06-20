import { type MouseEventHandler, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthIcon from "../../assets/AuthIcon";
import Logo from "../../assets/Logo";
import { useAuth } from "../../context/AuthContext";

interface HeaderButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  buttonText: string;
  icon?: ReactNode;
}
const HeaderButton = ({
  onClick,
  className = "",
  buttonText,
  icon,
}: HeaderButtonProps) => (
  <button
    onClick={onClick}
    className={`bg-transparent px-3 py-1 rounded cursor-pointer ${className}`}
  >
    <div className="flex gap-2">
      <span className="inline-flex text-sm font-semibold">{buttonText}</span>
      {icon && <span className="inline-flex">{icon}</span>}
    </div>
  </button>
);

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div
      className={`flex justify-between p-4 mx-7 bg-white sticky top-0 z-9999`}
    >
      <Link to="/">
        <Logo />
      </Link>
      <div>
        {isAuthPage ? (
          <HeaderButton
            onClick={() => navigate("/")}
            buttonText="Back to Home"
          />
        ) : user ? (
          <HeaderButton
            onClick={() => {
              signOut();
              navigate("/");
            }}
            buttonText="Sign out"
            icon={<AuthIcon width={20} height={20} />}
          />
        ) : (
          <HeaderButton
            onClick={() => navigate("/signin")}
            buttonText="Login"
            icon={<AuthIcon width={20} height={20} />}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
