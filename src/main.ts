import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(20);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
const controls = new OrbitControls(camera, renderer.domElement);

pointLight.position.set(0, 0, 0);

scene.add(pointLight, ambientLight);

const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: "white" });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill("")
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);

  scene.add(star);
};

Array(200).fill("").forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("../public/space.jpg");
scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load("../public/moon.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

scene.add(moon);

const animate = () => {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.001;

  controls.update();
  renderer.render(scene, camera);
};
animate();
