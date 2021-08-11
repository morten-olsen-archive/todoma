import React from 'react';
import { useNavigation } from '@react-navigation/native';
import useTasks, { Query } from 'hooks/useTasks';
import TaskListItem from 'components/task/ListItem';
import Row from 'components/base/Row';
import { RootStackNavigationProps } from 'Router';

interface Props {
  title?: string;
  query?: Query;
}

const TaskGroup: React.FC<Props> = ({ title, query }) => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const tasks = useTasks(query);
  if (tasks.state === 'loading' || !tasks.result || tasks.result.length < 1) {
    return <></>;
  }
  return (
    <>
      {title && <Row title={title} />}
      {tasks.result &&
        tasks.result.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            onPress={() =>
              navigation.navigate('Task', {
                screen: 'TaskDetails',
                params: { id: task.id },
              })
            }
            togglePinned={() => tasks.togglePinned(task)}
            toggleCompleted={() => tasks.toggleCompleted(task)}
          />
        ))}
    </>
  );
};

export default TaskGroup;
