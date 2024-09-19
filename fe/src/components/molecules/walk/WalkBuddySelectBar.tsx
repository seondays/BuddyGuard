import styled, { useTheme } from 'styled-components';

import Checkbox from '@/components/atoms/Checkbox';
import Image from '@/components/atoms/Image';
import Span from '@/components/atoms/Span';
import { NAV_HEIGHT } from '@/components/organisms/Nav';
import { CheckboxChangeHandler } from '@/components/pages/walk/GoWalk';
// NOTE: 임시 이미지
import profile01 from '@public/images/profile01.png';
import profile02 from '@public/images/profile02.png';
import profile03 from '@public/images/profile03.png';

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
            <StyledImgWrapper>
              <Image
                style={{ width: '50%', color: spanColor, marginTop: '1rem' }}
                $borderRadius={'50%'}
                src={buddyImg}
              ></Image>
              <StyledText style={{ color: spanColor }}>{`버디이름sfsfsd${idx}`}</StyledText>
            </StyledImgWrapper>
          </StyledBuddyWrapper>
        ))}
      </StyledSlideWrapper>
    </StyledSelectBar>
  );
}

const StyledText = styled(Span)`
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

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
  bottom: ${NAV_HEIGHT};
  width: 100%;
  height: ${BUDDY_SELECTBAR_HEIGHT};
  border: 0.15rem solid ${({ theme }) => theme.currentTheme.modalBackground};
  border-radius: 2rem 2rem 0 0;
  background-color: ${({ theme }) => theme.currentTheme.modalBackground2};
  padding: 1.2rem;
`;
