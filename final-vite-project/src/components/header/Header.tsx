import { observer } from 'mobx-react-lite'
import CustomBtn from '../ui/button/customBtn/CustomBtn'
import SearchInput from '../ui/input/searchInput/SearchInput'
import "./header.scss"
import { authStore } from '../../store/indexStore'
import { Dropdown, Space } from 'antd'
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

const Header = observer(() => {
  const { user, openLoginModal, logout } = authStore
  const userMenuItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="user-menu-item">
          <UserOutlined className="menu-icon" />
          <span>Профиль</span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="user-menu-item" onClick={logout}>
          <LogoutOutlined className="menu-icon" />
          <span>Выйти</span>
        </div>
      ),
    },
  ]

  return (
    <div className="headerDiv">
      <CustomBtn>Каталог</CustomBtn>
      <SearchInput />

      {user ? (
        <div className="user-section">
          {/* Десктопная версия */}
          <div className="desktop-user">
            <Dropdown 
              menu={{ items: userMenuItems }} 
              placement="bottomRight"
              trigger={['click']}
            >
              <a onClick={(e) => e.preventDefault()} className="user-dropdown-trigger">
                <Space>
                  <span className="user-login">👤 {user.login}</span>
                  <DownOutlined className="dropdown-arrow" />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="headerBasketSvg"></div>

          {/* Мобильная версия для авторизованного пользователя */}
          <div className="mobile">
            <Dropdown 
              menu={{ items: userMenuItems }} 
              placement="bottomRight"
              trigger={['click']}
            >
              <div className="mobile-user-section">
                <div className="mobileOpen">👤</div>
                <div className="mobile-login">{user.login}</div>
              </div>
            </Dropdown>
            <div className="mobileBasket">🛒</div>
          </div>
        </div>
      ) : (
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