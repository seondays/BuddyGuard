import styled from 'styled-components';

import ListBox, { StyledListBoxWrapper } from '@/components/molecules/walk/ListBox';
import Puppy from '@/svg/puppy.svg';
import { FilterType, record } from '@/types/walk';

interface WalkListProps {
  records: record[];
  selectedData?: record | null;
  type: FilterType;
  setIsClickedDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedData: React.Dispatch<React.SetStateAction<record | null>>;
}

export default function WalkList({ records, selectedData, type, setIsClickedDetail, setSelectedData }: WalkListProps) {
  const onClickHandler = (record: record) => {
    if (type !== 'all') {
      setIsClickedDetail(true);
      setSelectedData(record);
    }
  };

  const NoRecordBox = () => (
    <NoRecordBoxWrapper>
      <StyledPuppy />
      <NoRecordText>산책 기록이 없네요 :(</NoRecordText>
    </NoRecordBoxWrapper>
  );

  const renderContent = () => {
    if (type === 'all') {
      return selectedData ? (
        <ListBox record={selectedData} onClickHandler={() => onClickHandler(selectedData)} />
      ) : (
        <NoRecordBox />
      );
    }

    return records?.length > 0 ? (
      records.map((record, idx) => (
        <ListBox key={`record-${idx}`} record={record} onClickHandler={() => onClickHandler(record)} />
      ))
    ) : (
      <NoRecordBox />
    );
  };

  return (
    <>
      <StyledTitle>산책 리스트</StyledTitle>
      <StyledListWrapper>{renderContent()}</StyledListWrapper>
    </>
  );
}

const StyledTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.currentTheme.textPrimary};
  margin-bottom: 0.5rem;
  flex-shrink: 0;
`;

const StyledListWrapper = styled.div`
  flex: 1;
  min-height: 0;
  padding: 0 0.3rem;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 0.2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.currentTheme.textAccentPrimary};
    border-radius: 0.2rem;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.themeValues.colorValues.grayscale[200]};
  }
`;

const NoRecordBoxWrapper = styled(StyledListBoxWrapper)`
  justify-content: center;
  cursor: auto;
`;

const NoRecordText = styled.div`
  color: ${({ theme }) => theme.themeValues.colorValues.grayscale[400]};
`;

const StyledPuppy = styled(Puppy)`
  width: 3rem;
  margin-right: 1rem;
  & path {
    fill: ${({ theme }) => theme.themeValues.colorValues.grayscale[400]};
  }
`;
