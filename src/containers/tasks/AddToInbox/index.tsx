import React, { useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { Keyboard } from 'react-native';
import Row, { Cell } from 'components/base/Row';
import Input from 'components/base/Input';
import useAddTask from 'hooks/useAddTask';
import LocalTask from 'models/LocalTask';

interface Props {
  title: string;
  onAdd?: (task: LocalTask) => void;
}

const AddToInbox: React.FC<Props> = ({ title, onAdd }) => {
  const theme = useTheme();
  const addTask = useAddTask();
  const [value, setValue] = useState('');

  const add = useCallback(async () => {
    const task = await addTask(value);
    setValue('');
    Keyboard.dismiss();
    if (onAdd) {
      onAdd(task);
    }
  }, [addTask, value]);

  return (
    <Row
      right={
        <Cell onPress={add}>
          <Ionicons
            name="add-circle-outline"
            size={26}
            color={theme.colors.primary}
          />
        </Cell>
      }
    >
      <Input
        label={title}
        value={value}
        onChangeText={setValue}
      />
    </Row>
  );
};

export default AddToInbox;
