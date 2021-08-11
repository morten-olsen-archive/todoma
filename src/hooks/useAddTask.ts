import { useContext, useCallback } from 'react';
import ServicesContext from 'contexts/ServicesContext';

const useAddTask = () => {
  const { taskService } = useContext(ServicesContext);
  const addTask = useCallback(
    async (title: string) => {
      await taskService.create(title);
    },
    [taskService]
  );
  return addTask;
};

export default useAddTask;
