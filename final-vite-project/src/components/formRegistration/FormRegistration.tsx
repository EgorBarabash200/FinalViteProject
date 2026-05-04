import LogInput from '../ui/input/logInput/LogInput';
import './formRegistration.scss';
import { authStore } from '../../store/indexStore';
import { observer } from 'mobx-react-lite';
import { notification } from 'antd';
import { CloseOutlined } from "@ant-design/icons";
import CustomBtn from '../ui/button/customBtn/CustomBtn';
import type { LogModalProps } from '../../interface/interface';
import { useState } from 'react';
import { postRegistration } from '../../API/ShopServis';

const FormRegistration = observer(({ closeModal, openRegistr }: LogModalProps) => {
  const {
    //registrationForm,
    // repeatPassword,
    stateCheckLogin,
    //emailError,
    // stateLoad,
    isRegistrationFormValid,
    passwordsMatch,
    setRegistrationForm,
    //setRepeatPassword,
    checkLoginAvailability,
    validateEmail,
    //register,
    //closeModals,
    //openLoginModal
  } = authStore;

  const { updateUser } = authStore;
  const [stateFormRegist, setStateFormRegist] = useState({ login: '', password: '', email: '', phone: '' })
  const [repeatPassword, setRepeatPassword] = useState('');
  const [stateLoad, setStateLoad] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [, contextHolder] = notification.useNotification();
  const registUser = async () => {
    try {
      await postRegistration(stateFormRegist);
      notification.success({
        message: 'Регистрация успешна!',
        description: 'Теперь вы можете войти в свой аккаунт',
        placement: 'top',
        duration: 4,
      });
    } catch (e) {
      notification.error({
        message: 'Ошибка регистрации',
        description: 'Не удалось зарегистрироваться. Попробуйте еще раз.',
        placement: 'top',
        duration: 4,
      });
      console.error('Ошибка регистрации:', e);
    } finally {
      setStateLoad(false);
    }
  }

  const handleCancel = () => {
    //closeModals();
    //openLoginModal();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const onlyNumbers = value.replace(/[^\d]/g, '');
    const truncated = onlyNumbers.slice(0, 11);
    setRegistrationForm('phone', truncated);
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9@.\-]/g, '');
    validateEmail(filteredValue);
  }

  return (
    <div className='formRegistration'>
      {contextHolder}
      <button className="close-button" onClick={closeModals}>
        <CloseOutlined />
      </button>
      <h2>Регистрация</h2>

      <div className="input-field">
        <LogInput
          placeholder='Логин'
          type='text'
          value={registrationForm.login}
          onChange={(e) => checkLoginAvailability(e.target.value)}
        />
        {registrationForm.login.length > 5 && registrationForm.login.length <= 15 && (
          <div className={`validation-message ${stateCheckLogin ? 'error' : 'success'}`}>
            {stateCheckLogin ? 'Логин занят' : '✓'}
          </div>
        )}
      </div>

      <div className="input-field">
        <LogInput
          placeholder='Пароль'
          type='password'
          value={registrationForm.password}
          onChange={e => setRegistrationForm('password', e.target.value)}
        />
        {registrationForm.password.length > 5 && registrationForm.password.length <= 15 && (
          <div className="validation-message success">✓</div>
        )}
      </div>

      <div className="input-field">
        <LogInput
          placeholder='Повторите пароль'
          type='password'
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        {repeatPassword.length > 5 && repeatPassword.length <= 15 && (
          <div className={`validation-message ${passwordsMatch ? 'success' : 'error'}`}>
            {passwordsMatch ? '✓' : 'Пароли не совпадают'}
          </div>
        )}
      </div>

      <div className="input-field">
        <LogInput
          placeholder='email'
          type='text'
          value={registrationForm.email}
          onChange={handleEmailChange}
        />
        {registrationForm.email.length > 0 && (
          <div className={`validation-message ${emailError ? 'error' : 'success'}`}>
            {emailError ? emailError : '✓'}
          </div>
        )}
      </div>

      <div className="input-field">
        <LogInput
          placeholder='Телефон'
          type='text'
          value={registrationForm.phone}
          onChange={handlePhoneChange}
        />
        {registrationForm.phone.length === 11 && (
          <div className="validation-message success">✓</div>
        )}
      </div>

      <div className='btnRegistForm'>
        <CustomBtn
          onClick={registUser}
          disabled={!isRegistrationFormValid}
          loading={stateLoad}
        >
          Регистрация
        </CustomBtn>
        <CustomBtn onClick={handleCancel}>Отмена</CustomBtn>
      </div>
    </div>
  );
});

export default FormRegistration;