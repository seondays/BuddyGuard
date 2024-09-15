import { Meta, StoryFn } from '@storybook/react';
import Span, { SpanProps } from './Span';

export default {
  title: 'Atoms/Span',
  component: Span,
  argTypes: {
    $color: { control: 'color' },
    children: { control: 'text' },
    style: { control: 'object' },
  },
} as Meta<SpanProps>;

const Template: StoryFn<SpanProps> = (args) => <Span {...args}>{args.children || 'Span Text'}</Span>;

// 기본 Span 스토리
export const Default = Template.bind({});
Default.args = {
  $color: undefined,
  children: 'Default Span',
  style: {},
};

// 색상이 있는 Span
export const ColoredSpan = Template.bind({});
ColoredSpan.args = {
  $color: 'blue',
  children: 'Blue Span',
  style: {},
};

// 스타일이 적용된 Span
export const StyledSpan = Template.bind({});
StyledSpan.args = {
  $color: 'red',
  children: 'Styled Span',
  style: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
};

// 커스텀 스타일 Span
export const CustomStyledSpan = Template.bind({});
CustomStyledSpan.args = {
  $color: 'green',
  children: 'Custom Styled Span',
  style: {
    fontSize: '18px',
    fontStyle: 'italic',
  },
};
