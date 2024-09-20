import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useBind} from '../utils/useBind';
import { useGameContext } from '../contexts/GameContext';
import { TANGRAM_SHAPES, THICKNESS, unit } from '../graphics/tangramShapes';
import { pi, cyl_mesh } from '../graphics/meshes';

function Piece({sid, pid, pieceKey, matSet, initPos, initRot}) {
    console.log(`piece.${pieceKey} is rendering...`);
    
    const { spin, globalHover, pieceRef, flipRef } = useGameContext();
    pieceRef.current[sid][pieceKey] = useRef();
    
    const defRef = useRef();
    const hovRef = useRef();
    const isHover = useRef(false);

    const { camera, size } = useThree();
    const bind = useBind(pieceRef.current[sid][pieceKey], 
        pieceKey, spin, camera, size, flipRef
    );
    const mask = 1 << pid;
    const cylGeo = [unit / 20, unit / 20, THICKNESS * 2, 12, 1];

    const rotAxis = cyl_mesh(matSet.AX, cylGeo, [0,0,0], [pi(0.5),0,0]);
    const hovMesh = TANGRAM_SHAPES[pieceKey](matSet.HOV);
    const defMesh = TANGRAM_SHAPES[pieceKey](matSet[pieceKey]);

    useFrame(() => {
        defRef.current.visible = !(isHover.current);
        hovRef.current.visible = isHover.current;
        
        if (isHover.current) {
            globalHover.current |= mask;
        } else {
            globalHover.current &= ~mask;
        }
    });
    
    return (
        <group position={initPos} rotation={initRot}
            ref={pieceRef.current[sid][pieceKey]}
            {...bind()}
            onPointerOver={() => isHover.current = true }
            onPointerOut={() => isHover.current = false }
            onDoubleClick={(event) => {
                event.stopPropagation();    
                if (pieceKey === 'PL') {
                    flipRef.current[sid]++;
                    console.log(`db-click on PL[${sid}]`);
                }
            }}
        >
            <group ref={hovRef}>{hovMesh}{rotAxis}</group>
            <group ref={defRef}>{defMesh}</group>
        </group>
    );
}


function TangramSet({sid, matSet, pos, rot}) {
    const pieceKeys = ['TL0', 'TL1', 'TM', 'TS0', 'TS1', 'SQ', 'PL'];
    const { pieceRef, flipRef } = useGameContext();

    useFrame(() => {
        // Flip the parallelogram on double-click
        if (pieceRef.current[sid]['PL']) {
            const paraGroup = pieceRef.current[sid]['PL'].current;
            const rotaCheck = (flipRef.current[sid] & 1);
            paraGroup.rotation.y = (rotaCheck) ? Math.PI : 0;

        }
    });

    return (
        <group>
            {pieceKeys.map((k, i) => (
                <Piece key={i} sid={sid} pid={i} pieceKey={k} matSet={matSet}
                    initPos={pos[k]} initRot={rot[k]}/>
            ))}
        </group>
    );
}

export default TangramSet;