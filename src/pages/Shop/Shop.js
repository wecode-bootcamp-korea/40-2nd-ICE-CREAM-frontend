import React, { useState, useEffect } from 'react';
import ShopProduct from './ShopProduct/ShopProduct';
import styled from 'styled-components';

const Shop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  const onClickGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const isTop = window.scrollY < 500;
      setIsScroll(!isTop);
    });
  }, []);

  const onClickCategory = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ShopWrapper>
      <ShopAsideBox>
        <AsideTitle>필터</AsideTitle>
        {SHOP_CATEGORY.map(({ id, title, subTitle, subCategory }) => {
          return (
            <>
              <AsideCategoryListBox key={id}>
                <AsideCategoryTitleBox>
                  <AsideCategoryTitle>{title}</AsideCategoryTitle>
                  <AsideCategorySubTitle>{subTitle}</AsideCategorySubTitle>
                </AsideCategoryTitleBox>
                <AsidePlusBtn onClick={onClickCategory}>+</AsidePlusBtn>
              </AsideCategoryListBox>
              <AsideOpenCategoryList
                key={subCategory.id}
                subCategory={subCategory}
                className={`${isOpen ? '' : 'open'}`}
              >
                {subCategory.map(({ subId, text }) => {
                  return (
                    <AsideOpenCategoryItem key={subId}>
                      <AsideOpenCategoryInput id="option" type="checkbox" />
                      <AsideOpenCategoryLabel htmlFor="option">
                        {text}
                      </AsideOpenCategoryLabel>
                    </AsideOpenCategoryItem>
                  );
                })}
              </AsideOpenCategoryList>
            </>
          );
        })}
      </ShopAsideBox>
      <ShopProduct />
      {isScroll && <AtTheTop onClick={onClickGoToTop}>&#8593;</AtTheTop>}
    </ShopWrapper>
  );
};

export default Shop;

const ShopWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 131px 40px 80px;
`;

const ShopAsideBox = styled.div`
  width: 20%;
  margin-right: 30px;
`;

const AsideTitle = styled.h1`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const AsideCategoryListBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${({ theme }) => theme.globalBoardStyle};
`;

const AsideCategoryTitleBox = styled.div`
  padding: 20px 0px;
`;

const AsideCategoryTitle = styled.h2`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const AsideCategorySubTitle = styled.h3`
  font-size: 13px;
  color: ${({ theme }) => theme.mainBrandGray05};
`;

const AsidePlusBtn = styled.span`
  font-size: 25px;
  font-weight: lighter;
  cursor: pointer;
  color: ${({ theme }) => theme.mainBrandGray05};
`;

const AsideOpenCategoryList = styled.ul`
  border-bottom: ${({ theme }) => theme.globalBoardStyle};
  max-height: 540px;
  overflow: hidden;
  transition: max-height ease-in-out 2s 0s;

  &.open {
    max-height: 0px;
  }
`;

const AsideOpenCategoryItem = styled.li``;

const AsideOpenCategoryInput = styled.input`
  &[id='option'] {
    position: relative;
    top: 1.5px;
  }
`;

const AsideOpenCategoryLabel = styled.label`
  font-size: 13px;
  margin-left: 3px;
  color: ${({ theme }) => theme.mainBrandGray05};
  line-height: 26px;
`;

const AtTheTop = styled.div`
  width: 45px;
  height: 45px;
  position: fixed;
  right: 80px;
  bottom: 50px;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  border: 1px solid ${({ theme }) => theme.mainBrandBlack};
  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.mainBrandBlack};
    color: white;
  }
`;

const CATEGORY_FILTER = {
  category: '카테고리',
  desc: '모든 카테고리',
  subCategory: [
    { id: 1, title: 'shoes', text: '신발' },
    { id: 2, title: 'cloth', text: '의류' },
    { id: 3, title: 'goods', text: '패션잡화' },
  ],
};

const GENDER_FILTER = {
  title: '성별',
  subTitle: '모든 성별',
  subCategory: [
    { id: 1, title: 'men', text: '남성' },
    { id: 2, title: 'women', text: '여성' },
  ],
};

const SHOES_FILTER = {
  id: 3,
  title: '신발 사이즈',
  subTitle: '모든 사이즈',
  subCategory: [
    { id: 1, text: 230 },
    { id: 2, text: 240 },
    { id: 3, text: 250 },
    { id: 4, text: 260 },
    { id: 5, text: 270 },
    { id: 6, text: 280 },
  ],
};

const CLOTHING_FILTER = {
  id: 4,
  title: '의류 사이즈',
  subTitle: '모든 사이즈',
  subCategory: [
    { id: 1, text: 'S' },
    { id: 2, text: 'M' },
    { id: 3, text: 'L' },
    { id: 4, text: 'XL' },
  ],
};

const PRICE_FILTER = {
  id: 5,
  title: '가격',
  subTitle: '모든 가격',
  subCategory: [
    { id: 1, text: '10만원 이하' },
    { id: 2, text: '10만원 - 30만원 이하' },
    { id: 3, text: '30만원 - 50만원 이하' },
    { id: 4, text: '50만원 이상' },
  ],
};
