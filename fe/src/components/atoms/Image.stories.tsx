import { Meta, StoryFn } from '@storybook/react';
import Image, { ImageProps } from './Image';

export default {
  title: 'Atoms/Image',
  component: Image,
  argTypes: {
    $borderRadius: { control: 'text' },
    $boxShadow: { control: 'boolean' },
    $isClicked: { control: 'boolean' },
    src: { control: 'text' },
    text: { control: 'text' },
    textPosition: {
      control: { type: 'select', options: ['top', 'bottom', 'left', 'right'] },
    },
    style: { control: 'object' },
  },
} as Meta<ImageProps>;

const Template: StoryFn<ImageProps> = (args) => <Image {...args} />;

// 기본 이미지 스토리
export const Default = Template.bind({});
Default.args = {
  src: 'https://via.placeholder.com/300',
  $borderRadius: '8px',
  $boxShadow: false,
  $isClicked: false,
  text: '',
  textPosition: 'bottom',
  style: {
    width: '300px',
    height: 'auto',
  },
};

// 텍스트가 포함된 이미지
export const ImageWithText = Template.bind({});
ImageWithText.args = {
  src: 'https://via.placeholder.com/300',
  $borderRadius: '8px',
  $boxShadow: false,
  $isClicked: false,
  text: 'Sample Text',
  textPosition: 'bottom',
  style: {
    width: '300px',
    height: 'auto',
  },
};

// 클릭된 상태의 이미지
export const ClickedImage = Template.bind({});
ClickedImage.args = {
  src: 'https://via.placeholder.com/300',
  $borderRadius: '8px',
  $boxShadow: true,
  $isClicked: true,
  text: 'Clicked Image',
  textPosition: 'bottom',
  style: {
    width: '300px',
    height: 'auto',
  },
};

// 좌측에 텍스트가 있는 이미지
export const LeftTextImage = Template.bind({});
LeftTextImage.args = {
  src: 'https://via.placeholder.com/300',
  $borderRadius: '8px',
  $boxShadow: true,
  $isClicked: false,
  text: 'Text on Left',
  textPosition: 'left',
  style: {
    width: '300px',
    height: 'auto',
  },
};
