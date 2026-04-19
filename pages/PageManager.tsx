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

const PageManager: React.FC = () => {

    const [page, setPage] = useState<PAGES>(PAGES.MAIN);
    const isKeyboardVisible = useKeyboard();

    return (
        <>
            {page === PAGES.MAIN && <Main />}
            {page === PAGES.VISUAL_EDITOR && <VisualEditor />}
            {page === PAGES.CODE_EDITOR && <CodeEditor />}
            
            {!isKeyboardVisible && <UI setPage={setPage} />}
        </>
    );
}

export default PageManager;