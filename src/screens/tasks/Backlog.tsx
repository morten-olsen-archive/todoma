import React, { useCallback } from 'react';
import { Query } from 'hooks/useTasks';
import Header from 'components/base/Header';
import TaskList from 'containers/tasks/List';
import AddToInbox from 'containers/tasks/AddToInbox';
import { In, IsNull } from 'typeorm';
import Page from 'components/Page';

const BacklogScreen: React.FC<{}> = () => {
  const query: Query = useCallback(
    (q) =>
      q.where({
        completionDate: IsNull(),
        status: In(['inbox', 'backlog']),
      }),
    []
  );

  return (
    <Page>
      <Header title="Planning" />
      <AddToInbox />
      <TaskList query={query} />
    </Page>
  );
};

export default BacklogScreen;
