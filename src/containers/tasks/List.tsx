import React, { useMemo, useCallback } from 'react';
import { SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTasks, { Query } from 'hooks/useTasks';
import TaskListItem from 'components/task/ListItem';
import Row from 'components/base/Row';
import { RootStackNavigationProps } from 'Router';
import LocalTask, { Statuses } from 'models/LocalTask';

interface Props {
  query?: Query;
}

interface Flattended {
  inbox: LocalTask[];
  current: LocalTask[];
  future: LocalTask[];
  onHold: LocalTask[];
}

const TaskList: React.FC<Props> = ({ query }) => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const tasks = useTasks(query);
  const setStatus = useCallback(async (task: LocalTask, status: Statuses) => {
    await tasks.service.setStatus(task, status);
  }, [tasks.service]);
  const grouped = useMemo(
    () => {
      const flattended = (tasks.result || []).reduce((output, current) => {
        if (current.status === 'inbox') {
          output.inbox.push(current);
        } else if (current.startDate && current.startDate > new Date()) {
          output.future.push(current);
        } else if (current.status === 'on-hold') {
          output.onHold.push(current);
        } else {
          output.current.push(current);
        }
        return output;
      }, { inbox: [], current: [], future: [], onHold: [] } as Flattended);
      return [{
        title: 'Inbox',
        data: flattended.inbox,
      }, {
        title: 'Ready',
        data: flattended.current,
      }, {
        title: 'On hold',
        data: flattended.onHold,
      }, {
        title: 'Future',
        data: flattended.future,
      }].filter(i => i.data.length > 0);
    },
    [tasks.result],
  );

  return (
    <SectionList
      style={{ flex: 1 }}
      sections={grouped}
      keyExtractor={item => item.id}
      renderSectionHeader={({ section: { title } }) => (
        <Row title={title} background="#fff" />
      )}
      renderItem={({ item: task}) => (
        <TaskListItem
          key={task.id}
          task={task}
          onPress={() => navigation.navigate('Task', {
            screen: 'TaskDetails',
            params: { id: task.id }
          })}
          changeStatus={(status) => setStatus(task, status)}
          togglePinned={() => tasks.togglePinned(task)}
          toggleCompleted={() => tasks.toggleCompleted(task)}
        />
      )}
    />
  );
};

export default TaskList;
