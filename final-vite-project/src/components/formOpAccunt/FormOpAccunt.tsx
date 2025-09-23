import React, { useState } from 'react'
import LogInput from '../ui/input/logInput/LogInput'
import './FormOpAccunt.scss'
import Catalog from '../ui/button/catalog/Catalog'
import { postAuthorization } from '../../API/ShopServis'
import type { IFormOpAccuntProps, ILogin } from '../../interface/interface'

const FormOpAccunt: React.FC<IFormOpAccuntProps> = ({ openRegist }) => {
  const [logPasAuthor, useAuthor] = useState({ login: '', password: '' });
  const newAuthorization = async () => {
    const logAuthorization: ILogin = {
      login: logPasAuthor.login,
      password: logPasAuthor.password,
    }
    await postAuthorization(logAuthorization);
    useAuthor({login: '', password: ''});
  }
  return (
    <div className='mainForm'>
      <h2>Вход в аккаунт</h2>
      <LogInput
        placeholder='Логин'
        type='text'
        value={logPasAuthor.login}
        onChange={e => useAuthor({...logPasAuthor, login: e.target.value})} 
      />
      <LogInput
        placeholder='Пароль'
        type='password'
        value={logPasAuthor.password}
         onChange={e => useAuthor({...logPasAuthor, password: e.target.value})} 
      />
      <div className='btnForm'>
        <Catalog onClick={newAuthorization}>Войти</Catalog>
        <Catalog onClick={openRegist}>Регистрация</Catalog>
      </div>
    </div>
  )
}

export default FormOpAccunt
