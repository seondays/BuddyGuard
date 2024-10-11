import { Meta, StoryFn } from '@storybook/react';

import WalkModal, { WalkModalProps } from '@/components/organisms/walk/WalkModal';
import { buddys } from '@/components/pages/walk/GoWalk';
import { StyledMobileFrame } from '@/components/templates/ResponsiveLayout';
import { BuddysType } from '@/types/map';

export default {
  title: 'Organisms/WalkModal',
  component: WalkModal,
} as Meta;

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
