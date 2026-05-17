// TextBar/TextBar.tsx
import React, { useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';

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
    <View style={styles.container}>
      {editing ? (
        <TextInput
          ref={inputRef}
          style={[styles.input, { fontSize }]}
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
          style={styles.preview}
          activeOpacity={0.8}
          onPress={onPressPreview}
        >
          <Markdown style={{ body: { fontSize } }}>{code || ' '}</Markdown>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3c3c3cff',
    padding: 10,
  },
  input: {
    color: '#b4b4b4ff',
    fontFamily: 'monospace',
    flex: 1,
    textAlignVertical: 'top',
    padding: 0,
  },
  preview: {
    flex: 1,
  },
});

export default TextBar;