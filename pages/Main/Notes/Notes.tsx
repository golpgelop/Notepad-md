import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { notes } from './Notes.styles';
import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../../App';

const Notes: React.FC = () => {
  const store = useContext(StoreContext);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  useEffect(() => {
    if (store.notes.length > 0 && !selectedNote) {
      setSelectedNote(store.notes[0].name);
    } else if (store.notes.length > 0 && selectedNote) {
      const stillExists = store.notes.some(n => n.name === selectedNote);
      if (!stillExists) {
        setSelectedNote(store.notes[0].name);
      }
    } else if (store.notes.length === 0) {
      setSelectedNote(null);
    }
  }, [store.notes, selectedNote]);

  const deleteNote = (name: string) => {
    store.deleteNote(name);
  };

  const setNote = (name: string) => {
    setSelectedNote(name);
  };

  return (
    <ScrollView>
      <View style={notes.container}>
        {store.notes.map((note, index) => {
          const isSelected = note.name === selectedNote;
          return (
            <View key={index} style={notes.note}>
              <TouchableOpacity
                onPress={() => deleteNote(note.name)}
                style={notes.deleteNote}
              >
                <Text style={notes.deleteNoteText}>✖</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setNote(note.name)}
                style={isSelected ? notes.setNote : notes.unSetNote}
              >
              </TouchableOpacity>

              <Text style={notes.head}>{note.name}</Text>
              <Text style={notes.description}>{note.data[0]}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Notes;