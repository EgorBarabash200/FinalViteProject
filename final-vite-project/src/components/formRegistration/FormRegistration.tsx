import React, { useState } from 'react';
import LogInput from '../ui/input/logInput/LogInput';
import Catalog from '../ui/button/catalog/Catalog';
import './formRegistration.scss'
import { checkLogin, postRegistration } from '../../API/ShopServis'
import type { IFormRegistrationProps, IRegist } from '../../interface/interface';

const FormRegistration: React.FC<IFormRegistrationProps> = ({ onClose, openLogin }) => {
  const handleCancel = () => {
    onClose();
    openLogin();
  };
  const [useReg, registUser] = useState({ login: '', password: '', email: '', phone: '' });
  const [repeatPassword, setRepeatPassword] = useState('');
  const [stateCheckLogin, setStateCheckLogin] = useState(false);
  const [emailError, setEmailError] = useState('');
  const newUserRegistration = async () => {
    const useRegistration: IRegist = {
      login: useReg.login,
      password: useReg.password,
      email: useReg.email,
      phone: useReg.phone,
    }
    await postRegistration(useRegistration);
    registUser({ login: '', password: '', email: '', phone: '' })
  }

  const CheckLoginRegist = async (event: string) => {
    registUser({ ...useReg, login: event });
    const res = await checkLogin(event);
    if (res) {
      setStateCheckLogin(res.result)
    }
  }

  const CheckEmailRegist = (event: string) => {
    registUser({ ...useReg, email: event })
    if (event.length > 20) {
      setEmailError('Email не должен превышать 20 символов');
      return;
    }
    if (event.length > 0) {
      if (!event.includes('@yandex.ru') && !event.includes('@mail.com')) {
        setEmailError('Email должен содержать @yandex.ru или @mail.com');
        return;
      }
      if (event.includes('@yandex.ru') && !event.endsWith('@yandex.ru')) {
        setEmailError('Email должен оканчиваться на @yandex.ru');
        return;
      }
      if (event.includes('@mail.com') && !event.endsWith('@mail.com')) {
        setEmailError('Email должен оканчиваться на @mail.com');
        return;
      }
      setEmailError('');
    }
  }
  const passwordsMatch = useReg.password === repeatPassword;

  return (
    <div className='formRegistration'>
      <h2>Регистрация</h2>
      <div className="input-field">
        <LogInput
          placeholder='Логин'
          type='text'
          value={useReg.login}
          onChange={(e) => CheckLoginRegist(e.target.value)}
        />
        {useReg.login.length >= 5 && useReg.login.length <= 15 && (
          <div className={`validation-message ${stateCheckLogin ? 'error' : 'success'}`}>
            {stateCheckLogin ? 'Логин занят' : '✓'}
          </div>
        )}
      </div>
      <div className="input-field">
        <LogInput
          placeholder='Пароль'
          type='password'
          value={useReg.password}
          onChange={e => registUser({ ...useReg, password: e.target.value })}
        />
         {useReg.password.length >= 5 && useReg.password.length <= 15 && (
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
         {repeatPassword.length >= 5 && repeatPassword.length <= 15 && (
          <div className={`validation-message ${passwordsMatch ? 'success' : 'error'}`}>
            {passwordsMatch ? '✓' : 'Пароли не совпадают'}
          </div>
        )}
      </div>
      <div className="input-field">
        <LogInput
          placeholder='email'
          type='text'
          value={useReg.email}
          onChange={e => CheckEmailRegist(e.target.value)}
        />
         {useReg.email.length > 0 && (
          <div className={`validation-message ${emailError ? 'error' : 'success'}`}>
            {emailError ? emailError : '✓'}
          </div>
        )}
      </div>
      <div className="input-field">
        <LogInput
          placeholder='Телефон'
          type='number' value={useReg.phone}
          onChange={e => registUser({ ...useReg, phone: e.target.value })}
        />
        {useReg.phone.length === 11 && (
          <div className="validation-message success">✓</div>
        )}
      </div>
      <div className='btnRegistForm'>
        <Catalog onClick={newUserRegistration}>Зарегистрировать</Catalog>
        <Catalog onClick={handleCancel}>Отмена</Catalog>
      </div>
    </div>
  )
}
export default FormRegistration;
