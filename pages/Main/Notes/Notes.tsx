import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { notes } from './Notes.styles';
import React, { useContext } from 'react';
import Note from '../../../services/Note/Note';
import { StoreContext } from '../../../App';

const Notes: React.FC = () => {
  const store = useContext(StoreContext);

  const deleteNote = (name: string) => {
    store.deleteNote(name);
  };

  return (
    <ScrollView>
      <View style={notes.container}>
        {store.notes.map((note, index) => (
          <View key={index} style={notes.note}>
            <TouchableOpacity
              onPress={() => deleteNote(note.name)}
              style={notes.deleteNote}
            >
              <Text style={notes.deleteNoteText}>✖</Text>
            </TouchableOpacity>
            <Text style={notes.head}>{note.name}</Text>
            <Text style={notes.description}>{note.data[0]}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Notes;