//import "global.js";

class Star {
    constuctor(mass, radius, pos, vel, color) {
        this.mass = mass;
        this.vel = vel;
        this._pos = pos;

        function sphere(pos, radius, color) {
            var geometry = new THREE.SphereGeometry(radius);
            var material = new THREE.MeshBasicMaterial({color: color});
            var sphere = new THREE.Mesh(geometry, material);
            scene.add(sphere);
            return sphere;
        }
        //this.obj = sphere({ pos: pos / DIST_SCALE, radius: radius, color: color });
        this.obj = sphere;
    }
    // Externally use scaled version for physics, use normalized version for graphics

    get pos() {
        return this._pos;
    }

    set pos(value) {
        this.obj.pos = value / DIST_SCALE;
        this._pos = value;
    }

    __str__() {
        return "Mass: " + str(this.mass) + "\nPos: " + str(this.pos) +
            "\nVel: " + str(this.vel);
    }
}
