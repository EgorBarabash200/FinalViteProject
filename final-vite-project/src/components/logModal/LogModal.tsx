import FormOpAccunt from '../formOpAccunt/FormOpAccunt';
import "./logModal.scss";
import { authStore } from '../../store/indexStore';
import { observer } from 'mobx-react-lite';

const LogModal: React.FC = observer(() => {
  const { isLogModalOpen } = authStore;

  if (!isLogModalOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      authStore.closeModals();
    }
  };

  return (
    <div className='mainModal active' onClick={handleBackdropClick}>
      <div className='modalContent' onClick={e => e.stopPropagation()}>
        <FormOpAccunt />
      </div>
    </div>
  );
});

export default LogModal;