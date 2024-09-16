import { Meta, StoryFn } from '@storybook/react';
import { useTheme } from 'styled-components';
import Button, { ButtonProps } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    $bgColor: { control: 'color' },
    $boxShadow: { control: 'text' },
    $isClicked: { control: 'boolean' },
    style: { control: 'object' },
    children: { control: 'text' },
  },
} as Meta<ButtonProps>;

const Template: StoryFn<ButtonProps> = (args) => {
  const theme = useTheme();
  const defaultBorder = `${theme.themeValues.colorValues.special.textForce02} solid 0.1rem`;

  return (
    <Button {...args} style={{ border: args.style?.border || defaultBorder, ...args.style }}>
      {args.children || 'Button'}
    </Button>
  );
};

// 기본 버튼 스토리
export const Default = Template.bind({});
Default.args = {
  $bgColor: 'white',
  $isClicked: false,
  $boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  children: 'Default Button',
  style: { color: 'black' },
};

// 클릭된 상태의 버튼
export const Clicked = Template.bind({});
Clicked.args = {
  $bgColor: 'white',
  $isClicked: true,
  $boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  children: 'Clicked Button',
  style: { color: 'blue', borderRadius: '10px' },
};

// 다른 색상의 버튼
export const RedButton = Template.bind({});
RedButton.args = {
  $bgColor: 'red',
  $isClicked: false,
  $boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  children: 'Red Button',
  style: { color: 'white', fontSize: '16px' },
};
