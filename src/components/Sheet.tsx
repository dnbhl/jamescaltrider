import React, { useEffect, useRef } from 'react';
import { CloseIcon } from './Icons';
import { useEscape, useScrollLock } from '../hooks/useUI';

interface SheetProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Accessible overlay sheet used for the résumé and policy text.
 * Traps initial focus, closes on Escape / backdrop click, restores focus on close.
 */
export const Sheet: React.FC<SheetProps> = ({ open, title, onClose, children }) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useScrollLock(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
    } else {
      returnFocusRef.current?.focus?.();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="overlay" onClick={onClose} role="presentation">
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="sheet__close" onClick={onClose} aria-label="Close">
          <CloseIcon size={22} />
        </button>
        <h3 id="sheet-title">{title}</h3>
        {children}
      </div>
    </div>
  );
};
