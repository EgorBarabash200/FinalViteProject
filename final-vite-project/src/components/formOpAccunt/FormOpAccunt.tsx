import React from 'react'
import LogInput from '../ui/input/logInput/LogInput'
import './FormOpAccunt.scss'
import Catalog from '../ui/button/catalog/Catalog'
const FormOpAccunt = () => {
  return (
    <div className='mainForm'>
      <LogInput placeholder='Логин' type='text' />
      <LogInput placeholder='Пароль' type='password' />
      <div className='btnForm'>
        <Catalog>Войти</Catalog>
        <Catalog>Регистрация</Catalog>
      </div>
    </div>
  )
}

export default FormOpAccunt
