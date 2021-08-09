import React from 'react';

import { Story, Meta } from '@storybook/react';
import Input from './';

export default {
  component: Input,
  title: 'Componets/Base/Input',
} as Meta;

const Template: Story<any> = (args) => <Input {...args} />;

export const WithoutInput = Template.bind({});

WithoutInput.args = {
  label: 'Username',
  value: '',
  onChangeText: () => {},
};

export const WithInput = Template.bind({});

WithInput.args = {
  label: 'Username',
  value: 'foo@example.com',
  onChangeText: () => {},
};
