import './style.css'

import * as THREE from 'three'

// const yellow = new THREE.Color(0xe2f705)
// const green = new THREE.Color(0xa3f307)
// const blue = new THREE.Color(0x05f9e2)
// const pink = new THREE.Color(0xf50b86)
// const orange = new THREE.Color(0xff6f00)
const black = new THREE.Color(0x1d1f33)
const white = new THREE.Color(0xffffff)

const scene = new THREE.Scene()
scene.background = white

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.setZ(10)

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('webgl'),
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

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
cube.position.set(0, 0, 0)
camera.lookAt(cube.position)

renderer.render(scene, camera)

const cursor = {
    x: 0,
    y: 0,
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / window.innerWidth - 0.5
    cursor.y = -(event.clientY / window.innerHeight - 0.5)
})

const animate = () => {
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 6
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 6
    camera.position.y = cursor.y * 9
    camera.lookAt(cube.position)

    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()
