import React from 'react';
import Tutorial from 'components/tutorial/Screen';
import { Body1 } from 'typography';

const text = (
  <Body1>
    Hurray! you have now created your first task. But notice how it isn't shown? That is because you are on the "Today" view. This is the place you are ment to use throughout your day.{'\n'}Usually when we get a new task, that isn't the best time to actually fill out that task, so instead of blocking you, it is simple sent to your inbox in the "Planning" tab. You should go there now.
  </Body1>
);

const AddToInboxTutorial: React.FC<{}> = () => <Tutorial text={text} />;

export default AddToInboxTutorial;
