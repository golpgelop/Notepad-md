import { View, Text } from 'react-native';
import React from 'react';

import { textBar } from './TextBar.styles';

interface INumberBarProps {
    codeArr: string[];
    currentLine?: number;
}

const TextBar: React.FC<INumberBarProps> = ({ codeArr, currentLine }) => {

    const lines = Array.from({ length: codeArr.length }, (_, i) => i + 1);

    return (
        <View style={textBar.container}>
            {lines.map((lineNum) => (
                <Text
                    key={lineNum}
                    style={[
                        textBar.lineNumber,
                        currentLine === lineNum && textBar.activeLine
                    ]}
                >
                    {codeArr[lineNum - 1]}
                </Text>
            ))}
        </View>
    );
}

export default TextBar;


