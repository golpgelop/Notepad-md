import { TouchableOpacity, View, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { main } from './Main.styles';
import React, { useContext, useState } from 'react';
import Notes from './Notes/Notes';
import { StoreContext } from '../../App';

import Note from '../../services/Note/Note';
import Popup from '../../componets/Popup/Popup';
import { IText } from '../PageManager';

const imageAdd = require('../../assets/addWhite.png');

const Main: React.FC<IText> = ({text, setText}) => {

    const store = useContext(StoreContext);
    const [newNote, setNewNote] = useState(false);

    const addNoteHandler = () => {
        setNewNote(true);

    };

    const addNewNoteHandler = (inputValue: string): void => {
        store.addNote(new Note(inputValue, ['']));
        setText('');
    }

    return (

        <View style={main.container}>


            <Notes />
            <View style={main.cut}>
                <TextInput
                    style={main.inputSearch}
                    placeholder="Введите текст"
                    placeholderTextColor='#ffffffff'
                    value={text}
                    onChangeText={setText}
                />
            </View>
            <TouchableOpacity
                onPress={addNoteHandler}
                style={main.buttonAdd}
            >
                <Image
                    style={main.buttonAddImage}
                    source={imageAdd}
                />
            </TouchableOpacity>

            {newNote && <Popup data={{
                text: 'Введите название:',
                button: 'Добавить',
                handler: addNewNoteHandler,
            }} />}
        </View>
    );
}

export default Main;


