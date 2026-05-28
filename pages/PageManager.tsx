import { useState, useContext, useEffect, useRef } from 'react';
import { useKeyboard } from '../hooks/useKeyboard';

import Main from './Main/Main';
import VisualEditor from './VisualEditor/VisualEditor';
import CodeEditor from './CodeEditor/CodeEditor';

import UI from './UI/UI';

import { StoreContext } from '../App';

export enum PAGES {
    MAIN,
    VISUAL_EDITOR,
    CODE_EDITOR,
}
export interface IBasePage {
    setPage: (name: PAGES) => void;
}

export interface IText {
    setText: (text: string) => void;
    text: string;
}

export interface ISelectNode {
    setSelectedNote: (selectedNote: string | null) => void;
    setText: (text: string) => void;
    selectedNote: string | null;
}

const PageManager: React.FC = () => {

    const store = useContext(StoreContext);

    const [page, setPage] = useState<PAGES>(PAGES.MAIN);
    const isKeyboardVisible = useKeyboard();

    const [selectedNote, setSelectedNote] = useState<string | null>(null);

    const defaultText = 'default';
    const [text, setText] = useState(defaultText);

    const selectedNoteRef = useRef(selectedNote);
    const textRef = useRef(text);

    useEffect(() => {
        selectedNoteRef.current = selectedNote;
        textRef.current = text;
    }, [selectedNote, text]);


    useEffect(() => {
        const interval = 2000; 
        const maxIterations = 5;
        let iterations = 0;
        

        const timer = setInterval(() => {
            if (iterations >= maxIterations) {
                clearInterval(timer);
                return;
            }

            if (selectedNoteRef.current != null) {
                store.updateNote(selectedNoteRef.current, textRef.current);
            }

            iterations++;
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {page === PAGES.MAIN && <Main setText={setText} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />}
            {page === PAGES.VISUAL_EDITOR && <VisualEditor setText={setText} text={text} />}
            {page === PAGES.CODE_EDITOR && <CodeEditor setText={setText} text={text} />}

            {!isKeyboardVisible && <UI setPage={setPage} />}
        </>
    );
}

export default PageManager;