import React, { useCallback } from 'react';
import { Query } from 'hooks/useTasks';
import Header from 'components/base/Header';
import TaskList from 'containers/tasks/List';
import { IsNull, Not } from 'typeorm';
import Page from 'components/Page';

const CompletedScreen: React.FC<{}> = () => {
  const query: Query = useCallback(
    q => q.where({
      completionDate: Not(IsNull()),
    }),
    [],
  );

  return (
    <Page>
      <Header
        title="Completed"
        back
      />
      <TaskList query={query} />
    </Page>
  )
};

export default CompletedScreen;
