import { Meta, StoryFn } from '@storybook/react';

import Input, { InputProps } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    label: {
      description: 'Input field의 라벨 텍스트',
      control: 'text',
    },
    fullWidth: {
      description: 'Input이 가로 전체를 차지할지 여부',
      control: 'boolean',
    },
    hasError: {
      description: 'Input에 에러가 있는지 여부',
      control: 'boolean',
    },
  },
} as Meta<InputProps>;

const Template: StoryFn<InputProps> = (args) => <Input {...args} />;

// 기본 Input 스토리
export const Default = Template.bind({});
Default.args = {
  label: 'Username', // 기본으로 보여질 label 값
  fullWidth: false, // 기본은 전체 너비가 아님
  hasError: false, // 기본 에러 없음
};

// 전체 너비를 차지하는 Input 스토리
export const FullWidth = Template.bind({});
FullWidth.args = {
  label: 'Email',
  fullWidth: true, // 전체 너비 사용
  hasError: false,
};

// 에러 상태를 가진 Input 스토리
export const WithError = Template.bind({});
WithError.args = {
  label: 'Password',
  fullWidth: false,
  hasError: true, // 에러 상태
};
