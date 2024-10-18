import { Meta, StoryFn } from '@storybook/react';

import ListBox, { ListBoxProps } from '@/components/molecules/walk/ListBox';
import testWalkPath from '@public/images/testWalkPath.png';

export default {
  title: 'Molecules/ListBox',
  component: ListBox,
  argTypes: {},
} as Meta;

// 템플릿 생성
const Template: StoryFn<ListBoxProps> = ({ record }: ListBoxProps) => {
  return <ListBox record={record} />;
};

export const Default = Template.bind({});
Default.args = {
  record: {
    id: 1,
    buddyIds: ['1', '2'],
    startDate: '2024-10-17',
    endDate: '2024-10-17',
    startTime: '00:10:00',
    endTime: '00:13:00',
    totalTime: '00:03:00',
    note: '우디랑 산책했다.',
    centerPosition: ['37.776929', '126.942293'],
    mapLevel: 3,
    path: [
      {
        lat: 37.529915761079586,
        lng: 126.66153498006616,
      },
      {
        lat: 37.529938002869244,
        lng: 126.66193409842631,
      },
    ],
    distance: 4.502,
    pathImage: testWalkPath,
  },
};
