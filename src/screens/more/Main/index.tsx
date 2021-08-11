import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { MoreStackNavigationProps } from 'Router';
import Header from 'components/base/Header';
import Page from 'components/Page';
import Row, { Cell } from 'components/base/Row';
import { Ionicons } from '@expo/vector-icons';

const Scroll = styled.ScrollView`
  flex: 1;
`;
const MoreMain: React.FC<{}> = () => {
  const navigation = useNavigation<MoreStackNavigationProps>();
  return (
    <Page>
      <Header title="More" />
      <Scroll>
        <Row
          title="Watching"
          onPress={() => navigation.navigate('Watching')}
          left={
            <Cell>
              <Ionicons name="eye-outline" size={26} />
            </Cell>
          }
          right={
            <Cell>
              <Ionicons name="chevron-forward-outline" size={26} />
            </Cell>
          }
        />
        <Row
          title="Completed"
          onPress={() => navigation.navigate('Completed')}
          left={
            <Cell>
              <Ionicons name="checkmark-circle-outline" size={26} />
            </Cell>
          }
          right={
            <Cell>
              <Ionicons name="chevron-forward-outline" size={26} />
            </Cell>
          }
        />
      </Scroll>
    </Page>
  );
};

export default MoreMain;
