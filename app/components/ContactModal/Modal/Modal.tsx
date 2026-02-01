'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback, memo, ReactNode } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
  className?: string;
  disableClose?: boolean;
}

const Modal: React.FC<ModalProps> = memo(
  ({ isOpen, onClose, title, children, maxWidth = 'md', className = '', disableClose = false }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (!mounted) return;

      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen, mounted]);

    const handleOverlayClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!disableClose && e.target === e.currentTarget) {
          onClose();
        }
      },
      [onClose, disableClose],
    );

    useEffect(() => {
      if (!isOpen || disableClose) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, disableClose]);

    if (!mounted) return null;

    return createPortal(
      <div
        className={clsx('modal__overlay', { open: isOpen })}
        onMouseDown={handleOverlayClick}
        role="presentation"
        {...(!isOpen && { inert: true })}
      >
        <div
          className={clsx('modal', `modal--${maxWidth}`, className)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal__head">
            <h2 id="modal-title" className="modal__head-title">
              {title}
            </h2>
            {!disableClose && (
              <button type="button" onClick={onClose} className="modal__close" aria-label="Закрыть модальное окно">
                <Image src="/images/icons/icon-close.svg" alt="" width={20} height={20} loading="eager" />
              </button>
            )}
          </div>

          <div className="modal__body">{children}</div>
        </div>
      </div>,
      document.body,
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;
