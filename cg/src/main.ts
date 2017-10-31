import { setupContext } from './utils'
import { mat4, glMatrix, vec3 } from 'gl-matrix'
import keycode from 'keycode'
import Shader from './shader'
import vs from './shaders/vs'
import fs from './shaders/fs'

const gl = (window as any).gl = setupContext('#gl-canvas', 800, 600)
const shader = new Shader(gl, vs, fs)
shader.use()

const vertices = [
  -0.5, -0.5, -0.5,  0.0, 0.0,
  0.5, -0.5, -0.5,  1.0, 0.0,
  0.5,  0.5, -0.5,  1.0, 1.0,
  0.5,  0.5, -0.5,  1.0, 1.0,
  -0.5,  0.5, -0.5,  0.0, 1.0,
  -0.5, -0.5, -0.5,  0.0, 0.0,

  -0.5, -0.5,  0.5,  0.0, 0.0,
  0.5, -0.5,  0.5,  1.0, 0.0,
  0.5,  0.5,  0.5,  1.0, 1.0,
  0.5,  0.5,  0.5,  1.0, 1.0,
  -0.5,  0.5,  0.5,  0.0, 1.0,
  -0.5, -0.5,  0.5,  0.0, 0.0,

  -0.5,  0.5,  0.5,  1.0, 0.0,
  -0.5,  0.5, -0.5,  1.0, 1.0,
  -0.5, -0.5, -0.5,  0.0, 1.0,
  -0.5, -0.5, -0.5,  0.0, 1.0,
  -0.5, -0.5,  0.5,  0.0, 0.0,
  -0.5,  0.5,  0.5,  1.0, 0.0,

  0.5,  0.5,  0.5,  1.0, 0.0,
  0.5,  0.5, -0.5,  1.0, 1.0,
  0.5, -0.5, -0.5,  0.0, 1.0,
  0.5, -0.5, -0.5,  0.0, 1.0,
  0.5, -0.5,  0.5,  0.0, 0.0,
  0.5,  0.5,  0.5,  1.0, 0.0,

  -0.5, -0.5, -0.5,  0.0, 1.0,
  0.5, -0.5, -0.5,  1.0, 1.0,
  0.5, -0.5,  0.5,  1.0, 0.0,
  0.5, -0.5,  0.5,  1.0, 0.0,
  -0.5, -0.5,  0.5,  0.0, 0.0,
  -0.5, -0.5, -0.5,  0.0, 1.0,

  -0.5,  0.5, -0.5,  0.0, 1.0,
  0.5,  0.5, -0.5,  1.0, 1.0,
  0.5,  0.5,  0.5,  1.0, 0.0,
  0.5,  0.5,  0.5,  1.0, 0.0,
  -0.5,  0.5,  0.5,  0.0, 0.0,
  -0.5,  0.5, -0.5,  0.0, 1.0
]

const cubePosition = [
  [0.0,  0.0,  0.0],
  [2.0,  5.0, -15.0],
  [-1.5, -2.2, -2.5],
  [-3.8, -2.0, -12.3],
  [2.4, -0.4, -3.5],
  [-1.7,  3.0, -7.5],
  [1.3, -2.0, -2.5],
  [1.5,  2.0, -2.5],
  [1.5,  0.2, -1.5],
  [-1.3,  1.0, -1.5]
]

const texCoords = [
  0, 0,
  1, 0,
  0.5, 1
]

const vbo = gl.createBuffer()
const vao = gl.createVertexArray()
gl.bindVertexArray(vao)

gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0)
gl.enableVertexAttribArray(0)

gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT)
gl.enableVertexAttribArray(1)

// gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 8 * Float32Array.BYTES_PER_ELEMENT, 6 * Float32Array.BYTES_PER_ELEMENT)
// gl.enableVertexAttribArray(2)

gl.clearColor(0.2, 0.3, 0.3, 1)
gl.enable(gl.DEPTH_TEST)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

const texture = gl.createTexture()
gl.bindTexture(gl.TEXTURE_2D, texture)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

const image = document.querySelector('#container') as HTMLImageElement
if (!image) {
  throw new Error('image container not exists')
}
const width = image.naturalWidth
const height = image.naturalHeight

gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB, gl.UNSIGNED_BYTE, image)

let model
let view
let projection
let cameraPos = vec3.fromValues(0, 0, 3)
let cameraFront = vec3.fromValues(0, 0, -1)
let cameraUp = vec3.fromValues(0, 1, 0)
let deltaTime = 0
let lastFrame = 0

let firstMouse = true
let yaw = -90
let pitch = 0
let lastX = width / 2
let lastY = height / 2
let fov = 45

function render () {
  const now = Date.now() / 1000
  deltaTime = now - lastFrame
  lastFrame = now
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  view = mat4.lookAt(mat4.create(), cameraPos, vec3.add(vec3.create(), cameraPos, cameraFront), cameraUp)
  projection = mat4.perspective(mat4.create(), glMatrix.toRadian(fov), width / height, 0.1, 100)

  shader.setMatrix4fv('view', view)
  shader.setMatrix4fv('projection', projection)
  for (let i = 0; i < cubePosition.length; i++) {
    model = mat4.create()
    model = mat4.translate(model, model, cubePosition[i])
    const angle = 20 * i * now
    model = mat4.rotate(model, model, glMatrix.toRadian(angle), [1, 0.3, 0.5])
    shader.setMatrix4fv('model', model)

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 5)
  }
  requestAnimationFrame(render)
}

render()

window.onkeydown = (e) => {
  const cameraSpeed = 2.5 * deltaTime

  switch (keycode(e)) {
    case 'w':
    case 'up':
      vec3.add(cameraPos, cameraPos, vec3.scale(vec3.create(), cameraFront, cameraSpeed))
      break
    case 's':
    case 'down':
      vec3.sub(cameraPos, cameraPos, vec3.scale(vec3.create(), cameraFront, cameraSpeed))
      break
    case 'a':
    case 'left':
      {
        let cross = vec3.cross(vec3.create(), cameraFront, cameraUp)
        let normalize = vec3.normalize(vec3.create(), cross)
        vec3.sub(cameraPos, cameraPos, vec3.scale(vec3.create(), normalize, cameraSpeed))
      }
      break
    case 'd':
    case 'right':
      {
        let cross = vec3.cross(vec3.create(), cameraFront, cameraUp)
        let normalize = vec3.normalize(vec3.create(), cross)
        vec3.add(cameraPos, cameraPos, vec3.scale(vec3.create(), normalize, cameraSpeed))
      }
      break
    case 'r':
      cameraPos = vec3.fromValues(0, 0, 3)
      cameraFront = vec3.fromValues(0, 0, -1)
      cameraUp = vec3.fromValues(0, 1, 0)
      yaw = -90
      pitch = 0
  }
}

document.getElementById('gl-canvas').onmousemove = (e: MouseEvent) => {
  if (!e.which) {
    return
  }
  const sensitivity = 0.1
  let xoffset = e.movementX / 10
  let yoffset = e.movementY / 10

  xoffset += sensitivity
  yoffset += sensitivity

  yaw += xoffset
  pitch += yoffset

  if (pitch > 89) {
    pitch = 89
  }

  if (pitch < -89) {
    pitch = -89
  }

  cameraFront = vec3.normalize(vec3.create(), [
    Math.cos(glMatrix.toRadian(yaw)) * Math.cos(glMatrix.toRadian(pitch)),
    Math.sin(glMatrix.toRadian(pitch)),
    Math.sin(glMatrix.toRadian(yaw)) * Math.cos(glMatrix.toRadian(pitch))
  ])
}

document.getElementById('gl-canvas').onmousewheel = (e: MouseWheelEvent) => {
  if (fov >= 1 && fov <= 60) {
    fov -= e.wheelDeltaY / 120
  }
  if (fov <= 1) {
    fov = 1
  }
  if (fov >= 60) {
    fov = 60
  }
}
