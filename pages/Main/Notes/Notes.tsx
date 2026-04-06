import { View, Text } from 'react-native';
import { notes } from './Notes.styles';
import React from 'react';

const Notes: React.FC = () => {

    return (

        <View style={notes.container}>
            <Text style={notes.head}>Название</Text>
            <Text style={notes.description}>Какое-то содержание</Text>
        </View>

    );
}

export default Notes;


