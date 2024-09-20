import { useDrag } from '@use-gesture/react';
import * as THREE from 'three';


export function useBind(objRef, pieceKey, spin, camera, size, flipRef) {
    let initPan = undefined;  // help for panning piece
    let initRot = undefined;  // help for rotating piece
    let initAngle = undefined;

    // Convert screen coordinates to scene/world coordinates
    const screenToScene = (screenX, screenY) => {
        const ndcX = +((screenX / size.width ) * 2 - 1);
        const ndcY = -((screenY / size.height) * 2 - 1);
        const worldPosition = new THREE.Vector3(ndcX, ndcY, 0);
        worldPosition.unproject(camera);
        return worldPosition;
    };

    return useDrag(({ down, xy: [x, y], initial: [ix, iy] }) => {
        // Update cursor style
        document.body.style.cursor = down ? 'grabbing' : 'grab';

        //console.log(`useDrag running... flipRef: ${flipRef.current[0]}`);
        const rotaBit = flipRef.current[0] & 1;
        const sign = (pieceKey === 'PL' && rotaBit) ? -1 : 1;
        
        // Handle translation
        if (!spin.current) {
            if (!initPan) {
                const initCursor = screenToScene(ix, iy);
                initPan = initCursor.clone().sub(objRef.current.position);
                initAngle = objRef.current.rotation.z * sign;
            }
            const currCursor = screenToScene(x, y);
            const targetPos = currCursor.clone().sub(initPan);
            objRef.current.position.set(...roundDist(targetPos));

            if (!down) {
                initPan = undefined;
                initRot = undefined;
            }
            return;
        }

        // Handle rotation
        if (down && !initRot) {
            const currCursor = screenToScene(x, y);
            initRot = currCursor.clone().sub(objRef.current.position);
            initAngle = objRef.current.rotation.z * sign;
        }

        if (down && initRot) {
            const currCursor = screenToScene(x, y);
            const diffVec = currCursor.clone().sub(objRef.current.position);

            const B = Math.atan2(diffVec.y, diffVec.x);
            const A = Math.atan2(initRot.y, initRot.x);
            const result = roundToRad(initAngle + (B - A)) * sign;
            objRef.current.rotation.z = result;

            console.log(deg(result * sign));

            // Update panning helper while object spinning
            initPan = diffVec.clone();
        }

        if (!down) {
            initRot = undefined;
            initPan = undefined;
        }
    });
}


function roundToRad(angle) {
    const UNIT = 15;
    const degrees = THREE.MathUtils.radToDeg(angle);
    const roundedDegrees = Math.round(degrees / UNIT) * UNIT;
    return THREE.MathUtils.degToRad(roundedDegrees);
}


function roundDist(vec) {
    const UNIT = 0.1;
    // Helper function to round to the nearest multiple of UNIT
    const roundTo = (value, unit) => Math.round(value / unit) * unit;

    // Return a new vector with components rounded to the nearest multiple of UNIT
    return new THREE.Vector3(
        roundTo(vec.x, UNIT),
        roundTo(vec.y, UNIT),
        roundTo(vec.z, UNIT)
    );
}

function deg(a) {
    return (a * 180 / Math.PI).toFixed(2);
}