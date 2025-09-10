import React from 'react';
import "./registModal.scss"
import FormRegistration from '../formRegistration/FormRegistration';
interface RegistModalProps {
  isOpen: boolean;
  onClose: () => void;
  openLogin: () => void;
}
const RegistModal: React.FC<RegistModalProps> = ({ isOpen, onClose, openLogin }) => {
  if (!isOpen) return null;
  const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  return (
    <div className='mainRegistModal active' onClick={handleBackdropClick}>
      <button className='modalRegistBtn' onClick={onClose}>Закрыть</button>
      <div className='modalRegistContent' onClick={e => e.stopPropagation()}>
        <FormRegistration onClose={onClose} openLogin={openLogin}/>
      </div>
    </div>
  );
};

export default RegistModal;