precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying vec2 vUv;

// Simplex noise functions
vec4 permute(vec4 x) {
  return mod(((x*34.0)+1.0)*x, 289.0);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// Metaball distance function
float metaball(vec2 p, vec2 center, float radius) {
  float d = length(p - center);
  return radius / (d * d + 0.001);
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;
  
  // Animated metaball centers
  float t = uTime * 0.3;
  
  vec2 c1 = vec2(sin(t * 0.7) * 0.3, cos(t * 0.5) * 0.3);
  vec2 c2 = vec2(cos(t * 0.6) * 0.4, sin(t * 0.8) * 0.2);
  vec2 c3 = vec2(sin(t * 0.9 + 2.0) * 0.25, cos(t * 0.4 + 1.0) * 0.35);
  vec2 c4 = vec2(cos(t * 0.5 + 3.0) * 0.35, sin(t * 0.7 + 2.0) * 0.25);
  
  // Mouse influence
  vec2 mousePos = (uMouse - 0.5) * aspect;
  vec2 c5 = mousePos * 0.8;
  
  // Calculate metaball field
  float field = 0.0;
  field += metaball(p, c1, 0.15);
  field += metaball(p, c2, 0.12);
  field += metaball(p, c3, 0.1);
  field += metaball(p, c4, 0.08);
  field += metaball(p, c5, 0.2);
  
  // Add noise for organic feel
  float noise = snoise(vec3(p * 3.0, t * 0.5)) * 0.3;
  field += noise * 0.5;
  
  // Threshold for blob edges
  float threshold = 1.0;
  float edge = smoothstep(threshold - 0.3, threshold + 0.1, field);
  
  // Color mixing based on position and time
  vec3 color1 = uColor1;
  vec3 color2 = uColor2;
  vec3 color3 = uColor3;
  
  float colorMix1 = snoise(vec3(p * 2.0, t * 0.2)) * 0.5 + 0.5;
  float colorMix2 = snoise(vec3(p * 2.0 + 100.0, t * 0.3)) * 0.5 + 0.5;
  
  vec3 blobColor = mix(color1, color2, colorMix1);
  blobColor = mix(blobColor, color3, colorMix2 * 0.5);
  
  // Background gradient
  vec3 bgColor = vec3(0.04, 0.04, 0.06);
  bgColor += vec3(0.02, 0.01, 0.03) * (1.0 - length(p));
  
  // Final color
  vec3 finalColor = mix(bgColor, blobColor * 0.6, edge * 0.7);
  
  // Add glow effect
  float glow = smoothstep(threshold - 0.5, threshold, field) * 0.3;
  finalColor += blobColor * glow * 0.5;
  
  // Vignette
  float vignette = 1.0 - length(p) * 0.5;
  finalColor *= vignette;
  
  gl_FragColor = vec4(finalColor, 1.0);
}
