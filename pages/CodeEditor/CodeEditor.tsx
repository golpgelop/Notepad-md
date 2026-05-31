import {
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
  Clipboard,
} from 'react-native';
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

  
  const [selectionMode, setSelectionMode] = useState(false);
 
  const anchorRef = useRef(0);
 
  const programmaticRef = useRef(false);

  const handleChangeText = (newText: string) => {
    setText(newText);
  };

  const handleSelectionChange = useCallback(
    (e: any) => {
      const newSel = e.nativeEvent.selection;

   
      if (programmaticRef.current) {
        programmaticRef.current = false;
        setSelection(newSel);
        return;
      }

    
      if (selectionMode && newSel.start !== anchorRef.current) {
        setSelectionMode(false);
      }

      setSelection(newSel);
    },
    [selectionMode]
  );

  // --- Вспомогательные функции ---


  const getLineInfo = (pos: number, lines: string[]) => {
    let lineStart = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lineStart + lines[i].length >= pos) {
        return { lineIndex: i, col: pos - lineStart };
      }
      lineStart += lines[i].length + 1; // +1 за \n
    }
    return { lineIndex: lines.length - 1, col: lines[lines.length - 1]?.length || 0 };
  };


  const getPosFromLineCol = (lineIndex: number, col: number, lines: string[]) => {
    let pos = 0;
    for (let i = 0; i < lineIndex; i++) {
      pos += lines[i].length + 1;
    }
    pos += Math.min(col, lines[lineIndex]?.length || 0);
    return pos;
  };

  // --- Движение стрелками ---

  const moveLeft = () => {
    inputRef.current?.focus();
    programmaticRef.current = true;
    if (!selectionMode) {
      setSelection((prev) => {
        const newPos =
          prev.start === prev.end
            ? Math.max(0, prev.start - 1)
            : prev.start;
        return { start: newPos, end: newPos };
      });
    } else {
      const anchor = anchorRef.current;
      const newEnd = Math.max(0, selection.end - 1);
      const start = Math.min(anchor, newEnd);
      const end = Math.max(anchor, newEnd);
      setSelection({ start, end });
    }
  };

  const moveRight = () => {
    inputRef.current?.focus();
    programmaticRef.current = true;
    if (!selectionMode) {
      setSelection((prev) => {
        const newPos =
          prev.start === prev.end
            ? Math.min(text.length, prev.start + 1)
            : prev.end;
        return { start: newPos, end: newPos };
      });
    } else {
      const anchor = anchorRef.current;
      const newEnd = Math.min(text.length, selection.end + 1);
      const start = Math.min(anchor, newEnd);
      const end = Math.max(anchor, newEnd);
      setSelection({ start, end });
    }
  };

  const moveUp = () => {
    inputRef.current?.focus();
    programmaticRef.current = true;
    const lines = text.split('\n');
    const cursorPos = selectionMode ? selection.end : selection.start;
    const { lineIndex, col } = getLineInfo(cursorPos, lines);

    if (lineIndex > 0) {
      const newCol = Math.min(col, lines[lineIndex - 1].length);
      const newPos = getPosFromLineCol(lineIndex - 1, newCol, lines);

      if (!selectionMode) {
        setSelection({ start: newPos, end: newPos });
      } else {
        const anchor = anchorRef.current;
        const start = Math.min(anchor, newPos);
        const end = Math.max(anchor, newPos);
        setSelection({ start, end });
      }
    }
  };

  const moveDown = () => {
    inputRef.current?.focus();
    programmaticRef.current = true;
    const lines = text.split('\n');
    const cursorPos = selectionMode ? selection.end : selection.start;
    const { lineIndex, col } = getLineInfo(cursorPos, lines);

    if (lineIndex < lines.length - 1) {
      const newCol = Math.min(col, lines[lineIndex + 1].length);
      const newPos = getPosFromLineCol(lineIndex + 1, newCol, lines);

      if (!selectionMode) {
        setSelection({ start: newPos, end: newPos });
      } else {
        const anchor = anchorRef.current;
        const start = Math.min(anchor, newPos);
        const end = Math.max(anchor, newPos);
        setSelection({ start, end });
      }
    }
  };

  // --- Кнопка put (переключение режима выделения) ---
  const handlePut = () => {
    if (!selectionMode) {

      anchorRef.current = selection.start;
      setSelectionMode(true);
    } else {

      setSelectionMode(false);
    }
  };

  // --- Кнопка past (вставить из буфера и выйти из режима) ---
  const handlePast = async () => {
    try {
      const clipboardContent = await Clipboard.getString();
      if (clipboardContent) {
        const { start, end } = selection;
        const newText =
          text.substring(0, start) + clipboardContent + text.substring(end);
        setText(newText);
        const newPos = start + clipboardContent.length;
        programmaticRef.current = true;
        setSelection({ start: newPos, end: newPos });
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось вставить из буфера обмена');
    }
    setSelectionMode(false);
  };

  // --- Кнопка copy (копировать выделенное) ---
  const handleCopy = () => {
    const { start, end } = selection;
    const selectedText = text.substring(start, end);
    if (selectedText.length > 0) {
      Clipboard.setString(selectedText);
      Alert.alert('Скопировано', selectedText);
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
        onPut={handlePut}
        onPast={handlePast}
        onCopy={handleCopy}
      />
    </>
  );
};

export default CodeEditor;