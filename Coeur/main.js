import * as THREE from 'three';
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';

var scene;  
var renderer;
var camera;
var growing = 1;
var size = 20;

function init(){

    scene = new THREE.Scene();
    scene.background = new THREE.Color("grey");

    renderer = new THREE.WebGLRenderer( { antialias : true } );
    renderer.setPixelRatio( window.devicePixelRatio  );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 0, 300, -500 );
    camera.lookAt(new THREE.Vector3(0,100,0));
    scene.add( camera );

    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.8 );
    scene.add( ambientLight );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
    directionalLight.position.set(100, 0, -500);
    scene.add( directionalLight );


    /*
    const loader = new THREE.TextureLoader();
    const texture = loader.load("montagne.jpg");
    texture.magFilter = THREE.NearestFilter;
    const material = new THREE.SpriteMaterial({ map : texture, transparent: false, color: 0xffffff});
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(400,200,1);
    sprite.position.y = 100;
    scene.add(sprite);

    const gazon = loader.load("gazon.jpg");
    gazon.wrapS = THREE.RepeatWrapping;
    gazon.wrapT = THREE.RepeatWrapping;
    gazon.magFilter = THREE.NearestFilter;
    gazon.repeat.set(2, 2);
    const planeGeo = new THREE.PlaneGeometry(600,600,12,12);
    const planeMat = new THREE.MeshPhongMaterial({map: gazon,side: THREE.DoubleSide});
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
    */
    const loader = new GLTFLoader();
    let mixer;
    loader.load('/models/coeur_blender.glb', function(gltf){
        var objet = gltf.scene;
        mixer = new THREE.AnimationMixer(objet);
        objet.scale.set(20,20,20);
        objet.position.y = -100;
        objet.name = "coeur"
        var clips = gltf.animations;
        const clip = THREE.AnimationClip.findByName(clips, "Battement");
        const action = mixer.clipAction(clip);
        scene.add(objet);
        action.play();
    },
    function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
    );

    animate();
    
}

function animate(){
    /*
    var loaded_object = scene.getObjectByName("coeur");
    if(growing == 1){
        size += 1;
        loaded_object.scale.set(size, size,size);
    }
    else{
        size -= 1;
        loaded_object.scale.set(size, size,size);
    }

    if(size=50){
        growing = 0;
    }

    if(size = 20){
        growing = 1;
    }
    */
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

init();