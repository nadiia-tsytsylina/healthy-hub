import { useEffect } from 'react';
import { Backdrop, Modal } from './ErrorUserModal.styled';
import CloseModalButton from '../CloseModalButton';

export const ErrorUserModal = ({ isOpenModal, errorMessage, children }) => {
  const handleCloseModal = ({ code, currentTarget, target }) => {
    if (code === 'Escape' || currentTarget === target) {
      isOpenModal();
      return;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleCloseModal);
      document.documentElement.style.overflow = 'auto';
    };
  });
  return (
    <Backdrop onClick={handleCloseModal}>
      <Modal>
        <CloseModalButton onClose={isOpenModal} />
        {children}
      </Modal>
    </Backdrop>
  );
};
