import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Row, { Cell } from 'components/base/Row';
import Button from 'components/base/Button';
import { Jumbo } from 'typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  title: string;
  back?: boolean;
  actions?: {
    title: string;
    onPress?: () => any;
  }[];
  right?: ReactNode;
}

const Header: React.FC<Props> = ({ title, back, actions, right }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ marginTop: insets.top }}>
      <Row
        left={!!back && (
          <Cell onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle" size={26} />
          </Cell>
        )}
        right={(actions || right) && (
          <>
            {actions && actions.map((action) => (
              <Button
                key={action.title}
                title={action.title}
                onPress={action.onPress}
              />
            ))}
            {right}
          </>
        )}
      >
        <Jumbo>{title}</Jumbo>
      </Row>
    </View>
  );
}

export default Header;
