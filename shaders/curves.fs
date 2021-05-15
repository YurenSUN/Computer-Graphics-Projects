/* Procedural shading example for Exercise 8-3 */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the plaid */
uniform vec3 background;
uniform vec3 light;
uniform vec3 dark; 

/* number of checks over the UV range */
uniform float pairs;
uniform float lineWidth; // the fraction of width of the outer lines
uniform float linePeriod;
uniform float time;
uniform float speed;

const float pi = 3.14159265;

// light
varying vec3 v_normal;
varying vec3 v_position;
const vec3 lightColor = vec3(.3, .3, .3); // white light
uniform float shiness;

void main() {
    // local position
  float pairHeight = 1.0 / pairs;
  float localY = v_uv.y - floor(v_uv.y / pairHeight) * pairHeight;
  float x = mod(v_uv.x + time * speed, 4.0 * pi);

    // line 1
  float multiplier = pi * 4.0 * linePeriod;
  float y1low = sin(2.0 * x * multiplier) + cos(4.0 * x * multiplier) + sin(0.5 * x * multiplier);
  y1low = (y1low / 8. + 0.5) * pairHeight; // normalize to the local position
  float y1high = y1low + lineWidth * pairHeight;

  float line1dc = step(y1low, localY) * step(localY, y1high) * 0.5;
  vec3 usedColor = mix(background, light, line1dc);

    // line 2
  float y2low = cos(2.0 * x * multiplier) + sin(4.0 * x * multiplier) + cos(1.0 * x * multiplier);
  y2low = (y2low / 8. + 0.5) * pairHeight;
  float y2high = y2low + lineWidth * pairHeight;

  float line2dc = step(y2low, localY) * step(localY, y2high) * 0.5;

  vec3 linesColors = mix(usedColor, dark, line2dc);

    // specular light, from 11-04-03.fs
  vec3 lightDirWorld = vec3(cos(time), 1, sin(time));
  vec3 viewDir = normalize(-v_position);
  vec3 lightDir = normalize((viewMatrix * vec4(lightDirWorld, 0.)).xyz);
  vec3 normal = normalize(v_normal);
  vec3 reflDir = reflect(-lightDir, normal);
  float alignment = max(dot(viewDir, reflDir), 0.);
  vec3 specular = lightColor * pow(alignment, pow(2., shiness));

    // diffuse light from the top front
  vec3 diffWorldDir = vec3(0, 0, 1);
  vec3 diffDir = normalize((viewMatrix * vec4(diffWorldDir, 0.)).xyz);
  float diffLight = dot(normal, diffDir);
  vec3 diffuse = diffLight * (lightColor * 0.8);
    // clamp together
    // clamp(specular + diffuse,0.0, 1.0)
  vec3 lights = clamp(specular + diffuse, 0.0, 1.0);

  gl_FragColor = vec4(clamp(lights + linesColors, 0., 1.), 1.);
}
