import { setupContext } from './utils'
import Shader from './shader'
import vs from './shaders/vs'
import fs from './shaders/fs'

const gl = (window as any).gl = setupContext('#gl-canvas', 800, 600)
const shader = new Shader(gl, vs, fs)
shader.use()

const vertices: [number] = [
    // positions         // colors
  0.5, -0.5, 0.0, 1.0, 0.0, 0.0,   // bottom right
  -0.5, -0.5, 0.0, 0.0, 1.0, 0.0,   // bottom left
  0.0, 0.5, 0.0, 0.0, 0.0, 1.0    // top
]

const vbo = gl.createBuffer()
const vao = gl.createVertexArray()
gl.bindVertexArray(vao)

gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0)
gl.enableVertexAttribArray(0)

gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT)
gl.enableVertexAttribArray(1)

gl.bindBuffer(gl.ARRAY_BUFFER, null)

gl.bindVertexArray(null)

gl.clearColor(0.2, 0.3, 0.3, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

gl.bindVertexArray(vao)
// gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3)

function render () {
  gl.clear(gl.COLOR_BUFFER_BIT)

  const time = Date.now() / 1000
  const position = Math.sin(time)
  shader.setFloat('position', position)

  gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 6)
  requestAnimationFrame(render)
}

render()
