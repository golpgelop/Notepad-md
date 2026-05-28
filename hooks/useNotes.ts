import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../services/Note/Note';

const STORAGE_KEY = 'notes';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) setNotes(JSON.parse(json));
      setLoaded(true);
    };
    load();
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes, loaded]);

  const addNote = useCallback(async (note: Note) => {

    let error: string | void;
    setNotes(prev => {
      if (prev.some(n => n.name === note.name)) {
        error = 'Заметка с таким названием уже существует';
        return prev; 
      }
      return [...prev, note];
    });

  }, []);

  const deleteNote = useCallback(async (name: string) => {
    setNotes(prev => prev.filter(n => n.name !== name));
  }, []);

  const updateNote = useCallback(async (updatedNote: Note) => {
    setNotes(prev => {
      const index = prev.findIndex(n => n.name === updatedNote.name);
      if (index === -1) return prev;
      const newNotes = [...prev];
      newNotes[index] = { ...newNotes[index], ...updatedNote };
      return newNotes;
    });
  }, []);

  return { notes, addNote, deleteNote, updateNote, loaded };
}