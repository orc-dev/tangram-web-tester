import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import OperationCoordinate from './OperationCoordinate';
import { OrbitControls } from '@react-three/drei';
import { GameContextProvider, useGameContext } from '../contexts/GameContext';


// function Env() {
//     const files = ['./road.hdr', './port.hdr'];
//     const i = 1;
//     return (
//         <Environment 
//             files={files[i]}
//             background
//             backgroundBlurriness={0.8}
//         />
//     );
// }


// function Ground() {
//     const gridProps = {
//         infiniteGrid: true, 
//         cellSize: 2, 
//         cellThickness: 0.65 - 0.65, 
//         sectionSize: 2, 
//         sectionThickness: 1.35, 
//         sectionColor: `rgb(200, 200, 200)`, 
//         fadeDistance: 30, 
//         receiveShadow: true,
//     };
//     const meshPos = [0, -0.001, 0];
//     const meshRot = [-Math.PI * 0.5, 0, 0];
//     return (
//         <group>
//             <Grid {...gridProps} />
//             <mesh position={meshPos} rotation={meshRot} receiveShadow>
//                 <planeGeometry args={[30, 30]} />
//                 <meshBasicMaterial transparent />
//                 <shadowMaterial transparent opacity={0.4} />
//             </mesh>
//         </group>
//     );
// }

function MainCanvas() {

    const { spin } = useGameContext();

    const handleKeyDown = (event) => {
        //console.log(`Key down: ${event.key}`);

        if (event.key === 's') {
            spin.current = true;
            //console.log(spin.current);
        }
    };

    // Function to handle when a key is released
    const handleKeyUp = (event) => {
        // console.log(`Key up: ${event.key}`);
        if (event.key === 's') {
            spin.current = false;
            //console.log(spin.current);
        }
    };

    // useEffect to handle adding and removing event listeners
    useEffect(() => {
        // Add event listeners for keydown and keyup
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Clean up by removing event listeners on unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className='canvas-box'>
            <Canvas orthographic camera={{ zoom: 80, position: [0,0,10] }} >
                {/* <OrbitControls /> */}
                <OperationCoordinate />
            </Canvas>
        </div>
    );
}

function Game() {
    return (
        <GameContextProvider>
            <MainCanvas />
        </GameContextProvider>
    );
}

export default Game;
