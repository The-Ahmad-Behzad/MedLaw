"use client";
import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh, Transform } from "ogl";

interface PrismProps {
  animationType?: "rotate" | "static";
  timeScale?: number;
  height?: number;
  baseWidth?: number;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  noise?: number;
  glow?: number;
}

export default function Prism({
  animationType = "rotate",
  timeScale = 0.5,
  height = 3.5,
  baseWidth = 5.5,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  noise = 0.5,
  glow = 1,
}: PrismProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.offsetWidth;
    let height = container.offsetHeight || 600;

    // Initialize renderer
    const renderer = new Renderer({
      width,
      height,
      alpha: true,
      antialias: true,
    });
    
    // Set clear color using WebGL context directly
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    
    const canvas = renderer.gl.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    // Initialize camera
    const camera = new Camera(renderer.gl, { fov: 45 });
    camera.position.set(0, 0, 5);

    // Create scene (must be a Transform object in OGL)
    const scene = new Transform();

    // Vertex shader
    const vertex = `
      attribute vec3 position;
      attribute vec3 normal;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform mat3 normalMatrix;
      uniform float uTime;
      uniform float uScale;
      uniform float uNoise;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      void main() {
        vec3 pos = position;
        
        if (uNoise > 0.0) {
          float n = noise(pos.xy * 2.0 + uTime * 0.1) * uNoise * 0.1;
          pos += normal * n;
        }
        
        vNormal = normalize(normalMatrix * normal);
        vPosition = pos;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos * uScale, 1.0);
      }
    `;

    // Fragment shader
    const fragment = `
      precision highp float;
      
      uniform float uTime;
      uniform float uHueShift;
      uniform float uColorFrequency;
      uniform float uGlow;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      vec3 hsl2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
        return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
      }
      
      void main() {
        vec3 normal = normalize(vNormal);
        float fresnel = pow(1.0 - dot(normal, vec3(0.0, 0.0, 1.0)), 2.0);
        
        float hue = mod((vPosition.y * uColorFrequency + uTime * 0.1 + uHueShift) * 0.1, 1.0);
        float saturation = 0.7;
        float lightness = 0.5 + fresnel * 0.3;
        
        vec3 color = hsl2rgb(vec3(hue, saturation, lightness));
        
        float glowFactor = fresnel * uGlow;
        color += vec3(glowFactor * 0.3);
        
        gl_FragColor = vec4(color, 0.4);
      }
    `;

    // Create triangular prism geometry
    const createPrismGeometry = (h: number, w: number) => {
      const vertices: number[] = [];
      const normals: number[] = [];
      const indices: number[] = [];
      
      const halfH = h / 2;
      const halfW = w / 2;
      
      // Bottom triangle
      vertices.push(-halfW, -halfH, -halfW);
      vertices.push(halfW, -halfH, -halfW);
      vertices.push(0, -halfH, halfW);
      normals.push(0, -1, 0, 0, -1, 0, 0, -1, 0);
      indices.push(0, 1, 2);
      
      // Top triangle
      vertices.push(-halfW, halfH, -halfW);
      vertices.push(halfW, halfH, -halfW);
      vertices.push(0, halfH, halfW);
      normals.push(0, 1, 0, 0, 1, 0, 0, 1, 0);
      indices.push(3, 5, 4);
      
      // Side 1
      vertices.push(-halfW, -halfH, -halfW);
      vertices.push(halfW, -halfH, -halfW);
      vertices.push(halfW, halfH, -halfW);
      vertices.push(-halfW, halfH, -halfW);
      const n1 = [0, 0, -1];
      normals.push(...n1, ...n1, ...n1, ...n1);
      indices.push(6, 7, 8, 6, 8, 9);
      
      // Side 2
      vertices.push(halfW, -halfH, -halfW);
      vertices.push(0, -halfH, halfW);
      vertices.push(0, halfH, halfW);
      vertices.push(halfW, halfH, -halfW);
      const n2 = [0.866, 0, 0.5];
      normals.push(...n2, ...n2, ...n2, ...n2);
      indices.push(10, 11, 12, 10, 12, 13);
      
      // Side 3
      vertices.push(0, -halfH, halfW);
      vertices.push(-halfW, -halfH, -halfW);
      vertices.push(-halfW, halfH, -halfW);
      vertices.push(0, halfH, halfW);
      const n3 = [-0.866, 0, 0.5];
      normals.push(...n3, ...n3, ...n3, ...n3);
      indices.push(14, 15, 16, 14, 16, 17);
      
      return { vertices, normals, indices };
    };

    const { vertices, normals, indices } = createPrismGeometry(height, baseWidth);

    const geometry = new Geometry(renderer.gl, {
      position: { size: 3, data: new Float32Array(vertices) },
      normal: { size: 3, data: new Float32Array(normals) },
      index: { data: new Uint16Array(indices) },
    });

    const program = new Program(renderer.gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uScale: { value: scale },
        uNoise: { value: noise },
        uHueShift: { value: hueShift },
        uColorFrequency: { value: colorFrequency },
        uGlow: { value: glow },
      },
    });

    const mesh = new Mesh(renderer.gl, { geometry, program });
    mesh.setParent(scene);

    // Animation loop
    const animate = () => {
      timeRef.current += 0.016 * timeScale;
      
      program.uniforms.uTime.value = timeRef.current;
      
      if (animationType === "rotate") {
        mesh.rotation.y = timeRef.current * 0.5;
        mesh.rotation.x = Math.sin(timeRef.current * 0.3) * 0.3;
      }
      
      renderer.render({ scene, camera });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight || 600;
      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
      renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    animationType,
    timeScale,
    height,
    baseWidth,
    scale,
    hueShift,
    colorFrequency,
    noise,
    glow,
  ]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

