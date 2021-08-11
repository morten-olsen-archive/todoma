import React, { useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import Header from 'components/base/Header';
import ListItem from 'components/task/ListItem';
import useTask from 'hooks/useTask';
import { Statuses } from 'models/LocalTask';

const TaskDetails: React.FC<{}> = () => {
  const route = useRoute();
  // TODO: Fix type
  const task = useTask((route.params as any).id);

  const changeStatus = useCallback(
    async (status: Statuses) => {
      if (!task.result) {
        return;
      }
      await task.service.setStatus(task.result, status);
    },
    [task.service, task.result]
  );

  const toggleCompleted = useCallback(async () => {
    if (!task.result) {
      return;
    }
    await task.service.toggleCompleted(task.result);
  }, [task.service, task.result]);

  const togglePinned = useCallback(async () => {
    if (!task.result) {
      return;
    }
    await task.service.togglePinned(task.result);
  }, [task.service, task.result]);

  if (!task.result) {
    return <></>;
  }

  return (
    <>
      <Header title="Details" back />
      <ListItem
        task={task.result}
        changeStatus={changeStatus}
        toggleCompleted={toggleCompleted}
        togglePinned={togglePinned}
      />
    </>
  );
};

export default TaskDetails;
