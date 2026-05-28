import { View, Text } from 'react-native';
import React from 'react';

import { numberBar } from './NumberBar.styles';

interface INumberBarProps {
    numberLen: number;
    currentLine?: number;
}

const NumberBar: React.FC<INumberBarProps> = ({ numberLen, currentLine }) => {

    const lines = Array.from({ length: numberLen }, (_, i) => i + 1);

    return (
        <View style={numberBar.container}>
            {lines.map((lineNum) => (
                <Text
                    key={lineNum}
                    style={[
                        numberBar.lineNumber,
                        currentLine === lineNum && numberBar.activeLine
                    ]}
                >
                    {lineNum}
                </Text>
            ))}
        </View>
    );
}

export default NumberBar;


