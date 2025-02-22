"use client";
// Loader.tsx
import Image from "next/image";
import React from "react";

interface LoaderProps {
  size?: "sm" | "default" | "md" | "lg";
  showLogo?: boolean;
  text?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "default",
  showLogo = false,
  text = "",
  className = ""
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    default: "h-[60px] w-[60px]",
    md: "w-8 h-8",
    lg: "w-16 h-16"
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <div className={`${sizeClasses[size]} border-2 border-t-transparent border-app-primary-500 rounded-full animate-spin w-full h-full`} />
        
        {showLogo && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_ASSETS}/images/web3auth_dark.svg`}
              alt="Web3auth Logo"
              width={200}
              height={35}
              className="hidden dark:block"
            />
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_ASSETS}/images/logo_loading.svg`}
              alt="Web3auth Logo"
              width={200}
              height={35}
              className="block dark:hidden"
            />
          </div>
        )}
      </div>
      
      {text && (
        <p className="text-lg text-gray-900 dark:text-white text-center">
          {text}
        </p>
      )}
    </div>
  );
};
