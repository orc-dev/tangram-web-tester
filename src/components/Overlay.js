import { useEffect } from 'react';
import { Progress } from 'antd';
import { useTimer } from 'react-timer-hook';


function span(className, content) {
    return <span className={className}>{content}</span>;
}

function TopBar() {
    return (
        <div className='top-bar'>
            <div className='app-title'>Tangram Tester</div>
        </div>
    );
}

function GameGuide() {
    // Styled text
    const move   = span('hl-text', 'move');
    const R      = span('key-char', 'R');
    const rotate = span('hl-text', 'rotate');
    const flip   = span('hl-text', 'flip');
    return (
        <div className='game-guide-box'>
            <h1>Game Guide</h1>
                <ul>
                    <li>Drag a piece to {move} it.</li>
                    <li>Hold {R} and drag to {rotate}.</li>
                    <li>Double-click the Parallelogram to {flip} it.</li>
                </ul>
        </div>
    );
}


function ProgressBar({puzzleKey, totalTime, progress}) {
    const { seconds, minutes, restart, pause } = useTimer({ 
        expiryTimestamp: totalTime, 
        onExpire: () => console.log('Timer expired'),
        autoStart: true,
    });
    const timeUsed = 600 - (60 * minutes + seconds);
    const min = Math.floor(timeUsed / 60);
    const sec = timeUsed % 60;
    
    const minStr = min.toString().padStart(2, '0');
    const secStr = sec.toString().padStart(2, '0');
    const timeStr = <span className='time-number'>{minStr} : {secStr}</span>;

    useEffect(() => {
        if (puzzleKey) {
            const time = new Date();
            time.setSeconds(time.getSeconds() + 600);
            restart(time);
        }
    // eslint-disable-next-line
    }, [puzzleKey])

    useEffect(() => {
        if (progress >= 100) pause();
    // eslint-disable-next-line
    }, [progress]); 
    
    if (!puzzleKey) return null;

    return (
        <div className='progress-box'>
            <div className='timer-text'>Elapsed Time: {timeStr}</div>
            <div className='progress-text'>Progress: </div>
            <Progress className='custom-progress' 
                steps={16} percent={progress.toFixed(2)} size={[20, 25]} />
        </div>
    );
}

function Congradulation({progress}) {
    const mode = (progress < 100) ? 'none' : 'flex';
    return (
        <div className='cong-box' style={{display: mode}}>Congradulation!</div>
    );
}


function Overlay({puzzleKey, totalTime, progress}) {
    return (
        <>
            <TopBar puzzleKey={puzzleKey} />
            <ProgressBar 
                puzzleKey={puzzleKey} 
                totalTime={totalTime} 
                progress={progress}
            />
            <Congradulation progress={progress} />
            <GameGuide />
        </>
    );
}

export default Overlay;