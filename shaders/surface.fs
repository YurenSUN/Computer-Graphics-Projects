/* simple texture lookup */

uniform sampler2D colormap;
uniform float time;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;

// image for noise
// https://www.shadertoy.com/media/ap/0a40562379b63dfb89227e6d172f39fdce9022cba76623f1054a2c83d6c0ba5d.png

varying vec2 v_uv;
const vec3 iResolution = vec3(.5, 1, 1);

// river https://www.shadertoy.com/view/MsSGWK
float rand(vec2 n) {
    return 0.5 + 0.5 * fract(sin(dot(n.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float water(vec3 p) {
    float t = (mod(time,8.)+ 2.) / 3.;
    p.z += t * 2.;
    p.x += t * 2.;
    vec3 c1 = texture2D(iChannel2, p.xz / 30.).xyz;
    p.z += t * 3.;
    p.x += t * 0.52;
    vec3 c2 = texture2D(iChannel2, p.xz / 30.).xyz;
    p.z += t * 4.;
    p.x += t * 0.8;
    vec3 c3 = texture2D(iChannel2, p.xz / 30.).xyz;
    c1 += c2 - c3;
    float z = (c1.x + c1.y + c1.z) / 3.;
    return p.y + z / 4.;
}

float map(vec3 p) {
    float d = 100.0;
    d = water(p);
    return d;
}

float intersect(vec3 ro, vec3 rd) {
    float d = 0.0;
    for(int i = 0; i <= 100; i++) {
        float h = map(ro + rd * d);
        if(h < 0.1)
            return d;
        d += h;
    }
    return 0.0;
}

vec3 norm(vec3 p) {
    float eps = .1;
    return normalize(vec3(map(p + vec3(eps, 0, 0)) - map(p + vec3(-eps, 0, 0)), map(p + vec3(0, eps, 0)) - map(p + vec3(0, -eps, 0)), map(p + vec3(0, 0, eps)) - map(p + vec3(0, 0, -eps))));
}

vec4 mainImage() {
    vec2 m_uv = v_uv.xy / iResolution.xy - 0.5;
    m_uv.x *= iResolution.x / iResolution.y;
    vec3 l1 = normalize(vec3(1, 1, 1));
    vec3 ro = vec3(-3, 7, -5);
    vec3 rc = vec3(0, 0, 0);
    vec3 ww = normalize(rc - ro);
    vec3 uu = normalize(cross(vec3(0, 1, 0), ww));
    vec3 vv = normalize(cross(rc - ro, uu));
    vec3 rd = normalize(uu * m_uv.x + vv * m_uv.y + ww);
    float d = intersect(ro, rd);
    vec3 c = vec3(0.0);

    if(d > 0.0) {
        vec3 p = ro + rd * d;
        vec3 n = norm(p);
        float spc = pow(max(0.0, dot(reflect(l1, n), rd)), 30.0);
        vec4 ref = texture2D(iChannel0, normalize(reflect(rd, n)).xz);
        vec3 rfa = texture2D(iChannel1, (p + n).xz / 6.0).xyz * (8. / d);

        c = rfa.xyz + (ref.xyz * 0.5) + spc;
    }
    vec4 fragColor = vec4((c - 0.5) * 1.1 + 0.5, 1.0);
    return fragColor;
    // return vec4(0,0,0,1);

}

void main() {
    // mountain and the water 
    float blue = texture2D(colormap, v_uv).b;
    float red = texture2D(colormap, v_uv).r;
    float green = texture2D(colormap, v_uv).g;
    float a = fwidth(blue) *10.;
    // float river = step(0.6 , blue) * step(red, .4) * step(green, .9);
    float river = smoothstep(0.6-a, 0.6 + a, blue) * step(red, .4) * step(green, .9);

    // float riverC = -abs( fract ( sin( v_uv.y + time/100.) * 100.)) / 100. /texture2D(colormap, v_uv).y;
    vec4 riverC = mainImage();
    // gl_FragColor = vec4(texture2D(colormap, v_uv).x, 
    //                     mix( texture2D(colormap, v_uv).y, riverC, river),
    //                     texture2D(colormap, v_uv).z, 1);
    // gl_FragColor = texture2D(colormap, v_uv);
    gl_FragColor = mix(texture2D(colormap, v_uv), riverC, river);
    // gl_FragColor = riverC;

    // mountain color, not use, use color
    // float dx = v_uv.x - center.x;
    // float dy = v_uv.y - center.y;
    // float d = sqrt(dx * dx + dy * dy); 
    // float color = step(d, radius) * (radius -d) - 2. * step(d, innerR) * (innerR - d);
    // float maxColor = radius -innerR;
    // change red color
    // gl_FragColor = clamp(vec4(color/maxColor, 0.2,0,1));
}
