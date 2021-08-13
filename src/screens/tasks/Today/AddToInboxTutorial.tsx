import React from 'react';
import Tutorial from 'components/tutorial/Screen';
import { Body1 } from 'typography';

const text = (
  <Body1>
    Hey there,

    Time for a quick into to todoma! It uses a "methology" that is kind of a mix between GTD and Scrum/Kanban, but before getting to deep into that, let's start simple by adding a task to the "inbox" using the "Add to inbox" field above.
  </Body1>
);

const AddToInboxTutorial: React.FC<{}> = () => <Tutorial text={text} />;

export default AddToInboxTutorial;
