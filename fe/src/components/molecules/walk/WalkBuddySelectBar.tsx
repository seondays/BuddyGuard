import styled, { useTheme } from 'styled-components';

import Checkbox from '@/components/atoms/Checkbox';
import Image from '@/components/atoms/Image';
import Span from '@/components/atoms/Span';
import { NAV_HEIGHT } from '@/components/organisms/Nav';
// NOTE: 임시 이미지
import { BuddysType, CheckboxChangeHandler, SelectedBuddysType } from '@/types/map';

// TODO(Woody): API 연동
// TODO(Woody): 대표 버디는 처음부터 체크되어있음

export const BUDDY_SELECTBAR_HEIGHT = '10rem';

interface BuddySelectBarProps {
  buddys: BuddysType[];
  selectedBuddys: SelectedBuddysType;
  handleOnChange: CheckboxChangeHandler;
}

export default function BuddySelectBar({ buddys, selectedBuddys, handleOnChange }: BuddySelectBarProps) {
  const theme = useTheme();
  const spanColor = theme.currentTheme.textSubtle;

  const isChecked = (id: BuddysType['id']) => selectedBuddys.includes(id);

  return (
    <StyledSelectBar>
      <section>
        <Span style={{ color: spanColor }}>함께 산책할 버디를 선택해 주세요</Span>
      </section>

      <StyledSlideWrapper $buddyCount={buddys.length || 0}>
        {buddys.map(({ id, img, name }) => (
          <StyledBuddyWrapper key={`duddy-${id}`}>
            <StyledCheckbox checkBoxId={`${id}`} isChecked={isChecked(id)} handleOnChange={handleOnChange} />
            <StyledImgWrapper>
              <Image
                style={{ width: '50%', color: spanColor, marginTop: '1rem' }}
                $borderRadius={'50%'}
                src={img}
              ></Image>
              <StyledText style={{ color: spanColor }}>{`${name}sfsfsd${id}더긴이름이름이름`}</StyledText>
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
  width: 100%;
  height: 80%;
  align-items: center;
  justify-content: ${({ $buddyCount }) => ($buddyCount < 4 ? `center` : `flex-start`)};

  overflow: overlay;
  -ms-overflow-style: none;
  scrollbar-width: thin;

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
