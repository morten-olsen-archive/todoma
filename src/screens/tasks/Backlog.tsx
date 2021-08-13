import React, { useCallback, useEffect } from 'react';
import { Query } from 'hooks/useTasks';
import useTutorial from 'hooks/useTutorial';
import Header from 'components/base/Header';
import TaskList from 'containers/tasks/List';
import AddToInbox from 'containers/tasks/AddToInbox';
import { In, IsNull } from 'typeorm';
import Page from 'components/Page';
import AddToBacklog from './Backlog/AddToBacklog';

const BacklogScreen: React.FC<{}> = () => {
  const { current, completes } = useTutorial();
  const query: Query = useCallback(
    (q) =>
      q.where({
        completionDate: IsNull(),
        status: In(['inbox', 'backlog']),
      }),
    []
  );
  useEffect(() => {
    completes('go-to-planning');
  }, [completes]);

  return (
    <Page>
      <Header title="Planning" />
      <AddToInbox />
      {current === 'add-task-to-backlog' && <AddToBacklog />}
      {current === 'add-task-to-next' && <AddToBacklog />}
      {current === 'go-to-today' && <AddToBacklog />}
      <TaskList query={query} />
    </Page>
  );
};

export default BacklogScreen;
