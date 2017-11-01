import * as THREE from 'three'
import FPS from './fps'

const canvas = document.getElementById('gl-canvas') as HTMLCanvasElement
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000)
const clock = new THREE.Clock()
const controls = new FPS(camera, canvas)
controls.lookSpeed = 0.1

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(canvas.width, canvas.height)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

const animate = function () {
  const delta = clock.getDelta()
  const time = clock.getElapsedTime() * 10
  controls.update(delta)
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
