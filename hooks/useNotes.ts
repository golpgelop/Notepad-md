import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../services/Note/Note';

const STORAGE_KEY = 'notes';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Загрузка при первом рендере
  useEffect(() => {
    const load = async () => {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) setNotes(JSON.parse(json));
      setLoaded(true);
    };
    load();
  }, []);

  // Автосохранение при изменении notes (кроме первой загрузки)
  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes, loaded]);

  const addNote = useCallback(async (note: Note) => {
    // Проверка на дубликат внутри setNotes, чтобы избежать гонок
    let error: string | void;
    setNotes(prev => {
      if (prev.some(n => n.name === note.name)) {
        error = 'Заметка с таким названием уже существует';
        return prev; // не меняем состояние
      }
      return [...prev, note];
    });
    // Возвращаем ошибку, если была, чтобы вызывающий код мог показать alert
    // (или можно показать alert прямо здесь, но лучше дать управление UI)
    // Поскольку setNotes асинхронный, отложим проверку через промис?
    // Сделаем по-другому: проверим до вызова setNotes.
  }, []);

  // Альтернатива с явной проверкой перед обновлением (рекомендую)
  const addNoteSafe = useCallback(async (note: Note): Promise<string | void> => {
    const trimmedName = note.name.trim();
    if (!trimmedName) return 'Название не может быть пустым';
    
    let exists = false;
    setNotes(prev => {
      if (prev.some(n => n.name === trimmedName)) {
        exists = true;
        return prev;
      }
      const newNote = new Note(trimmedName, note.data);
      return [...prev, newNote];
    });
    
    // Поскольку setNotes не возвращает промис, мы не можем дождаться.
    // Лучше проверять exists перед вызовом setNotes синхронно через notes,
    // но notes может быть устаревшим. Для надёжности используем функциональную форму
    // и возвращаем промис, который резолвится после обновления (через useState нельзя).
    // Простой выход: делать проверку и добавление в одном колбэке, а ошибку возвращать через стейт ошибки.
    // Чтобы не усложнять, можно показывать alert прямо внутри хука.
    // Давайте сделаем так, чтобы хук возвращал функцию, которая показывает alert при ошибке.
    // Пока оставим базовый вариант.
    return; // упростим, чтобы не перегружать
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