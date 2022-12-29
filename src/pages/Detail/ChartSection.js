import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChartLine from './ChartLine';
import MoreModal from './MoreModal';
import useOutSideClick from '../../hooks/useOutSideClick';
import { flexBox } from '../../styles/mixin';

const CHART_FILTERLIST = [
  { id: 1, list: '1개월' },
  { id: 2, list: '3개월' },
  { id: 3, list: '6개월' },
  { id: 4, list: '1년' },
  { id: 5, list: '전체' },
];

const CHART_DEALLIST = [
  { id: 6, list: '체결 거래', data: 'soldList' },
  { id: 7, list: '판매 입찰', data: 'sellList' },
  { id: 8, list: '구매 입찰', data: 'buyList' },
];

const ChartSection = () => {
  const [isFilterClicked, setIsFilterClicked] = useState(5);
  const [isDealClicked, setIsDealClicked] = useState(6);
  const [isMoreOpen, setIsMoreClicked] = useState(false);

  const [tableData, setTableData] = useState({});
  const [loadData, setLoadData] = useState(tableData.soldList);

  const ref = useRef();

  // const CHART_SELECTED = {
  //   sold: '체결 거래',
  // };

  // Object.values(CHART_SELECTED).map;

  // TODO : 로직 리팩토링
  const onFilterClick = ({ target }) => {
    if (isFilterClicked === Number(target.id)) {
      return;
    }
    setIsFilterClicked(
      isFilterClicked === Number(target.id) ? null : Number(target.id)
    );
  };

  const onDealClick = (id, data) => {
    if (isDealClicked === Number(id)) return;
    setIsDealClicked(isDealClicked === Number(id) ? null : Number(id));

    setLoadData(tableData[data]);
  };

  const onMoreClick = () => {
    setIsMoreClicked(true);
    document.body.style.overflow = 'hidden';
  };

  useOutSideClick(ref, () => {
    setIsMoreClicked(false);
    document.body.style.overflow = 'scroll';
  });

  useEffect(() => {
    fetch('/data/chartData.json', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(result => {
        setTableData(result[0]);
        setLoadData(result[0].soldList);
      });
  }, []);

  return (
    <>
      <ChartTitle>시세</ChartTitle>
      <ChartBtnList>
        {CHART_FILTERLIST.map(({ id, list }) => {
          return (
            <ChartBtnItem
              key={id}
              id={id}
              onClick={onFilterClick}
              clicked={isFilterClicked === id}
            >
              {list}
            </ChartBtnItem>
          );
        })}
      </ChartBtnList>

      <ChartLine />

      <ChartBtnList>
        {CHART_DEALLIST.map(({ id, list, data }) => {
          return (
            <ChartBtnItem
              key={id}
              id={id}
              onClick={() => onDealClick(id, data)}
              clicked={isDealClicked === id}
            >
              {list}
            </ChartBtnItem>
          );
        })}
      </ChartBtnList>

      <ChartTableWrapper>
        <ChartTableHead>
          <tr>
            <th>사이즈</th>
            <th>거래가</th>
            <th>거래일</th>
          </tr>
        </ChartTableHead>

        <ChartTableBody>
          {/* TODO : 초기값 설정 */}
          {loadData?.map(({ id, size, price, date }) => {
            const KRPrice = price.toLocaleString('ko-KR');
            return (
              <tr key={id}>
                <td>{size}</td>
                <td>{KRPrice}원</td>
                <td>{date}</td>
              </tr>
            );
          })}
        </ChartTableBody>
      </ChartTableWrapper>

      <ChartMoreBtn onClick={onMoreClick}>체결 내역 더보기</ChartMoreBtn>
      <div ref={ref}>
        {isMoreOpen && <MoreModal setIsMoreClicked={setIsMoreClicked} />}
      </div>
    </>
  );
};

export default ChartSection;

const ChartTitle = styled.h3`
  padding: 40px 0 20px;
  font-size: 18px;
  font-weight: 600;
`;

const ChartBtnList = styled.ul`
  display: flex;
  background-color: #f4f4f4;
  border-radius: 10px;
  width: 100%;
`;

const ChartBtnItem = styled.li`
  flex: 1;
  margin: 2px;
  padding: 7px 0 9px;
  font-size: 13px;
  border-radius: 8px;
  color: ${({ theme }) => theme.mainBrandGray08};
  background-color: ${props => (props.clicked ? 'white' : 'transparent')};
  text-align: center;
  line-height: 16px;
  box-shadow: inset 0 0 0 0.5px #ebebeb;
  cursor: pointer;
`;

const ChartTableWrapper = styled.table`
  margin: 20px 0;
  width: 100%;
`;

const ChartTableHead = styled.thead`
  text-align: right;
  border-bottom: ${({ theme }) => theme.globalBoardStyle};
  font-size: 12px;

  & th {
    color: ${({ theme }) => theme.mainBrandGray05};
    padding-bottom: 9px;
  }

  & th:first-child {
    text-align: left;
  }
`;

const ChartTableBody = styled.tbody`
  text-align: right;
  font-size: 14px;
  line-height: 17px;

  & td {
    padding-top: 9px;
  }

  & td:first-child {
    text-align: left;
  }
`;

const ChartMoreBtn = styled.button`
  ${flexBox()}
  width: 100%;
  height: 42px;
  font-size: 14px;
  border: 1px solid #d3d3d3;
  background-color: #fff;
  border-radius: 12px;
  color: ${({ theme }) => theme.mainBrandGray08};
  cursor: pointer;
`;
