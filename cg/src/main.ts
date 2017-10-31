import { setupContext } from './utils'
import { mat4, glMatrix } from 'gl-matrix'
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

let viewPositionX = 0
let viewPositionY = 0
let viewPositionZ = -3
let model
let view
let projection

function render () {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  view = mat4.fromTranslation(mat4.create(), [viewPositionX, viewPositionY, viewPositionZ])
  projection = mat4.perspective(mat4.create(), glMatrix.toRadian(45), width / height, 0.1, 100)

  shader.setMatrix4fv('view', view)
  shader.setMatrix4fv('projection', projection)
  for (let i = 0; i < cubePosition.length; i++) {
    model = mat4.create()
    model = mat4.translate(model, model, cubePosition[i])
    const angle = 20 * i * (Date.now() / 1000)
    model = mat4.rotate(model, model, glMatrix.toRadian(angle), [1, 0.3, 0.5])
    shader.setMatrix4fv('model', model)

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 5)
  }
  requestAnimationFrame(render)
}

function setupUi () {
  const $canvas = document.getElementById('gl-canvas')
  const $far = document.getElementById('far')
  const $near = document.getElementById('near')
  const $left = document.getElementById('left')
  const $up = document.getElementById('up')
  const $right = document.getElementById('right')
  const $down = document.getElementById('down')

  $far.onclick = () => viewPositionZ += 0.1
  $near.onclick = () => viewPositionZ -= 0.1
  $left.onclick = () => viewPositionX -= 0.1
  $up.onclick = () => viewPositionY += 0.1
  $right.onclick = () => viewPositionX += 0.1
  $down.onclick = () => viewPositionY -= 0.1

  window.onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        viewPositionX -= 0.01
        break
      case 38:
        viewPositionY += 0.01
        break
      case 39:
        viewPositionX += 0.01
        break
      case 40:
        viewPositionY -= 0.01
        break
    }
  }
}

setupUi()
render()
