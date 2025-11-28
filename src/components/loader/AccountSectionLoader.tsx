import React from "react";

type AccountSectionLoaderProps = {
  message?: React.ReactNode;
  overlay?: boolean;
  className?: string;
};

const AccountSectionLoader: React.FC<AccountSectionLoaderProps> = ({
  message = "Loading...",
  overlay = false,
  className = "",
}) => {
  const loaderContent = (
    <div className={`flex flex-col items-center justify-center gap-3 text-gray-600 ${overlay ? "" : "py-10"} ${className}`}>
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      {message && <p className="text-sm font-medium text-gray-600">{message}</p>}
    </div>
  );

  if (overlay) {
    return (
      <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export default AccountSectionLoader;


