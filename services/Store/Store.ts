import AsyncStorage from '@react-native-async-storage/async-storage';
import { TNote } from './type';

class Store {
    notes: TNote[] = [];
    private readonly STORAGE_KEY = 'notes';

    constructor() {
        this.loadNotes();
    }

    //// Для загрузки заметок ////

    saveNotes = async (): Promise<void> => {
        const jsonValue = JSON.stringify(this.notes);
        await AsyncStorage.setItem(this.STORAGE_KEY, jsonValue);
    };

    loadNotes = async (): Promise<void> => {
        const jsonValue = await AsyncStorage.getItem(this.STORAGE_KEY);
        if (jsonValue != null) {
            this.notes = JSON.parse(jsonValue);
        } else {
            this.notes = [];
        }
    };

    //// Для работы с заметками ////

    addNote = async (note: TNote): Promise<void | string> => {
        const exists = this.notes.some(n => n.name === note.name);
        if (exists) return 'Заметка уже существует';
        this.notes.push(note);
        await this.saveNotes();
    };

    updateNote = async (updatedNote: TNote): Promise<void | string> => {
        const index = this.notes.findIndex(n => n.name === updatedNote.name);
        if (index === -1) return 'Заметка не найдена'
        this.notes[index] = { ...this.notes[index], ...updatedNote };
        await this.saveNotes();
    };

    deleteNote = async (name: string): Promise<void | string> => {
        const initialLength = this.notes.length;
        this.notes = this.notes.filter(n => n.name !== name);
        if (this.notes.length === initialLength) return 'Заметка не найдена';
        await this.saveNotes();
    };
}

export default Store;