
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// --- DOM Elements ---
// Adapted to match existing HTML IDs
const container = document.getElementById('rgb-cube-container');
const sliderR = document.getElementById('slider-r');
const sliderG = document.getElementById('slider-g');
const sliderB = document.getElementById('slider-b');

const valR = document.getElementById('val-r');
const valG = document.getElementById('val-g');
const valB = document.getElementById('val-b');

const vecR = document.getElementById('vec-r');
const vecG = document.getElementById('vec-g');
const vecB = document.getElementById('vec-b');

if (!container || !sliderR || !sliderG || !sliderB) {
    console.error('One or more required HTML elements are missing.');
} else {
    // Clear loading text
    container.innerHTML = '';
}

// --- Basic Setup ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xE5E7EB);
const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// --- Constants ---
const steps = 6; // Reduced steps slightly for performance if needed, or keep 10. User said 10.
// 10*10*10 = 1000 spheres. InstancedMesh handles this easily.
const gridSteps = 10;
const cubeSize = 15;
const center = cubeSize / 2;

// --- Sphere Grid ---
const sphereGeom = new THREE.SphereGeometry(0.2, 16, 16);
const instancedMesh = new THREE.InstancedMesh(sphereGeom, new THREE.MeshBasicMaterial({ color: 0xffffff }), gridSteps * gridSteps * gridSteps);
const matrix = new THREE.Matrix4();
const color = new THREE.Color();
let i = 0;
for (let r = 0; r < gridSteps; r++) {
    for (let g = 0; g < gridSteps; g++) {
        for (let b = 0; b < gridSteps; b++) {
            const x = (r / (gridSteps - 1)) * cubeSize;
            const y = (g / (gridSteps - 1)) * cubeSize;
            const z = (b / (gridSteps - 1)) * cubeSize;
            matrix.setPosition(x, y, z);
            instancedMesh.setMatrixAt(i, matrix);
            instancedMesh.setColorAt(i, color.setRGB(r / (gridSteps - 1), g / (gridSteps - 1), b / (gridSteps - 1)));
            i++;
        }
    }
}
scene.add(instancedMesh);

// --- Axes & Labels ---
const axisLength = cubeSize * 1.1;
// Custom lines for Axes
const xAxisGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(axisLength, 0, 0)]);
const yAxisGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, axisLength, 0)]);
const zAxisGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, axisLength)]);

scene.add(new THREE.Line(xAxisGeo, new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 })));
scene.add(new THREE.Line(yAxisGeo, new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 2 })));
scene.add(new THREE.Line(zAxisGeo, new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 2 })));

// Origin sphere
scene.add(new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), new THREE.MeshBasicMaterial({ color: 0x000000 })));

// Load Font
const fontLoader = new FontLoader();
fontLoader.load('https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json', (font) => {
    const textParams = { font: font, size: 0.8, height: 0.1 };

    // R Label
    const rGeo = new TextGeometry('R', textParams);
    const rMesh = new THREE.Mesh(rGeo, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    rMesh.position.set(axisLength + 0.5, 0, 0);
    scene.add(rMesh);

    // G Label
    const gGeo = new TextGeometry('G', textParams);
    const gMesh = new THREE.Mesh(gGeo, new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    gMesh.position.set(0, axisLength + 0.5, 0);
    scene.add(gMesh);

    // B Label
    const bGeo = new TextGeometry('B', textParams);
    const bMesh = new THREE.Mesh(bGeo, new THREE.MeshBasicMaterial({ color: 0x0000ff }));
    bMesh.position.set(0, 0, axisLength + 0.5);
    scene.add(bMesh);
});

// --- Interactive Vector ---
let vectorTube, vectorTip;
const tubeRadius = 0.2;
const tipRadius = 0.5;
const tipHeight = 1.5;

function updateVector(r, g, b) {
    if (vectorTube) scene.remove(vectorTube);
    if (vectorTip) scene.remove(vectorTip);

    const r_c = Math.max(0, Math.min(255, r));
    const g_c = Math.max(0, Math.min(255, g));
    const b_c = Math.max(0, Math.min(255, b));

    // Map 0-255 to Cube Coords
    const endPoint = new THREE.Vector3(
        (r_c / 255) * cubeSize,
        (g_c / 255) * cubeSize,
        (b_c / 255) * cubeSize
    );

    // Color of the vector itself
    const vectorColor = new THREE.Color(r_c / 255, g_c / 255, b_c / 255);

    // Create a tube for the vector line (if length > 0)
    if (endPoint.length() > 0.1) {
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

        // Align cone to direction
        // Default cone points up (Y+). We need to rotate it to `direction`.
        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
        vectorTip.setRotationFromQuaternion(quaternion);

        vectorTip.position.copy(endPoint);
        scene.add(vectorTip);
    }
}

// --- Controls & Listeners ---
camera.position.set(25, 25, 25);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(center, center, center);

// Update Handler
function onParamsChange() {
    const r = parseInt(sliderR.value);
    const g = parseInt(sliderG.value);
    const b = parseInt(sliderB.value);

    // Update Text Labels
    if (valR) valR.innerText = r;
    if (valG) valG.innerText = g;
    if (valB) valB.innerText = b;

    if (vecR) vecR.innerText = r;
    if (vecG) vecG.innerText = g;
    if (vecB) vecB.innerText = b;

    updateVector(r, g, b);
}

if (sliderR && sliderG && sliderB) {
    sliderR.addEventListener('input', onParamsChange);
    sliderG.addEventListener('input', onParamsChange);
    sliderB.addEventListener('input', onParamsChange);

    // Init
    onParamsChange();
}

window.addEventListener('resize', () => {
    if (container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
