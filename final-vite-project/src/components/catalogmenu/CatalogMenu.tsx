import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import './catalogMenu.scss'
import {
  AppstoreOutlined,
  LaptopOutlined,
  PhoneOutlined,
  HomeOutlined,
  CarOutlined,
  GiftOutlined,
  ToolOutlined,
  ShoppingOutlined,
  HeartOutlined,
  TabletOutlined,
  AudioOutlined,
  CameraOutlined,
  WifiOutlined,
  UsbOutlined,
  SkinOutlined,
  TrophyOutlined
} from '@ant-design/icons';

interface CatalogMenuProps {
  onClick?: MenuProps['onClick'];
  style?: React.CSSProperties;
  mode?: 'vertical' | 'horizontal' | 'inline';
  className?: string;
}

const CatalogMenu: React.FC<CatalogMenuProps> = ({
  onClick,
  style = { width: 280, maxHeight: '70vh', overflowY: 'auto' },
  mode = 'inline',
  className = ''
}) => {
  const items: MenuProps['items'] = [
    {
      key: 'electronics',
      label: 'Электроника',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: 'g1',
          label: 'Смартфоны и гаджеты',
          type: 'group',
          children: [
            { key: 'smartphones', label: 'Смартфоны', icon: <PhoneOutlined /> },
            { key: 'tablets', label: 'Планшеты', icon: <TabletOutlined /> },
            { key: 'smart_watches', label: 'Умные часы' },
            { key: 'headphones', label: 'Наушники', icon: <AudioOutlined /> },
            { key: 'gadgets', label: 'Гаджеты' },
          ],
        },
        {
          key: 'g2',
          label: 'Компьютеры и ноутбуки',
          type: 'group',
          children: [
            { key: 'laptops', label: 'Ноутбуки', icon: <LaptopOutlined /> },
            { key: 'desktops', label: 'Системные блоки' },
            { key: 'monitors', label: 'Мониторы' },
            { key: 'components', label: 'Комплектующие' },
            { key: 'peripherals', label: 'Периферия', icon: <UsbOutlined /> },
          ],
        },
        {
          key: 'g3',
          label: 'ТВ, Аудио, Видео',
          type: 'group',
          children: [
            { key: 'tvs', label: 'Телевизоры' },
            { key: 'projectors', label: 'Проекторы' },
            { key: 'soundbars', label: 'Саундбары' },
            { key: 'speakers', label: 'Колонки', icon: <AudioOutlined /> },
            { key: 'home_cinema', label: 'Домашние кинотеатры' },
          ],
        },
        {
          key: 'g4',
          label: 'Фото и видео',
          type: 'group',
          children: [
            { key: 'cameras', label: 'Фотоаппараты', icon: <CameraOutlined /> },
            { key: 'lenses', label: 'Объективы' },
            { key: 'action_cameras', label: 'Экшн-камеры' },
            { key: 'drones', label: 'Квадрокоптеры' },
          ],
        },
      ],
    },
    {
      key: 'appliances',
      label: 'Бытовая техника',
      icon: <HomeOutlined />,
      children: [
        {
          key: 'g5',
          label: 'Крупная техника',
          type: 'group',
          children: [
            { key: 'refrigerators', label: 'Холодильники' },
            { key: 'washing_machines', label: 'Стиральные машины' },
            { key: 'dishwashers', label: 'Посудомоечные машины' },
            { key: 'cookers', label: 'Плиты и духовки' },
          ],
        },
        {
          key: 'g6',
          label: 'Климатическая техника',
          type: 'group',
          children: [
            { key: 'conditioners', label: 'Кондиционеры' },
            { key: 'heaters', label: 'Обогреватели' },
            { key: 'humidifiers', label: 'Увлажнители' },
            { key: 'air_purifiers', label: 'Очистители воздуха' },
          ],
        },
        {
          key: 'kitchen_appliances',
          label: 'Кухонная техника',
          children: [
            { key: 'microwaves', label: 'Микроволновки' },
            { key: 'coffee_machines', label: 'Кофеварки' },
            { key: 'blenders', label: 'Блендеры' },
            { key: 'multicookers', label: 'Мультиварки' },
            { key: 'meat_grinders', label: 'Мясорубки' },
            { key: 'food_processors', label: 'Кухонные комбайны' },
          ],
        },
        {
          key: 'cleaning',
          label: 'Уборка',
          children: [
            { key: 'vacuum_cleaners', label: 'Пылесосы' },
            { key: 'robot_vacuums', label: 'Роботы-пылесосы' },
            { key: 'steam_cleaners', label: 'Пароочистители' },
            { key: 'washing_vacuums', label: 'Мойщики окон' },
          ],
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'clothing',
      label: 'Одежда и обувь',
      icon: <SkinOutlined />,
      children: [
        {
          key: 'g7',
          label: 'Мужская одежда',
          type: 'group',
          children: [
            { key: 'mens_tops', label: 'Верхняя одежда' },
            { key: 'mens_pants', label: 'Брюки и джинсы' },
            { key: 'mens_shirts', label: 'Рубашки' },
            { key: 'mens_underwear', label: 'Нижнее белье' },
          ],
        },
        {
          key: 'g8',
          label: 'Женская одежда',
          type: 'group',
          children: [
            { key: 'womens_dresses', label: 'Платья и юбки' },
            { key: 'womens_tops', label: 'Блузки и футболки' },
            { key: 'womens_pants', label: 'Брюки и джинсы' },
            { key: 'womens_underwear', label: 'Нижнее белье' },
          ],
        },
        {
          key: 'shoes',
          label: 'Обувь',
          children: [
            { key: 'mens_shoes', label: 'Мужская обувь' },
            { key: 'womens_shoes', label: 'Женская обувь' },
            { key: 'kids_shoes', label: 'Детская обувь' },
            { key: 'sport_shoes', label: 'Спортивная обувь' },
          ],
        },
        {
          key: 'accessories',
          label: 'Аксессуары',
          children: [
            { key: 'bags', label: 'Сумки и рюкзаки' },
            { key: 'belts', label: 'Ремни' },
            { key: 'hats', label: 'Головные уборы' },
            { key: 'jewelry', label: 'Бижутерия' },
          ],
        },
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
        { key: 'tools_auto', label: 'Автоинструменты' },
        { key: 'car_care', label: 'Уход за авто' },
      ],
    },
    {
      key: 'sports',
      label: 'Спорт и отдых',
      icon: <TrophyOutlined />,
      children: [
        { key: 'fitness', label: 'Фитнес' },
        { key: 'tourism', label: 'Туризм' },
        { key: 'cycling', label: 'Велоспорт' },
        { key: 'winter_sports', label: 'Зимние виды' },
        { key: 'team_sports', label: 'Командные виды' },
        { key: 'water_sports', label: 'Водные виды' },
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
        { key: 'garden_tools', label: 'Садовая техника' },
        { key: 'welding', label: 'Сварочное оборудование' },
        { key: 'compressors', label: 'Компрессоры' },
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
        { key: 'decor', label: 'Декор' },
        { key: 'garden', label: 'Сад' },
        { key: 'kitchenware', label: 'Посуда и кухонные принадлежности' },
      ],
    },
    {
      key: 'children',
      label: 'Детские товары',
      icon: <GiftOutlined />,
      children: [
        { key: 'toys', label: 'Игрушки' },
        { key: 'strollers', label: 'Коляски' },
        { key: 'children_furniture', label: 'Детская мебель' },
        { key: 'care_products', label: 'Средства по уходу' },
        { key: 'education', label: 'Развивающие игры' },
      ],
    },
    {
      key: 'beauty_health',
      label: 'Красота и здоровье',
      icon: <HeartOutlined />,
      children: [
        { key: 'cosmetics', label: 'Косметика' },
        { key: 'perfume', label: 'Парфюмерия' },
        { key: 'hair_care', label: 'Уход за волосами' },
        { key: 'skin_care', label: 'Уход за кожей' },
        { key: 'health', label: 'Здоровье' },
        { key: 'hygiene', label: 'Гигиена' },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'popular',
      label: 'Популярные категории',
      type: 'group',
      children: [
        { key: 'bestsellers', label: 'Хиты продаж', icon: <HeartOutlined /> },
        { key: 'new_arrivals', label: 'Новинки', icon: <GiftOutlined /> },
        { key: 'discounts', label: 'Товары со скидкой' },
        { key: 'preorder', label: 'Предзаказ' },
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
      defaultSelectedKeys={['smartphones']}
      className={`catalog-menu ${className}`}
    />
  );
};

export default CatalogMenu;