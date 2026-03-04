import React from 'react';
import { Row, Col, Spin, Alert } from 'antd';
import { observer } from 'mobx-react-lite';
import './listCards.scss';
import { catalogStore } from '../../store/catalogStore';
import ProductCard from '../productCard/ProductCard';

const ListCards: React.FC = observer(() => {
  const { loading, error, currentItems, selectedCategory } = catalogStore;

  if (loading) return <Spin size="large" className="loader" />;
  if (error) return <Alert message="Ошибка" description={error} type="error" showIcon />;
  if (!selectedCategory) return <div style={{ padding: 24 }}>Выберите категорию из каталога</div>;
  if (currentItems.length === 0) return <div style={{ padding: 24 }}>В этой категории пока нет товаров</div>;

  return (
    <div className="product-list">
      <h2>{selectedCategory}</h2>
      <Row gutter={[16, 16]}>
        {currentItems.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <ProductCard item={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
});

export default ListCards;