//import "globals";
//import "star";


class Galaxy{
    constructor(num_stars, pos, vel, radius, thickness, color){
        this.pos = pos;
        this.vel = vel;
        this.radius = radius;
    
        // Gaussian distributions
        let sigma_mass = AVG_SOLAR_MASS / 3.0;
        let masses = [];
        for(let i = 0; i < num_stars; i++){
            masses.push(clamp(randn_bm(AVG_SOLAR_MASS, sigma_mass), MIN_SOLAR_MASS, MAX_SOLAR_MASS));
        }

        // Galaxy mass is sum of all stars
        this.mass = masses.reduce(function (a, b) { return a + b; }, 0);

        // Gaussian distribution of positions
        let sigma_x = radius * 0.1;
        let sigma_y = thickness * 0.10;
        let sigma_z = radius * 0.1;

        // Generate list of all positions
        let positions = [];
        for (let i = 0; i<num_stars; i++){
            let pos = new THREE.Vector3(
                clamp(randn_bm(0, sigma_x), -radius, radius),
                clamp(randn_bm(0, sigma_y), -thickness, thickness),
                clamp(randn_bm(0, sigma_z), -radius, radius)
            )

            // Limit radius to avoid particles shooting to nowhere
            if (pos.mag < MIN_ORBITAL_RADIUS){
                pos.mag = MIN_ORBITAL_RADIUS;
            }
            positions.push(pos);
        }
        function calc_orbital_velocity(center_mass, radius){
            return Math.sqrt(G * center_mass / radius)
        }
        // Generate list of all stars
        let stars = [];
        let up = new THREE.Vector3(0.0, 1.0, 0.0);
        for (let i = 0; i<num_stars; i++){
            // Find normalized vector along direction of travel
            let absolute_pos = positions[i].add(this.pos);
            let relative_pos = positions[i];
            let vec = relative_pos.cross(up).normalize();
            let relative_vel = vec * calc_orbital_velocity(this.mass, relative_pos.mag);
            let absolute_vel = relative_vel + vel;

            stars.push(new Star(
                masses[i],
                STAR_RADIUS,
                absolute_pos,
                absolute_vel,
                color
            ))
        }
        this.stars = new NdArray(stars);
    }
}
