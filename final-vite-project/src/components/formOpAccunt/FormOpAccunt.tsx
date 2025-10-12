import React, { useState } from 'react'
import LogInput from '../ui/input/logInput/LogInput'
import './FormOpAccunt.scss'
import Catalog from '../ui/button/catalog/Catalog'
import { postAuthorization } from '../../API/ShopServis'
import type { IFormOpAccuntProps, ILogin } from '../../interface/interface'
import { notification } from 'antd';


const FormOpAccunt: React.FC<IFormOpAccuntProps> = ({ openRegist, onClose }) => {
  const [logPasAuthor, useAuthor] = useState({ login: '', password: '' });
  const [autLoading, setAutLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const isOpAccountValid = () => {
    const logAutor = logPasAuthor.login.length > 5 && logPasAuthor.login.length <= 15;
    const logPasword = logPasAuthor.password.length > 5 && logPasAuthor.password.length <= 15;
    let autorChek = false;
    if (logAutor && logPasword) {
      autorChek = true;
    }
    return autorChek
  }
  const newAuthorization = async () => {
    setAutLoading(true);
    try {
      const logAuthorization: ILogin = {
        login: logPasAuthor.login,
        password: logPasAuthor.password,
      }
      await postAuthorization(logAuthorization);
      api.success({
        message: 'Авторизация успешна!',
        description: 'Производим вход в аккаунт',
        placement: 'top',
        duration: 4,
      });
      useAuthor({ login: '', password: '' });
       setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      api.error({
        message: 'Ошибка автоизации',
        description: 'Не верный логин или пароль',
        placement: 'top',
        duration: 4,
      });
      console.error('Ошибка регистрации:', error);
    } finally {
      setAutLoading(false);
    }
  }
  return (
    <div className='mainForm'>
      {contextHolder}
      <h2>Вход в аккаунт</h2>
      <LogInput
        placeholder='Логин'
        type='text'
        value={logPasAuthor.login}
        onChange={e => useAuthor({ ...logPasAuthor, login: e.target.value })}
      />
      <LogInput
        placeholder='Пароль'
        type='password'
        value={logPasAuthor.password}
        onChange={e => useAuthor({ ...logPasAuthor, password: e.target.value })}
      />
      <div className='btnForm'>
        <Catalog
          onClick={newAuthorization}
          disabled={!isOpAccountValid() || autLoading} >
          {autLoading ? 'Вход...' : 'Войти'}</Catalog>
        <Catalog onClick={openRegist}>Регистрация</Catalog>
      </div>
    </div>
  )
}

export default FormOpAccunt
