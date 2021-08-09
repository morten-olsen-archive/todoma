import { useContext, useCallback, useEffect } from 'react';
import ServicesContext from 'contexts/ServicesContext';
import useAsync from './useAsync';

const useTasks = (id: string) => {
  const { taskService } = useContext(ServicesContext);
  const fetch = useCallback(async () => {
    const result = await taskService.getById(id)
    return result;
  }, [id]);
  const current = useAsync(fetch);

  useEffect(() => {
    const listener = (id?: string) => {
      if (id === current.result?.id) {
        current.update();
      }
    };
    taskService.addListener('taskUpdated', listener);
    return () => {
      taskService.removeListener('taskUpdated', listener);
    };
  }, [taskService, current.result]);

  return {
    ...current,
    service: taskService,
  };
};

export default useTasks;
