//import {vector, color, sqrt, sphere, rate, scene} from "vpython.js";
//import * as THREE from './resources/threejs/r115/build/three.module.js';
/* from math import fsum
from random import gauss */
//simport * as np from "numpy.js";


// CONSTANTS

var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 3000 );

camera.position.set(720,200,800);
camera.rotation.set(-0.84,0.51,0.5);

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );
var controls = new THREE.OrbitControls( camera, renderer.domElement );

function randn_bm(min, max, skew = 1) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}
// Universal gravitational constant
const G = 6.673e-11;

//scene.width = 1300;
//scene.height = 650;

// Solar mass in kg (assume average stellar mass)
const SOLAR_MASS = 2.000e30;

// Precalculated bounds to solar mass
const MIN_SOLAR_MASS = SOLAR_MASS * 0.5;
const MAX_SOLAR_MASS = SOLAR_MASS * 250;
const AVG_SOLAR_MASS = SOLAR_MASS * 3.0;

// Scale distances for galactic scales
const DIST_SCALE = 1e20;  // 1e20

// Galactic parameters
const MAX_ORBITAL_RADIUS = DIST_SCALE * 10000;
const MIN_ORBITAL_RADIUS = DIST_SCALE * 150;

const MILKY_WAY_GALAXY_THICKNESS = DIST_SCALE * 0.9;
const ANDROMEDA_GALAXY_THICKNESS = DIST_SCALE * 0.2;


// Milky Way contains about 300 billion stars
const NUM_STARS_MILKY_WAY = 700;
// Andromeda Galaxy contains about 1 trillion (10^12) stars
let NUM_STARS_ANDROMEDA = 1400;

// Graphical constants
const STAR_RADIUS = 10;
const dt = 1e17;


// FUNCTIONS

// Limit x between lower and upper
function clamp(x, lower, upper){
    return Math.max(Math.min(x, upper), lower);
}

// Return the force due to gravity on an object
function gravity(mass1, mass2, radius){
    return G * mass1 * mass2 / radius**2;
}

// Return the acceleration due to gravity on an object.
function g_accel(mass, radius){
    // Limit minimum radius to avoid flinging out too many particles
    radius = Math.max(radius, MIN_ORBITAL_RADIUS);
    //console.log(mass,radius);
    return G * mass / radius / radius;
}

// Calculate acceleration on an object caused by galaxy
function accel(obj, galaxy){
    let r_galaxy = galaxy.pos.clone().sub(obj.pos);
    //console.log(r_galaxy.normalize(),g_accel(galaxy.mass, r_galaxy.ma));
    // We have a = F / m = G * m_center / r ^2
    return r_galaxy.setLength(g_accel(galaxy.mass, r_galaxy.length()));
}
function sphere(pos, radius, color) {
    var geometry = new THREE.SphereGeometry(radius);
    var material = new THREE.MeshBasicMaterial({color: color});
    var sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(pos);
    scene.add(sphere);
    return sphere;
}
