import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Keyboard, Pressable, Platform } from 'react-native';

const KeyboardAvoiding = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Page: React.FC = ({ children }) => {
  const [keyboardShown, setKeyboardShown] = useState(false);
  useEffect(() => {
    const keyboardDidShow = () => setKeyboardShown(true);
    const keyboardDidHide = () => setKeyboardShown(false);
    Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", keyboardDidHide);
    };
  }, []);
  return (
    <Pressable
      style={{ backgroundColor: '#fff', flex: 1 }}
      disabled={!keyboardShown}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoiding behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {children}
      </KeyboardAvoiding>
    </Pressable>
  );
};

export default Page;
