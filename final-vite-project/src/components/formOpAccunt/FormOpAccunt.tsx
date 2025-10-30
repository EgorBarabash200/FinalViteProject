import React from 'react';
import LogInput from '../ui/input/logInput/LogInput';
import './FormOpAccunt.scss';
import Catalog from '../ui/button/catalog/Catalog';
import { authStore } from '../../store/indexStore';
import { observer } from 'mobx-react-lite';
import { notification } from 'antd';

const FormOpAccunt: React.FC = observer(() => {
  const { 
    loginForm, 
    isLoading, 
    isLoginFormValid,
    setLoginForm,
    login,
    openRegistModal,
    closeModals
  } = authStore;

  const [api, contextHolder] = notification.useNotification();

  return (
    <div className='mainForm'>
      {contextHolder}
      <button className="close-button" onClick={closeModals}>×</button>
      <h2>Вход в аккаунт</h2>
      <LogInput
        placeholder='Логин'
        type='text'
        value={loginForm.login}
        onChange={e => setLoginForm('login', e.target.value)}
      />
      <LogInput
        placeholder='Пароль'
        type='password'
        value={loginForm.password}
        onChange={e => setLoginForm('password', e.target.value)}
      />
      <div className='btnForm'>
        <Catalog
          onClick={login}
          disabled={!isLoginFormValid || isLoading} >
          {isLoading ? 'Вход...' : 'Войти'}
        </Catalog>
        <Catalog onClick={openRegistModal}>Регистрация</Catalog>
      </div>
    </div>
  );
});

export default FormOpAccunt;