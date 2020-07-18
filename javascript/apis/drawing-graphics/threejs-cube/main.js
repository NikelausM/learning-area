// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 5;

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// let cube;

// let loader = new THREE.TextureLoader();

// loader.load( 'metal003.png', function (texture) {
// 	texture.wrapS = THREE.RepeatWrapping;
// 	texture.wrapT = THREE.RepeatWrapping;
// 	texture.repeat.set(2, 2);

// 	let geometry = new THREE.BoxGeometry(2.4,2.4,2.4);
// 	let material = new THREE.MeshLambertMaterial( { map: texture, shading: THREE.FlatShading } );
// 	cube = new THREE.Mesh(geometry, material);
// 	scene.add(cube);

// 	draw();
// });

// let light = new THREE.AmbientLight('rgb(255,255,255)'); // soft white light
// scene.add(light);

// let spotLight = new THREE.SpotLight('rgb(255,255,255)');
// spotLight.position.set( 100, 1000, 1000 );
// spotLight.castShadow = true;
// scene.add(spotLight);

// function draw() {
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);

// 	requestAnimationFrame(draw);
// }

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let cube;

let loader = new THREE.TextureLoader();

// TextureLoader takes in texture we want to load (PNG), and function to run when texture has loaded
loader.load( 'metal003.png', function (texture) {
	// want 2 x 2 repeat of the image wrapped around all sides of the cube
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2, 2);
	
	let geometry = new THREE.BoxGeometry(2.4, 2.4, 2.4);
	let material = new THREE.MeshLambertMaterial( { map: texture, shading: THREE.FlatShading } );
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	
	draw();
});

// Add lighting
let light = new THREE.AmbientLight('rgb(255, 255, 255)'); // soft white light
scene.add(light);

let spotLight = new THREE.SpotLight('rgb(255, 255, 255)');
spotLight.position.set( 100, 1000, 1000 );
spotLight.castShadow = true;
scene.add(spotLight);

// Draw
function draw() {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(scene, camera);
  
	requestAnimationFrame(draw);
  }