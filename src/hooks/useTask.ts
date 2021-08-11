import { useContext, useCallback, useEffect } from 'react';
import ServicesContext from 'contexts/ServicesContext';
import useAsync from './useAsync';

const useTasks = (id: string) => {
  const { taskService } = useContext(ServicesContext);
  const fetch = useCallback(async () => {
    const result = await taskService.getById(id);
    return result;
  }, [id, taskService]);
  const { update, result, error, state } = useAsync(fetch);

  useEffect(() => {
    const listener = (taskId?: string) => {
      if (taskId === result?.id) {
        update();
      }
    };
    taskService.addListener('taskUpdated', listener);
    return () => {
      taskService.removeListener('taskUpdated', listener);
    };
  }, [taskService, update, result]);

  return {
    result,
    update,
    state,
    error,
    service: taskService,
  };
};

export default useTasks;
