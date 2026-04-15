import { useState } from 'react';
import Main from './Main/Main';
import VisualEditor from './VisualEditor/VisualEditor';
import UI from './UI/UI';
import { useKeyboard } from '../hooks/useKeyboard';

export enum PAGES {
    MAIN,
    VISUAL_EDITOR,
    EDITOR,
}
export interface IBasePage {
    setPage: (name: PAGES) => void;
}

const PageManager: React.FC = () => {

    const [page, setPage] = useState<PAGES>(PAGES.VISUAL_EDITOR);
    const isKeyboardVisible = useKeyboard();

    return (
        <>
            {page === PAGES.MAIN && <Main />}
            {page === PAGES.VISUAL_EDITOR && <VisualEditor />}
            {!isKeyboardVisible && <UI setPage={setPage} />}
        </>
    );
}

export default PageManager;