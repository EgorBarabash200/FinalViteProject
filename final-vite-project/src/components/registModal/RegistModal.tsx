import React from 'react';
import "./registModal.scss";
import FormRegistration from '../formRegistration/FormRegistration';
import { authStore } from '../../store/indexStore';
import { observer } from 'mobx-react-lite';

const RegistModal: React.FC = observer(() => {
  const { isRegistModalOpen } = authStore;

  if (!isRegistModalOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      authStore.closeModals();
    }
  };

  return (
    <div className='mainRegistModal active' onClick={handleBackdropClick}>
      <div className='modalRegistContent' onClick={e => e.stopPropagation()}>
        <FormRegistration />
      </div>
    </div>
  );
});

export default RegistModal;