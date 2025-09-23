import React, { useState } from 'react';
import LogInput from '../ui/input/logInput/LogInput';
import Catalog from '../ui/button/catalog/Catalog';
import './formRegistration.scss'
import { postRegistration } from '../../API/ShopServis'
import type { IFormRegistrationProps, IRegist } from '../../interface/interface';

const FormRegistration: React.FC<IFormRegistrationProps> = ({ onClose, openLogin }) => {
  const handleCancel = () => {
    onClose();
    openLogin();
  };
  const [useReg, registUser] = useState({ login: '', password: '', email: '', phone: '' });
  const newUserRegistration = async () => {
    const useRegistration: IRegist = {
      login: useReg.login,
      password: useReg.password,
      email: useReg.email,
      phone: useReg.phone,
    }
    await postRegistration(useRegistration);
    registUser({login: '', password: '', email: '', phone:''})
  }
  return (
    <div className='formRegistration'>
      <h2>Регистрация</h2>
      <LogInput placeholder='Логин' type='text' value={useReg.login} onChange={e => registUser({...useReg, login: e.target.value})}/>
      <LogInput placeholder='Пароль' type='password' value={useReg.password} onChange={e => registUser({...useReg, password: e.target.value})} />
      <LogInput placeholder='Повторите пароль' type='password' />
      <LogInput placeholder='email' type='text' value={useReg.email} onChange={e => registUser({...useReg, email: e.target.value})} />
      <LogInput placeholder='Телефон' type='number' value={useReg.phone} onChange={e => registUser({...useReg, phone: e.target.value})} />
      <div className='btnRegistForm'>
        <Catalog onClick={newUserRegistration}>Зарегистрировать</Catalog>
        <Catalog onClick={handleCancel}>Отмена</Catalog>
      </div>
    </div>
  )
};

export default FormRegistration;

