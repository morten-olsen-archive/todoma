import React, { ReactNode } from 'react';
import { Cell } from 'components/base/Row';
import LocalTask, { Statuses } from 'models/LocalTask';

interface Props {
  task: LocalTask;
  icon: ReactNode;
  allowedTransitions?: Statuses[];
  transition: Statuses;
  changeStatus?: (status: Statuses) => any;
}

const ListItemTransition: React.FC<Props> = ({
  icon,
  task,
  transition,
  allowedTransitions,
  changeStatus,
}) => {
  if (
    !changeStatus ||
    task.status === transition ||
    (allowedTransitions && !allowedTransitions.includes(transition))
  ) {
    return <></>;
  }
  return <Cell onPress={() => changeStatus(transition)}>{icon}</Cell>;
};

export default ListItemTransition;
