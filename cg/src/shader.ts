import { linkProgram } from './utils'

export default class Shader {
  program: WebGLProgram

  constructor (private gl: WebGLRenderingContext, vertexPath: string, fragmentPath: string) {
    this.program = linkProgram(gl, [
      [vertexPath, gl.VERTEX_SHADER],
      [fragmentPath, gl.FRAGMENT_SHADER]
    ])
  }

  use () {
    this.gl.useProgram(this.program)
  }

  getUniformLocation (name: string): WebGLUniformLocation {
    return this.gl.getUniformLocation(this.program, name)
  }

  setBool (name: string, value: boolean) {
    this.setInt(name, value ? 1 : 0)
  }

  setInt (name: string, value: number) {
    this.gl.uniform1i(this.getUniformLocation(name), value)
  }

  setFloat (name: string, value: number) {
    this.gl.uniform1f(this.getUniformLocation(name), value)
  }
}
