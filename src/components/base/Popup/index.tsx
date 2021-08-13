import React, { ReactNode } from 'react';
import { Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Row, { Cell } from 'components/base/Row';

interface Props {
  visible: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Top = styled.Pressable`
  flex: 1;
`;

const Wrapper = styled.View`
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 1;
  shadow-radius: 200px;
`;

const Outer = styled.View`
  flex: 1;
`;

const Popup: React.FC<Props> = ({ visible, children, onClose }) => {
  const insets = useSafeAreaInsets();

  if (!visible) {
    return <></>;
  }

  return (
    <Modal transparent animationType="slide">
      <Outer>
        <Top onPress={onClose} />
        <Wrapper style={{ paddingBottom: insets.bottom }}>
          <Row
            right={
              <Cell onPress={onClose}>
                <Ionicons name="close-circle-outline" size={26} />
              </Cell>
            }
          />
          {children}
        </Wrapper>
      </Outer>
    </Modal>
  );
};

export default Popup;
