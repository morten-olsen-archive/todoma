import React, { useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { Keyboard } from 'react-native';
import Row, { Cell } from 'components/base/Row';
import Input from 'components/base/Input';
import useAddTask from 'hooks/useAddTask';

const AddToInbox: React.FC<{}> = () => {
  const theme = useTheme();
  const addTask = useAddTask();
  const [value, setValue] = useState('');

  const add = useCallback(async () => {
    await addTask(value);
    setValue('');
    Keyboard.dismiss();
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
      <Input label="Add task to inbox" value={value} onChangeText={setValue} />
    </Row>
  );
};

export default AddToInbox;
