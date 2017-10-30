import { setupContext } from './utils'
import Shader from './shader'
import vs from './shaders/vs'
import fs from './shaders/fs'

const gl = (window as any).gl = setupContext('#gl-canvas', 800, 600)
const shader = new Shader(gl, vs, fs)
shader.use()

const vertices = [
    // positions          // colors           // texture coords
  0.5,  0.5, 0.0,   1.0, 0.0, 0.0,   1.0, 1.0,   // top right
  0.5, -0.5, 0.0,   0.0, 1.0, 0.0,   1.0, 0.0,   // bottom right
  -0.5, -0.5, 0.0,   0.0, 0.0, 1.0,   0.0, 0.0,   // bottom left
  -0.5,  0.5, 0.0,   1.0, 1.0, 0.0,   0.0, 1.0    // top left
]

const indices = [
  0, 1, 3,
  1, 2, 3
]

const texCoords = [
  0, 0,
  1, 0,
  0.5, 1
]

const vbo = gl.createBuffer()
const vao = gl.createVertexArray()
const ebo = gl.createBuffer()
gl.bindVertexArray(vao)

gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int32Array(indices), gl.STATIC_DRAW)

gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 8 * Float32Array.BYTES_PER_ELEMENT, 0)
gl.enableVertexAttribArray(0)

gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT)
gl.enableVertexAttribArray(1)

gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 8 * Float32Array.BYTES_PER_ELEMENT, 6 * Float32Array.BYTES_PER_ELEMENT)
gl.enableVertexAttribArray(2)

gl.clearColor(0.2, 0.3, 0.3, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

const texture = gl.createTexture()
gl.bindTexture(gl.TEXTURE_2D, texture)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

const image = document.querySelector('#wall') as HTMLImageElement
if (!image) {
  throw new Error('image wall not exists')
}
const width = image.naturalWidth
const height = image.naturalHeight

gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB, gl.UNSIGNED_BYTE, image)

function render () {
  gl.clear(gl.COLOR_BUFFER_BIT)

  // const time = Date.now() / 1000
  // const position = Math.sin(time)
  // shader.setFloat('position', position)

  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_INT, 0)
  requestAnimationFrame(render)
}

render()
