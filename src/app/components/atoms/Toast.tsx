"use client";
import React, { useEffect } from "react";

export type ToastType = "success" | "warning" | "error" | "info" | "default";
export type Position =
  | "top-center"
  | "bottom-center"
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface ToastObj {
  id: number;
  type: ToastType;
  message: string;
}

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  position: Position;
  limit: number;
  toasts: ToastObj[];
  removeToast: (id: number) => void;
  icon?: React.ReactNode;
  toastStyle?: string;
  pill?: boolean;
}

const positionClasses = {
  "top-center": "fixed top-0 sm:top-20 left-1/2 -translate-x-1/2",
  "bottom-center": "fixed bottom-0 left-1/2 -translate-x-1/2",
  "top-right": "fixed top-0 right-0",
  "top-left": "fixed top-0 left-0",
  "bottom-right": "fixed bottom-0 right-0",
  "bottom-left": "fixed bottom-0 left-0"
};

const colors = {
  success: "bg-green-600 text-white dark:bg-green-500",
  warning: "bg-yellow-600 text-white dark:bg-yellow-500",
  error: "bg-red-600 text-white dark:bg-red-500",
  info: "bg-blue-600 text-white dark:bg-blue-500",
  default: "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
};

const icons = {
  success: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>`,
  warning: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>`,
  error: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>`,
  default: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>`
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      position = "top-center",
      limit,
      toasts,
      removeToast,
      icon,
      toastStyle,
      pill = true,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      const timers = toasts.map((toast) =>
        setTimeout(() => removeToast(toast.id), 3000)
      );
      return () => timers.forEach(clearTimeout);
    }, [toasts, removeToast]);

    return (
      <div
        className={`${positionClasses[position]} z-[1000] w-full ${className || ""}`}
        {...props}
        ref={ref}
        role="alert"
      >
        {toasts.slice(0, limit).map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center px-6 py-4 m-4 mt-6 mx-auto max-w-[20rem] w-fit shadow-lg ${
              colors[toast.type]
            } ${pill ? "rounded-full" : "rounded-lg"} ${toastStyle || ""}`}
          >
            {icon || (
              <span 
                className="w-6 h-6 mr-2"
                dangerouslySetInnerHTML={{ __html: icons[toast.type] }}
              />
            )}
            <div className="text-base font-normal">{toast.message}</div>
          </div>
        ))}
      </div>
    );
  }
);

Toast.displayName = "Toast";

export { Toast };
