import LogInput from '../ui/input/logInput/LogInput';
import './formRegistration.scss';
import { authStore } from '../../store/indexStore';
import { observer } from 'mobx-react-lite';
import { notification } from 'antd';
import CustomBtn from '../ui/button/customBtn/CustomBtn';

const FormRegistration: React.FC = observer(() => {
  const {
    registrationForm,
    repeatPassword,
    stateCheckLogin,
    emailError,
    isLoading,
    isRegistrationFormValid,
    passwordsMatch,
    setRegistrationForm,
    setRepeatPassword,
    checkLoginAvailability,
    validateEmail,
    register,
    closeModals,
    openLoginModal
  } = authStore;

  const [api, contextHolder] = notification.useNotification();

  const handleCancel = () => {
    closeModals();
    openLoginModal();
  };

  return (
    <div className='formRegistration'>
      {contextHolder}
      <button className="close-button" onClick={closeModals}>×</button>
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
          onChange={e => validateEmail(e.target.value)}
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
          type='number'
          value={registrationForm.phone}
          onChange={e => setRegistrationForm('phone', e.target.value)}
        />
        {registrationForm.phone.length === 11 && (
          <div className="validation-message success">✓</div>
        )}
      </div>

      <div className='btnRegistForm'>
        <CustomBtn
          onClick={register}
          disabled={!isRegistrationFormValid || isLoading}
        >
          {isLoading ? 'Регистрация...' : 'Зарегистрировать'}
        </CustomBtn>
        <CustomBtn onClick={handleCancel}>Отмена</CustomBtn>
      </div>
    </div>
  );
});

export default FormRegistration;