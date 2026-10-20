'use client'
import { useId, useState } from 'react';
import { ModalPageWindow } from '@/app/components/ModalPageWindow';
import { Menu } from './Menu';
import s from './Burger.module.scss';

export const Burger = () => {
  const [isOpen, setOpen] = useState(false);
  const menuId = useId();
  const titleId = useId();

  const onClose = () => setOpen(false);
  return (
    <>
      <button
        type="button"
        className={s.burgerBtn}
        onClick={() => setOpen(open => !open)}
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="dialog"
      >
        {isOpen ? (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="24" y1="8" x2="8" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="6" y1="10" x2="26" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="6" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="6" y1="22" x2="26" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      <ModalPageWindow
        isOpen={isOpen}
        id={menuId}
        labelledBy={titleId}
        onCloseAction={onClose}
        className={s.modalPage}
        backdropClassName={s.backdrop}
        slidePosition="x"
        exitActiveFast={true}
      >
        <Menu onCloseAction={onClose} titleId={titleId} />
      </ModalPageWindow>
    </>
  );
};
