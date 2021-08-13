import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { Title1, Body1, Overline } from 'typography';
import Cell from './Cell';
import PlaceholderIcon from './PlaceholderIcon';

interface Props {
  background?: string;
  top?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  title?: ReactNode;
  overline?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  onPress?: () => any;
}

const Children = styled.View``;

const componentOrString = (
  input: ReactNode,
  Component: React.FC<{ children: ReactNode }>
) => {
  if (!input) {
    return null;
  }
  if (typeof input === 'string') {
    return <Component>{input}</Component>;
  }
  return input;
};

const Row: React.FC<Props> = ({
  background,
  top,
  left,
  right,
  title,
  overline,
  description,
  children,
  onPress,
}) => (
  <Cell style={{ borderRadius: 10 }} background={background} onPress={onPress}>
    {left}
    <Cell flex={1} direction="column" align="stretch">
      {!!top}
      {componentOrString(overline, Overline)}
      {componentOrString(title, Title1)}
      {componentOrString(description, Body1)}
      {!!children && <Children>{children}</Children>}
    </Cell>
    {right}
  </Cell>
);

export { Cell, PlaceholderIcon };
export default Row;
