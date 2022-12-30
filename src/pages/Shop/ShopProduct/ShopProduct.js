import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ShopProduct = () => {
  const navigate = useNavigate();
  const [shopProductList, setShopProductList] = useState([]);
  const obsTarget = useRef(null);

  const goToDetail = () => {
    navigate('/detail');
  };

  useEffect(() => {
    fetch('/data/productData.json')
      .then(res => res.json())
      .then(data => {
        setShopProductList(data);
      });
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(entry => {
      const target = entry[0];
      if (target.isIntersecting) {
        fetch('/data/productData.json')
          .then(res => res.json())
          .then(result => {
            setShopProductList(prev => [...prev, ...result]);
          });
      }
    });
    if (obsTarget.current) {
      io.observe(obsTarget.current);
    }
    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <ShopProductWrapper>
      <ProductSortSelectBox>
        <ProductSortSelect>
          {SHOP_SELECT_SORT.map(({ id, value, title }) => (
            <option key={id} value={value}>
              {title}
            </option>
          ))}
        </ProductSortSelect>
      </ProductSortSelectBox>
      <ShopProductList>
        {shopProductList.map(product => {
          const {
            id,
            thumbnailImageUrl,
            enName,
            krName,
            brandName,
            price: _price,
          } = product;
          const price = _price.toLocaleString();

          return (
            <ShopProductBox key={id} className="list">
              <ShopProductThumb>
                <img
                  src={thumbnailImageUrl}
                  alt={enName}
                  onClick={goToDetail}
                />
              </ShopProductThumb>
              <ShopProductBrandTitle>{brandName}</ShopProductBrandTitle>
              <ShopProductTitle>
                <h3>{enName}</h3>
                <h4>{krName}</h4>
              </ShopProductTitle>
              <ShopProductPrice>{price}원</ShopProductPrice>
              <ShopProductCurrentPrice>즉시 구매가</ShopProductCurrentPrice>
            </ShopProductBox>
          );
        })}
      </ShopProductList>
      <ProductObserverTarget ref={obsTarget}>Observer</ProductObserverTarget>
    </ShopProductWrapper>
  );
};

export default ShopProduct;

const ShopProductWrapper = styled.div`
  width: 100%;
`;

const ProductSortSelectBox = styled.div`
  width: 100px;
  position: absolute;
  right: 185px;
  border: 1px solid ${({ theme }) => theme.mainBrandGray05};
`;

const ProductSortSelect = styled.select`
  width: 100%;
  height: 100%;
  padding: 5px 6px;
  border: 0;
  outline: none;
`;

const ShopProductList = styled.div`
  width: 100%;
  padding-top: 50px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ShopProductBox = styled.div`
  width: 250px;
  margin-bottom: 20px;
`;

const ShopProductThumb = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    object-position: 0px -30px;
    cursor: pointer;
  }
`;

const ShopProductBrandTitle = styled.h3`
  margin: 10px 8px;
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.mainBrandBlack};
  border-bottom: 2px solid ${({ theme }) => theme.mainBrandBlack};
`;

const ShopProductTitle = styled.div`
  margin: 0px 8px;
  color: ${({ theme }) => theme.mainBrandGray08};
  font-size: 14px;
  line-height: 17px;

  h3 {
    font-size: 14px;
  }

  h4 {
    font-size: 12px;
    color: ${({ theme }) => theme.mainBrandGray05};
  }
`;

const ShopProductPrice = styled.p`
  margin: 12px 0px 0px 8px;
  font-size: 16px;
  font-weight: bold;
`;

const ShopProductCurrentPrice = styled.p`
  margin: 5px 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.mainBrandGray05};
`;

const ProductObserverTarget = styled.div`
  width: 100%;
  height: 300px;
`;

const SHOP_SELECT_SORT = [
  {
    id: 1,
    value: 'popular',
    title: '인기순',
  },
  {
    id: 2,
    value: 'premium',
    title: '프리미엄순',
  },
  {
    id: 3,
    value: 'latest',
    title: '발매일순',
  },
];
