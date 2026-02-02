precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uBlobCount;
uniform vec3 uBlobPositions[10];
uniform float uBlobRadii[10];

varying vec2 vUv;

// Smooth minimum for blending metaballs
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// Signed distance function for a sphere
float sdSphere(vec3 p, vec3 center, float radius) {
  return length(p - center) - radius;
}

// Ray marching metaball scene
float map(vec3 p) {
  float d = 1000.0;
  
  // Static animated blobs
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    vec3 center = vec3(
      sin(uTime * 0.3 + fi * 1.5) * 2.0,
      cos(uTime * 0.4 + fi * 1.2) * 1.5,
      sin(uTime * 0.2 + fi * 0.8) * 1.0 - 5.0
    );
    float radius = 0.5 + sin(uTime * 0.5 + fi) * 0.2;
    d = smin(d, sdSphere(p, center, radius), 0.5);
  }
  
  // Mouse-influenced blob
  vec3 mousePos = vec3(
    (uMouse.x - 0.5) * 4.0,
    (uMouse.y - 0.5) * 3.0,
    -4.0
  );
  d = smin(d, sdSphere(p, mousePos, 0.8), 0.8);
  
  return d;
}

// Calculate normal using gradient
vec3 calcNormal(vec3 p) {
  const float eps = 0.001;
  return normalize(vec3(
    map(p + vec3(eps, 0.0, 0.0)) - map(p - vec3(eps, 0.0, 0.0)),
    map(p + vec3(0.0, eps, 0.0)) - map(p - vec3(0.0, eps, 0.0)),
    map(p + vec3(0.0, 0.0, eps)) - map(p - vec3(0.0, 0.0, eps))
  ));
}

void main() {
  vec2 uv = vUv;
  vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
  
  // Ray setup
  vec3 ro = vec3(0.0, 0.0, 2.0); // Ray origin
  vec3 rd = normalize(vec3(p, -1.0)); // Ray direction
  
  // Ray marching
  float t = 0.0;
  float maxDist = 20.0;
  int maxSteps = 64;
  
  vec3 col = vec3(0.04, 0.04, 0.06); // Background color
  
  for (int i = 0; i < 64; i++) {
    vec3 pos = ro + rd * t;
    float d = map(pos);
    
    if (d < 0.001) {
      // Hit surface
      vec3 normal = calcNormal(pos);
      
      // Lighting
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
      float diff = max(dot(normal, lightDir), 0.0);
      float spec = pow(max(dot(reflect(-lightDir, normal), -rd), 0.0), 32.0);
      
      // Fresnel effect
      float fresnel = pow(1.0 - max(dot(normal, -rd), 0.0), 3.0);
      
      // Color based on position
      float colorMix = sin(pos.x * 0.5 + uTime * 0.2) * 0.5 + 0.5;
      vec3 surfaceColor = mix(uColor1, uColor2, colorMix);
      surfaceColor = mix(surfaceColor, uColor3, fresnel * 0.5);
      
      // Final color
      col = surfaceColor * (0.3 + diff * 0.5) + vec3(1.0) * spec * 0.3;
      col += surfaceColor * fresnel * 0.4;
      
      break;
    }
    
    t += d;
    
    if (t > maxDist) break;
  }
  
  // Add subtle glow
  float glow = 1.0 / (1.0 + t * 0.1);
  col += mix(uColor1, uColor2, sin(uTime * 0.3) * 0.5 + 0.5) * glow * 0.1;
  
  // Vignette
  float vignette = 1.0 - length(p) * 0.4;
  col *= vignette;
  
  gl_FragColor = vec4(col, 1.0);
}
