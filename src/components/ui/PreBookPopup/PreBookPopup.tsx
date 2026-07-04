'use client';

import { useEffect, useState } from 'react';
import { PreBookModal } from '@/components/ui/PreBookModal';

export function PreBookPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return <PreBookModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}

export default PreBookPopup;