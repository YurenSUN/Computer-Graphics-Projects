/* pass interpolated variables to from the vertex */
varying vec2 v_uv;

/* colors for the plaid */
uniform vec3 background;
uniform vec3 light;
uniform vec3 dark; 

/* number of checks over the UV range */
uniform float plaids;
uniform float center; // the position of center line with light color
uniform float lineWidth; // the fraction of width of the outer lines

void main()
{
    // checks represent the number of checks on the edge
    float plaidSize = 1.0 / plaids; 

    // local position of each plaid
    float localX = v_uv.x - floor( v_uv.x / plaidSize ) * plaidSize;
    float localY = v_uv.y - floor( v_uv.y / plaidSize ) * plaidSize;

    // check whether in the center solid
    float cenLow = plaidSize * center;
    float cenHigh = cenLow + plaidSize * lineWidth;
    float inCenter = step(cenLow, localX) * step(localX, cenHigh) * 0.5 + 
                     step(cenLow, localY) * step(localY, cenHigh) * 0.5;


    // outer broader in the middle
    // left
    float outLow = plaidSize * lineWidth / 2.0;
    float outHigh = outLow + plaidSize * lineWidth;
    
    // the intersections will not overlap, no need to worry about inOuter >  1;
    float inOuter = step(outLow, localX) * step(localX, outHigh) * 0.5 + 
                    step(plaidSize - outHigh, localX) * step(localX, plaidSize - outLow) * 0.5 + 
                    step(outLow, localY) * step(localY, outHigh) * 0.5 + 
                    step(plaidSize - outHigh, localY) * step(localY, plaidSize - outLow) * 0.5;

    vec3 usedColor = mix(background, dark, inOuter);

    gl_FragColor = vec4(mix(usedColor, light, inCenter), 1.);
}

