import { Meta, StoryFn } from '@storybook/react';
import Div, { DivProps } from './Div';

export default {
  title: 'Atoms/Div', // Storybook에서 컴포넌트의 위치
  component: Div,
  argTypes: {
    style: { control: 'object' }, // style 속성을 객체로 설정할 수 있게 함
    children: { control: 'text' }, // children 텍스트 변경 가능하게 설정
  },
} as Meta<DivProps>;

const Template: StoryFn<DivProps> = (args) => <Div {...args}>{args.children || 'Div Content'}</Div>;

// 기본 Div 스토리
export const Default = Template.bind({});
Default.args = {
  style: {
    width: '200px',
    height: '200px',
    backgroundColor: 'lightgray',
  },
  children: 'Default Div',
};

// 배경색이 있는 Div
export const ColoredDiv = Template.bind({});
ColoredDiv.args = {
  style: {
    width: '200px',
    height: '200px',
    backgroundColor: 'skyblue',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: 'Colored Div',
};

// 테두리가 있는 Div
export const BorderedDiv = Template.bind({});
BorderedDiv.args = {
  style: {
    width: '200px',
    height: '200px',
    backgroundColor: 'white',
    border: '2px solid black',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: 'Bordered Div',
};

// 커스텀 스타일의 Div
export const CustomStyledDiv = Template.bind({});
CustomStyledDiv.args = {
  style: {
    width: '300px',
    height: '150px',
    backgroundColor: 'coral',
    color: 'white',
    fontSize: '18px',
    padding: '10px',
    textAlign: 'center',
  },
  children: 'Custom Styled Div',
};
