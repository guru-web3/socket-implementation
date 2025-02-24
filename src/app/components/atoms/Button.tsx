import React from "react";
import { Loader } from "../molecules/Loader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "text";
  size?: "default" | "sm" | "lg" | "icon";
  pill?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "default",
  pill = true,
  loading = false,
  className = "",
  ...props
}) => {
  // Base styles
  const baseStyles =
    "flex items-center justify-center gap-x-3 font-medium w-full focus:outline-none focus-visible:ring-1 disabled:opacity-60 disabled:pointer-events-none";

  // Variant styles
  const variantStyles = {
    primary:
      "bg-primary-600 text-white focus-visible:ring-app-primary-600 dark:bg-app-primary-500 dark:hover:bg-app-primary-400",
    secondary:
      "bg-transparent text-app-gray-500 border border-app-gray-500 hover:bg-app-gray-200 focus-visible:ring-app-primary-600 dark:text-app-white dark:border-app-gray-300 dark:hover:bg-app-gray-700",
    tertiary:
      "bg-app-gray-200 text-app-gray-800 hover:bg-app-gray-300 focus-visible:ring-app-primary-600 dark:bg-app-gray-500 dark:text-app-white dark:hover:bg-app-gray-400",
    text: "text-app-primary-600 focus:outline-none focus:ring-0 disabled:text-app-gray-400 dark:text-app-primary-500",
  };

  // Size styles
  const sizeStyles = {
    default: "h-[42px] px-5 py-2.5 text-sm",
    sm: "h-9 px-3 py-2 text-xs",
    lg: "h-12 px-5 py-3 text-base",
    icon: "h-10 w-10 rounded-full flex items-center justify-center",
  };

  // Pill styles
  const pillStyles = pill ? "rounded-full" : "rounded-md";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${pillStyles} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader size={"sm"} className="flex-none" />}
      {children}
    </button>
  );
};

export default Button;
