import { Meta, StoryFn } from '@storybook/react';

import Input, { InputProps } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    default: {
      description: 'Input field의 라벨 텍스트',
      control: 'text',
    },
    bottomLine: {
      description: '하단 라인 존재 여부',
      control: 'boolean',
    },
    customWidth: {
      description: 'Input width 조정',
      control: 'number',
    },
  },
} as Meta<InputProps>;

const Template: StoryFn<InputProps> = (args) => <Input {...args} />;

// 기본 Input 스토리
export const Default = Template.bind({});
Default.args = {
  label: '제목', // 기본으로 보여질 label 값
  $placeholder: '제목을 입력하세요.',
  widthPercent: 100, // 기본 100%
  isBottomLine: true, // 기본 하단 라인 있음
};

// 하단 라인 없는 스토리
export const BottomLine = Template.bind({});
Default.args = {
  label: '제목', // 기본으로 보여질 label 값
  $placeholder: '제목을 입력하세요.',
  widthPercent: 100, // 기본 100%
  isBottomLine: false, // 기본 하단 라인 있음
};

// 너비 지정한 Input 스토리
export const CustomWidth = Template.bind({});
CustomWidth.args = {
  label: '제목', // 기본으로 보여질 label 값
  $placeholder: '제목을 입력하세요.',
  widthPercent: 50, // 기본 100%
  isBottomLine: true, // 기본 하단 라인 있음
};
