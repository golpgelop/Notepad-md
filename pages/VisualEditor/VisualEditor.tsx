import React, { useState, useRef, useCallback } from 'react';
import { View, TextInput } from 'react-native';
import { visualEditor } from './VisualEditor.styles';
import PanelUp from './PanelUp/PanelUp';
import PanelDown from './PanelDown/PanelDown';
import TextBar from './TextBar/TextBar';
import { useKeyboard } from '../../hooks/useKeyboard';
import { IText } from '../PageManager';

const FONT_SIZES = [12, 16, 20, 24];

const VisualEditor: React.FC<IText> = ({ text, setText }) => {
  const [editing, setEditing] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const markArray = ['mark', '1.', '-', '•'];
  const [markIndex, setMarkIndex] = useState(0);
  const viewArray = ['view', '𝑩', 'S̶', '</>', '𝑰'];
  const [viewIndex, setViewIndex] = useState(0);

  const isKeyboardVisible = useKeyboard();
  const inputRef = useRef<TextInput>(null);
  const selectionRef = useRef({ start: 0, end: 0 });
  const prevTextRef = useRef(text);

  const handlePressPreview = () => setEditing(true);
  const handleSavePress = () => setEditing(false);

  const insertText = useCallback(
    (before: string, after: string = '', placeholder: string = '') => {
      if (!editing) return;
      const { start, end } = selectionRef.current;
      const selectedText = text.substring(start, end);
      const newText =
        text.substring(0, start) +
        before +
        (selectedText || placeholder) +
        after +
        text.substring(end);
      setText(newText);
      const cursorPos = start + before.length + (selectedText || placeholder).length;
      setTimeout(() => {
        inputRef.current?.setNativeProps({
          selection: { start: cursorPos, end: cursorPos },
        });
      }, 0);
    },
    [text, editing]
  );

  const handleMarkPress = () => {
    const nextIndex = (markIndex + 1) % markArray.length;
    setMarkIndex(nextIndex);
    const marker = markArray[nextIndex];
    if (marker === 'mark') return;

    const { start } = selectionRef.current;
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    const currentLine = text.substring(lineStart, start);

    const markerRegex = /^(\d+\.\s|[-*]\s)/;
    const match = currentLine.match(markerRegex);

    let newText = text;
    let cursorDelta = 0;

    if (match) {
      const oldMarker = match[0];
      newText =
        text.substring(0, lineStart) +
        (marker === '1.' ? '1. ' : marker === '-' ? '- ' : '* ') +
        text.substring(lineStart + oldMarker.length);
      cursorDelta = marker.length + 1 - oldMarker.length;
    } else {
      const insertStr = marker === '1.' ? '1. ' : marker === '-' ? '- ' : '* ';
      newText = text.substring(0, lineStart) + insertStr + text.substring(lineStart);
      cursorDelta = insertStr.length;
    }

    setText(newText);
    const newCursor = start + cursorDelta;
    setTimeout(() => {
      inputRef.current?.setNativeProps({
        selection: { start: newCursor, end: newCursor },
      });
    }, 0);
  };

  const handleLinePress = () => insertText('\n---\n');

  const handleViewPress = () => {
    const next = (viewIndex + 1) % viewArray.length;
    setViewIndex(next);
    const style = viewArray[next];
    if (style === 'view') return;
    switch (style) {
      case '𝑩':
        insertText('**', '**');
        break;
      case 'S̶':
        insertText('~~', '~~');
        break;
      case '</>':
        insertText('`', '`');
        break;
      case '𝑰':
        insertText('*', '*');
        break;
    }
  };

  const handleSizePress = () => {
    const currentIdx = FONT_SIZES.indexOf(fontSize);
    const nextIdx = (currentIdx + 1) % FONT_SIZES.length;
    setFontSize(FONT_SIZES[nextIdx]);
  };

  const handleChangeText = useCallback(
    (newText: string) => {
      if (!editing) {
        setText(newText);
        prevTextRef.current = newText;
        return;
      }

      const prev = prevTextRef.current;
      if (newText.length === prev.length + 1) {
        const { start } = selectionRef.current;
        const insertPos = start;
        const insertedChar = newText[insertPos - 1];
        if (insertedChar === '\n' && markIndex !== 0) {
          const marker = markArray[markIndex];
          if (marker === '1.') {
            const lineStart = newText.lastIndexOf('\n', insertPos - 2) + 1;
            const prevLine = newText.substring(lineStart, insertPos - 1);
            const match = prevLine.match(/^(\d+)\.\s/);
            if (match) {
              const nextNumber = parseInt(match[1], 10) + 1;
              const addition = `${nextNumber}. `;
              const updatedText =
                newText.substring(0, insertPos) + addition + newText.substring(insertPos);
              setTimeout(() => {
                inputRef.current?.setNativeProps({
                  selection: { start: insertPos + addition.length, end: insertPos + addition.length },
                });
              }, 0);
              setText(updatedText);
              prevTextRef.current = updatedText;
              return;
            }
          }
          if (marker === '-' || marker === '•') {
            const bullet = marker === '-' ? '- ' : '* ';
            const updatedText =
              newText.substring(0, insertPos) + bullet + newText.substring(insertPos);
            setTimeout(() => {
              inputRef.current?.setNativeProps({
                selection: { start: insertPos + bullet.length, end: insertPos + bullet.length },
              });
            }, 0);
            setText(updatedText);
            prevTextRef.current = updatedText;
            return;
          }
        }
      }

      setText(newText);
      prevTextRef.current = newText;
    },
    [editing, markIndex, markArray, setText]
  );

  const sizeIndex = FONT_SIZES.indexOf(fontSize) + 1;

  return (
    <View style={visualEditor.container}>
      <PanelUp
        markValue={markArray[markIndex]}
        viewValue={viewArray[viewIndex]}
        size={sizeIndex}
        onMarkPress={handleMarkPress}
        onLinePress={handleLinePress}
        onViewPress={handleViewPress}
        onSizePress={handleSizePress}
        onSavePress={handleSavePress}
      />
      <View style={{ marginTop: 110, flex: 1 }}>
        <TextBar
          code={text}
          onChangeText={handleChangeText}
          editing={editing}
          fontSize={fontSize}
          onPressPreview={handlePressPreview}
          selectionRef={selectionRef}
          inputRef={inputRef}
        />
      </View>
      {isKeyboardVisible && <PanelDown />}
    </View>
  );
};

export default VisualEditor;