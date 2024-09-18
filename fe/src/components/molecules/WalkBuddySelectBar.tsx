import styled, { useTheme } from 'styled-components';

// NOTE: 임시 이미지
import profile01 from '@public/images/profile01.png';
import profile02 from '@public/images/profile02.png';
import profile03 from '@public/images/profile03.png';

import Checkbox from '../atoms/Checkbox';
import Image from '../atoms/Image';
import Span from '../atoms/Span';
import { CheckboxChangeHandler } from '../pages/walk/GoWalk';

// TODO(Woody): API 연동
// TODO(Woody): 대표 버디는 처음부터 체크되어있음

export const BUDDY_SELECTBAR_HEIGHT = '10rem';

interface BuddySelectBarProps {
  selectedBuddys: string[];
  handleOnChange: CheckboxChangeHandler;
}
export default function BuddySelectBar({ selectedBuddys, handleOnChange }: BuddySelectBarProps) {
  const buddys = [
    profile01,
    profile02,
    profile03,
    profile01,
    profile02,
    profile01,
    profile02,
    profile03,
    profile01,
    profile02,
  ];
  // buddys = [profile01, profile02];

  const theme = useTheme();
  const spanColor = theme.currentTheme.textSubtle;

  const isChecked = (id: string) => selectedBuddys.includes(id);

  return (
    <StyledSelectBar>
      <section>
        <Span style={{ color: spanColor }}>함께 산책할 버디를 선택해 주세요</Span>
      </section>

      <StyledSlideWrapper $buddyCount={buddys.length}>
        {buddys.map((buddyImg, idx) => (
          <StyledBuddyWrapper key={`duddy-no-${idx}-${buddyImg}`}>
            <StyledCheckbox checkBoxId={`${idx}`} isChecked={isChecked(`idx`)} handleOnChange={handleOnChange} />
            <Image
              style={{ width: '50%', color: spanColor, marginTop: '1rem' }}
              $borderRadius={'50%'}
              src={buddyImg}
              text={`버디이름sfsfsd${idx}`}
              textPosition={'bottom'}
            ></Image>
          </StyledBuddyWrapper>
        ))}
      </StyledSlideWrapper>
    </StyledSelectBar>
  );
}

const StyledCheckbox = styled(Checkbox)`
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledBuddyWrapper = styled.div`
  position: relative;
  width: 25%;
  flex-shrink: 0;
  margin-right: 1rem;
`;

const StyledSlideWrapper = styled.div<{ $buddyCount: number }>`
  margin-top: 1rem;
  display: flex;
  overflow-x: auto;
  width: 100%;
  height: 80%;
  align-items: center;
  justify-content: ${({ $buddyCount }) => ($buddyCount < 4 ? `center` : `flex-start`)};
  //TODO(Woody): 차이가 있는지 체감
  /* scroll-snap-type: x mandatory; */
  /* -webkit-overflow-scrolling: touch; */
`;

const StyledSelectBar = styled.div`
  z-index: 999;
  position: absolute;
  bottom: 4rem;
  width: 100%;
  height: ${BUDDY_SELECTBAR_HEIGHT};
  border: 0.15rem solid ${({ theme }) => theme.currentTheme.modalBackground};
  border-radius: 2rem 2rem 0 0;
  background-color: ${({ theme }) => theme.currentTheme.modalBackground2};
  padding: 1.2rem;
`;
