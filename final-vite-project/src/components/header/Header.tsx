import React from 'react'
import { observer } from 'mobx-react-lite'
import Catalog from '../ui/button/catalog/Catalog'
import SearchInput from '../ui/input/searchInput/SearchInput'
import "./header.scss"
import { authStore } from '../../store/indexStore'

const Header = observer(() => {
  const { user, openLoginModal, logout } = authStore

  return (
    <div className="headerDiv">
      <Catalog>Каталог</Catalog>
      <SearchInput />
      
      {user ? (
        // Авторизованный пользователь
        <div className="user-section">
          <div className="desktop-user">
            <span className="user-login">👤 {user.login}</span>
            <button className="logout-btn" onClick={logout}>Выйти</button>
          </div>
          <div className="headerBasketSvg"></div>
          
          {/* Мобильная версия для авторизованного пользователя */}
          <div className="mobile">
            <div className="mobile-user-section">
              <div className="mobileOpen">👤</div>
              <div className="mobile-login">{user.login}</div>
            </div>
            <div className="mobileBasket">🛒</div>
          </div>
        </div>
      ) : (
        // Неавторизованный пользователь
        <>
          <div className="headerOpenSvg" onClick={openLoginModal}></div>
          <div className="headerBasketSvg"></div>
          <div className="mobile">
            <div className="mobileOpen" onClick={openLoginModal}>👤</div>
            <div className="mobileBasket">🛒</div>
          </div>
        </>
      )}
    </div>
  )
})

export default Header