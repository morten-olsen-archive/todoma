import React from 'react'
import { Story, Meta } from '@storybook/react';
import * as typography from 'typography';
import Row from 'components/base/Row';

const Overview: React.FC<{ text: string }> = ({ text }) => (
  <>
    {Object.entries(typography).map(([name, Component]) => (
      <Row key={name} overline={name}>
        <Component>{text}</Component>
      </Row>
    ))}
  </>
);

const meta: Meta = {
  component: Overview,
  title: 'Typography',
};

export default meta;

const Template: Story<any> = (args) => <Overview {...args} />;

export const Typography = Template.bind({});

Typography.args = {
  text: 'Foo bar',
};
