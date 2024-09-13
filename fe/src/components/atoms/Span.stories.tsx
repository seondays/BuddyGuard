import { Meta, StoryFn } from '@storybook/react';
import { useTheme } from 'styled-components';

import Span, { SpanProps } from './Span';

export default {
  title: 'Atoms/Span',
  component: Span,
  argTypes: {
    color: { control: 'color' },
    fontSize: { control: 'text' },
    fontWeight: { control: 'text' },
    $textAlign: { control: { type: 'select', options: ['left', 'center', 'right'] } },
    $textTransform: { control: { type: 'select', options: ['none', 'capitalize', 'uppercase', 'lowercase'] } },
    $margin: { control: 'text' },
    $padding: { control: 'text' },
  },
} as Meta<SpanProps>;

const Template: StoryFn<SpanProps> = (args) => {
  const theme = useTheme();
  const defaultColor = `${theme.themeValues.colorValues.grayscale[800]}`;

  return (
    <Span
      {...args}
      color={args.color || defaultColor}
      fontSize={args.fontSize || '2rem'}
      fontWeight={args.fontWeight || 'normal'}
      $textAlign={args.$textAlign || 'left'}
      $textTransform={args.$textTransform || 'none'}
      $margin={args.$margin || '0'}
      $padding={args.$padding || '0'}
    >
      {args.children || 'Default Span Text'}
    </Span>
  );
};

// 기본 Span 스토리
export const Default = Template.bind({});
Default.args = {};

// 커스텀 스타일의 Span
export const CustomStyledSpan = Template.bind({});
CustomStyledSpan.args = {
  color: '#FF5733',
  fontSize: '3rem',
  fontWeight: 'bold',
  $textAlign: 'center',
  $textTransform: 'uppercase',
  $margin: '10px 0',
  $padding: '10px',
  children: 'Custom Styled Span',
};
