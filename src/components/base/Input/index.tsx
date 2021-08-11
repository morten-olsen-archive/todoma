import React from 'react';
import styled from 'styled-components/native';
import { Theme } from 'theme';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => any;
}

const InputField = styled.TextInput<{ theme: Theme }>`
  background: ${({ theme }) => theme.colors.shade};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.margins.small}px;
  font-size: ${({ theme }) => theme.font.baseSize}px;
  border-radius: ${({ theme }) => theme.sizes.corners}px;
  width: 100%;
`;

const Input: React.FC<Props> = ({ label, value, onChangeText }) => (
  <InputField value={value} placeholder={label} onChangeText={onChangeText} />
);

export default Input;
