import { View, Text } from 'react-native';
import { notes } from './Notes.styles';
import React from 'react';

const Notes: React.FC = () => {

    return (
        <View style={notes.container}>
            <Text>Название</Text>
            <Text>Какое-то содержание</Text>
        </View>
    );
}

export default Notes;


