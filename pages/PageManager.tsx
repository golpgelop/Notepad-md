import { useState } from 'react';
import Main from './Main/Main';
import UI from './UI/UI';

export enum PAGES {
    MAIN,
    VISUAL_EDITOR,
    EDITOR,
    EXPLORER,
    SETTING,
}

export interface IBasePage {
    setPage: (name: PAGES) => void;
}



const PageManager: React.FC = () => {
    const [page, setPage] = useState<PAGES>(PAGES.MAIN);


    return (
        <>
            {page === PAGES.MAIN && <Main />}
            <UI setPage={setPage} />
        </>
    );
}

export default PageManager;