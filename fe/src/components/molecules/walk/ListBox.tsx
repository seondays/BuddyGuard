import styled from 'styled-components';

import Image from '@/components/atoms/Image';
import { flexColumn, flexRowCenter } from '@/styles/layoutStyles';
import { record } from '@/types/walk';
import { getCurrentDate } from '@/utils/timeUtils';
import testProfile01 from '@public/images/profile01.png';

export interface ListBoxProps {
  record: record;
  onClickHandler: (record: any) => void;
}

export default function ListBox({ record, onClickHandler }: ListBoxProps) {
  const pathImageStyle = { width: `3rem`, borderRadius: `0.5rem`, marginRight: `1rem` };
  const buddyImageStyle = {
    width: ` 1.5rem`,
    borderRadius: `50%`,
    border: `0.1rem solid white`,
  };
  return (
    <StyledListBoxWrapper onClick={() => onClickHandler(record)}>
      <Image src={record.pathImage} style={pathImageStyle} $isHover={false} />

      <StyledInfoWrapper>
        <StyledMainInfo>
          <div className="title">
            {getCurrentDate({ isDay: true, isTime: false, dateString: record.startDate })} 산책
          </div>
          <div className="timeRange">
            {record.startTime} ~ {record.endTime}
          </div>
        </StyledMainInfo>

        <StyledSubInfo>
          <Item>
            <Value>{record.distance}</Value>
            <SubValue>km</SubValue>
          </Item>
          <Item>
            <Value>{record.totalTime}</Value>
          </Item>

          <ImageItem>
            {record.buddyIds.map((_, idx) => (
              <Image
                key={`listbox${idx}`}
                // TODO: 프로필 연동
                src={testProfile01}
                $position="absolute"
                style={{ ...buddyImageStyle, left: `${idx}rem` }}
              ></Image>
            ))}
          </ImageItem>
        </StyledSubInfo>
      </StyledInfoWrapper>
    </StyledListBoxWrapper>
  );
}

const Item = styled.div`
  ${flexRowCenter}
  align-items: flex-end;
  height: 100%;
`;

const ImageItem = styled(Item)`
  position: relative;
`;

const Value = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.currentTheme.textPrimary};
  font-size: 1.1rem;
`;
const SubValue = styled.span`
  margin-left: 0.2rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.currentTheme.textSecondary};
`;

const StyledSubInfo = styled.div`
  ${flexRowCenter}
  justify-content: flex-start;
  align-items: flex-end;
  gap: 1rem;
  height: 100%;
`;

const StyledMainInfo = styled.div`
  position: relative;
  ${flexColumn}
  justify-content: flex-start;
  gap: 0.4rem;
  height: 100%;
  width: 100%;

  & .title {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.currentTheme.textPrimary};
  }
  & .timeRange {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.currentTheme.textSecondary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -0.3rem;
    width: 100%;
    height: 0.1rem;
    background-color: ${({ theme }) => theme.currentTheme.grayLighter};
  }
`;

const StyledInfoWrapper = styled.div`
  ${flexColumn}
  justify-content: flex-start;
  flex-basis: 100%;
  height: 100%;
  gap: 0.4rem;
`;

export const StyledListBoxWrapper = styled.div`
  ${flexRowCenter}
  justify-content: space-between;
  width: 100%;
  min-width: 19rem;
  height: 5.5rem;
  padding: 0.6rem 1rem;
  box-shadow: 0rem 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  margin-bottom: 0.8rem;
  background-color: ${({ theme }) => theme.currentTheme.backgroundPrimary};
  cursor: pointer;
`;
