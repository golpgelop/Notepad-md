import { View, TextInput } from 'react-native';
import React from 'react';

import { textBar } from './TextBar.styles';

interface INumberBarProps {
    code: string;
    currentLine: number;
}

const TextBar: React.FC<INumberBarProps> = ({ code, currentLine = 1 }) => {

    return (
        <View style={textBar.container}>
            <TextInput
                style={textBar.lineNumber}
                multiline={true}
                value={code}
            />

        </View>
    );
}

export default TextBar;


