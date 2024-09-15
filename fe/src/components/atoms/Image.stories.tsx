import { Meta, StoryFn } from '@storybook/react';

import CalendarIcon from '@public/assets/icons/calendarIcon.png';

import Image, { ImageProps } from './Image';

export default {
  title: 'Atoms/Image',
  component: Image,
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    $borderRadius: { control: 'text' },
    $boxShadow: { control: 'boolean' },
    $isClicked: { control: 'boolean' },
    src: { control: 'text' },
  },
} as Meta<ImageProps>;

const Template: StoryFn<ImageProps> = (args) => <Image {...args} />;

// 기본 이미지 스토리
export const Default = Template.bind({});
Default.args = {
  src: CalendarIcon,
  width: '10%',
  height: 'auto',
  $borderRadius: '0',
  $boxShadow: false,
  $isClicked: false,
};

// 이미지 클릭된 상태 스토리
export const Clicked = Template.bind({});
Clicked.args = {
  src: CalendarIcon,
  width: '10%',
  height: 'auto',
  $borderRadius: '0',
  $boxShadow: true,
  $isClicked: true,
};

// 박스 쉐도우가 있는 이미지 스토리
export const WithBoxShadow = Template.bind({});
WithBoxShadow.args = {
  src: CalendarIcon,
  width: '10%',
  height: 'auto',
  $borderRadius: '0.5rem',
  $boxShadow: true,
  $isClicked: false,
};

// 둥근 모서리를 가진 이미지 스토리
export const RoundedImage = Template.bind({});
RoundedImage.args = {
  src: CalendarIcon,
  width: '10%',
  height: 'auto',
  $borderRadius: '50%',
  $boxShadow: true,
  $isClicked: false,
};
