import { TouchableOpacity, View, Alert, TextInput, ScrollView } from 'react-native';
import { codeEditor } from './CodeEditor.styles';
import React, { useState, useRef, useCallback } from 'react';

import PanelDown from './PanelDown/PanelDown';
import NumberBar from './NumberBar/NumberBar';
import TextBar from './TextBar/TextBar';

import { useKeyboard } from '../../hooks/useKeyboard';
import { IText } from '../PageManager';
import UIKeyboard from './UIKeyboard/UIKeyboard';

const CodeEditor: React.FC<IText> = ({ text, setText }) => {
  const isKeyboardVisible = useKeyboard();
  const inputRef = useRef<TextInput>(null);
  const codeArr = text.split('\n');

  const [selection, setSelection] = useState<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });

  const handleChangeText = (newText: string) => {
    setText(newText);
  };


  const handleSelectionChange = useCallback((e: any) => {
    setSelection(e.nativeEvent.selection);
  }, []);


  const moveLeft = () => {
    inputRef.current?.focus();            
    setSelection(prev => {
      const newPos = prev.start === prev.end
        ? Math.max(0, prev.start - 1)
        : prev.start;
      return { start: newPos, end: newPos };
    });
  };

  // Вправо
  const moveRight = () => {
    inputRef.current?.focus();
    setSelection(prev => {
      const newPos = prev.start === prev.end
        ? Math.min(text.length, prev.start + 1)
        : prev.end;
      return { start: newPos, end: newPos };
    });
  };

  // Вверх
  const moveUp = () => {
    inputRef.current?.focus();
    const cursor = selection.start;
    const lines = text.split('\n');
    let lineStart = 0;
    let lineIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      if (lineStart + lines[i].length >= cursor) {
        lineIndex = i;
        break;
      }
      lineStart += lines[i].length + 1; 
    }

    if (lineIndex > 0) {
      const col = cursor - lineStart;
      const prevLine = lines[lineIndex - 1];
      const newCol = Math.min(col, prevLine.length);
      let newPos = 0;
      for (let i = 0; i < lineIndex - 1; i++) {
        newPos += lines[i].length + 1;
      }
      newPos += newCol;
      setSelection({ start: newPos, end: newPos });
    }
  };

  // Вниз
  const moveDown = () => {
    inputRef.current?.focus();
    const cursor = selection.start;
    const lines = text.split('\n');
    let lineStart = 0;
    let lineIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      if (lineStart + lines[i].length >= cursor) {
        lineIndex = i;
        break;
      }
      lineStart += lines[i].length + 1;
    }

    if (lineIndex < lines.length - 1) {
      const col = cursor - lineStart;
      const nextLine = lines[lineIndex + 1];
      const newCol = Math.min(col, nextLine.length);
      let newPos = 0;
      for (let i = 0; i < lineIndex + 1; i++) {
        newPos += lines[i].length + 1;
      }
      newPos += newCol;
      setSelection({ start: newPos, end: newPos });
    }
  };

  return (
    <>
      <ScrollView style={codeEditor.scrollView}>
        <View style={codeEditor.container}>
          {isKeyboardVisible && <PanelDown />}
          <NumberBar numberLen={codeArr.length} currentLine={1} />
          <TextBar
            code={text}
            onChangeText={handleChangeText}
            currentLine={1}
            inputRef={inputRef}
            onSelectionChange={handleSelectionChange}
            selection={selection}         
          />
        </View>
      </ScrollView>
      <UIKeyboard
        onLeft={moveLeft}
        onRight={moveRight}
        onUp={moveUp}
        onDown={moveDown}
      />
    </>
  );
};

export default CodeEditor;