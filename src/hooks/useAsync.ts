import { useState, useEffect, useCallback } from 'react';

enum States {
  Loading = 'loading',
  Refreshing = 'refreshing',
  Ready = 'ready',
  Failed = 'failed',
}

const useAsync = <T>(fn: () => Promise<T>) => {
  const [state, setState] = useState<States>(States.Loading);
  const [error, setError] = useState<any>(undefined);
  const [result, setResult] = useState<T | undefined>(undefined);
  const update = useCallback(async () => {
    setError(undefined);
    try {
      setResult(await fn());
      setState(States.Ready)
    } catch (err) {
      setError(err)
      setState(States.Failed)
      console.error(err);
    }
  }, [fn]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    state,
    error,
    result,
    update,
  };
};

export { States };

export default useAsync;
