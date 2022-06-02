import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'

import cubeColorMapping from './stickers'

// const gui = new dat.GUI()

const black = new THREE.Color(0x1d1f33)
const white = new THREE.Color(0xffffff)

const scene = new THREE.Scene()
scene.background = black

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

const addStickers = (mesh, name) => {
    if (name === 'center-center-center') return
    const geometry = new THREE.PlaneGeometry(0.8, 0.8)
    const location = cubeColorMapping[name]
    if (location) {
        location.forEach((sticker) => {
            const {
                color,
                position = { x: 0, y: 0, z: 0 },
                rotation = { x: 0, y: 0, z: 0 },
            } = sticker
            const material = new THREE.MeshBasicMaterial({
                color,
                side: THREE.DoubleSide,
            })
            const plane = new THREE.Mesh(geometry, material)
            plane.position.set(position.x, position.y, position.z)
            plane.rotateX(rotation.x)
            plane.rotateY(rotation.y)
            plane.rotateZ(rotation.z)

            mesh.add(plane)
        })
    }
}

// TODO: make recursive?
const createLane = (layer, lane) => {
    const group = new THREE.Group()
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({
        color: white,
    })
    let placing
    for (let i = -1; i < 2; i++) {
        if (i === -1) {
            placing = 'left'
        } else if (i === 1) {
            placing = 'right'
        } else {
            placing = 'center'
        }

        const mesh = new THREE.Mesh(geometry, material)
        group.add(mesh)
        mesh.position.x = i

        const name = `${layer}-${lane}-${placing}`
        addStickers(mesh, name)
    }

    return group
}

const createSide = (layer) => {
    const group = new THREE.Group()

    let placing
    for (let i = -1; i < 2; i++) {
        if (i === -1) {
            placing = 'back'
        } else if (i === 1) {
            placing = 'front'
        } else {
            placing = 'center'
        }

        const lane = createLane(layer, placing)
        lane.position.z = i
        group.add(lane)
    }

    return group
}

const createCube = () => {
    const group = new THREE.Group()

    let placing
    for (let i = -1; i < 2; i++) {
        if (i === -1) {
            placing = 'bottom'
        } else if (i === 1) {
            placing = 'top'
        } else {
            placing = 'center'
        }

        const side = createSide(placing)
        side.position.y = i
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
