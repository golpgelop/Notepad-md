import { View, TextInput } from 'react-native';
import React from 'react';

import { textBar } from './TextBar.styles';

interface ITextBarProps {
  code: string;
  currentLine: number;
  onChangeText: (text: string) => void;   // добавляем колбэк
}

const TextBar: React.FC<ITextBarProps> = ({ code, currentLine = 1, onChangeText }) => {
  return (
    <View style={textBar.container}>
      <TextInput
        style={textBar.lineNumber}
        multiline={true}
        value={code}                  
        onChangeText={onChangeText}     
      />
    </View>
  );
};

export default TextBar;