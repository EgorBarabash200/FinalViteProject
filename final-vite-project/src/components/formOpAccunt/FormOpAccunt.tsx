import React, { useState } from 'react'
import LogInput from '../ui/input/logInput/LogInput'
import './FormOpAccunt.scss'
import Catalog from '../ui/button/catalog/Catalog'
import { postAuthorization } from '../../API/ShopServis'
interface FormOpAccuntProps {
  openRegist: () => void;
}
const FormOpAccunt: React.FC<FormOpAccuntProps> = ({ openRegist }) => {
  const [logPasAuthor, author] = useState({ login: '', password: '' });
  const newAuthorization = async () => {
    const logAuthorization = {
      login: logPasAuthor.login,
      password: logPasAuthor.password,
    }
    await postAuthorization(logAuthorization);
  }
  return (
    <div className='mainForm'>
      <h2>Вход в аккаунт</h2>
      <LogInput placeholder='Логин' type='text' />
      <LogInput placeholder='Пароль' type='password' />
      <div className='btnForm'>
        <Catalog>Войти</Catalog>
        <Catalog onClick={openRegist}>Регистрация</Catalog>
      </div>
    </div>
  )
}

export default FormOpAccunt
