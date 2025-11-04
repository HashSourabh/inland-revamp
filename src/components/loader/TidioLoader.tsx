"use client";

import { useEffect } from 'react';
import Script from 'next/script';

export default function TidioLoader() {
  useEffect(() => {
    const ensurePosition = () => {
      const widget = document.querySelector(
        '[data-tidio-widget], .tidio-chat-widget, #tidio-chat-widget'
      ) as HTMLElement | null;
      if (widget) {
        widget.style.position = 'fixed';
        widget.style.bottom = '20px';
        widget.style.right = '20px';
        widget.style.zIndex = '9999';
      }
    };

    // Try immediately and for a short period afterwards to catch initial load
    ensurePosition();
    const interval = setInterval(ensurePosition, 1000);
    const timeout = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Script
      id="tidio-script"
      src={`https://code.tidio.co/x5g840oxfzsld9z8dbskapfs2khgekyj.js`}
      strategy="afterInteractive"
    />
  );
}



