import './style.css';

import * as THREE from 'three';

const yellow  = new THREE.Color(0xe2f705);
const green  = new THREE.Color(	0xa3f307);
const blue  = new THREE.Color(0x05f9e2);
const pink  = new THREE.Color(0xf50b86);
const orange  = new THREE.Color(0xff6f00);
const black = new THREE.Color(0x1D1F33);
const white = new THREE.Color(0xffffff);

const scene = new THREE.Scene();
scene.background = white;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(7);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('webgl'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// TODO: create cubes using BufferGeometry
const createLane = () => {
  const group = new THREE.Group();
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: black, wireframe: true});

  for (let i = 0; i < 3; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = i;
    group.add(mesh);
  }

  return group;
};

const createSide = () => {
  const group = new THREE.Group();
  
  for (let i = 0; i < 3; i++) {
    const lane = createLane()
    lane.position.y = i;
    group.add(lane);
  }

  return group
}

const createCube = () => {
  const group = new THREE.Group();

  for (let i = 0; i < 3; i++) {
    const side = createSide()
    side.position.z = i;
    group.add(side);
  }

  return group;
};

const cube = createCube();

cube.rotation.x = Math.PI * 0.25;
cube.rotation.y = Math.PI * 0.25;
scene.add(cube);
// use quaternions

renderer.render(scene, camera);
