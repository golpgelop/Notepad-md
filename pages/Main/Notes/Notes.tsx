import { View, Text, ScrollView } from 'react-native';
import { notes, getNoteStyle } from './Notes.styles';
import React from 'react';

type NoteType = {
    id: number;
    title: string;
    description: string;
};

const Notes: React.FC = () => {
    const notesData: NoteType[] = [
        { id: 1, title: 'Первая заметка', description: 'Содержание первой заметки' },
        { id: 2, title: 'Вторая заметка', description: 'Содержание второй заметки' },
        { id: 3, title: 'Третья заметка', description: 'Содержание третьей заметки' },
        { id: 4, title: 'Первая заметка', description: 'Содержание первой заметки' },
        { id: 5, title: 'Вторая заметка', description: 'Содержание второй заметки' },
        { id: 6, title: 'Третья заметка', description: 'Содержание третьей заметки' },
    ];

    return (
        <ScrollView>
            <View style={notes.container}>
                {notesData.map(note => (
                    <View key={note.id} style={[notes.note, getNoteStyle(note.id)]}>
                        <Text style={notes.head}>{note.title}</Text>
                        <Text style={notes.description}>{note.description}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

export default Notes;