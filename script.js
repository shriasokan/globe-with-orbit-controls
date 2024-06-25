//import  './style.css'
/*
import * as THREE from 'three'; //'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import ThreeGlobe from 'three-globe'//https://esm.sh/three-globe@2.30.0';
import getStarfield from './getStarfield.js';
*/
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ThreeGlobe from 'three-globe';
import getStarfield from './getStarfield.js';
var renderer, camera, scene, controls;

let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
var Globe;

init();
initGlobe();
onWindowResize();
animate();

function init(){
    renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.3)
    scene.add(ambientLight)
    scene.background = new THREE.Color(0x01062e);

    camera = new THREE.PerspectiveCamera();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    var dLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dLight.position.set(-800,2000,400);
    camera.add(dLight);

    var dLight1 = new THREE.DirectionalLight(0x7982f6, 1);
    dLight1.position.set(-200,500,200);
    camera.add(dLight1);

    var dLight2 = new THREE.PointLight(0x8566cc, 0.5);
    dLight2.position.set(-800,2000,400);
    camera.add(dLight2);

    camera.position.z = 400;
    //camera.position.x = 0;
    //camera.position.y = 0;

    scene.add(camera);

    const stars = getStarfield();
    scene.add(stars);

    scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = false;
    controls.minDistance = 200;
    controls.maxDistance = 500;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1;
    controls.autoRotate = false;

    controls.minPolarAngle = Math.PI/3.5;
    controls.maxPolarAngle = Math.PI - Math.PI/3;

    window.addEventListener("resize", onWindowResize, false);
    document.addEventListener("mousemove", onMouseMove);
}

function initGlobe() {
    Globe = new ThreeGlobe({
        waitForGlobeReady: true,
        animateIn: true,
    })

    fetch('./render-files/custom.geo.json').then(res => res.json()).then(countries => 
        {
            Globe.hexPolygonsData(countries.features)
            Globe.hexPolygonResolution(3)
            Globe.hexPolygonMargin(0.5)
            //Globe.hexPolygonColor('#ffffff')
            Globe.showAtmosphere(true)
            Globe.atmosphereColor('#d3bcdd')//'#3a228a'
            Globe.atmosphereAltitude(0.25)
        });



    Globe.rotateY(-Math.PI * (5/9));
    Globe.rotateZ(-Math.PI/6);
    const globeMaterial = Globe.globeMaterial();
    globeMaterial.color = new THREE.Color(0x443742);
    globeMaterial.emissive = new THREE.Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.7;

    scene.add(Globe);
}

function onMouseMove(event){
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    windowHalfX = window.innerWidth / 1.5;
    windowHalfY = window.innerHeight / 1.5;
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    camera.position.x += 0.05; 
    camera.position.y += 0.05;
    camera.lookAt(scene.position);
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}