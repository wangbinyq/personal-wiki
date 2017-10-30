export function setupContext (selector: string, width?: number, height?: number): WebGL2RenderingContext {
  const canvas = document.querySelector(selector) as any
  if (!canvas) {
    throw new Error(`element of ${selector} not found`)
  }
  const gl = canvas.getContext('webgl2')
  if (!gl) {
    throw new Error(`webgl is not support`)
  }

  if (width) {
    if (!height) {
      height = width
    }
    gl.viewport(0, 0, width, height)
  }

  return gl
}

export function compileShader (gl: WebGLRenderingContext, shaderSource: string, shaderType: number): WebGLShader {
  const shader = gl.createShader(shaderType)
  gl.shaderSource(shader, shaderSource)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader)
    throw error
  }

  return shader
}

export function linkProgram (gl: WebGLRenderingContext, shaderSources: [[string, number]]): WebGLProgram {
  const program = gl.createProgram()

  const shaders = shaderSources.map((source) => compileShader(gl, source[0], source[1]))
  shaders.forEach((shader) => gl.attachShader(program, shader))
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program)
    throw error
  }

  shaders.forEach((shader) => gl.deleteShader(shader))

  return program
}
