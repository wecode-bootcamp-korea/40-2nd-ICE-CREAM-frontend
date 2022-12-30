import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MainProduct = () => {
  const navigate = useNavigate();
  const [mainProductList, setMainProductList] = useState([]);
  const obsTarget = useRef(null);

  const goToShop = () => {
    navigate('/shop');
  };

  useEffect(() => {
    fetch('/data/productData.json')
      .then(res => res.json())
      .then(data => {
        setMainProductList(data);
      });
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(entry => {
      const target = entry[0];
      if (target.isIntersecting) {
        fetch('/data/productData.json')
          .then(res => res.json())
          .then(result => {
            setMainProductList(prev => [...prev, ...result]);
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
    <MainProductWrapper>
      {mainProductList.map(product => {
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
          <MainProductBox key={id}>
            <MainProductThumb>
              <img src={thumbnailImageUrl} alt={enName} onClick={goToShop} />
            </MainProductThumb>
            <MainProductBrandTitle>{brandName}</MainProductBrandTitle>
            <MainProductTitle>
              <h3>{enName}</h3>
              <h4>{krName}</h4>
            </MainProductTitle>
            <MainProductPrice>{price}원</MainProductPrice>
            <MainProductCurrentPrice>즉시 구매가</MainProductCurrentPrice>
          </MainProductBox>
        );
      })}
      <ProductObserverTarget ref={obsTarget}>Observer</ProductObserverTarget>
    </MainProductWrapper>
  );
};

export default MainProduct;

const MainProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 80px;
`;

const MainProductBox = styled.div`
  width: 250px;
  margin: 40px 0px;
`;

const MainProductThumb = styled.div`
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

const MainProductBrandTitle = styled.div`
  margin: 10px 8px;
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.mainBrandBlack};
  border-bottom: 2px solid ${({ theme }) => theme.mainBrandBlack};
`;

const MainProductTitle = styled.div`
  margin: 0px 8px;
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

const MainProductPrice = styled.p`
  margin: 12px 0px 0px 8px;
  font-size: 16px;
  font-weight: bold;
`;

const MainProductCurrentPrice = styled.p`
  margin: 5px 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.mainBrandGray05};
`;

const ProductObserverTarget = styled.div`
  width: 100%;
  height: 300px;
`;
