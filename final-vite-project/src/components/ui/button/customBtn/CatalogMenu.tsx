import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { 
  AppstoreOutlined, 
  LaptopOutlined, 
  PhoneOutlined, 
  HomeOutlined,
  SkinOutlined, 
  CarOutlined,
  GiftOutlined,
  ToolOutlined
} from '@ant-design/icons';

interface CatalogMenuProps {
  onClick?: MenuProps['onClick'];
  style?: React.CSSProperties;
  mode?: 'vertical' | 'horizontal' | 'inline';
}

const CatalogMenu: React.FC<CatalogMenuProps> = ({ 
  onClick, 
  style = { width: 300 },
  mode = 'inline'
}) => {
  const items: MenuProps['items'] = [
    {
      key: 'electronics',
      label: 'Электроника',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: 'smartphones',
          label: 'Смартфоны и гаджеты',
          icon: <PhoneOutlined />,
          children: [
            { key: 'smartphones_all', label: 'Смартфоны' },
            { key: 'tablets', label: 'Планшеты' },
            { key: 'smart_watches', label: 'Умные часы' },
            { key: 'headphones', label: 'Наушники' },
          ],
        },
        {
          key: 'computers',
          label: 'Компьютеры и ноутбуки',
          icon: <LaptopOutlined />,
          children: [
            { key: 'laptops', label: 'Ноутбуки' },
            { key: 'desktops', label: 'Системные блоки' },
            { key: 'monitors', label: 'Мониторы' },
            { key: 'components', label: 'Комплектующие' },
          ],
        },
        {
          key: 'tv_audio',
          label: 'Телевизоры и аудио',
          icon: <HomeOutlined />,
          children: [
            { key: 'tvs', label: 'Телевизоры' },
            { key: 'soundbars', label: 'Саундбары' },
            { key: 'speakers', label: 'Колонки' },
          ],
        },
      ],
    },
    {
      key: 'appliances',
      label: 'Бытовая техника',
      icon: <HomeOutlined />,
      children: [
        { key: 'refrigerators', label: 'Холодильники' },
        { key: 'washing_machines', label: 'Стиральные машины' },
        { key: 'vacuum_cleaners', label: 'Пылесосы' },
        {
          key: 'kitchen_appliances',
          label: 'Кухонная техника',
          children: [
            { key: 'microwaves', label: 'Микроволновки' },
            { key: 'coffee_machines', label: 'Кофеварки' },
            { key: 'blenders', label: 'Блендеры' },
            { key: 'multicookers', label: 'Мультиварки' },
          ],
        },
      ],
    },
    {
      key: 'clothing',
      label: 'Одежда и обувь',
      icon: <SkinOutlined />,
      children: [
        { key: 'mens_clothing', label: 'Мужская одежда' },
        { key: 'womens_clothing', label: 'Женская одежда' },
        { key: 'kids_clothing', label: 'Детская одежда' },
        { key: 'shoes', label: 'Обувь' },
        { key: 'accessories', label: 'Аксессуары' },
      ],
    },
    {
      key: 'auto',
      label: 'Автотовары',
      icon: <CarOutlined />,
      children: [
        { key: 'tires', label: 'Шины и диски' },
        { key: 'oils', label: 'Масла и автохимия' },
        { key: 'accessories_auto', label: 'Аксессуары' },
        { key: 'electronics_auto', label: 'Автоэлектроника' },
      ],
    },
    {
      key: 'home_garden',
      label: 'Дом и сад',
      icon: <HomeOutlined />,
      children: [
        { key: 'furniture', label: 'Мебель' },
        { key: 'textiles', label: 'Текстиль' },
        { key: 'lighting', label: 'Освещение' },
        { key: 'garden_tools', label: 'Садовая техника' },
      ],
    },
    {
      key: 'sports',
      label: 'Спорт и отдых',
      icon: <GiftOutlined />,
      children: [
        { key: 'fitness', label: 'Фитнес' },
        { key: 'tourism', label: 'Туризм' },
        { key: 'cycling', label: 'Велоспорт' },
        { key: 'winter_sports', label: 'Зимние виды' },
      ],
    },
    {
      key: 'tools',
      label: 'Инструменты',
      icon: <ToolOutlined />,
      children: [
        { key: 'power_tools', label: 'Электроинструменты' },
        { key: 'hand_tools', label: 'Ручные инструменты' },
        { key: 'measuring', label: 'Измерительные' },
        { key: 'garden_tools2', label: 'Садовая техника' },
      ],
    },
  ];

  return (
    <Menu
      onClick={onClick}
      style={style}
      mode={mode}
      items={items}
      defaultOpenKeys={['electronics', 'appliances']}
      defaultSelectedKeys={['smartphones_all']}
      className="catalog-menu"
    />
  );
};

export default CatalogMenu;