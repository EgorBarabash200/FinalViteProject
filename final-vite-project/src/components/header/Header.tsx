import { useState } from 'react';
import { observer } from 'mobx-react-lite'
import SearchInput from '../ui/input/searchInput/SearchInput'
import CatalogMenu from '../catalogmenu/CatalogMenu'
import "./header.scss"
import { authStore } from '../../store/indexStore'
import { Dropdown, Space, Button } from 'antd'
import { DownOutlined, UserOutlined, LogoutOutlined, AppstoreOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import ProfileModal from '../profileModal/ProfileModal'


const Header = observer(() => {
  const { user, openLoginModal, logout, openProfileModal } = authStore;
  const [catalogOpen, setCatalogOpen] = useState(false);

  const onCatalogMenuClick: MenuProps['onClick'] = (e) => {
    console.log('Клик по пункту каталога: ', e);
    setCatalogOpen(false);
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="user-menu-item" onClick={openProfileModal}>
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

      <Dropdown
        dropdownRender={() => (
          <div className="catalog-dropdown-content">
            <CatalogMenu
              onClick={onCatalogMenuClick}
              style={{ width: 320, maxHeight: '75vh' }}
            />
          </div>
        )}
        trigger={['click']}
        placement="bottomLeft"
        onOpenChange={setCatalogOpen}
        open={catalogOpen}
        overlayClassName="catalog-dropdown"
        overlayStyle={{
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
          borderRadius: '8px'
        }}
      >
        <Button
          type="primary"
          className="catalog-button"
          icon={<AppstoreOutlined />}
        >
          <Space>
            Каталог
            <DownOutlined className={`dropdown-arrow ${catalogOpen ? 'open' : ''}`} />
          </Space>
        </Button>
      </Dropdown>

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
      <ProfileModal />
    </div>
  )
})

export default Header