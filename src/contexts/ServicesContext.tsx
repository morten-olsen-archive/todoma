import React, { createContext, useState, useCallback, useEffect } from 'react';
import { Container } from 'typedi';
import TaskService from 'services/Tasks';
import createDB from 'db/create';
import ProviderService, { ProviderFactories } from 'services/Providers';
import githubProvider from 'providers/Github';
import dbConfig from 'configs/db';
import { Connection, getConnection } from 'typeorm';
import useTutorial from 'hooks/useTutorial';

interface ServicesContextValue {
  taskService: TaskService;
  providerService: ProviderService;
}

const ServicesContext = createContext<ServicesContextValue>({} as any);

const ServicesProvider: React.FC = ({ children }) => {
  const [services, setServices] = useState<ServicesContextValue | undefined>(
    undefined
  );
  const { completes } = useTutorial();
  const setup = useCallback(async () => {
    const providerFactories = new ProviderFactories({
      github: githubProvider,
    });
    let db: Connection;
    try {
      db = getConnection();
    } catch (err) {
      db = await createDB(dbConfig);
    }
    Container.set(Connection, db);
    Container.set(ProviderFactories, providerFactories);
    const providerService = Container.get(ProviderService);
    const taskService = Container.get(TaskService);
    setServices({
      taskService,
      providerService,
    });
    taskService.addListener('taskUpdated', (_, task) => {
      completes('add-to-inbox');
      if (task && task.status === 'backlog') {
        completes('add-task-to-backlog');
      }
      if (task && task.status === 'next') {
        completes('add-task-to-next');
      }
      if (task && task.completionDate) {
        completes('mark-completed');
      }
    });
  }, [completes]);
  useEffect(() => {
    setup().catch((err) => {
      console.error(err);
    });
  }, [setup]);
  if (!services) {
    return <></>;
  }
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export { ServicesProvider };

export default ServicesContext;
