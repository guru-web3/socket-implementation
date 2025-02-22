// TokenCard.tsx
import Image from "next/image";
import React from "react";

interface TokenCardProps {
  assetId: string;
  name: string;
  crypto: string;
  icon?: string;
  balance?: string;
  networkImage?: string;
}

export const TokenCard: React.FC<TokenCardProps> = ({
  name,
  crypto,
  icon,
  balance = "0",
  networkImage = "",
}) => {

  return (
    <div className="flex items-center gap-x-8 w-full" aria-label="Token Card">
      {/* Token Icon */}
      <div className="relative" aria-label="Token Icon">
        <div className="overflow-hidden h-12 w-12 flex items-center justify-center border dark:border-gray-600 rounded-full bg-[#252534]">
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
            <div className="text-gray-900 dark:text-white" aria-label="Token Initial">{name[0]}</div>
          )}
        </div>
    
        {/* Network Icon */}
        {networkImage && (
          <div className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center border dark:border-gray-600 rounded-full bg-[#1c1c28]" aria-label="Network Icon">
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
    
      {/* Token Info */}
      <div className="flex flex-col flex-1 items-start" aria-label="Token Info">
        <p className="text-sm text-app-gray-50 font-medium truncate max-w-[120px]" aria-label="Token Name">
          {name}
        </p>
        <p className="text-xs text-app-gray-400" aria-label="Token Symbol">{crypto}</p>
      </div>
    
      {/* Balance */}
      <p className="text-sm text-app-gray-50 font-semibold" aria-label="Token Balance">
        {parseFloat(balance).toFixed(4)} {crypto}
      </p>
    </div>
  );
};
