import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TutorialContextValue {
  current: string;
  completes: (step: string) => Promise<void>;
}

interface TutorialProviderProps {
  steps: string[];
  children: ReactNode;
}

const TutorialContext = createContext<TutorialContextValue>({} as any);

const TutorialProvider: React.FC<TutorialProviderProps> = ({
  steps,
  children,
}) => {
  const [current, setCurrent] = useState<string | undefined>();
  const completes = useCallback(
    async (step: string) => {
      if (step !== current) {
        return;
      }
      const index = steps.findIndex((i) => i === step);
      const newValue = steps[index + 1] || 'done';
      setCurrent(newValue);
      await AsyncStorage.setItem('tutorial_step', newValue);
    },
    [current, steps]
  );
  useEffect(() => {
    const run = async () => {
      const value = await AsyncStorage.getItem('tutorial_step');
      setCurrent(value || steps[0]);
    };
    run();
  }, [setCurrent, steps]);

  if (!current) {
    return <></>;
  }
  return (
    <TutorialContext.Provider
      value={{
        current,
        completes,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};

export { TutorialProvider };

export default TutorialContext;
