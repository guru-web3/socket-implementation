import React, { memo } from "react";

interface ComponentLoaderProps {
  loaderClass?: string;
}

const ComponentLoader: React.FC<ComponentLoaderProps> = ({ loaderClass }) => {
  return (
    <div
      className={`bg-app-gray-200 dark:bg-app-gray-700 animate-pulse w-full rounded-xl ${
        loaderClass || ""
      }`}
    />
  );
};

export default memo(ComponentLoader);
