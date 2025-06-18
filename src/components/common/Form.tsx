import { type JSX, type ReactNode } from "react";
import { Link } from "react-router-dom"; // Optional, depending on your routing

interface FormProps {
  title: string;
  subtitle?: string;
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
  submitText: string;
  submitButtonColor?: "blue" | "green" | "red";
  error?: string;
  bottomText?: string;
  bottomLinkText?: string;
  bottomLinkHref?: string;
  icon?: JSX.Element;
}

interface FormInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const FormInput = ({
  type,
  placeholder,
  value,
  onChange,
  required = false,
}: FormInputProps) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-[#F4F4F4] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

const Form = ({
  title,
  subtitle,
  onSubmit,
  children,
  submitText,
  submitButtonColor = "blue",
  error,
  bottomText,
  bottomLinkText,
  bottomLinkHref,
  icon,
}: FormProps) => {
  const getButtonColor = () => {
    switch (submitButtonColor) {
      case "green":
        return "bg-green-600 hover:bg-green-700";
      case "red":
        return "bg-red-600 hover:bg-red-700";
      default:
        return "bg-blue-600 hover:bg-blue-700";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div
        className="w-full max-w-md bg-white p-[8px] rounded-2xl shadow-xl border border-transparent"
        style={{ backgroundColor: "#EBEBEB" }}
      >
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-[#00000008] border border-gray-100">
          <form onSubmit={onSubmit}>
            <div className="text-center mb-8">
              {icon && (
                <div className="flex justify-center mb-4">
                  <div className="bg-[#F8F8F8] p-3 rounded-full text-gray-600">
                    {icon}
                  </div>
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              {subtitle && (
                <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
              )}
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-4">{children}</div>

            <button
              type="submit"
              className={`w-full mt-6 py-3 px-4 text-white font-semibold rounded-lg transition-colors duration-200 ${getButtonColor()}`}
            >
              {submitText}
            </button>
          </form>
        </div>
        {bottomText && bottomLinkText && bottomLinkHref && (
          <div className="text-center mt-4 mb-2 text-sm text-gray-500">
            {bottomText}{" "}
            <Link
              to={bottomLinkHref}
              className="text-blue-600 font-semibold hover:underline"
            >
              {bottomLinkText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
