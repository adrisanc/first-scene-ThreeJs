//Scene
const scene = new THREE.Scene();

//Mesh
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: '#ff0000'});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


//Camera
const sizes = {
    width:800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);

//Setting camera position
camera.position.z = 3;//it would be y in blender(depth)
camera.position.x = 2;//same as blender(horizontal)
camera.position.y = 0;//it would be z in blender(vertical)

//rendering mesh 
const canvas = document.querySelector('.webGL');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene,camera)



//Adding elements to the scene