import React from 'react';
import LogInput from '../ui/input/logInput/LogInput';
import Catalog from '../ui/button/catalog/Catalog';
import './formRegistration.scss'
interface FormRegistrationProps {
  onClose: () => void;
  openLogin: () => void;
}
const FormRegistration: React.FC<FormRegistrationProps> = ({onClose, openLogin}) => {
  const handleCancel = () => {
    onClose();
    openLogin();
  };
return (
  <div className ='formRegistration'>
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