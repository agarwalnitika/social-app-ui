import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  clearCurrentUser,
  CURRENT_USER_KEY,
  getCurrentUser,
  getRegisteredUsers,
  saveCurrentUser,
  saveNewUser,
} from "../utils/localStorage";

type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => boolean;
  signUp: (email: string, password: string) => boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoUsers = [
  { email: "demo@example.com", password: "password123" },
  { email: "test@user.com", password: "testpass" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!currentUser) return;

    const { expiresAt } = JSON.parse(currentUser);
    const timeout = expiresAt - Date.now();

    if (timeout > 0) {
      const timer = setTimeout(() => {
        signOut();
      }, timeout);

      return () => clearTimeout(timer); // cleanup
    } else {
      signOut(); // if expired already
    }
  }, [user]);

  const signIn = (email: string, password: string) => {
    const allUsers = [...demoUsers, ...getRegisteredUsers()];
    const match = allUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (match) {
      saveCurrentUser(email);
      setUser({ email });
      return true;
    }
    return false;
  };

  const signUp = (email: string, password: string) => {
    // Accept any signup for now (simulate success)
    saveNewUser({ email, password });
    saveCurrentUser(email);
    setUser({ email });
    return true;
  };
  const signOut = () => {
    setUser(null);
    clearCurrentUser();
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
