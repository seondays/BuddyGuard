import styled from 'styled-components';

import Image from '@/components/atoms/Image';
import { flexColumn, flexRowCenter } from '@/styles/layoutStyles';
import testProfile01 from '@public/images/profile01.png';
import testWalkPath from '@public/images/testWalkPath.png';

export interface ListBoxProps {}
export default function ListBox() {
  const pathImageStyle = { width: `3rem`, borderRadius: `0.5rem`, marginRight: `1rem` };
  const buddyImageStyle = { width: `2rem`, borderRadius: `50%` };
  return (
    <StyledListBoxWrapper>
      <Image src={testWalkPath} style={pathImageStyle} />

      <StyledInfoWrapper>
        <StyledMainInfo>
          <div className="title">2024년 8월 30일 금요일 산책</div>
          <div className="timeRange">16:00 ~ 16:30</div>
        </StyledMainInfo>

        <StyledSubInfo>
          <Item>
            <Value>2.8</Value>
            <SubValue>km</SubValue>
          </Item>
          <Item>
            <Value>00:30:00</Value>
          </Item>
          <Item>
            <Image src={testProfile01} style={buddyImageStyle}></Image>
            <Image src={testProfile01} style={buddyImageStyle}></Image>
          </Item>
        </StyledSubInfo>
      </StyledInfoWrapper>
    </StyledListBoxWrapper>
  );
}

const Item = styled.div`
  ${flexRowCenter}
  align-items: flex-end;
`;

const Value = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.currentTheme.textPrimary};
  font-size: 1.2rem;
`;
const SubValue = styled.span`
  margin-left: 0.2rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.currentTheme.textSecondary};
`;

const StyledSubInfo = styled.div`
  ${flexRowCenter}
  /* justify-content: flex-start; */
  height: 100%;
`;

const StyledMainInfo = styled.div`
  position: relative;
  ${flexColumn}
  justify-content: flex-start;

  height: 100%;
  width: 100%;

  & .title {
    font-size: 1rem;
    color: ${({ theme }) => theme.currentTheme.textPrimary};
  }
  & .timeRange {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.currentTheme.textSecondary};
  }

  &::after {
    content: '';
    position: absolute;
    /* bottom: 0.3rem; */
    bottom: 0.1rem;
    width: 100%;
    height: 0.1rem;
    /* height: 2rem; */
    /* background-color: ${({ theme }) => theme.currentTheme.grayLighter}; */
    background-color: red;
    z-index: 1000;
  }
`;

const StyledInfoWrapper = styled.div`
  ${flexColumn}
  justify-content: flex-start;

  flex-basis: 100%;
  background-color: orange;
  height: 100%;
`;

const StyledListBoxWrapper = styled.div`
  background-color: beige;
  ${flexRowCenter}
  justify-content: space-between;
  width: 100%;
  height: 5.5rem;
  padding: 1rem 1.2rem;
  box-shadow: 0rem 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  margin-bottom: 1rem;
`;
