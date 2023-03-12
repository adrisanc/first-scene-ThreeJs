import './styles.css'
//Scene
import * as THREE from 'three'
const scene = new THREE.Scene();

//Mesh
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: '#ff0000'});
const mesh = new THREE.Mesh(geometry,material);
//Position mesh
// mesh.position.x = 3
// mesh.position.y = -3
// mesh.position.z = -1
mesh.position.set(2,0,-3)

// Scale mesh
mesh.scale.set(2,0.5,1);

//Rotate Mesh 
mesh.rotation.reorder('YXZ')
mesh.rotation.y= Math.PI / 2
mesh.rotation.x = Math.PI / 2
scene.add(mesh);

//Create a Group 
const group = new THREE.Group();
scene.add(group);

//Meshes to add to the group
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,2,3),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
)
cube1.position.set(2,1,-3)
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,3),
    new THREE.MeshBasicMaterial({color: 0x0000ff})
)
cube2.position.set(3.5,2,-3);
group.add(cube2);


const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,3),
    new THREE.MeshBasicMaterial({color: 0x00d377})
)
cube3.position.set(4,3,-3)
group.add(cube3);
group.position.set(1,-2,-1)




// Axes Helper
const axesHelper = new THREE.AxesHelper(3);

scene.add(axesHelper)
mesh.position.normalize();
console.log(mesh.position.length());

//Camera
const sizes = {
    width:800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);

//Setting camera position
camera.position.z = 3;//it would be y in blender(depth)
camera.position.x = 1;//same as blender(horizontal)
camera.position.y = 1;//it would be z in blender(vertical)

// Set camera to focus on mesh
// camera.lookAt(mesh.position)

//rendering mesh 
const canvas = document.querySelector('.webGL');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene,camera)

