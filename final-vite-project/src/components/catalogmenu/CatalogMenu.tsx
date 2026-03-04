import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  AppstoreOutlined,
  PhoneOutlined,
  TabletOutlined,
  HeartOutlined,
  GiftOutlined,
  LaptopOutlined,
  HomeOutlined,
  CarOutlined,
  ToolOutlined,
  SkinOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import './catalogMenu.scss';
import type { Category } from '../../interface/interface';

interface CatalogMenuProps {
  onClick?: MenuProps['onClick'];
  style?: React.CSSProperties;
  mode?: 'vertical' | 'horizontal' | 'inline';
  className?: string;
  categories?: Category[]; 
}

// Соответствие иконок названиям категорий (опционально)
const iconMap: Record<string, React.ReactNode> = {
  Телефоны: <PhoneOutlined />,
  Планшеты: <TabletOutlined />,
  'Smart-часы': <HeartOutlined />,
  Аксесуары: <GiftOutlined />,
  Ноутбуки: <LaptopOutlined />,
  'Бытовая техника': <HomeOutlined />,
  Автотовары: <CarOutlined />,
  Инструменты: <ToolOutlined />,
  'Одежда и обувь': <SkinOutlined />,
  'Спорт и отдых': <TrophyOutlined />,
};

const CatalogMenu: React.FC<CatalogMenuProps> = ({
  onClick,
  style = { width: 280, maxHeight: '70vh', overflowY: 'auto' },
  mode = 'inline',
  className = '',
  categories = []
}) => {
  const categoryItems = categories.map(cat => ({
    key: cat.category,
    label: cat.category,
    icon: iconMap[cat.category] || <AppstoreOutlined />,
  }));
  const popularSection = [
    { type: 'divider' as const },
    {
      key: 'popular',
      label: 'Популярные категории',
      type: 'group' as const,
      children: [
        { key: 'bestsellers', label: 'Хиты продаж', icon: <HeartOutlined /> },
        { key: 'new_arrivals', label: 'Новинки', icon: <GiftOutlined /> },
        { key: 'discounts', label: 'Товары со скидкой', icon: <AppstoreOutlined /> },
      ],
    },
  ];

  const items: MenuProps['items'] = [...categoryItems, ...popularSection];

  return (
    <Menu
      onClick={onClick}
      style={style}
      mode={mode}
      items={items}
      className={`catalog-menu ${className}`}
    />
  );
};

export default CatalogMenu;