import { TouchableOpacity, View, Alert, TextInput, Text } from 'react-native';
import { codeEditor } from './CodeEditor.styles';
import React, { useState } from 'react';

import PanelDown from './PanelDown/PanelDown';
import NumberBar from './NumberBar/NumberBar';

import { useKeyboard } from '../../hooks/useKeyboard';

const CodeEditor: React.FC = () => {

    const [text, setText] = useState('');
    const isKeyboardVisible = useKeyboard();

    return (
        <View style={codeEditor.container}>

            {isKeyboardVisible && <PanelDown />}
            <NumberBar number={10} currentLine={1} />

        </View>
    );
}

export default CodeEditor;


