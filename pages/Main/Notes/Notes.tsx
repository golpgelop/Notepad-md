import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { notes } from './Notes.styles';
import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../../App';
import { ISelectNode } from '../../PageManager';
import { Image } from 'expo-image';
import { useFileSharer } from '../../../hooks/useFileSharer';

const imageSend = require('../../../assets/send.png');

const Notes: React.FC<ISelectNode> = ({ selectedNote, setSelectedNote, setText }) => {
    const store = useContext(StoreContext);

    const { shareFile } = useFileSharer();
    const sendNote = async (name: string, text: string) => {
        await shareFile({
            title: name,
            content: text
        });
    };


    useEffect(() => {
        if (store.notes.length > 0 && !selectedNote) {
            setSelectedNote(store.notes[0].name);
            setText(store.notes[0].text);
        } else if (store.notes.length > 0 && selectedNote) {
            const stillExists = store.notes.some(n => n.name === selectedNote);
            if (!stillExists) {
                setSelectedNote(store.notes[0].name);
                setText(store.notes[0].text);
            }
        } else if (store.notes.length === 0) {
            setSelectedNote(null);
            setText('');
        }
    }, [store.notes, selectedNote]);

    const deleteNote = (name: string) => {
        store.deleteNote(name);
    };

    const setNote = (name: string) => {
        setSelectedNote(name);
        const note = store.notes.find(note => note.name === name);
        if (note != undefined) { setText(note.text); } else { setText('') }
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

                            <TouchableOpacity
                                onPress={() => sendNote(note.name, note.text)}
                                style={notes.sendNote}
                            >
                                <Image style={notes.buttonSend} source={imageSend} />
                            </TouchableOpacity>

                            <Text style={notes.head}>{note.name.slice(0, 20)}</Text>
                            <Text style={notes.description}>{note.text.slice(0, 80).replaceAll("\n", " ") + '...'}</Text>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
};

export default Notes;