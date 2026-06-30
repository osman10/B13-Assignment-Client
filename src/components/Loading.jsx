import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

        {/* Loading Text */}
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;