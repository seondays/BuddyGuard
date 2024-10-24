import styled from 'styled-components';

import Button from '@/components/atoms/Button';
import Checkbox from '@/components/atoms/Checkbox';
import { LOGIN_API_SRC } from '@/constants/urlConstants';
import { fillAvailable, flexColumnCenter } from '@/styles/layoutStyles';
import KakaoLogo from '@/svg/kakao_logo.svg';
import Logo from '@/svg/logo.svg';

export default function Login() {
  const KAKAO_BG_COLOR = '#FEE500';
  const KAKAO_LOGO_COLOR = '#391d1d';

  return (
    <StyledLoginContainer>
      <StyledLogo />

      <StyledButtonWrapper>
        <a href={LOGIN_API_SRC}>
          <Button
            $bgColor={KAKAO_BG_COLOR}
            style={{ border: 'none', borderRadius: '0.5rem', minWidth: '12rem', marginBottom: '1rem' }}
          >
            <StyledKakaoLogo $color={KAKAO_LOGO_COLOR} />
            <StyledButtonText style={{ width: '70%', fontSize: '1.2rem' }}>카카오 로그인</StyledButtonText>
          </Button>
        </a>
        {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Checkbox size="medium" label="로그인 유지" />
        </div> */}
      </StyledButtonWrapper>
    </StyledLoginContainer>
  );
}

const StyledButtonWrapper = styled.div`
  width: 100%;
`;

const StyledLogo = styled(Logo)`
  width: 100%;
`;

const StyledButtonText = styled.span`
  width: 70%;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.themeValues.colorValues.grayscale[700]};
`;

const StyledKakaoLogo = styled(KakaoLogo)<{ $color?: string }>`
  width: 2rem;
  height: 2rem;

  & path {
    fill: ${(props) => props.$color || ''};
  }
`;

const StyledLoginContainer = styled.div`
  padding: 2rem;
  height: 100%;
  background-color: white;
  ${flexColumnCenter}
  gap: 3rem;
  ${fillAvailable}
`;
