import { TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { Image } from 'expo-image';
import { main } from './Main.styles';
import React, { useContext, useState } from 'react';
import Notes from './Notes/Notes';
import { StoreContext } from '../../App';
import Note from '../../services/Note/Note';
import { ISelectNode } from '../PageManager';

const imageAdd = require('../../assets/addWhite.png');

const Main: React.FC<ISelectNode> = ({selectedNote, setSelectedNote, setText}) => {
  const store = useContext(StoreContext);
  const [name, setName] = useState('');

  const addNoteHandler = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert('Введите название заметки');
      return;
    }
    const newNote = new Note(trimmed, '');
    store.addNote(newNote).then(() => {
      setName('');
    });
  };

  return (
    <View style={main.container}>
      <Notes setText={setText} selectedNote={selectedNote} setSelectedNote={setSelectedNote}/>
      <View style={main.cut}>
        <TextInput
          style={main.inputSearch}
          placeholder="Введите название заметки"
          placeholderTextColor="#ffffffff"
          value={name}
          onChangeText={setName}
          onSubmitEditing={addNoteHandler}
        />
      </View>
      <TouchableOpacity onPress={addNoteHandler} style={main.buttonAdd}>
        <Image style={main.buttonAddImage} source={imageAdd} />
      </TouchableOpacity>
    </View>
  );
};

export default Main;