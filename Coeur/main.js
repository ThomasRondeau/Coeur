import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const monkeyUrl = new URL('../assets/doggo2.glb', import.meta.url);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

renderer.setClearColor(0xA3A3A3);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 300, -500);
orbit.target = new THREE.Vector3(0,50,0);
orbit.update();



var ambientLight = new THREE.AmbientLight( 0xffffff, 0.8 );
scene.add( ambientLight );
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
directionalLight.position.set(100, 0, -500);
scene.add( directionalLight );

const assetLoader = new GLTFLoader();

let mixer;
assetLoader.load('/models/coeur_blender.glb', function(gltf){
    var objet = gltf.scene;
    mixer = new THREE.AnimationMixer(objet);
    objet.scale.set(20,20,20);
    objet.position.y = -180;
    objet.name = "coeur";
    var clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, "Battement");
    const action = mixer.clipAction(clip);
    scene.add(objet);
    action.play();

    // Play a certain animation
    // const clip = THREE.AnimationClip.findByName(clips, 'HeadAction');
    // const action = mixer.clipAction(clip);
    // action.play();

    // Play all animations at the same time
    /*
    clips.forEach(function(clip) {
        const action = mixer.clipAction(clip);
        action.play();
    });
    */

}, undefined, function(error) {
    console.error(error);
});

const clock = new THREE.Clock();
function animate() {
    if(mixer)
        mixer.update(clock.getDelta());
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});