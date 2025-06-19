# foo-rum

A responsive social media interface built with a focus on modern UI/UX principles, reusability, and smooth animations. This project serves as a frontend foundation for a social application, featuring robust authentication flows and a dynamic post composition experience.

## 🚀 Features

### Component-Driven Architecture

- **Reusable Components**: Core functionalities like forms, icons, and modals are built as reusable components to ensure consistency and maintainability.
- **Smooth Animations**: CSS animations provide a fluid user experience for actions like form submissions, error messages, and modal pop-ups.
- **Dynamic Theming**: Easily adaptable styling using TailwindCSS.

### Authentication

- **Persistent Sessions with Expiry**: User sessions are saved to `localStorage` with a set expiry time, keeping them logged in across page refreshes while automatically handling session termination.
- **Modal & Page-Based Flows**: Users can sign in or sign up through dedicated pages or via modals that can be triggered from anywhere in the app.
- **Client-Side Validation**: Robust form validation with clear error messages for required fields, email formats, and password strength.
- **Loading States**: Asynchronous operations provide visual feedback with loading spinners and disabled buttons to prevent duplicate submissions.

### Social Features

- **Dynamic Post Input**: A rich text input for creating posts, with an emoji picker and character validation.
- **Interactive Icons**: Icons provide toast notifications or trigger authentication modals, guiding unauthenticated users to sign in.
- **Context-based State**: User authentication state is managed globally using React's Context API, ensuring components have access to the current user's status.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management**: React Context API

## ✨ Major Components

- `AuthForm.tsx`: A single, powerful component for both sign-in and sign-up. It conditionally renders fields and validation rules based on its `type` prop (`signIn` or `signUp`).
- `AuthModals.tsx`: Encapsulates the logic for displaying and switching between sign-in and sign-up modals, making it easy to add a complete authentication flow anywhere in the app.
- `PostInput.tsx`: The main component for creating a new post. It includes an emoji picker, text validation, loading states, and triggers the authentication modal for unauthenticated users.
- `Form.tsx`: A generic, reusable form wrapper that provides consistent styling, error display, and loading states for any form in the application.

## 🏗️ Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <your-repository-url>
   cd social-app-ui
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

4. **Access the Application**
   Open [http://localhost:5173](http://localhost:5173) (or the port specified in your console) in your browser.

## 📱 How to Use

### Creating a Post

1.  Navigate to the main feed.
2.  Click on the "How are you feeling today?" text area.
3.  Choose an emoji and type your message.
4.  Click the "Send" icon to publish your post.
5.  If you are not logged in, a sign-in modal will appear.

### Signing In / Signing Up

- **From a Page**: Navigate to `/signin` or `/signup` to use the dedicated form pages.
- **From a Modal**: Click on an action that requires authentication (like posting) to open the sign-in modal. From there, you can switch to the sign-up modal if needed.

### 🔐 Sample Credentials

To quickly test the authentication flows and post creation experience:

- **Email**: `demo@example.com`
- **Password**: `password123`
  or
- **Email**: `test@user.com`
- **Password**: `password123`

> You can also sign up with any other credentials to create a new user session. Passwords must contain at least 1 uppercase, 1 lowercase, and 1 number, and be at least 8 characters long.

---

Built with ❤️ by Nitika
̌
