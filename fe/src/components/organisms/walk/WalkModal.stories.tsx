import { Meta, StoryFn } from '@storybook/react';

import WalkModal, { WalkModalProps } from '@/components/organisms/walk/WalkModal';
import { StyledMobileFrame } from '@/components/templates/ResponsiveLayout';
import { BuddysType } from '@/types/map';
import profile01 from '@public/images/profile01.png';
import profile02 from '@public/images/profile02.png';
import profile03 from '@public/images/profile03.png';

export default {
  title: 'Organisms/WalkModal',
  component: WalkModal,
} as Meta;

const buddys = [
  {
    id: 1,
    img: `${profile01}`,
    name: '우디',
  },
  {
    id: 2,
    img: `${profile02}`,
    name: '수잔',
  },
  {
    id: 3,
    img: `${profile03}`,
    name: '데이',
  },
  {
    id: 4,
    img: `${profile01}`,
    name: '진',
  },
  {
    id: 5,
    img: `${profile02}`,
    name: '잔',
  },
  {
    id: 6,
    img: `${profile03}`,
    name: '심바',
  },
];
const Template: StoryFn<WalkModalProps> = (args) => {
  return (
    <StyledMobileFrame>
      <WalkModal {...args} />
    </StyledMobileFrame>
  );
};

const TimeRef = {
  start: {
    day: '2024년 10월 7일 월요일',
    time: '15:53',
  },
  end: {
    day: '2024년 10월 7일 월요일',
    time: '15:53',
  },
  total: '00:00:04',
};

// const linePathRef = [
//   { La: 126.66238410083429, Ma: 37.52952964391047 },
//   { La: 126.66238410083429, Ma: 37.52952964391047 },
// ];

export const Default = Template.bind({});
Default.args = {
  formTitle: '산책 완료',
  timeRef: { current: TimeRef },
  linePathRef: { current: [] },
  selectedBuddys: [1, 2],
  buddyList: buddys as BuddysType[],
};
