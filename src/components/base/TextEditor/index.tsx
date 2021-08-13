import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import Row from 'components/base/Row';
import Popup from 'components/base/Popup';
import { Body1 } from 'typography';

interface Props {
  title: string;
  value: string;
  onChangeText: (value: string) => void;
}

const TextInput = styled.TextInput`
  height: 300px;
  padding: 5px;
  margin: 0 ${({ theme }) => theme.margins.medium}px;
`;

const TextEditor: React.FC<Props> = ({ title, value, onChangeText }) => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => setInputValue(value), [value]);

  return (
    <Row overline={title} onPress={() => setVisible(true)}>
      <Body1>{value}</Body1>
      <Popup
        visible={visible}
        onClose={() => {
          onChangeText(inputValue);
          setVisible(false);
        }}
      >
        <TextInput
          multiline
          placeholder={title}
          value={inputValue}
          onChangeText={setInputValue}
        />
      </Popup>
    </Row>
  );
};

export default TextEditor;
