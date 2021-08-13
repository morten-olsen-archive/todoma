import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import React from 'react';
import { ServicesProvider } from 'contexts/ServicesContext';
import { TutorialProvider } from 'contexts/TutorialContext';
import Router from 'Router';
import { light } from 'theme';

const tutorialSteps = [
  'add-to-inbox',
  'go-to-planning',
  'add-task-to-backlog',
  'add-task-to-next',
  'go-to-today',
  'mark-completed',
];

const Wrapper = styled.View`
  flex: 1;
`;

const App: React.FC<{}> = () => (
  <SafeAreaProvider>
    <ThemeProvider theme={light}>
      <TutorialProvider steps={tutorialSteps}>
        <ServicesProvider>
          <Wrapper>
            <Router />
            <StatusBar style="auto" />
          </Wrapper>
        </ServicesProvider>
      </TutorialProvider>
    </ThemeProvider>
  </SafeAreaProvider>
);

export default App;
