import { Meta, StoryFn } from '@storybook/react';

import Input, { InputProps } from './Input';

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {},
} as Meta<InputProps>;

const Template: StoryFn<InputProps> = (args) => <Input {...args} />;

// 기본 Input 스토리
export const Default = Template.bind({});
Default.args = {
  size: 'medium',
  label: '제목', // 기본으로 보여질 label 값
  placeholder: '제목을 입력하세요.',
  $widthPercent: 100, // 기본 100%
  $isBottomLine: true, // 기본 하단 라인 있음
};

// 하단 라인 없는 스토리
export const BottomLine = Template.bind({});
BottomLine.args = {
  size: 'medium',
  label: '제목', // 기본으로 보여질 label 값
  placeholder: '하단 라인 없이 input만',
  $widthPercent: 100, // 기본 100%
  $isBottomLine: false, // 기본 하단 라인 있음
};

// 너비 지정한 Input 스토리
export const CustomWidth = Template.bind({});
CustomWidth.args = {
  size: 'medium',
  label: '제목', // 기본으로 보여질 label 값
  placeholder: '제목을 입력하세요.',
  $widthPercent: 50, // 기본 100%
  $isBottomLine: true, // 기본 하단 라인 있음
};
