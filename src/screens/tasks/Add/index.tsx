import React, { useState, useCallback } from 'react';
import useAddTask from 'hooks/useAddTask';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from 'Router';
import { Ionicons } from '@expo/vector-icons';
import Header from 'components/base/Header';
import Row, { Cell } from 'components/base/Row';
import Input from 'components/base/Input';

const TaskListScreen: React.FC<{}> = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [title, setTitle] = useState('');
  const addTask = useAddTask();
  const add = useCallback(async () => {
    await addTask(title);
    navigation.goBack();
  }, [addTask, title, navigation]);

  return (
    <>
      <Header
        title="Add Task"
        back
        right={
          <Cell onPress={add}>
            <Ionicons size={26} name="add-circle-outline" />
          </Cell>
        }
      />
      <Row>
        <Input label="Title" value={title} onChangeText={setTitle} />
      </Row>
    </>
  );
};

export default TaskListScreen;
