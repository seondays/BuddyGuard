import { Meta, StoryFn } from '@storybook/react';

import ListBox, { ListBoxProps } from '@/components/molecules/walk/ListBox';

export default {
  title: 'Molecules/ListBox',
  component: ListBox,
  argTypes: {},
} as Meta;

// 템플릿 생성
const Template: StoryFn<ListBoxProps> = () => {
  return <ListBox />;
};

export const Default = Template.bind({});
Default.args = {
  status: 'start',
  children: '시작',
};
