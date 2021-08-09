import React from 'react';

import { Story, Meta } from '@storybook/react';
import Row, { PlaceholderIcon} from './';
import Button from 'components/base/Button';

export default {
  component: Row,
  title: 'Componets/Base/Row',
} as Meta;

const Template: Story<any> = (args) => <Row {...args} />;

export const Full = Template.bind({});

Full.args = {
  title: 'Test',
  overline: 'Hello World',
  description: 'Some placeholder text',
  left: (
    <>
      <PlaceholderIcon color="blue" />
      <PlaceholderIcon color="green" />
    </>
  ),
  right: (
    <>
      <PlaceholderIcon color="blue" />
      <PlaceholderIcon color="green" />
    </>
  ),
  children: (
    <Button title="Demo button" />
  ),
};
