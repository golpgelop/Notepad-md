import React, { useState, useRef, useCallback } from 'react';
import { View, TextInput } from 'react-native';
import { visualEditor } from './VisualEditor.styles';
import PanelUp from './PanelUp/PanelUp';
import PanelDown from './PanelDown/PanelDown'
import TextBar from './TextBar/TextBar';
import { useKeyboard } from '../../hooks/useKeyboard';

const FONT_SIZES = [12, 16, 20, 24];

const VisualEditor: React.FC = () => {
  const primer = '# Welcome to StackEdit!\n\nПривет, **мир**!\n\n- пункт 1\n- пункт 2';
  const [text, setText] = useState(primer);
  const [editing, setEditing] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const markArray = ['mark', '1.', '-', '•'];
  const [markIndex, setMarkIndex] = useState(0);
  const viewArray = ['view', '𝑩', 'S̶', '</>', '𝑰'];
  const [viewIndex, setViewIndex] = useState(0);

  const isKeyboardVisible = useKeyboard();
  const inputRef = useRef<TextInput>(null);
  const selectionRef = useRef({ start: 0, end: 0 });

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
    const next = (markIndex + 1) % markArray.length;
    setMarkIndex(next);
    const marker = markArray[next];
    if (marker === 'mark') return;
    if (marker === '1.') insertText('1. ');
    else if (marker === '-') insertText('- ');
    else if (marker === '•') insertText('* ');
  };

  const handleLinePress = () => insertText('\n---\n');

  const handleViewPress = () => {
    const next = (viewIndex + 1) % viewArray.length;
    setViewIndex(next);
    const style = viewArray[next];
    if (style === 'view') return;
    switch (style) {
      case '𝑩': insertText('**', '**'); break;
      case 'S̶': insertText('~~', '~~'); break;
      case '</>': insertText('`', '`'); break;
      case '𝑰': insertText('*', '*'); break;
    }
  };

  const handleSizePress = () => {
    const currentIdx = FONT_SIZES.indexOf(fontSize);
    const nextIdx = (currentIdx + 1) % FONT_SIZES.length;
    setFontSize(FONT_SIZES[nextIdx]);
  };

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
        onSavePress={handleSavePress}       // 💾
      />
      <View style={{ marginTop: 110, flex: 1 }}>
        <TextBar
          code={text}
          onChangeText={setText}
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