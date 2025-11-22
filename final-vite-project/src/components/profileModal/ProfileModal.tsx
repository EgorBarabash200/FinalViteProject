import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../store/indexStore';
import './profileModal.scss';

const ProfileModal = observer(() => {
  const { user, closeModals, stateModal } = authStore;

  const handleOk = () => {
    closeModals();
  };

  const handleCancel = () => {
    closeModals();
  };

  return (
    <Modal
      title="Профиль пользователя"
      open={stateModal.profile}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="ОК"
      cancelText="Отмена"
      className="profile-modal"
    >
      {user && (
        <div className="profile-content">
          <div className="profile-field">
            <span className="field-label">Логин:</span>
            <span className="field-value">{user.login}</span>
          </div>
          <div className="profile-field">
            <span className="field-label">Email:</span>
            <span className="field-value">{user.email || 'Не указан'}</span>
          </div>
          <div className="profile-field">
            <span className="field-label">Телефон:</span>
            <span className="field-value">{user.phone || 'Не указан'}</span>
          </div>
        </div>
      )}
    </Modal>
  );
});

export default ProfileModal;