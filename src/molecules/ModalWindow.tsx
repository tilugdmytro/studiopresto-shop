import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { styled } from '@mui/system';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
  isModalOpen: boolean;
};

const ModalBackdrop = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
});

const ModalContent = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: 30,
  });

export const ModalWindow: React.FC<ModalProps> = ({ onClose, children, isModalOpen }) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <ModalBackdrop
      onClick={handleBackdropClick}
      role="button"
      tabIndex={0}
    >
      <ModalContent>{children}</ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
};
