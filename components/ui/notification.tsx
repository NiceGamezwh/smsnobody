"use client";

import { useEffect, useState } from "react";

interface NotificationProps {
  message: string;
}

export default function Notification({ message }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isVisible || !message) return null;

  return (
    <div className="fixed top-4 right-4 bg-yellow-500 text-white p-3 rounded-lg shadow-lg z-50">
      {message}
    </div>
  );
}