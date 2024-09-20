

export class Puzzle {
    #name;
    #pieces;
    constructor(name, pattern) {
        this.#pieces = {
            TL0: { px: 0, py: 0, rz: 0 },
            TL1: { px: 0, py: 0, rz: 0 },
            TM:  { px: 0, py: 0, rz: 0 },
            TS0: { px: 0, py: 0, rz: 0 },
            TS1: { px: 0, py: 0, rz: 0 },
            SQ:  { px: 0, py: 0, rz: 0 },
            PL:  { px: 0, py: 0, rz: 0, ry: 0 },
        };
        this.#name = name;

        for (const key in this.#pieces) {
            this.#pieces[key].px = pattern[key].px;
            this.#pieces[key].py = pattern[key].py;
            this.#pieces[key].rz = pattern[key].rz;
        }
        this.#pieces.PL.ry = pattern.PL.ry;
    }

    getName() {
        return this.#name;
    }

    getPiece(key) {
        return this.#pieces[key];
    }

    displayPieces() {
        console.log(this.#pieces);
    }
}