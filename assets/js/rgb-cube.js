import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// --- DOM Elements ---
const container = document.getElementById('rgb-cube-container');
const rInput = document.getElementById('r-input');
const gInput = document.getElementById('g-input');
const bInput = document.getElementById('b-input');
const updateBtn = document.getElementById('update-vector-btn');

if (!container || !rInput || !gInput || !bInput || !updateBtn) {
    throw new Error('One or more required HTML elements are missing.');
}

// --- Basic Setup ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xE5E7EB); // Changed background color
const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// --- Constants ---
const steps = 10;
const cubeSize = 15;
const center = cubeSize / 2;

// --- Sphere Grid ---
const sphereGeom = new THREE.SphereGeometry(0.3, 16, 16);
const instancedMesh = new THREE.InstancedMesh(sphereGeom, new THREE.MeshBasicMaterial({color: 0xffffff}), steps * steps * steps);
const matrix = new THREE.Matrix4();
const color = new THREE.Color();
let i = 0;
for (let r = 0; r < steps; r++) {
    for (let g = 0; g < steps; g++) {
        for (let b = 0; b < steps; b++) {
            const x = (r / (steps - 1)) * cubeSize;
            const y = (g / (steps - 1)) * cubeSize;
            const z = (b / (steps - 1)) * cubeSize;
            matrix.setPosition(x, y, z);
            instancedMesh.setMatrixAt(i, matrix);
            instancedMesh.setColorAt(i, color.setRGB(r / (steps - 1), g / (steps - 1), b / (steps - 1)));
            i++;
        }
    }
}
scene.add(instancedMesh);

// --- Axes & Labels ---
const axisLength = cubeSize * 1.1;
scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(axisLength, 0, 0)]), new THREE.LineBasicMaterial({ color: 0xff0000 })));
scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, axisLength, 0)]), new THREE.LineBasicMaterial({ color: 0x00ff00 })));
scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, axisLength)]), new THREE.LineBasicMaterial({ color: 0x0000ff })));
scene.add(new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }))); // Origin sphere

const fontLoader = new FontLoader();
fontLoader.load('https://unpkg.com/three@0.163.0/examples/fonts/helvetiker_bold.typeface.json', (font) => {
    const textParams = { font: font, size: 0.8, height: 0.1 };
    const rMesh = new THREE.Mesh(new TextGeometry('R', textParams), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    rMesh.position.set(axisLength + 0.5, 0, 0);
    scene.add(rMesh);
    const gMesh = new THREE.Mesh(new TextGeometry('G', textParams), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    gMesh.position.set(0, axisLength + 0.5, 0);
    scene.add(gMesh);
    const bMesh = new THREE.Mesh(new TextGeometry('B', textParams), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
    bMesh.position.set(0, 0, axisLength + 0.5);
    scene.add(bMesh);
});

// --- Interactive Vector ---
let vectorTube, vectorTip;
const tubeRadius = 0.2; // Increased thickness
const tipRadius = 0.4;
const tipHeight = 1.2; // Adjusted tip height

function updateVector(r, g, b) {
    if (vectorTube) scene.remove(vectorTube);
    if (vectorTip) scene.remove(vectorTip);

    const r_c = Math.max(0, Math.min(255, r));
    const g_c = Math.max(0, Math.min(255, g));
    const b_c = Math.max(0, Math.min(255, b));

    const endPoint = new THREE.Vector3(
        (r_c / 255) * cubeSize,
        (g_c / 255) * cubeSize,
        (b_c / 255) * cubeSize
    );
    const vectorColor = new THREE.Color(r_c / 255, g_c / 255, b_c / 255);

    // Create a tube for the vector line
    const path = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), endPoint);
    const tubeGeometry = new THREE.TubeGeometry(path, 20, tubeRadius, 8, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({ color: vectorColor });
    vectorTube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(vectorTube);

    // Create a cone for the vector tip
    const tipGeometry = new THREE.ConeGeometry(tipRadius, tipHeight, 16);
    const tipMaterial = new THREE.MeshBasicMaterial({ color: vectorColor });
    vectorTip = new THREE.Mesh(tipGeometry, tipMaterial);
    
    // Position and orient the cone
    const direction = endPoint.clone().normalize();
    const arrow = new THREE.ArrowHelper(direction, new THREE.Vector3(0,0,0), 0, 0xffff00, tipHeight, tipRadius); // Use ArrowHelper for orientation
    vectorTip.quaternion.copy(arrow.quaternion);
    vectorTip.position.copy(endPoint);

    scene.add(vectorTip);
}

// --- Controls & Listeners ---
camera.position.set(25, 25, 25);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(center, center, center);

updateBtn.addEventListener('click', () => {
    updateVector(parseInt(rInput.value), parseInt(gInput.value), parseInt(bInput.value));
});

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// --- Initial State & Animation ---
updateVector(255, 255, 255); // Default to white

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();