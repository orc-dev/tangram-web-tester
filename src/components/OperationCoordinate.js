import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@react-three/drei';
import { BASIC_MAT } from '../graphics/materials';
import { useGameContext } from '../contexts/GameContext';
import { useFrame, useThree } from '@react-three/fiber';
import { useBind} from '../utils/useBind';
import { pi, cyl_mesh, box_mesh } from '../graphics/meshes';
import TangramSet from './TangramSet';


function logPosition(x, y, z) {
    console.log([
        Number(x.toFixed(2)), 
        Number(y.toFixed(2)), 
        Number(z.toFixed(0)),
    ]);
}


function CoordinateIndicator() {
    const cylGeo  = [0.1, 0.1, 1, 24, 1];
    const meshRot = [pi(0.5), 0, 0];
    return (
        <group>
            {cyl_mesh(BASIC_MAT.ORI, cylGeo, [0,0,0], meshRot)}
            {box_mesh(BASIC_MAT.HOV, [3,0.04,0.5], [1.5,0,0])}
        </group>
    );
}


function OperationCoordinate() {
    const { globalHover, pieceRef } = useGameContext();
    const coordinateRef = useRef();
    const { camera, size } = useThree();
    //const bind = useBind(coordinateRef, 'S0', spin, camera, size, flipRef);
    const isHover = useRef(false);

    const initPos = {
        TL0: [-4, 2,0],
        TL1: [-4,-2,0],
        TM:  [ 0, 0,0],
        TS0: [-3, 3,0],
        TS1: [-3,-1,0],
        SQ:  [ 0,-2,0],
        PL:  [+2.5,-2,0],
    };
    const initRot = {
        TL0: [0,0,0],
        TL1: [0,0,0],
        TM:  [0,0,0],
        TS0: [0,0,0],
        TS1: [0,0,0],
        SQ:  [0,0,0],
        PL:  [0,0,0],
    };

    const handleKeyDown = (event) => {
        //console.log(`Key down: ${event.key}`);
        const S0 = pieceRef.current[0];
        if (event.key === 'l') {
            console.log('log');
            Object.keys(S0).forEach(key => {
                const {x, y} = S0[key].current.position;
                const {z} = S0[key].current.rotation;
                console.log(`${key}: ${x}, ${y}, ${z}`);
            });
            

        }
    };

    useEffect(() => {
        // Add event listeners for keydown and keyup
        window.addEventListener('keydown', handleKeyDown);
        
        // Clean up by removing event listeners on unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    function updateCursorStyle() {
        if (globalHover.current === 0) {
            document.body.style.cursor = 'default';
        }
        else if (document.body.style.cursor === 'default') {
            document.body.style.cursor = 'grab';
        }
    }

    useFrame(() => {
        updateCursorStyle();
    });

    return (
        <group ref={coordinateRef} position={[0,0,0]} 
            // {...bind()} 
            // onPointerOver={() => isHover.current = true }
            // onPointerOut={() => isHover.current = false }
        >
            <TangramSet sid={0} matSet={BASIC_MAT} pos={initPos} rot={initRot}/>
            <CoordinateIndicator />
            <Grid
                infiniteGrid={true} 
                cellSize={1} 
                cellThickness={0.5}
                rotation={[Math.PI * 0.5,0,0]}
                visible={true}
            />
        </group>
    );
}

export default OperationCoordinate;