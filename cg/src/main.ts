import { setupContext, setupTexture } from './utils'
import { mat4, glMatrix, vec3 } from 'gl-matrix'
import keycode from 'keycode'
import Shader from './shader'
import vs from './shaders/vs'
import fs from './shaders/fs'
import lightVs from './shaders/lightVs'
import lightFs from './shaders/lightFs'

const gl = (window as any).gl = setupContext('#gl-canvas', 800, 600)
const shader = new Shader(gl, vs, fs)
const lightShader = new Shader(gl, lightVs, lightFs)
const width = 800
const height = 600

const vertices = [
  // positions          // normals           // texture coords
  -0.5, -0.5, -0.5,  0.0,  0.0, -1.0,  0.0,  0.0,
  0.5, -0.5, -0.5,  0.0,  0.0, -1.0,  1.0,  0.0,
  0.5,  0.5, -0.5,  0.0,  0.0, -1.0,  1.0,  1.0,
  0.5,  0.5, -0.5,  0.0,  0.0, -1.0,  1.0,  1.0,
  -0.5,  0.5, -0.5,  0.0,  0.0, -1.0,  0.0,  1.0,
  -0.5, -0.5, -0.5,  0.0,  0.0, -1.0,  0.0,  0.0,

  -0.5, -0.5,  0.5,  0.0,  0.0,  1.0,  0.0,  0.0,
  0.5, -0.5,  0.5,  0.0,  0.0,  1.0,  1.0,  0.0,
  0.5,  0.5,  0.5,  0.0,  0.0,  1.0,  1.0,  1.0,
  0.5,  0.5,  0.5,  0.0,  0.0,  1.0,  1.0,  1.0,
  -0.5,  0.5,  0.5,  0.0,  0.0,  1.0,  0.0,  1.0,
  -0.5, -0.5,  0.5,  0.0,  0.0,  1.0,  0.0,  0.0,

  -0.5,  0.5,  0.5, -1.0,  0.0,  0.0,  1.0,  0.0,
  -0.5,  0.5, -0.5, -1.0,  0.0,  0.0,  1.0,  1.0,
  -0.5, -0.5, -0.5, -1.0,  0.0,  0.0,  0.0,  1.0,
  -0.5, -0.5, -0.5, -1.0,  0.0,  0.0,  0.0,  1.0,
  -0.5, -0.5,  0.5, -1.0,  0.0,  0.0,  0.0,  0.0,
  -0.5,  0.5,  0.5, -1.0,  0.0,  0.0,  1.0,  0.0,

  0.5,  0.5,  0.5,  1.0,  0.0,  0.0,  1.0,  0.0,
  0.5,  0.5, -0.5,  1.0,  0.0,  0.0,  1.0,  1.0,
  0.5, -0.5, -0.5,  1.0,  0.0,  0.0,  0.0,  1.0,
  0.5, -0.5, -0.5,  1.0,  0.0,  0.0,  0.0,  1.0,
  0.5, -0.5,  0.5,  1.0,  0.0,  0.0,  0.0,  0.0,
  0.5,  0.5,  0.5,  1.0,  0.0,  0.0,  1.0,  0.0,

  -0.5, -0.5, -0.5,  0.0, -1.0,  0.0,  0.0,  1.0,
  0.5, -0.5, -0.5,  0.0, -1.0,  0.0,  1.0,  1.0,
  0.5, -0.5,  0.5,  0.0, -1.0,  0.0,  1.0,  0.0,
  0.5, -0.5,  0.5,  0.0, -1.0,  0.0,  1.0,  0.0,
  -0.5, -0.5,  0.5,  0.0, -1.0,  0.0,  0.0,  0.0,
  -0.5, -0.5, -0.5,  0.0, -1.0,  0.0,  0.0,  1.0,

  -0.5,  0.5, -0.5,  0.0,  1.0,  0.0,  0.0,  1.0,
  0.5,  0.5, -0.5,  0.0,  1.0,  0.0,  1.0,  1.0,
  0.5,  0.5,  0.5,  0.0,  1.0,  0.0,  1.0,  0.0,
  0.5,  0.5,  0.5,  0.0,  1.0,  0.0,  1.0,  0.0,
  -0.5,  0.5,  0.5,  0.0,  1.0,  0.0,  0.0,  0.0,
  -0.5,  0.5, -0.5,  0.0,  1.0,  0.0,  0.0,  1.0

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

const vbo = gl.createBuffer()
const vao = gl.createVertexArray()
const lightVao = gl.createVertexArray()
gl.bindVertexArray(vao)

gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 8 * Float32Array.BYTES_PER_ELEMENT, 0)
gl.enableVertexAttribArray(0)

gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT)
gl.enableVertexAttribArray(1)

gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 8 * Float32Array.BYTES_PER_ELEMENT, 6 * Float32Array.BYTES_PER_ELEMENT)
gl.enableVertexAttribArray(2)

gl.bindVertexArray(lightVao)

gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 8 * Float32Array.BYTES_PER_ELEMENT, 0)
gl.enableVertexAttribArray(0)

// gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 8 * Float32Array.BYTES_PER_ELEMENT, 6 * Float32Array.BYTES_PER_ELEMENT)
// gl.enableVertexAttribArray(2)

gl.clearColor(0.1, 0.1, 0.1, 1)
gl.enable(gl.DEPTH_TEST)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

const texture1 = setupTexture(gl, '#container', 0)
const texture2 = setupTexture(gl, '#wall', 1)
const container2 = setupTexture(gl, '#container2', 2)
const container2Specular = setupTexture(gl, '#container2_specular', 3)

shader.setInt('texture2', 1)

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
let fov = 45

let lightPos = vec3.fromValues(1.2, 0, 2)
let lightDir = vec3.fromValues(1.2, -1, 2)

function render () {
  const now = Date.now() / 1000
  // lightPos = vec3.rotateY(vec3.create(), lightPos, [0, lightPos[1], 0], 0.01)
  deltaTime = now - lastFrame
  lastFrame = now
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  view = mat4.lookAt(mat4.create(), cameraPos, vec3.add(vec3.create(), cameraPos, cameraFront), cameraUp)
  projection = mat4.perspective(mat4.create(), glMatrix.toRadian(fov), width / height, 0.1, 100)

  gl.bindVertexArray(vao)
  shader.use()
  shader.setVec3('light.position', lightPos)
  shader.setVec3('light.direction', lightDir)
  shader.setVec3('viewPos', cameraPos)

  const lightColor = vec3.fromValues(
    1, 1, 1
  )
  const diffuseColor = vec3.mul(vec3.create(), lightColor, vec3.fromValues(0.5, 0.5, 0.5))
  const ambientColor = vec3.mul(vec3.create(), diffuseColor, vec3.fromValues(0.5, 0.5, 0.5))
  shader.setVec3('light.ambient', ambientColor)
  shader.setVec3('light.diffuse', diffuseColor)
  shader.setVec3('light.specular', [1.0, 1.0, 1.0])

  shader.setVec3('material.ambient', [1.0, 0.5, 0.31])
  shader.setInt('material.diffuse', 2)
  shader.setInt('material.specular', 3)
  shader.setFloat('material.shininess', 64.0)

  shader.setMatrix4fv('view', view)
  shader.setMatrix4fv('projection', projection)
  for (let i = 0; i < cubePosition.length; i++) {
    model = mat4.fromTranslation(mat4.create(), cubePosition[i])

    const angle = 20 * i * now
    model = mat4.rotate(model, model, glMatrix.toRadian(angle), [1, 0.3, 0.5])

    shader.setMatrix4fv('model', model)

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 8)
  }

  gl.bindVertexArray(lightVao)
  lightShader.use()
  lightShader.setMatrix4fv('view', view)
  lightShader.setMatrix4fv('projection', projection)
  model = mat4.fromTranslation(mat4.create(), lightPos)
  model = mat4.scale(model, model, [0.2, 0.2, 0.2])
  lightShader.setMatrix4fv('model', model)
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 8)

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
