import React, { useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";

const EnableRefuel = () => {
  const [isRefuelEnabled, setIsRefuelEnabled] = useState(false);
  const { chain } = useAccount();

  return (
    <div className="bg-gradient-to-b from-[#1c1c28] to-[#171721] rounded-lg p-4 flex items-center justify-between shadow-md" aria-label="Enable Refuel Container">
      {/* Left Section */}
      <div className="flex items-center gap-3" aria-label="Refuel Information">
        <Image
          src="https://www.bungee.exchange/_next/static/media/gasPump.8bb18c94.svg" // Replace with your actual icon path
          alt="Refuel Icon"
          width={24}
          height={24}
          aria-label="Refuel Icon"
        />
        <div>
          <p className="text-app-gray-50 font-medium flex items-center gap-1" aria-label="Enable Refuel">
            Enable Refuel{" "}
            <span className="text-app-gray-300 text-sm cursor-pointer" aria-label="Info Icon">
              <Image
                src="https://www.bungee.exchange/_next/static/media/info-new.6b61946d.svg" // Replace with your actual info icon path
                alt="Info"
                width={16}
                height={16}
              />
            </span>
          </p>
          <p className="text-app-gray-300 text-sm" aria-label="Refuel Description">
            Get {chain?.nativeCurrency?.symbol} for transactions on Polygon
          </p>
        </div>
      </div>
    
      {/* Toggle */}
      <label htmlFor="refuel-toggle" className="relative inline-flex items-center cursor-pointer" aria-label="Enable Refuel Toggle">
        <input
          type="checkbox"
          id="refuel-toggle"
          className="sr-only peer"
          checked={isRefuelEnabled}
          onChange={() => setIsRefuelEnabled(!isRefuelEnabled)}
        />
        <div className="w-11 h-6 bg-gray-600 border:bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-purple-500 peer-checked:bg-purple-500 transition-all"></div>
        <span className="absolute left-[4px] top-[2px] w-5 h-5 bg-white rounded-full peer-checked:translate-x-full transition-transform"></span>
      </label>
    </div>
  );
};

export default EnableRefuel;
