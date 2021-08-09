import { useContext, useCallback, useEffect } from 'react';
import ServicesContext from 'contexts/ServicesContext';
import useAsync from './useAsync';
import LocalTask from 'models/LocalTask';
import type { Query } from 'services/Tasks';

const useTasks = (query?: Query) => {
  const { taskService } = useContext(ServicesContext);
  const fetch = useCallback(async () => {
    const [result] = await taskService.find(query);
    return result;
  }, [query]);
  const current = useAsync(fetch);

  const toggleCompleted = useCallback(async (task: LocalTask) => {
    await taskService.toggleCompleted(task);
  }, [taskService, current.update]);

  const togglePinned = useCallback(async (task: LocalTask) => {
    await taskService.togglePinned(task);
  }, [taskService, current.update]);

  useEffect(() => {
    const listener = () => {
      current.update();
    };
    taskService.addListener('taskUpdated', listener);
    return () => {
      taskService.removeListener('taskUpdated', listener);
    };
  }, [taskService]);

  return {
    ...current,
    toggleCompleted,
    togglePinned,
    service: taskService,
  };
};

const usePinnedQuery = () => {
  const pinnedQuery: Query = useCallback(q => q.where({ pinned: true }), []);
  return pinnedQuery;
}

const useNextQuery = () => {
  const nextQuery: Query = useCallback(
    q => q
      .where({
        completionDate: null,
        status: 'next',
      }),
    [],
  );
  return nextQuery;
};

export type { Query };
export { usePinnedQuery, useNextQuery };
export default useTasks;
