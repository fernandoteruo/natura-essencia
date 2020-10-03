import React, { FC } from 'react';
import styled from 'styled-components';
import Price from '../../../components/checkout/Price';
import ChooseButton from '../../../components/checkout/ChooseButton';
import { Card, CardSection } from '../../../components/checkout/Card';
import List from '../../../components/checkout/List';
import { IProduct } from '../../../context/Checkout';

interface IProps {
  products: IProduct[];
  selectedProduct?: IProduct | null;
  onSelection: (product: IProduct) => void;
}

const Product = styled(Card)`
  height: 450px !important;

  @media ${({ theme: { screenWidth } }) => screenWidth.sm} {
    margin-left: 10px !important;
    margin-right: 10px !important;
  }
`;

const ProductImage = styled.img`
  max-height: 200px;
`;

const ProductCategory = styled(CardSection)`
  color: #b4b4b4 !important;
  font-size: 12px;
  font-weight: 300;
  height: 20px;
`;

const ProductName = styled(CardSection)`
  font-size: 18px;
  font-weight: 600;
  height: 50px;
`;

const ProductPrice = styled(CardSection)`
  margin-top: 15px;
  font-size: 11px;
  font-weight: 400;
  flex-direction: column;
  height: 60px;
`;

const ValueFrom = styled(CardSection)``;

const ListProducts: FC<IProps> = ({
  products,
  selectedProduct,
  onSelection,
}: IProps) => {
  const handleClick = (product: IProduct) => () => {
    onSelection(product);
  };

  return (
    <List>
      {products.map((product) => {
        const isSelected = product.id === selectedProduct?.id;
        return (
          <Product
            button
            onClick={handleClick(product)}
            key={product.id}
            selected={isSelected}
          >
            <ProductImage src={product.imageUrl} alt={product.name} />
            <ProductCategory>{product.category}</ProductCategory>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>
              <ValueFrom>A partir de</ValueFrom>
              <Price value={product.price} />
            </ProductPrice>
            <ChooseButton isSelected={isSelected}>
              {isSelected ? 'Selecionado' : 'Selecionar'}
            </ChooseButton>
          </Product>
        );
      })}
    </List>
  );
};

export default ListProducts;
