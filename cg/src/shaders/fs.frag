#version 300 es

precision  mediump float;

out vec4 FragColor;
uniform vec4 vertexColor;
in vec2 TexCoord;

uniform sampler2D texturel;

void main()
{
    FragColor = texture(texturel, TexCoord);
} 