import { box_mesh, extrude_mesh } from './meshes';
import * as THREE from 'three';

// Hyper Geometry Parameters
export const THICKNESS = 0.2;
export const unit  = 1;
export const sqrt2 = unit * Math.SQRT2;

const pos = [0, 0, -THICKNESS / 2];
const options = {
    steps: 1,
    depth: THICKNESS,
    bevelEnabled: false,
};

// Geometric parameters for Parallelogram
function makeParaShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.5 * unit, +0.5 * unit);
    shape.lineTo(-1.5 * unit, -0.5 * unit);
    shape.lineTo(+0.5 * unit, -0.5 * unit);
    shape.lineTo(+1.5 * unit, +0.5 * unit);
    shape.lineTo(-0.5 * unit, +0.5 * unit);
    return shape;
}
const shapePL = makeParaShape();

// Geometric parameters for Triangles
function makeTri(longHalfSide) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(+longHalfSide, 0);
    shape.lineTo(0, +longHalfSide);
    shape.lineTo(-longHalfSide, 0);
    shape.lineTo(0, 0);
    return shape;
}

function makeTMShape(halfSide) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(-halfSide, -halfSide);
    shape.lineTo(+halfSide, -halfSide);
    shape.lineTo(+halfSide, +halfSide);
    shape.lineTo(0, 0);
    return shape;
}
const shapeTL = makeTri(unit * 2);
const shapeTM = makeTMShape(unit);
const shapeTS = makeTri(unit);

// Make the mesh for each piece in a set of Tangram puzzle
export const TANGRAM_SHAPES = Object.freeze({
    TL0: (mat) => extrude_mesh(mat, shapeTL, options, pos),
    TL1: (mat) => extrude_mesh(mat, shapeTL, options, pos),
    TM:  (mat) => extrude_mesh(mat, shapeTM, options, pos),
    TS0: (mat) => extrude_mesh(mat, shapeTS, options, pos),
    TS1: (mat) => extrude_mesh(mat, shapeTS, options, pos),
    SQ:  (mat) => box_mesh(mat, [sqrt2, sqrt2, THICKNESS]),
    PL:  (mat) => extrude_mesh(mat, shapePL, options, pos),
});
