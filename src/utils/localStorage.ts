export const CURRENT_USER_KEY = "current_user";
const REGISTERED_USERS_KEY = "registered_users";

const SESSION_DURATION_MINUTES = 15;

export type StoredUser = {
  email: string;
  password: string;
};

export function saveCurrentUser(email: string) {
  const expiresAt = Date.now() + SESSION_DURATION_MINUTES * 60 * 1000;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ email, expiresAt }));
}

export function getCurrentUser(): { email: string } | null {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  if (!user) return null;

  const parsedUser = JSON.parse(user);
  if (Date.now() > parsedUser.expiresAt) {
    clearCurrentUser();
    return null;
  }

  return { email: parsedUser.email };
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getRegisteredUsers(): StoredUser[] {
  const user = localStorage.getItem(REGISTERED_USERS_KEY);
  return user ? JSON.parse(user) : [];
}

export function saveNewUser(newUser: StoredUser) {
  const users = getRegisteredUsers();
  users.push(newUser);
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

export function checkIfUserExists(email: string): boolean {
  const users = getRegisteredUsers();
  return users.some((user) => user.email === email);
}
