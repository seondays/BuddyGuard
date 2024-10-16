import styled from 'styled-components';

export default function Chart() {
  return <StyledGraphContainer>그래프</StyledGraphContainer>;
}

const StyledGraphContainer = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: ${({ theme }) => theme.currentTheme.backgroundPrimary}; */
  background-color: aliceblue;
`;
