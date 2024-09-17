import styled, { useTheme } from 'styled-components';

//NOTE: 임시 이미지
// import profile01 from '@public/images/profile01.png';
// import profile02 from '@public/images/profile02.png';
// import profile03 from '@public/images/profile03.png';

// import Checkbox from '../atoms/Checkbox';
// import Image from '../atoms/Image';
import Span from '../atoms/Span';

export default function BuddySelectBar() {
  // const buddys = [profile01, profile02, profile03];
  // const buddys = [profile01];
  const theme = useTheme();
  const spanColor = theme.currentTheme.textSubtle;
  return (
    <StyledSelectBar>
      <section>
        <Span style={{ color: spanColor }}>함께 산책할 버디를 선택해 주세요</Span>
      </section>

      <div>
        {/* {buddys.map((e, idx) => (
          <Div key={`duddy-no-${idx}-${e}`}>
            <Checkbox></Checkbox>
            <Image src={profile01}></Image>
          </Div>
        ))} */}
      </div>
    </StyledSelectBar>
  );
}

const StyledSelectBar = styled.div`
  z-index: 999;
  position: absolute;
  bottom: 4rem;
  width: 100%;
  height: 10rem;
  border: 0.15rem solid ${({ theme }) => theme.currentTheme.modalBackground};
  border-radius: 2rem 2rem 0 0;
  background-color: ${({ theme }) => theme.currentTheme.modalBackground2};
  padding: 1rem;
`;
