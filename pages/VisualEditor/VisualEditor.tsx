import { TouchableOpacity, View, Alert, TextInput, Text } from 'react-native';
import { visualEditor } from './VisualEditor.styles';
import React, { useState } from 'react';

import PanelUp from './PanelUp/PanelUp';
import PanelDown from './PanelDown/PanelDown';

import { useKeyboard } from '../../hooks/useKeyboard';

const VisualEditor: React.FC = () => {

    const [text, setText] = useState('');
    const isKeyboardVisible = useKeyboard();

    return (
        <View style={visualEditor.container}>

            <PanelUp/>
            {isKeyboardVisible && <PanelDown/>}
            
        </View>
    );
}

export default VisualEditor;


