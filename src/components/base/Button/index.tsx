import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Theme } from 'theme';
import { Link } from 'typography';

interface Props {
  title: string;
  onPress?: () => any;
  accessibilityRole?: TouchableOpacity['props']['accessibilityRole'];
  accessibilityLabel?: string;
  accessibilityHint?: string;
  type?: 'primary' | 'secondary' | 'destructive';
}

const Touch = styled.TouchableOpacity``;

const Wrapper = styled.View<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.margins.small}px;
  border-radius: ${({ theme }) => theme.sizes.corners}px;
  align-items: center;
`;

const Button: React.FC<Props> = ({
  title,
  onPress,
  accessibilityHint,
  accessibilityRole,
  accessibilityLabel,
}) => (
  <Touch
    onPress={onPress}
    accessible
    accessibilityHint={accessibilityHint}
    accessibilityRole={accessibilityRole}
    accessibilityLabel={accessibilityLabel}
  >
    <Wrapper>
      <Link style={{ color: '#fff' }}>{title}</Link>
    </Wrapper>
  </Touch>
);

export default Button;
