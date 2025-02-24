import React, { useState, forwardRef } from "react";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  block?: boolean;
  pill?: boolean;
  inputSize?: "sm" | "md" | "lg";
  success?: boolean;
  error?: boolean;
  helperText?: string;
  EndSlot?: React.ReactNode;
  StartSlot?: React.ReactNode;
  className?: string;
  type?: string; // Dynamically set the input type (e.g., "text", "number")
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label = "",
      inputSize = "md",
      block = true,
      pill = false,
      success = false,
      error = false,
      helperText = "",
      StartSlot,
      EndSlot,
      className,
      type = "text", // Default type is 'text'
      ...props
    },
    ref,
  ) => {
    const [inputFocus, setInputFocus] = useState(false);

    // Size classes
    const sizeClasses = {
      sm: "h-8 py-2 text-sm",
      md: "h-10 py-3",
      lg: "h-12 py-3.5 text-base",
    };

    // State classes
    const borderColor = error
      ? "border-red-500 dark:border-red-500"
      : success
        ? "border-green-500 dark:border-green-500"
        : inputFocus
          ? "border-primaryPurple dark:border-primaryPurple"
          : "border-neutral-800";

    const textColor = error
      ? "text-red-500 dark:text-red-400"
      : success
        ? "text-green-500 dark:text-green-400"
        : "text-neutral-50";

    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {label && (
          <label
            className={`text-sm font-medium ${
              error
                ? "text-red-500 dark:text-red-400"
                : success
                  ? "text-green-500 dark:text-green-400"
                  : "text-neutral-50"
            }`}
          >
            {label}
          </label>
        )}

        <div
          className={`
            flex items-center gap-2
            ${sizeClasses[inputSize]}
            ${block ? "w-full" : ""}
            ${pill ? "rounded-full" : "rounded-lg"}
            ${borderColor}
            bg- bg-app-dark-surface2 border transition-colors px-4 py-[10px]
          `}
        >
          {StartSlot && <div className="pr-2">{StartSlot}</div>}

          <input
            ref={ref}
            {...props}
            type={type} // Dynamically set the input type
            className={`
              flex-1 w-full bg-transparent outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-600 ${textColor} text-sm font-medium`}
            onFocus={(e) => {
              setInputFocus(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setInputFocus(false);
              props.onBlur?.(e);
            }}
          />

          {EndSlot && <div className="pl-2">{EndSlot}</div>}
        </div>

        {helperText && (
          <p
            className={`text-xs ${
              error
                ? "text-red-500 dark:text-red-400"
                : success
                  ? "text-green-500 dark:text-green-400"
                  : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export { TextInput };
