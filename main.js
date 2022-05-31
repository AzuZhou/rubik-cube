import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// const yellow = new THREE.Color(0xe2f705)
// const green = new THREE.Color(0xa3f307)
// const blue = new THREE.Color(0x05f9e2)
// const pink = new THREE.Color(0xf50b86)
// const orange = new THREE.Color(0xff6f00)
const black = new THREE.Color(0x1d1f33)
const white = new THREE.Color(0xffffff)

const scene = new THREE.Scene()
scene.background = white

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.setZ(10)

const canvas = document.getElementById('webgl')
const renderer = new THREE.WebGLRenderer({
    canvas,
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// TODO: make recursive?
const createLane = () => {
    const group = new THREE.Group()
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({
        color: black,
        wireframe: true,
    })

    for (let i = -1; i < 2; i++) {
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.x = i
        group.add(mesh)
    }

    return group
}

const createSide = () => {
    const group = new THREE.Group()

    for (let i = -1; i < 2; i++) {
        const lane = createLane()
        lane.position.y = i
        group.add(lane)
    }

    return group
}

const createCube = () => {
    const group = new THREE.Group()

    for (let i = -1; i < 2; i++) {
        const side = createSide()
        side.position.z = i
        group.add(side)
    }

    return group
}

const cube = createCube()
scene.add(cube)
camera.lookAt(cube.position)
controls.update() // called after every manual camera change

renderer.render(scene, camera)

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const animate = () => {
    controls.update() // sis controls.enableDamping or controls.autoRotate true
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()
