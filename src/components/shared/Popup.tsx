'use client';

import React, { useEffect } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: any;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, description,  children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="absolute inset-0"
        onClick={onClose}
      ></div>

      <div className="relative z-10 w-full max-w-xl bg-white rounded-lg shadow-lg">
        <div className="relative px-6 py-4 border-b border-gray-300 pr-16">
          {title && (
            <h5 className="text-2xl font-medium mb-1">{title}</h5>
          )}
          {description && (
            <p className="text-sm text-gray-600 font-medium">{description}</p>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 bg-gray-200 hover:bg-secondary-500 hover:text-white w-8 h-8 rounded-md flex items-center justify-center font-semibold"
          >
            ✕
          </button>
        </div>  
        <div className="p-6 ">
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
