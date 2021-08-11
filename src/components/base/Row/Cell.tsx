import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { Theme } from 'theme';

interface Props {
  children?: ReactNode;
  onPress?: () => any;
  background?: string;
  flex?: string | number;
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
}

const Wrapper = styled.View<{
  background?: string;
  flex?: string | number;
  direction?: 'row' | 'column';
  theme: Theme;
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
}>`
  padding: ${({ theme }) => theme.margins.medium / 2}px;
  ${({ background }) => (background ? `background: ${background};` : '')}
  ${({ flex }) => (flex ? `flex: ${flex};` : '')}
  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
  align-items: ${({ align }) => (align ? align : 'center')};
`;

const Touch = styled.TouchableOpacity``;

const Cell: React.FC<Props> = ({ children, onPress, ...others }) => {
  const node = <Wrapper {...others}>{children}</Wrapper>;
  if (onPress) {
    return <Touch onPress={onPress}>{node}</Touch>;
  }
  return node;
};

export default Cell;
