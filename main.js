import "./style.css";

import * as THREE from "three";

/**
 * TODO: separate main.js into separate files for 3js and other js...
 */

// scene is the base environment
const scene = new THREE.Scene();

// camera enables the user to see the scene
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// zooming camera out to better view scene
camera.position.setZ(30);

// renderer is what builds the scene
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector("#bg"),
});

renderer.pixelRatio = window.devicePixelRatio;
renderer.setSize(window.innerWidth, window.innerHeight);

// geometry is the shape
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// material is the 'skin'
const material = new THREE.MeshStandardMaterial({ color: 0x009739 });
// combining geometry and material
const torus = new THREE.Mesh(geometry, material);

//adding torus to scene
scene.add(torus);

// instantiating new lights: point and ambient
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15, 30, -15);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

// scene.add(lightHelper, gridHelper);

// adding randomly arranged stars
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 25, 25);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(1000));

    star.position.set(x, y, z);
    scene.add(star);
}

function addStarsToScene(numberOfObjects) {
    for (let i = 0; i < numberOfObjects; i++) {
        addStar();
    }
}

addStarsToScene(1000);

// like a game loop in game dev
function animate() {
    requestAnimationFrame(animate);
    torus.rotateX(0.01);
    torus.rotateY(0.01);
    torus.rotateZ(0.01);

    // controls.update();

    renderer.render(scene, camera);
}

animate();

// UX JavaScript
function moveCamera() {
    // t is how far the user is to the top of the body
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.05;
    camera.position.y = t * 0.05;
}

function populateUL(numberOfElements) {
    const ul = document.querySelector("#test-list");
    const li = `<li>Proin tristique justo quis nisl suscipit, ut vehicula libero congue.</li>`;
    for (let i = 0; i < numberOfElements; i++) {
        ul.insertAdjacentHTML("beforeend", li);
    }
}

populateUL(1000);
document.body.onscroll = moveCamera;
