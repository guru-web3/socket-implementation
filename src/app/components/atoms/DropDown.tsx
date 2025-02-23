import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

interface Option {
  name: string;
  value: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: Option[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  pill?: boolean;
  inputSize?: "sm" | "md" | "lg";
  classes?: {
    container?: string;
    inputContainer?: string;
    input?: string;
    arrow?: string;
  };
  "data-testid"?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  defaultValue,
  placeholder = "Select...",
  onChange,
  pill = true,
  inputSize = "md",
  classes = {},
  "data-testid": testId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find((o) => o.value === defaultValue) || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOption(
      options.find((o) => o.value === defaultValue) || null
    );
  }, [options, defaultValue])

  useEffect(() => {
    if (value) {
      const option = options.find((o) => o.value === value);
      setSelectedOption(option || null);
    }
  }, [value, options]);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${classes.container || "w-full"}`} ref={dropdownRef} data-testid={testId}>
      <div
        className={`
          flex items-center justify-between p-2 cursor-pointer
          ${pill ? "rounded-full" : "rounded-md"}
          ${inputSize === "sm" ? "h-8 text-sm" : inputSize === "lg" ? "h-12 w-30 text-base" : "h-10 text-sm"}
          ${classes.inputContainer || "bg- bg-app-dark-surface2"}
        `}
        onClick={() => setIsOpen(!isOpen)}
        data-testid={`${testId}-input`}
      >
        <span className={`flex justify-start items-center gap-x-2  ${classes.input || "text-gray-900 dark:text-white"}`}>
          {selectedOption?.icon}
          {selectedOption?.name || placeholder}
        </span>
        <Image 
            src="/icons/drop-down.svg"
            alt="Arrow Up"
            color="white"
            width={18}
            height={18}
            data-testid={`${testId}-arrow`}
        />
      </div>

      {isOpen && (
        <ul className="absolute overflow-auto z-10 w-full mt-2 bg-app-dark-surface3 border border-zinc-800 rounded-lg shadow-lg max-h-60 transition-all duration-300 ease-in-out transform origin-top scale-y-100 opacity-100 py-1" data-testid={`${testId}-options`}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`p-2 flex justify-start gap-x-2 mt-1 gap-y-1 hover:bg- bg-app-dark-surface2 dark:hover:bg-gray-700 cursor-pointer ${
                option.value === selectedOption?.value ? "bg- bg-app-dark-surface2 dark:bg-gray-700" : ""
              }`}
              onClick={() => {
                setSelectedOption(option);
                onChange?.(option.value);
                setIsOpen(false);
              }}
              aria-label={option.name}
              data-testid={`${testId}-option-${option.value}`}
            >
              {option.icon}
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;