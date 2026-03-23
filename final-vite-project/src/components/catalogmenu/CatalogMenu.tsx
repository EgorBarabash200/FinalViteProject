import React from 'react';
import { Menu } from 'antd';
import { observer } from "mobx-react-lite";
import type { MenuProps } from 'antd';
import './catalogMenu.scss';
import { catalogStore } from '../../store/catalogStore';

interface CatalogMenuProps {
  onClick?: MenuProps['onClick'];
  mode?: 'vertical' | 'horizontal' | 'inline';
  className?: string;
}

const CatalogMenu: React.FC<CatalogMenuProps> = observer(({
  onClick,
  mode = 'inline',
  className = ''
}) => {
  const items: MenuProps['items'] = catalogStore.dataCategoriesDropdown;

  return (
    <Menu
      onClick={onClick}
      mode={mode}
      items={items}
      className={`catalog-menu ${className}`}
    />
  );
});

export default CatalogMenu;  