import React, { useCallback } from 'react';
import { Query } from 'hooks/useTasks';
import Header from 'components/base/Header';
import TaskList from 'containers/tasks/List';
import { IsNull } from 'typeorm';
import Page from 'components/Page';

const WatchingScreen: React.FC<{}> = () => {
  const query: Query = useCallback(
    (q) => q.where({ status: 'watching', completionDate: IsNull() }),
    []
  );

  return (
    <Page>
      <Header title="Watching" back />
      <TaskList query={query} />
    </Page>
  );
};

export default WatchingScreen;
