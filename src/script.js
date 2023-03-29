import "./styles.css";
//Scene
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import { log } from "three";


//Textures
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const matCapTexture = textureLoader.load('/textures/matcaps/7.png');
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')


//scene
const scene = new THREE.Scene();

//Sizes
const sizes = {
  with: window.innerWidth,
  height: window.innerHeight
};

//Objects
const material = new THREE.MeshBasicMaterial();

// material.wireframe = true;
// material.opacity = 0.5;
// material.transparent = true;
material.map = doorColorTexture;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.BackSide;

/*//?other ways to set color on material
  material.color.set('#ff00ff');  
  material.color = new THREE.Color('#3303aa')*/

  //?Normal Material
  // const normalMaterial =  new THREE.MeshNormalMaterial();
  // normalMaterial.bumpMap = doorNormalTexture;
  // normalMaterial.flatShading = true

  //?MeshMatCapMaterial
  const matCapMaterial = new THREE.MeshMatcapMaterial()
  matCapMaterial.matcap = matCapTexture

  //?meshDepthMaterial
  const depthMaterial = new THREE.MeshDepthMaterial();

  //?MeshLamberMaterial
  //needs lights to work
  const lamberMaterial = new THREE.MeshLambertMaterial()

  //?MeshPhongMaterial
  //needs lights to work
  const phongMaterial = new THREE.MeshPhongMaterial();
  phongMaterial.shininess = 100
  phongMaterial.specular = new THREE.Color(0x0000ff);

  //?CartonMaterial
  const cartoonMaterial = new THREE.MeshToonMaterial();
  
  
  

//Sphere
 const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5,16,16),
  matCapMaterial
 );

 //plane
 const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1,1),
  material

 );

 plane.position.x = 1.3;

 //Torus
 const torus = new THREE.Mesh(
  new  THREE.TorusBufferGeometry(0.3,0.2,16,12),
    cartoonMaterial
 );

 torus.position.x = -1.3;


 //Adding meshes to the scene
 scene.add(sphere,plane,torus);

 //Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  
  const pontLight = new THREE.PointLight(0xffffff,0.5);
  pontLight.getWorldPosition.x = 2;

  scene.add(ambientLight,pontLight);
  
//camera 
const camera = new THREE.PerspectiveCamera(75, sizes.with / sizes.height, 0.1,100);
camera.position.x = 2;
camera.position.y = 3;
camera.position.z = 4;



//canvas
const canvas =document.querySelector('canvas.webGL');

//Rendering the scene
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.with, sizes.height);

// ? if i don't have a canvas element in the html
// const renderer = new THREE.WebGLRenderer();
// const rendererElement = renderer.domElement;
// document.body.appendChild(rendererElement);
// const controls = new OrbitControls( camera, renderer.domElement );


//Controls
const controls = new OrbitControls( camera, canvas );

//settings to smooth movement on pan
controls.enableDamping = true;
controls.dampingFactor =  0.05;

camera.position.set( 0, 0, 2 );
controls.update();


const clock = new THREE.Clock();

function animate() {

  //same nome function as parameter
  requestAnimationFrame( animate );
	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

  const elapsedTime = clock.getElapsedTime();

  //animate meshes
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;
  sphere.rotation.y = 0.1 * elapsedTime;

  plane.rotation.x = 0.3 * elapsedTime;
  torus.rotation.x = 0.3 * elapsedTime;
  sphere.rotation.x = 0.3 * elapsedTime;
  

	renderer.render( scene, camera );

}

animate();

