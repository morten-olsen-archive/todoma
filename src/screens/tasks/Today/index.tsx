import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useNextQuery, usePinnedQuery } from 'hooks/useTasks';
import useTutorial from 'hooks/useTutorial';
import Header from 'components/base/Header';
import TaskGroup from 'containers/tasks/Group';
import AddToInbox from 'containers/tasks/AddToInbox';
import Page from 'components/Page';
import AddToInboxTutorial from './AddToInboxTutorial';
import GoToPlanningTutorial from './GoToPlanningTutorial';

const Scroll = styled.ScrollView`
  flex: 1;
`;

const TaskListScreen: React.FC<{}> = () => {
  const nextQuery = useNextQuery();
  const pinnedQuery = usePinnedQuery();
  const { current, completes } = useTutorial();

  useEffect(() => {
    completes('go-to-today');
  }, [completes]);

  return (
    <Page>
      <Header title="Today" />
      <AddToInbox />
      {current === 'add-to-inbox' && <AddToInboxTutorial />}
      {current === 'go-to-planning' && <GoToPlanningTutorial />}
      {current === 'mark-completed' && <GoToPlanningTutorial />}
      <Scroll>
        <TaskGroup title="Focus" query={pinnedQuery} />
        <TaskGroup title="Next" query={nextQuery} />
      </Scroll>
    </Page>
  );
};

export default TaskListScreen;
