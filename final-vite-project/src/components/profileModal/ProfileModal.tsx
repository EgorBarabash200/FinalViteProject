import { Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../store/indexStore';
import './profileModal.scss';
import LogInput from '../ui/input/logInput/LogInput';
const ProfileModal = observer(() => {
  const { user, closeModals, stateModal, profileForm, setProfileForm } = authStore;

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
            <LogInput
              value={profileForm.login}
              onChange={e => setProfileForm('login', e.target.value)}
            />
          </div>
          <div className="profile-field">
            <span className="field-label">Email:</span>
            <LogInput
              value={profileForm.email}
              onChange={e => setProfileForm('email', e.target.value)}
            />
          </div>
          <div className="profile-field">
            <span className="field-label">Телефон:</span>
            <LogInput
              value={profileForm.phone}
              onChange={e => setProfileForm('phone', e.target.value)}
            />
          </div>
        </div>
      )}
    </Modal>
  );
});

export default ProfileModal;