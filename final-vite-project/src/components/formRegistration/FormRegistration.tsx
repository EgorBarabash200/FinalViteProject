import React, { useState } from 'react';
import LogInput from '../ui/input/logInput/LogInput';
import Catalog from '../ui/button/catalog/Catalog';
import './formRegistration.scss'
import { postRegistration } from '../../API/ShopServis'
interface FormRegistrationProps {
  onClose: () => void;
  openLogin: () => void;
}
const FormRegistration: React.FC<FormRegistrationProps> = ({ onClose, openLogin }) => {
  const handleCancel = () => {
    onClose();
    openLogin();
  };
  const [useReg, registUser] = useState({ login: '', password: '', email: '', phone: '' });
  const newUserRegistration = async () => {
    const useRegistration = {
      login: useReg.login,
      password: useReg.password,
      email: useReg.email,
      phone: useReg.phone,
    }
    await postRegistration(useRegistration);
  }
  return (
    <div className='formRegistration'>
      <h2>Регистрация</h2>
      <LogInput placeholder='Логин' type='text' />
      <LogInput placeholder='Пароль' type='password' />
      <LogInput placeholder='Повторите пароль' type='password' />
      <LogInput placeholder='email' type='text' />
      <LogInput placeholder='Телефон' type='number' />
      <div className='btnRegistForm'>
        <Catalog>Зарегистрировать</Catalog>
        <Catalog onClick={handleCancel}>Отмена</Catalog>
      </div>
    </div>
  )
};

export default FormRegistration;