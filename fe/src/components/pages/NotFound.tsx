import styled from 'styled-components';

import { flexColumnCenter } from '@/styles/layoutStyles';

export default function NotFound() {
  return (
    <StyledContainer>
      <StyledText>😨잘못된 페이지입니다.🙈</StyledText>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.currentTheme.modalBackground2};
`;
const StyledText = styled.h1`
  color: ${({ theme }) => theme.currentTheme.textPrimary};
  font-size: 2rem;
  font-weight: bold;
`;
