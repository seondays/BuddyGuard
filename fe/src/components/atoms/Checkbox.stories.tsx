import { Meta, StoryFn } from '@storybook/react';

import Checkbox, { CheckboxProps } from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    default: {
      description: 'check 안했을 때',
      control: 'boolean',
    },
    checked: {
      description: 'check 했을 때',
      control: 'boolean',
    },
  },
} as Meta<CheckboxProps>;

const Template: StoryFn<CheckboxProps> = (args) => <Checkbox {...args} />;

// (기본) check 안했을 때 스토리
export const Default = Template.bind({});
Default.args = {
  size: 'small',
  label: '매 일',
  isChecked: false,
};

// check 했을 때 스토리
export const Checked = Template.bind({});
Checked.args = {
  size: 'small',
  label: '매 주',
  isChecked: true,
};
