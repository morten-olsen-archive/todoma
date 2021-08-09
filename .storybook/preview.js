import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { light } from 'theme';
export const decorators = [
  (Story) => (
    <ThemeProvider theme={light}>
      <Story />
    </ThemeProvider>
  ),
];
