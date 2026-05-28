import { TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { Image } from 'expo-image';
import { main } from './Main.styles';
import React, { useContext, useState } from 'react';
import Notes from './Notes/Notes';
import { StoreContext } from '../../App';
import Note from '../../services/Note/Note';
import { IText } from '../PageManager';

const imageAdd = require('../../assets/addWhite.png');

const Main: React.FC<IText> = ({ text, setText }) => {
  const store = useContext(StoreContext);

  const addNoteHandler = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      Alert.alert('Введите название заметки');
      return;
    }
    const newNote = new Note(trimmed, ['']);
    store.addNote(newNote).then(() => {
      setText('');
    });
    // Если addNote вернул ошибку (например, дубликат), alert уже показан внутри контекста,
    // и мы всё равно очищаем поле для удобства (или можно не очищать, если ошибка).
    // Чтобы не очищать при ошибке, можно сделать addNote возвращать boolean.
    // Упростим: очищаем в любом случае, пользователь увидит alert.
  };

  return (
    <View style={main.container}>
      <Notes />
      <View style={main.cut}>
        <TextInput
          style={main.inputSearch}
          placeholder="Введите название заметки"
          placeholderTextColor="#ffffffff"
          value={text}
          onChangeText={setText}
          onSubmitEditing={addNoteHandler} // добавил возможность добавлять по Enter
        />
      </View>
      <TouchableOpacity onPress={addNoteHandler} style={main.buttonAdd}>
        <Image style={main.buttonAddImage} source={imageAdd} />
      </TouchableOpacity>
    </View>
  );
};

export default Main;