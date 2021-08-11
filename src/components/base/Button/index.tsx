import React from 'react';
import styled from 'styled-components/native';
import { Theme } from 'theme';
import { Link } from 'typography';

interface Props {
  title: string;
  onPress?: () => any;
  type?: 'primary' | 'secondary' | 'destructive';
}

const Touch = styled.TouchableOpacity``;

const Wrapper = styled.View<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.margins.small}px;
  border-radius: ${({ theme }) => theme.sizes.corners}px;
`;

const Button: React.FC<Props> = ({ title, onPress }) => (
  <Touch onPress={onPress}>
    <Wrapper>
      <Link style={{ color: '#fff' }}>{title}</Link>
    </Wrapper>
  </Touch>
);

export default Button;
