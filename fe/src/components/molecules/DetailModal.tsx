import styled from 'styled-components';

import Span from '../atoms/Span';

export default function DetailModal({
  title,
  time,
  content,
  onClose,
  subCategory,
  onDelete,
}: {
  title: string;
  time: string;
  content: string;
  subCategory?: string;
  onClose: () => void;
  onDelete?: () => void;
}) {
  return (
    <ModalWrapper>
      <CloseButton onClick={onClose}>&#x2715;</CloseButton>

      <Header>
        <StyledSpan bold fontSize="1.5rem" color="#333">
          {title}
        </StyledSpan>
        {subCategory && (
          <StyledSpan bold fontSize="1rem" color="#666" paddingLeft="1rem">
            {subCategory}
          </StyledSpan>
        )}
      </Header>

      <TimeWrapper>
        <StyledSpan color="#999" fontSize="1rem">
          {time}
        </StyledSpan>
      </TimeWrapper>

      <ContentWrapper>
        <StyledSpan color="#555" fontSize="1.1rem">
          {content}
        </StyledSpan>
      </ContentWrapper>

      {onDelete && (
        <DeleteButtonWrapper>
          <DeleteButton onClick={onDelete}>삭제</DeleteButton>
        </DeleteButtonWrapper>
      )}
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  width: 90%;
  max-width: 450px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 1rem;
`;

const TimeWrapper = styled.div`
  margin-bottom: 1.5rem;
  text-align: start;
`;

const ContentWrapper = styled.div`
  text-align: start;
  line-height: 1.5;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const DeleteButtonWrapper = styled.div`
  text-align: center;
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ff3b30;
  color: #fff;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const StyledSpan = styled(Span)<{ bold?: boolean; fontSize?: string; color?: string; paddingLeft?: string }>`
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  font-size: ${(props) => props.fontSize || '1rem'};
  color: ${(props) => props.color || '#000'};
  padding-left: ${(props) => props.paddingLeft || '0'};
`;
