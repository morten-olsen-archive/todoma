import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useNextQuery, usePinnedQuery } from 'hooks/useTasks';
import Header from 'components/base/Header';
import { RootStackNavigationProps } from 'Router';
import TaskGroup from 'containers/tasks/Group';
import AddToInbox from 'containers/tasks/AddToInbox';
import Page from 'components/Page';

const Scroll = styled.ScrollView`
  flex: 1;
`

const TaskListScreen: React.FC<{}> = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const add = useCallback(async () => {
    navigation.navigate('AddTask');
  }, []);
  const nextQuery = useNextQuery();
  const pinnedQuery = usePinnedQuery();

  return (
    <Page>
      <Header title="Today" />
      <AddToInbox />
      <Scroll>
        <TaskGroup title="Focus" query={pinnedQuery} />
        <TaskGroup title="Next" query={nextQuery} />
      </Scroll>
    </Page>
  )
};

export default TaskListScreen;
