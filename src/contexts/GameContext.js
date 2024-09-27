import { createContext, useContext, useRef } from 'react';

const GameContext = createContext();

export const GameContextProvider = ({children}) => {
    const pieceRef = useRef([{},{}]);
    const ptnRef   = useRef([{},{}]);
    const flipRef  = useRef([0, 0]);
    const spin     = useRef(false);
    const globalHover = useRef(0);
    
    return (
        <GameContext.Provider value={{ 
            spin, globalHover, pieceRef, ptnRef, flipRef
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    return useContext(GameContext);
};