import * as THREE from 'three'

const yellow = new THREE.Color(0xe2f705)
const green = new THREE.Color(0xa3f307)
const blue = new THREE.Color(0x05f9e2)
const pink = new THREE.Color(0xf50b86)
const orange = new THREE.Color(0xff6f00)
const white = new THREE.Color(0xffffff)

const pinkSticker = {
    color: pink,
    position: { x: 0, y: 0, z: -0.51 },
    rotation: { x: 0, y: 0, z: 0 },
}

const whiteSticker = {
    color: white,
    position: { x: 0, y: -0.51, z: 0 },
    rotation: { x: Math.PI * 0.5, y: 0, z: 0 },
}

const blueSticker = {
    color: blue,
    position: { x: -0.51, y: 0, z: 0 },
    rotation: { x: 0, y: Math.PI * 0.5, z: 0 },
}

const greenSticker = {
    color: green,
    position: { x: 0.51, y: 0, z: 0 },
    rotation: { x: 0, y: Math.PI * 0.5, z: 0 },
}

const orangeSticker = {
    color: orange,
    position: { x: 0, y: 0, z: 0.51 },
    rotation: { x: 0, y: 0, z: 0 },
}

const yellowSticker = {
    color: yellow,
    position: { x: 0, y: 0.51, z: 0 },
    rotation: { x: Math.PI * 0.5, y: 0, z: 0 },
}

const cubeColorMapping = {
    'bottom-back-left': [pinkSticker, whiteSticker, blueSticker],
    'bottom-back-center': [pinkSticker, whiteSticker],
    'bottom-back-right': [pinkSticker, whiteSticker, greenSticker],
    'bottom-center-left': [blueSticker, whiteSticker],
    'bottom-center-center': [whiteSticker],
    'bottom-center-right': [whiteSticker, greenSticker],
    'bottom-front-left': [orangeSticker, whiteSticker, blueSticker],
    'bottom-front-center': [orangeSticker, whiteSticker],
    'bottom-front-right': [orangeSticker, whiteSticker, greenSticker],
    'center-back-left': [pinkSticker, blueSticker],
    'center-back-center': [pinkSticker],
    'center-back-right': [pinkSticker, greenSticker],
    'center-center-left': [blueSticker],
    'center-center-right': [greenSticker],
    'center-front-left': [blueSticker, orangeSticker],
    'center-front-center': [orangeSticker],
    'center-front-right': [orangeSticker, greenSticker],
    'top-back-left': [yellowSticker, pinkSticker, blueSticker],
    'top-back-center': [yellowSticker, pinkSticker],
    'top-back-right': [yellowSticker, pinkSticker, greenSticker],
    'top-center-left': [yellowSticker, blueSticker],
    'top-center-center': [yellowSticker],
    'top-center-right': [yellowSticker, greenSticker],
    'top-front-left': [yellowSticker, blueSticker, orangeSticker],
    'top-front-center': [yellowSticker, orangeSticker],
    'top-front-right': [yellowSticker, orangeSticker, greenSticker],
}

export default cubeColorMapping
