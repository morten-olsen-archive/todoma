import React, { useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import Header from 'components/base/Header';
import ListItem from 'components/task/ListItem';
import DateSelector from 'components/base/DateSelector';
import useTask from 'hooks/useTask';
import LocalTask, { Statuses } from 'models/LocalTask';
import Page from 'components/Page';
import TextEditor from 'components/base/TextEditor';

type UpdateTaskFn = <K extends keyof LocalTask>(
  key: K,
  value: LocalTask[K]
) => Promise<any>;

const TaskDetails: React.FC<{}> = () => {
  const route = useRoute();
  // TODO: Fix type
  const task = useTask((route.params as any).id);

  const setField: UpdateTaskFn = useCallback(
    async (field, value) => {
      if (!task.result) {
        return;
      }
      task.result[field] = value;
      await task.service.update(task.result);
    },
    [task.service, task.result]
  );

  const changeStatus = useCallback(
    (status: Statuses) => setField('status', status),
    [setField]
  );

  const changeTitle = useCallback(
    (title: string) => setField('title', title),
    [setField]
  );

  const changeDescription = useCallback(
    (title: string) => setField('description', title),
    [setField]
  );

  const changeStartDate = useCallback(
    (date: Date | undefined) => setField('startDate', date ?? null),
    [setField]
  );

  const changeDeadline = useCallback(
    (date: Date | undefined) => setField('deadline', date ?? null),
    [setField]
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
    <Page>
      <Header title="Details" back />
      <ListItem
        task={task.result}
        changeStatus={changeStatus}
        toggleCompleted={toggleCompleted}
        togglePinned={togglePinned}
        onChangeTitle={changeTitle}
      />
      <TextEditor
        title="Description"
        value={task.result.description || ''}
        onChangeText={changeDescription}
      />
      <DateSelector
        selected={task.result.startDate || undefined}
        title="Start date"
        onSelect={changeStartDate}
      />
      <DateSelector
        selected={task.result.deadline || undefined}
        title="Deadline"
        onSelect={changeDeadline}
      />
    </Page>
  );
};

export default TaskDetails;
