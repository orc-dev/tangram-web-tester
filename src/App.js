import React from 'react';
import Game from './components/Game';
import Overlay from './components/Overlay';

function App() {
    return (
        <div className='app-box'>
            <Game />
            <Overlay />
        </div>
    );
}

export default App;
