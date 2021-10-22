import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import { useNextQuery, usePinnedQuery } from 'hooks/useTasks';
import useNotifications from 'hooks/useNotifications';
import Header from 'components/base/Header';
import TaskGroup from 'containers/tasks/Group';
import AddToInbox from 'containers/tasks/AddToInbox';
import Page from 'components/Page';
import { View } from 'react-native';
import { Body1 } from 'typography';
import LocalTask from 'models/LocalTask';

const Scroll = styled.ScrollView`
  flex: 1;
`;

const TaskListScreen: React.FC<{}> = () => {
  const { show, notifications } = useNotifications();
  const nextQuery = useNextQuery();
  const pinnedQuery = usePinnedQuery();

  const showAddedMessage = useCallback((task: LocalTask) => {
    show(
      <View>
        <Body1>The task {task.title} is added to the backlog, go there?</Body1>
      </View>,
      5000,
    )
  }, [show]);

  return (
    <Page>
      <Header title="Today" />
      <AddToInbox title="Add to backlog" onAdd={showAddedMessage} />
      {notifications.map(({ content }) => content)}
      <Scroll>
        <TaskGroup title="Focus" query={pinnedQuery} />
        <TaskGroup title="Next" query={nextQuery} />
      </Scroll>
    </Page>
  );
};

export default TaskListScreen;
