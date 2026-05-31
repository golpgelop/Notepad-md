import { View, TextInput } from 'react-native';
import React from 'react';
import { textBar } from './TextBar.styles';

interface ITextBarProps {
  code: string;
  currentLine: number;
  onChangeText: (text: string) => void;
  inputRef: React.RefObject<TextInput | null>;
  onSelectionChange: (e: any) => void;
  selection: { start: number; end: number }; 
}

const TextBar: React.FC<ITextBarProps> = ({
  code,
  currentLine,
  onChangeText,
  inputRef,
  onSelectionChange,
  selection,
}) => {
  return (
    <View style={textBar.container}>
      <TextInput
        ref={inputRef}
        style={textBar.lineNumber}
        multiline={true}
        value={code}
        onChangeText={onChangeText}
        onSelectionChange={onSelectionChange}
        selection={selection}             
      />
    </View>
  );
};

export default TextBar;