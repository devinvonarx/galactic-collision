//import "globals.js";
//import "galaxy.js";
//import "https://cdnjs.cloudflare.com/ajax/libs/three.js/r119/three.min.js";

function main(){
    let t = 0;
    milky_way = new Galaxy(
        NUM_STARS_MILKY_WAY,
        new THREE.Vector3(-5, 0, 0).multiplyScalar(DIST_SCALE),
        new THREE.Vector3(0, 0, 0),
        MAX_ORBITAL_RADIUS,
        MILKY_WAY_GALAXY_THICKNESS,
        "#ffdb58"
    );
    andromeda = new Galaxy(
        NUM_STARS_ANDROMEDA,
        new THREE.Vector3(3, 0, 0).multiplyScalar(DIST_SCALE),
        new THREE.Vector3(0, 3, 0),
        MAX_ORBITAL_RADIUS,
        ANDROMEDA_GALAXY_THICKNESS,
        "#00FFFF"
    )
    console.log(milky_way);
    function drawScene(){
        //rate(100);

        mag_difference = milky_way.pos.length() - andromeda.pos.length();


        for (let star of milky_way.stars){
            star.vel.add(accel(star, andromeda).multiplyScalar(dt));

            star.vel.add(accel(star, milky_way).multiplyScalar(dt));
            star.pos.add(star.vel.clone().multiplyScalar(dt));

            // if(mag_difference == -6+18):
            //     star.obj.color = vector(1, 0.5, 0)
            if(andromeda.pos.length() < 1.1920057081525512e+20){
                star.obj.material.color.setHex("#FF0000");
            }
        }
        //andromeda_mask = nj.zeros(andromeda.stars.length);

        for (let star of andromeda.stars){
            star.vel.add(accel(star, milky_way).multiplyScalar(dt));
            star.vel.add(accel(star, andromeda).multiplyScalar(dt));
            star.pos.add(star.vel.clone().multiplyScalar(dt));
            
            // if(mag_difference < -6+18 and mag_difference > -5e+18):
            //     star.obj.color = vector(1, 0.5, 0)
            if(andromeda.pos.length() < 1.1920057081525512e+20){
                star.obj.material.color.setHex("#FF0000");
            }
        }
        milky_way.vel.add((accel(milky_way, andromeda)).multiplyScalar(dt));
        milky_way.pos = milky_way.vel.clone().multiplyScalar(dt);

        andromeda.vel.add((accel(andromeda, milky_way)).multiplyScalar(dt));
        andromeda.pos = andromeda.vel.clone().multiplyScalar(dt);

        t += dt;
        renderer.render(scene, camera);
        //console.log("hi");
        debugger;
        requestAnimationFrame(drawScene);
    }

    drawScene();
}
main();
