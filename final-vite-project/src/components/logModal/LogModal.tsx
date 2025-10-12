import React from 'react';
import FormOpAccunt from '../formOpAccunt/FormOpAccunt';
import "./logModal.scss"
import type { ILogModalProps } from '../../interface/interface';
const LogModal: React.FC<ILogModalProps> = ({ isOpen, onClose, openRegist }) => {
  if (!isOpen) return null;
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className='mainModal active' onClick={handleBackdropClick}>
      <button className='modalBtn' onClick={onClose}>Закрыть</button>
      <div className='modalContent' onClick={e => e.stopPropagation()}>
        <FormOpAccunt onClose={onClose} openRegist={openRegist} />
      </div>
    </div>
  );
};

export default LogModal;