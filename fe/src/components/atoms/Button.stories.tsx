import { Meta, StoryFn } from '@storybook/react';
import { useTheme } from 'styled-components';

import Button, { ButtonProps } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    $bgColor: { control: 'color' },
    $border: { control: 'text' },
    fontSize: { control: 'text' },
    display: { control: 'text' },
    $textAlign: { control: 'text' },
    $justifyContent: { control: 'text' },
    $alignItems: { control: 'text' },
    $isClicked: { control: 'boolean' },
    $boxShadow: { contorl: 'text' },
    $borderRadius: { contorl: 'text' },
  },
} as Meta<ButtonProps>;

const Template: StoryFn<ButtonProps> = (args) => {
  const theme = useTheme();
  const defaultBorder = `${theme.themeValues.colorValues.special.textForce02} solid 0.1rem`;
  return (
    <Button
      {...args}
      width={args.width || '100%'}
      height={args.width || '4rem'}
      $bgColor={args.$bgColor || `white`}
      $border={args.$border || defaultBorder}
      fontSize={args.fontSize || '1rem'}
      $textAlign={args.$textAlign || 'center'}
      $justifyContent={args.$justifyContent || 'center'}
      $alignItems={args.$alignItems || 'center'}
      $isClicked={args.$isClicked || false}
    />
  );
};

// 기본 버튼 스토리
export const Default = Template.bind({});
Default.args = {};

// 클릭된 상태의 버튼
export const Clicked = Template.bind({});
Clicked.args = {
  width: '200px',
  height: '50px',
  $bgColor: '',
  $border: '',
  fontSize: '16px',
  $textAlign: 'center',
  $justifyContent: 'center',
  $alignItems: 'center',
  $isClicked: true,
};

// 다른 색상의 버튼
export const RedButton = Template.bind({});
RedButton.args = {
  width: '200px',
  height: '50px',
  $bgColor: 'red',
  $border: '',
  fontSize: '16px',
  $textAlign: 'center',
  $justifyContent: 'center',
  $alignItems: 'center',
  $isClicked: false,
};

// 둥근 모서리를 가진 버튼
export const RoundedButton = Template.bind({});
RoundedButton.args = {
  width: '200px',
  height: '50px',
  $bgColor: '',
  $border: '',
  fontSize: '16px',
  $textAlign: 'center',
  $justifyContent: 'center',
  $alignItems: 'center',
  $isClicked: false,
  $borderRadius: '50%',
};

// 박스 쉐도우 커스텀 적용된 버튼
export const WithBoxShadow = Template.bind({});
WithBoxShadow.args = {
  width: '200px',
  height: '50px',
  $bgColor: '',
  $border: '1px solid ',
  fontSize: '16px',
  $textAlign: 'center',
  $justifyContent: 'center',
  $alignItems: 'center',
  $isClicked: true,
  $boxShadow: '9px 9px 0px rgb(93, 93, 93)',
};
