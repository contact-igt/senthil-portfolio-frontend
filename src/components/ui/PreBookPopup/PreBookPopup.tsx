'use client';

import { useEffect, useState } from 'react';
import { PreBookModal } from '@/components/ui/PreBookModal';

const POPUP_SESSION_KEY = 'psychology-book-popup-opened';

export function PreBookPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(POPUP_SESSION_KEY)) {
        return;
      }

      window.sessionStorage.setItem(POPUP_SESSION_KEY, 'true');
    } catch {
      // If sessionStorage is unavailable, keep the popup functional.
    }

    const timer = window.setTimeout(() => setIsOpen(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return <PreBookModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}

export default PreBookPopup;