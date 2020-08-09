//import "global.js";

class Star {
    constructor(mass, radius, pos, vel, color) {
        this.mass = mass;
        this.vel = vel;
        
        //this.obj = sphere({ pos: pos / DIST_SCALE, radius: radius, color: color });
        this.obj = sphere(pos.clone().divideScalar(DIST_SCALE), radius, color);
        this.pos = pos; //must create obj before setting pos
    }
    // Externally use scaled version for physics, use normalized version for graphics

    get pos() {
        return this._pos;
    }

    set pos(value) {
        this._pos = value;
        this.obj.position.copy(value.clone().divideScalar(DIST_SCALE));
    }

    addToPos(vec){
        this._pos.add(vec);
        this.obj.position.add(vec.clone().divideScalar(DIST_SCALE));
    }

    toString() {
        return "Mass: " + str(this.mass) + "\nPos: " + str(this.pos) +
            "\nVel: " + str(this.vel);
    }
}
