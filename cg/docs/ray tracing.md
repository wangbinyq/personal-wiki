# ray tracing

## image-order rendering

## algorithm

- for each pixel
- ray generation
- ray intersection
- shading

## perspective

- linear perspective, parallel projection
  - orthographic view
- perspective projection
  - viewpoint

## viewing rays
- mathematical representation, $\boldsymbol{p}(t) = \boldsymbol{e} + t(\boldsymbol{s} - \boldsymbol{e})$
- camera frame
  - right-handed coordinate system
  - $\boldsymbol{u}$, rightward 
  - $\boldsymbol{v}$, upward 
  - $\boldsymbol{w}$, backward
  - $u = l + (r - l)(i + 0.5)/n_x$
  - $v = b + (t - b)(j + 0.5)/n_y$
- perspective views
  - compute $u$ and $v$
  - ray.direction = $-d\boldsymbol{w} + u\boldsymbol{u} + v\boldsymbol{v}$
  - ray.origin = $\boldsymbol{e}$

## Ray-Object Intersection
- given a ray $\boldsymbol{p}(t) = \boldsymbol{e} + t\boldsymbol{d}$ and an surface $f(\boldsymbol{p})=0$
- solve $f(\boldsymbol{p}(t))=0$ or $f(\boldsymbol{e} + t\boldsymbol{d})=0$
- for a sphere with center $\boldsymbol{c}=(x_c, y_c, z_c)$ and radius $R$
- $t = \dfrac{-d\cdot(e-c)\pm\sqrt{(d\cdot(e-c))^2-(d\cdot d)((e-c)\cdot(e-c)-R^2)}}{(\boldsymbol{d}\cdot\boldsymbol{d})}$

## Shading
- light reflect
  - light source
  - camera reflect
- light direction
  - light source $\boldsymbol{l}$
  - camera $\boldsymbol{v}$
  - normal $\boldsymbol{b}$
- surface characteristics: color, shininess, ...
- Lambertian Shading: $L = k_dImax(0,\boldsymbol{n}\cdot\boldsymbol{l})$
- Blinn-Phong Shading
- Ambient Shading

## Shadows

## Ideal Specular Reflection