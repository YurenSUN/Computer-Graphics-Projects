/*
 * Simple Shader for exercise 8-3
 * The student should make this more interesting, but the interesting parts
 * might be the fragment shader.
  */

/* pass interpolated variables to the fragment */
varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;

// to alter the geo
uniform float pairs;
uniform float lineWidth; // the fraction of width of the outer lines
const float pi = 3.14159265;
uniform float linePeriod;
uniform float lineHeight; // height from the geometry
uniform float time;
uniform float speed;

/* the vertex shader just passes stuff to the fragment shader after doing the
 * appropriate transformations of the vertex information
 */
void main() {
    // pass the texture coordinate to the fragment
  v_uv = uv;

    // from 11-04.vs, the normal for the light
  v_normal = normalMatrix * normal;
  v_position = (modelViewMatrix * vec4(position, 1.0)).xyz;

    // alter the geometry based on lines
    // local position
  float pairHeight = 1.0 / pairs;
  float localY = v_uv.y - floor(v_uv.y / pairHeight) * pairHeight;
  float x = mod(v_uv.x + time * speed, 4.0 * pi);

    // line 1
  float multiplier = pi * 4.0 * linePeriod;
  float y1low = sin(2.0 * x * multiplier) + cos(4.0 * x * multiplier) + sin(0.5 * x * multiplier);
  y1low = (y1low / 8. + 0.5) * pairHeight; // normalize to the local position
  float y1high = y1low + lineWidth * pairHeight;

    // line 2
  float y2low = cos(2.0 * x * multiplier) + sin(4.0 * x * multiplier) + cos(1.0 * x * multiplier);
  y2low = (y2low / 8. + 0.5) * pairHeight;
  float y2high = y2low + lineWidth * pairHeight;

  float height = step(y2low, localY) * step(localY, y2high) * 0.5 + step(y1low, localY) * step(localY, y1high) * 0.5;

  vec3 pos = position + height * normal * lineHeight;

    // the main output of the shader (the vertex position)
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
