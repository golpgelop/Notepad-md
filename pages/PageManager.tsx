import { useState } from 'react';
import { useKeyboard } from '../hooks/useKeyboard';

import Main from './Main/Main';
import VisualEditor from './VisualEditor/VisualEditor';
import CodeEditor from './CodeEditor/CodeEditor';

import UI from './UI/UI';

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

const PageManager: React.FC = () => {

    const primer = '# Welcome to StackEdit!\n\nПривет, **мир**!\n\n- пункт 1\n- пункт 2';
    const [text, setText] = useState(primer);

    const [page, setPage] = useState<PAGES>(PAGES.CODE_EDITOR);
    const isKeyboardVisible = useKeyboard();

    return (
        <>
            {page === PAGES.MAIN && <Main />}
            {page === PAGES.VISUAL_EDITOR && <VisualEditor setText={setText} text={text}/>}
            {page === PAGES.CODE_EDITOR && <CodeEditor setText={setText} text={text}/>}

            {!isKeyboardVisible && <UI setPage={setPage} />}
        </>
    );
}

export default PageManager;