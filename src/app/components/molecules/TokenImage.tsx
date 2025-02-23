import Image from "next/image";
import React from "react";

interface TokenImageProps {
  name: string;
  icon?: string;
  networkImage?: string;
}

export const TokenImage: React.FC<TokenImageProps> = ({
  name,
  icon,
  networkImage = "",
}) => {
  return (
    <div className="relative" aria-label="Token Icon">
      <div className="overflow-hidden h-12 w-12 flex items-center justify-center border dark:border-gray-600 rounded-full bg-app-dark-surface4">
        {icon ? (
          <Image
            src={icon}
            alt={name}
            width={32}
            height={32}
            className="object-contain w-8 h-8"
            aria-label={`${name} Icon`}
          />
        ) : (
          <div
            className="text-gray-900 dark:text-white"
            aria-label="Token Initial"
          >
            {name[0]}
          </div>
        )}
      </div>

      {/* Network Icon */}
      {networkImage && (
        <div
          className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center border dark:border-gray-600 rounded-full bg- bg-app-dark-surface2"
          aria-label="Network Icon"
        >
          <Image
            src={networkImage}
            alt={`${name} network`}
            width={24}
            height={24}
            className="object-contain w-4 h-4"
            aria-label={`${name} Network Icon`}
          />
        </div>
      )}
    </div>
  );
};
