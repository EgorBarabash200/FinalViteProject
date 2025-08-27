import React from 'react';
import FormOpAccunt from '../components/formOpAccunt/FormOpAccunt';
import "./logModal.scss"
interface LogModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const LogModal: React.FC<LogModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='mainModal active' onClick={onClose}>
      <button className='modalBtn' onClick={onClose}>Закрыть</button>
      <div className='modalContent' onClick={e => e.stopPropagation()}>
        <FormOpAccunt />
      </div>
    </div>
  );
};

export default LogModal;