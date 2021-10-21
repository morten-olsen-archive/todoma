import React from 'react';

import { Story, Meta } from '@storybook/react';
import Container from './Container';
import MockProvider from './test/mocks/ServiceProvider';

const MockedContainer = () => (
  <MockProvider>
    <div style={{ height: '100%', display: 'flex' }}>
    <Container />
    </div>
  </MockProvider>
)

export default {
  component: MockedContainer,
  title: 'Preview/App',
} as Meta;

const Template: Story<any> = (args) => <MockedContainer {...args} />;

export const App = Template.bind({});

App.args = {
};
