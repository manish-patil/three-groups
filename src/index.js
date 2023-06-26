import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setClearColor(0x225599);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(20, 0, 50);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update(); // check if this is required.

const axisHelper = new THREE.AxesHelper(10);
scene.add(axisHelper);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 2, "red");
scene.add(lightHelper);

// Group
const group = new THREE.Group();

const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000, wireframe: false });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

for (let i = 0; i < 10; i++) {
    const newSphere = sphere.clone();
    newSphere.name = `sphere${i}`;

    const angle = i * ((2 * Math.PI) / 10);

    // Calculate 'x' distance as 'radius * cos ( angle )' and 'y' distance using 'sin'...
    const x = (10) * Math.cos(angle);
    const y = (10) * Math.sin(angle);
    const z = (10) * Math.sin(angle);

    console.log(`angle - ${i} ${angle}, toDegree: ${toDegrees(angle)} x: ${x}, y: ${y}, z: ${z}`)

    newSphere.position.x = x;
    // newSphere.position.y = y;
    newSphere.position.z = z;

    group.add(newSphere);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

scene.add(group);
// Group

function animate(time) {
    group.rotateY(0.009);
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, this.window.innerHeight)
})