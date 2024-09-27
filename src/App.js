import React from 'react';
import { GameContextProvider } from './contexts/GameContext';
import Game from './components/Game';


function App() {
    return (
        <div className='app-box'>
            <GameContextProvider>
                <Game />
            </GameContextProvider>
        </div>
    );
}
export default App;
