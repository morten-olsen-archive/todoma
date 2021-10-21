import ServicesContext from 'contexts/ServicesContext';
import React, { useMemo } from 'react';
import MockTaskService from './MockTaskService';

const Provider: React.FC = ({ children }) => {
  const taskService = useMemo(() => new MockTaskService(), []);
  
  return (
    <ServicesContext.Provider value={{ taskService }}>
      {children}
    </ServicesContext.Provider>
  )
};


export default Provider;
