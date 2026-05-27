import { TouchableOpacity, View, Alert, TextInput, ScrollView } from 'react-native';
import { codeEditor } from './CodeEditor.styles';
import React, { useState } from 'react';

import PanelDown from './PanelDown/PanelDown';
import NumberBar from './NumberBar/NumberBar';
import TextBar from './TextBar/TextBar';

import { useKeyboard } from '../../hooks/useKeyboard';
import { IText } from '../PageManager';

const CodeEditor: React.FC<IText> = ({text, setText}) => {

  const isKeyboardVisible = useKeyboard();

  const codeArr = text.split('\n');

  const handleChangeText = (newText: string) => {
    setText(newText);
  };

  return (
    <ScrollView style={codeEditor.scrollView}>
      <View style={codeEditor.container}>
        {isKeyboardVisible && <PanelDown />}
        <NumberBar numberLen={codeArr.length} currentLine={1} />
        <TextBar
          code={text}            
          onChangeText={handleChangeText}
          currentLine={1}
        />
      </View>
    </ScrollView>
  );
};

export default CodeEditor;