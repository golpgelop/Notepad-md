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

  const getLineInfo = (pos: number, lines: string[]) => {
    let lineStart = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lineStart + lines[i].length >= pos) {
        return { lineIndex: i, col: pos - lineStart };
      }
      lineStart += lines[i].length + 1;
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

  // --- Движение стрелками (исправлено) ---

  const moveLeft = () => {
    inputRef.current?.focus();
    programmaticRef.current = true;

    if (!selectionMode) {
      setSelection((prev) => {
        const newPos =
          prev.start === prev.end ? Math.max(0, prev.start - 1) : prev.start;
        return { start: newPos, end: newPos };
      });
    } else {
      const anchor = anchorRef.current;
      let newStart = selection.start;
      let newEnd = selection.end;

      if (newStart === newEnd) {
        // Начало выделения: сдвигаем влево от якоря
        newStart = Math.max(0, newStart - 1);
        // newEnd остаётся равным anchor
      } else if (anchor <= newStart) {
        // Якорь слева (или равен start) – двигаем правый конец (end)
        newEnd = Math.max(newStart, newEnd - 1);
      } else {
        // Якорь справа – двигаем левый конец (start)
        newStart = Math.max(0, newStart - 1);
      }

      setSelection({ start: newStart, end: newEnd });
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
      let newStart = selection.start;
      let newEnd = selection.end;

      if (newStart === newEnd) {
        // Начало выделения: сдвигаем вправо от якоря
        newEnd = Math.min(text.length, newEnd + 1);
      } else if (anchor <= newStart) {
        // Якорь слева – двигаем правый конец (end)
        newEnd = Math.min(text.length, newEnd + 1);
      } else {
        // Якорь справа – двигаем левый конец (start) к якорю
        newStart = Math.min(newEnd, newStart + 1);
      }

      setSelection({ start: newStart, end: newEnd });
    }
  };

  const moveUp = () => {
    inputRef.current?.focus();
    programmaticRef.current = true;
    const lines = text.split('\n');

    if (!selectionMode) {
      const cursorPos = selection.start;
      const { lineIndex, col } = getLineInfo(cursorPos, lines);
      if (lineIndex > 0) {
        const newCol = Math.min(col, lines[lineIndex - 1].length);
        const newPos = getPosFromLineCol(lineIndex - 1, newCol, lines);
        setSelection({ start: newPos, end: newPos });
      }
    } else {
      const anchor = anchorRef.current;
      // Определяем подвижный конец
      const movablePos =
        anchor <= selection.start ? selection.end : selection.start;
      const { lineIndex, col } = getLineInfo(movablePos, lines);
      if (lineIndex > 0) {
        const newCol = Math.min(col, lines[lineIndex - 1].length);
        const newPos = getPosFromLineCol(lineIndex - 1, newCol, lines);
        const newStart = Math.min(anchor, newPos);
        const newEnd = Math.max(anchor, newPos);
        setSelection({ start: newStart, end: newEnd });
      }
    }
  };

  const moveDown = () => {
    inputRef.current?.focus();
    programmaticRef.current = true;
    const lines = text.split('\n');

    if (!selectionMode) {
      const cursorPos = selection.start;
      const { lineIndex, col } = getLineInfo(cursorPos, lines);
      if (lineIndex < lines.length - 1) {
        const newCol = Math.min(col, lines[lineIndex + 1].length);
        const newPos = getPosFromLineCol(lineIndex + 1, newCol, lines);
        setSelection({ start: newPos, end: newPos });
      }
    } else {
      const anchor = anchorRef.current;
      const movablePos =
        anchor <= selection.start ? selection.end : selection.start;
      const { lineIndex, col } = getLineInfo(movablePos, lines);
      if (lineIndex < lines.length - 1) {
        const newCol = Math.min(col, lines[lineIndex + 1].length);
        const newPos = getPosFromLineCol(lineIndex + 1, newCol, lines);
        const newStart = Math.min(anchor, newPos);
        const newEnd = Math.max(anchor, newPos);
        setSelection({ start: newStart, end: newEnd });
      }
    }
  };

  // --- Кнопки ---
  const handlePut = () => {
    if (!selectionMode) {
      anchorRef.current = selection.start;
      setSelectionMode(true);
    } else {
      setSelectionMode(false);
    }
  };

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