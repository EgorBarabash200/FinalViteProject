import React from 'react';
import { Card, Button, Typography, Image } from 'antd';
import './ProductCard.scss';
import type { ProductCardProps } from '../../interface/interface';

const { Text } = Typography;

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    const inStock = item.inStock && item.quantity > 0;
    const imageUrl = item.image;
    return (
        <Card
            hoverable
            className="product-card"
            cover={
                <Image
                    src={imageUrl}
                    alt={item.name}
                    preview={false} 
                    fallback="/placeholder.png" 
                    className='img-card'
                />
            }
            actions={[
                <Button type="primary" disabled={!inStock}>
                    {inStock ? 'В корзину' : 'Нет в наличии'}
                </Button>
            ]}
        >
            <Card.Meta
                title={item.name}
                description={
                    <>
                        <div>Цена: {item.price.toLocaleString()} ₽</div>
                        {!inStock && <Text type="danger">Нет в наличии</Text>}
                    </>
                }
            />
        </Card>
    );
};

export default ProductCard;