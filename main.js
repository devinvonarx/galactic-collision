//import "globals.js";
//import "galaxy.js";
//import "https://cdnjs.cloudflare.com/ajax/libs/three.js/r119/three.min.js";

function main(){
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    let t = 0;
    milky_way = new Galaxy(
        NUM_STARS_MILKY_WAY,
        new THREE.Vector3(-5, 0, 0) * DIST_SCALE,
        new THREE.Vector3(0, 0, 0),
        MAX_ORBITAL_RADIUS,
        MILKY_WAY_GALAXY_THICKNESS,
        new THREE.Vector3(0.9, 0.9, 1)
    );
    andromeda = new Galaxy(
        NUM_STARS_ANDROMEDA,
        new THREE.Vector3(3, 0, 0) * DIST_SCALE,
        new THREE.Vector3(0, 3, 0),
        MAX_ORBITAL_RADIUS,
        ANDROMEDA_GALAXY_THICKNESS,
        new THREE.Vector3(0, 0.5, 1)
    )

    while(true){
        rate(100)

        mag_difference = milky_way.pos.mag - andromeda.pos.mag;


        for (let star of milky_way.stars){
            star.vel += accel(star, andromeda) * dt
            star.vel += accel(star, milky_way) * dt
            star.pos += star.vel * dt
            // if(mag_difference == -6+18):
            //     star.obj.color = vector(1, 0.5, 0)
            if(andromeda.pos.mag < 1.1920057081525512e+20){
                star.obj.color = vector(1, 0.5, 0);
            }
        }
        andromeda_mask = np.zeros(len(andromeda.stars));

        for (let star of andromeda.stars){
            star.vel += accel(star, milky_way) * dt;
            star.vel += accel(star, andromeda) * dt;
            star.pos += star.vel * dt;
            // if(mag_difference < -6+18 and mag_difference > -5e+18):
            //     star.obj.color = vector(1, 0.5, 0)
            if(andromeda.pos.mag < 1.1920057081525512e+20){
                star.obj.color = vector(1, 0.5, 0);
            }
        }
        milky_way.vel += accel(milky_way, andromeda) * dt;
        milky_way.pos += milky_way.vel * dt;

        andromeda.vel += accel(andromeda, milky_way) * dt;
        andromeda.pos += andromeda.vel * dt;

        t += dt;
    }
}
main();
