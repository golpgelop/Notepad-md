// TextBar/TextBar.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { textbar } from './TextBar.styles';

interface ITextBarProps {
  code: string;
  onChangeText: (text: string) => void;
  editing: boolean;
  fontSize: number;
  onPressPreview: () => void;
  onBlur: () => void;
  selectionRef: React.MutableRefObject<{ start: number; end: number }>;
  inputRef: React.RefObject<TextInput>;
}

const TextBar: React.FC<ITextBarProps> = ({
  code,
  onChangeText,
  editing,
  fontSize,
  onPressPreview,
  onBlur,
  selectionRef,
  inputRef,
}) => {
  return (
    <View style={textbar.container}>
      {editing ? (
        <TextInput
          ref={inputRef}
          style={[textbar.input, { fontSize }]}
          multiline
          value={code}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onSelectionChange={(e) => {
            selectionRef.current = e.nativeEvent.selection;
          }}
          autoFocus
        />
      ) : (
        <TouchableOpacity
          style={textbar.preview}
          activeOpacity={0.8}
          onPress={onPressPreview}
        >
          <Markdown style={
            { body: { 
              color: '#b4b4b4ff',
              fontSize
             } }
          }>{code || ' '}</Markdown>
        </TouchableOpacity>
      )}
    </View>
  );
};


export default TextBar;