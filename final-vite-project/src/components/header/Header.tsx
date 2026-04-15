import { useState } from "react";
import { observer } from "mobx-react-lite";
import SearchInput from "../ui/input/searchInput/SearchInput";
import CatalogMenu from "../catalogmenu/CatalogMenu";
import "./header.scss";
import { authStore } from "../../store/indexStore";
import { Dropdown, Space, Button } from "antd";
import {
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import ProfileModal from "../profileModal/ProfileModal";
import { catalogStore } from "../../store/catalogStore";
import LogModal from "../logModal/LogModal";
import RegistModal from "../registModal/RegistModal";

const Header = observer(() => {
  const { user, setStateModal, logout } = authStore;
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [stateModalLogin, setStateModalLogin] = useState(false);
  const [stateModalRegistr, setStateModalRegistr] = useState(false);

  const onCatalogMenuClick: MenuProps["onClick"] = (e) => {
    catalogStore.setSelectedCategory(e.key);
    setCatalogOpen(false);
  };

  const menuProfile: MenuProps["items"] = [
    {
      key: "index-menu-profile-1",
      label: (
        <div
          className="user-menu-item"
          onClick={() => setStateModal("profile", true)}
        >
          <UserOutlined className="menu-icon" />
          <span>Профиль</span>
        </div>
      ),
    },
    {
      key: "index-menu-profile-2",
      label: (
        <div className="user-menu-item" onClick={logout}>
          <LogoutOutlined className="menu-icon" />
          <span>Выйти</span>
        </div>
      ),
    },
  ];

  const openRegistr = () => {
    setStateModalRegistr(true);
    setStateModalLogin(false);
  };

  return (
    <div className="header-div">
      <Dropdown
        trigger={["click"]}
        open={catalogOpen}
        onOpenChange={setCatalogOpen}
        overlayClassName="catalog-dropdown"
        popupRender={() => (
          <div className="catalog-dropdown-content">
            <CatalogMenu onClick={onCatalogMenuClick} />
          </div>
        )}
      >
        <Button
          className="catalog-button"
          type="primary"
          icon={<AppstoreOutlined />}
        >
          <Space>
            Каталог
            <DownOutlined
              className={`dropdown-arrow ${catalogOpen && "open"}`}
            />
          </Space>
        </Button>
      </Dropdown>
      <SearchInput />
      {user ? (
        <div className="user-section">
          {/* Десктопная версия */}
          <div className="desktop-user">
            <Dropdown
              placement="bottomRight"
              trigger={["click"]}
              menu={{ items: menuProfile }}
            >
              <p className="user-dropdown-trigger">
                <Space>
                  <span className="user-login">{user.login}</span>
                  <DownOutlined className="dropdown-arrow" />
                </Space>
              </p>
            </Dropdown>
          </div>
          <div className="headerBasketSvg" />
          {/* Мобильная версия для авторизованного пользователя */}
          <div className="mobile">
            <Dropdown
              menu={{ items: menuProfile }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div className="mobile-user-section">
                <div className="mobileOpen">
                  <UserOutlined />
                </div>
                <div className="mobile-login">{user.login}</div>
              </div>
            </Dropdown>
            <div className="mobileBasket">
              <ShoppingCartOutlined />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="headerOpenSvg"
            onClick={() => setStateModalLogin(true)}
          />
          <div className="headerBasketSvg" />
          <div className="mobile">
            <div
              className="mobileOpen"
              onClick={() => setStateModalLogin(true)}
            >
              <UserOutlined />
            </div>
            <div className="mobileBasket">
              <ShoppingCartOutlined />
            </div>
          </div>
        </>
      )}
      <ProfileModal />
      {stateModalLogin && (
        <LogModal
          closeModal={() => setStateModalLogin(false)}
          openRegistr={openRegistr}
        />
      )}
      {stateModalRegistr && <RegistModal />}
    </div>
  );
});

export default Header;
