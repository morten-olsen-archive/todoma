import { useContext, useCallback } from 'react';
import ServicesContext from 'contexts/ServicesContext';

const useAddTask = () => {
  const { taskService } = useContext(ServicesContext);
  const addTask = useCallback(
    async (title: string) => {
      const task = await taskService.create(title);
      return task;
    },
    [taskService]
  );
  return addTask;
};

export default useAddTask;
