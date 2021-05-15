// world with islands - displacement map based on the green channel

varying vec2 v_uv;
// varying float radius; // radius for the mountain
// varying float innerR; // inner radius to push down for the mountain
// varying vec2 center; // center of the mountain
uniform sampler2D colormap;
uniform float time;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;

void main() {
    // mountain in the center, not using, using colormap
    // radius = 0.2;
    // innerR = 0.08;
    // center = vec2(.5,.5);

    // float dx = uv.x - center.x;
    // float dy = uv.y - center.y;
    // float d = sqrt(dx * dx + dy * dy);
    
    // float height = step(d, radius) * (radius -d) - 2. * step(d, innerR) * (innerR - d);
    float red = texture2D(colormap,uv).r;
    float blue = texture2D(colormap,uv).b;
    float green = texture2D(colormap,uv).g;
    float otherH = (red) * 12. - green * 9.045 + blue * 5.0;

    // get only the river
    float river = step(0.6 , blue) * step(red, .4) * step(green, .9);
    // random with sin
    float r = -abs( fract ( sin( uv.y + time/100.) * 100.)  * otherH * 4.);
    // smooth

    float height = mix(otherH, r, river);
    vec3 pos = position + height*normal;

    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

    v_uv = uv;
}

