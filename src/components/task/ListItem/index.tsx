import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Row, { Cell } from 'components/base/Row';
import LocalTask, { Statuses } from 'models/LocalTask';
import Transition from './Transition';

interface Props {
  task: LocalTask;
  allowedTransitions?: Statuses[];
  onPress?: () => any;
  toggleCompleted?: () => any;
  togglePinned?: () => any;
  changeStatus?: (status: Statuses) => any;
  onChangeTitle?: (value: string) => void;
}

const Title = styled.TextInput`
  font-weight: bold;
`;

const ListItem: React.FC<Props> = ({
  task,
  toggleCompleted,
  togglePinned,
  onPress,
  changeStatus,
  allowedTransitions,
  onChangeTitle,
}) => {
  const [title, setTitle] = useState(task.title);
  useEffect(() => setTitle(task.title), [task]);

  return (
    <Row
      onPress={onPress}
      left={
        <Cell onPress={toggleCompleted}>
          {task.completionDate ? (
            <Ionicons size={26} name="checkmark-circle-outline" />
          ) : (
            <Ionicons size={26} name="radio-button-off-outline" />
          )}
        </Cell>
      }
      title={
        onChangeTitle ? (
          <Title
            value={title}
            onBlur={() => onChangeTitle(title)}
            onChangeText={setTitle}
          />
        ) : (
          task.title
        )
      }
      right={
        <>
          <Transition
            task={task}
            icon={<Ionicons name="eye-outline" size={26} />}
            allowedTransitions={allowedTransitions}
            transition="watching"
            changeStatus={changeStatus}
          />
          <Transition
            task={task}
            icon={<Ionicons name="albums-outline" size={26} />}
            allowedTransitions={allowedTransitions}
            transition="backlog"
            changeStatus={changeStatus}
          />
          <Transition
            task={task}
            icon={<Ionicons name="bookmark-outline" size={26} />}
            allowedTransitions={allowedTransitions}
            transition="next"
            changeStatus={changeStatus}
          />
          {togglePinned && (
            <Cell onPress={togglePinned}>
              <Ionicons
                name={task.pinned ? 'star' : 'star-outline'}
                size={26}
              />
            </Cell>
          )}
        </>
      }
    />
  );
};

export default ListItem;
