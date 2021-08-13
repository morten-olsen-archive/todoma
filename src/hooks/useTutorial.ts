import { useContext } from 'react';
import TutorialContext from 'contexts/TutorialContext';

const useTutorial = () => {
  const context = useContext(TutorialContext);
  return context;
};

export default useTutorial;
