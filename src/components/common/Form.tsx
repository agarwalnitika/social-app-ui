import { type JSX, type ReactNode } from "react";
import { Link } from "react-router-dom";

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
  isLoading?: boolean;
  isModal?: boolean;
  onBottomLinkClick?: () => void;
}

interface FormInputProps {
  type: string;
  title: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

export const FormInput = ({
  type,
  title,
  placeholder,
  value,
  onChange,
  required = false,
  error,
}: FormInputProps) => {
  return (
    <div>
      <p className="text-sm mb-[6px] font-bold ml-1">{title}</p>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-[#F4F4F4] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none ${
          error ? "border-2 border-red-400" : ""
        }`}
        value={value}
        onChange={onChange}
        required={required}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1 ml-1 animate-fadeIn">{error}</p>
      )}
    </div>
  );
};

const Form = ({
  title,
  subtitle,
  onSubmit,
  children,
  submitText,
  error,
  bottomText,
  bottomLinkText,
  bottomLinkHref,
  icon,
  isLoading = false,
  isModal = false,
  onBottomLinkClick,
}: FormProps) => {
  const handleBottomLinkClick = (e: React.MouseEvent) => {
    if (isModal && onBottomLinkClick) {
      e.preventDefault();
      onBottomLinkClick();
    }
  };

  return (
    <div className="flex items-center justify-center animate-slideInFromBottom px-4">
      <div className="w-full   bg-gray-100 p-[8px] rounded-2xl border border-transparent">
        <div className="w-full sm:w-[498px] bg-white px-6 py-7 sm:px-12 rounded-2xl shadow-[#00000008] border border-gray-100 overflow-y-auto">
          <form onSubmit={onSubmit}>
            <div className="text-center mb-16">
              {icon && (
                <div className="flex justify-center mb-5">
                  <div className="bg-[#F8F8F8] p-3 rounded-full text-gray-600 animate-scaleIn">
                    {icon}
                  </div>
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-900 animate-fadeIn">
                {title}
              </h2>
              {subtitle && (
                <p className="text-gray-500 text-sm mt-1 animate-fadeIn">
                  {subtitle}
                </p>
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
              disabled={isLoading}
              className={`w-full mt-6 py-3 px-4 text-white font-semibold rounded-lg transition-all duration-200 bg-[#5057EA] hover:bg-[#3e45c7] cursor-pointer mb-5 flex items-center justify-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
                  Processing...
                </div>
              ) : (
                submitText
              )}
            </button>
          </form>
        </div>

        {bottomText && bottomLinkText && bottomLinkHref && (
          <div className="text-center mt-4 mb-2 text-sm text-gray-500 animate-fadeIn">
            {bottomText}{" "}
            <Link
              to={bottomLinkHref}
              onClick={handleBottomLinkClick}
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
