import "./styles.css";
//Scene
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import { log } from "three";

//Debug ui
const gui = new dat.GUI();



//Textures
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const matCapTexture = textureLoader.load('/textures/matcaps/7.png');
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

const enviromentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/4/px.png',
  '/textures/environmentMaps/4/nx.png',
  '/textures/environmentMaps/4/py.png',
  '/textures/environmentMaps/4/ny.png',
  '/textures/environmentMaps/4/pz.png',
  '/textures/environmentMaps/4/nz.png',
])


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
  //to sharpen color on mesh
  gradientTexture.minFilter = THREE.NearestFilter;
  gradientTexture.magFilter = THREE.NearestFilter;
  gradientTexture.generateMipmaps = true;
  cartoonMaterial.gradientMap = gradientTexture;

  //?MeshStandarMaterial
  const standardMaterial = new THREE.MeshStandardMaterial()
  // standardMaterial.roughness = 0.90;
  // standardMaterial.metalness = 0.15;
  // standardMaterial.metalnessMap = doorMetalnessTexture;
  // standardMaterial.roughnessMap = doorRoughnessTexture
  // standardMaterial.map = doorColorTexture;
  // standardMaterial.aoMap = doorAmbientOcclusionTexture;
  // standardMaterial.aoMapIntensity = 0.5;
  // standardMaterial.normalMap = doorNormalTexture;
  // standardMaterial.normalScale.set(0.5,0.5);
  // standardMaterial.displacementMap = doorHeightTexture;
  // standardMaterial.displacementScale = 0.1;
  // standardMaterial.transparent= true;
  // standardMaterial.alphaMap = doorAlphaTexture;
  standardMaterial.envMap = enviromentMapTexture;

  //debug ui parameter for mateial
  gui.add(standardMaterial, 'metalness').min(0).max(1).step(0.001);
  gui.add(standardMaterial, 'roughness').min(0).max(1).step(0.001);
  gui.add(standardMaterial, 'aoMapIntensity').min(0).max(1).step(0.001);
  gui.add(standardMaterial, 'displacementScale').min(0).max(1).step(0.001);
  

//Sphere
 const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5,64,64),
  standardMaterial
 );

 sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array,2))


 //plane
 const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1,1,100,100),
  standardMaterial

 );

 plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2))

  console.log(plane.geometry.attributes.uv);

 plane.position.x = 1.3;

 //Torus
 const torus = new THREE.Mesh(
  new  THREE.TorusBufferGeometry(0.3,0.2,64,128),
    standardMaterial
 );

 torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array,2))


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
  // plane.rotation.y = 0.1 * elapsedTime;
  // torus.rotation.y = 0.1 * elapsedTime;
  // sphere.rotation.y = 0.1 * elapsedTime;

  // plane.rotation.x = 0.3 * elapsedTime;
  // torus.rotation.x = 0.3 * elapsedTime;
  // sphere.rotation.x = 0.3 * elapsedTime;
  

	renderer.render( scene, camera );

}

animate();

