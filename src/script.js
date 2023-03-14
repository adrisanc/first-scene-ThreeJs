import "./styles.css";
//Scene
import * as THREE from "three";
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Cursor 
const cursor = {
    x:0,
    y:0
}
window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = - (e.clientY / sizes.height - 0.5);

})

const scene = new THREE.Scene();
//Mesh
// const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2);
// const geometry = new THREE.Geometry()


const geometry = new THREE.BufferGeometry();
const count = 50;
const positionsArray = new Float32Array( count * 3 * 3)

for(let i = 0; i< count * 3 * 3; i++){
    positionsArray[i] = (Math.random() - 0.5) * 2
}

const positionAttribute = new THREE.BufferAttribute(positionsArray,3)

//it's important to set the attribute with the name position
geometry.setAttribute('position', positionAttribute)

const material = new THREE.MeshBasicMaterial({ 
    color: "#ff0000" ,
    wireframe: true
});


const mesh = new THREE.Mesh(geometry, material);
//Position mesh
// mesh.position.x = 3
// mesh.position.y = -3
// mesh.position.z = -1
mesh.position.set(0, 0, -3);

// Scale mesh
// mesh.scale.set(2, 0, 1);

//Rotate Mesh
mesh.rotation.reorder("YXZ");
mesh.rotation.y = Math.PI / 2;
mesh.rotation.x = Math.PI / 2;
scene.add(mesh);

//Create a Group
const group = new THREE.Group();
scene.add(group);

//Meshes to add to the group
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 2, 3),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube1.position.set(0.8, 1, -3);
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 3),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube2.position.set(3.5, 2, -3);
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 3),
  new THREE.MeshBasicMaterial({ color: 0x00d377 })
);
cube3.position.set(4, 3, -3);
group.add(cube3);
group.position.set(1, -2, 1);

// Axes Helper
const axesHelper = new THREE.AxesHelper(3);

scene.add(axesHelper);
mesh.position.normalize();
// console.log(mesh.position.length());

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
    //Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.updateProjectionMatrix()

    // Update Camera
    camera.aspect=sizes.width / sizes.height
    
    //UpdateRendere 
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

});

window.addEventListener('dblclick', () => {

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement) {
        if (canvas.requestFullscreen) {
            
            canvas.requestFullscreen()
        } else if(canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }

    }else{
        if ( document.exitFullscreen) {
            document.exitFullscreen()
        } else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen()
        }
    }

})

//perspective Camera
const camera = new THREE.PerspectiveCamera(71, sizes.width / sizes.height,0.1,100);

// Ortagraphic Camera
// (left,rigth,top,bottom)
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio,1,-1,0.1,100)
scene.add(camera);

//Setting camera position
// camera.position.x = 3; //same as blender(horizontal)
// camera.position.y = 3; //it would be z in blender(vertical)
camera.position.z = 3; //it would be y in blender(depth)

// Set camera to focus on mesh
// camera.lookAt(mesh.position)

//rendering mesh
const canvas = document.querySelector(".webGL");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});

//Controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
// controls.update()
// controls.target.y = 1;

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// let time = Date.now()

//Clock 
const clock = new THREE.Clock();

// gsap.to(mesh.position,{duration: 1, delay:1, x:2})
// gsap.to(mesh.position,{duration: 1, delay:2, x:0})

//Animations
const tick = () => {

    //Time 
    // const currentTime = Date.now();
    // const deltaTime = currentTime - time;
    // time = currentTime;

    // Update objects by Time 
    // mesh.rotation.y += 0.001 * deltaTime

    //Clock 
    const elapsedTime = clock.getElapsedTime();
    //Update objects with clock class
    // mesh.rotation.y = elapsedTime
    // group.position.y = Math.sin(elapsedTime);
    // mesh.position.x = Math.cos(elapsedTime)

    //Update Camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 5;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 5 ;
    // camera.position.y = cursor.y * 10 ;
    // camera.lookAt(mesh.position);

    //Update Controls smmoth movemment with controls.enableDamping = true;
    controls.update();


    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
};
tick()
