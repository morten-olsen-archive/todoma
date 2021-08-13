import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Row, { Cell } from 'components/base/Row';
import Button from 'components/base/Button';

interface Props {
  text: string | ReactNode;
}

const Wrapper = styled.View`
  margin: ${({ theme }) => theme.margins.medium}px;
`;

const TutorialScreen: React.FC<Props> = ({ text }) => (
  <Wrapper>
    <Row
      background="#ededed"
      title="Tutorial"
      description={text}
      left={
        <Cell>
          <Ionicons name="help-buoy-outline" size={26} />
        </Cell>
      }
      right={
        <>
          <Cell>
            <Button title="Next" />
          </Cell>
          <Cell>
            <Button title="Skip" />
          </Cell>
        </>
      }
    />
  </Wrapper>
);

export default TutorialScreen;
