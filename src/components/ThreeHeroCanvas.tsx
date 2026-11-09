import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface ThreeHeroCanvasProps {
  onSelectCategory?: (category: 'swimming' | 'running' | 'fitness') => void;
  activeCategory?: string;
}

// Module-scope math helpers for zero garbage collection in animation loop
const _pointer = new THREE.Vector2(0, 0);
const _targetRotation = new THREE.Vector2(0, 0);
const _currentRotation = new THREE.Vector2(0, 0);
const _mouseWorld = new THREE.Vector3(0, 0, 0);

export const ThreeHeroCanvas: React.FC<ThreeHeroCanvasProps> = ({ onSelectCategory, activeCategory }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeGearHover, setActiveGearHover] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Software WebGL Guard
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.032);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;

    // Studio Environment for high-end metallic reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Lighting Rig (High Brightness & Vivid Contrast)
    // Crisp neutral ambient light so faces never appear dim or dark gray
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    // Direct Front Pure White Key Light for bright crisp white "DAKHLA" typography
    const frontWhiteLight = new THREE.DirectionalLight(0xffffff, 4.5);
    frontWhiteLight.position.set(0, 4, 12);
    scene.add(frontWhiteLight);

    // Neon Green Directional Accent Light
    const neonKeyLight = new THREE.DirectionalLight(0x00FF66, 4.0);
    neonKeyLight.position.set(9, 8, 9);
    scene.add(neonKeyLight);

    // Specular Rim Light
    const cyanRimLight = new THREE.DirectionalLight(0xf0fdf4, 2.8);
    cyanRimLight.position.set(-10, -5, -4);
    scene.add(cyanRimLight);

    // Dynamic Bloom / Halo Backlight BEHIND the text to create vivid 3D depth against black background
    const backGlowLight = new THREE.PointLight(0x00FF66, 9.5, 36, 1.2);
    backGlowLight.position.set(0, 0, -2.5);
    scene.add(backGlowLight);

    // Dynamic Cursor Omni Light
    const cursorGlowLight = new THREE.PointLight(0x00FF66, 6.0, 20, 1.4);
    cursorGlowLight.position.set(0, 0, 4.5);
    scene.add(cursorGlowLight);

    // 4. Root Assembly Group (responds to mouse tilt)
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // =========================================================================
    // 5. HIGH-END 3D SOLID BEVELED TYPOGRAPHY ("DAKHLA FIT")
    // =========================================================================
    // "DAKHLA" Material: Crisp, bright, high-contrast pure WHITE with clearcoat gloss
    const dakhlaWhiteFaceMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.22, // Clean front self-illumination so it never appears dim or dark gray
      metalness: 0.2,
      roughness: 0.12,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
    });

    const dakhlaWhiteBevelMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.45,
      metalness: 0.35,
      roughness: 0.15,
    });

    const dakhlaMaterials = [dakhlaWhiteFaceMaterial, dakhlaWhiteBevelMaterial];

    // "FIT" Material: Highly luminous electric NEON GREEN with intense emissive pop
    const fitNeonFaceMaterial = new THREE.MeshStandardMaterial({
      color: 0x00FF66,
      emissive: 0x00FF66,
      emissiveIntensity: 1.25, // Strong pop against deep black background
      metalness: 0.2,
      roughness: 0.18,
    });

    const fitNeonBevelMaterial = new THREE.MeshStandardMaterial({
      color: 0x39FF14,
      emissive: 0x39FF14,
      emissiveIntensity: 1.55,
      metalness: 0.1,
      roughness: 0.15,
    });

    const fitMaterials = [fitNeonFaceMaterial, fitNeonBevelMaterial];

    // Extrusion configurations
    const extrudeOptions: THREE.ExtrudeGeometryOptions = {
      depth: 0.45,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.07,
      bevelOffset: 0,
      bevelSegments: 4,
      curveSegments: 16,
    };

    const textAssembly = new THREE.Group();
    rootGroup.add(textAssembly);

    // Helper: Build letter shape from normalized geometry
    function createShapeD(): THREE.Shape {
      const s = new THREE.Shape();
      s.moveTo(0, 0);
      s.lineTo(0, 2);
      s.lineTo(0.7, 2);
      s.bezierCurveTo(1.4, 2, 1.55, 1.5, 1.55, 1.0);
      s.bezierCurveTo(1.55, 0.5, 1.4, 0, 0.7, 0);
      s.closePath();

      const hole = new THREE.Path();
      hole.moveTo(0.42, 0.38);
      hole.lineTo(0.42, 1.62);
      hole.lineTo(0.68, 1.62);
      hole.bezierCurveTo(1.12, 1.62, 1.15, 1.25, 1.15, 1.0);
      hole.bezierCurveTo(1.15, 0.75, 1.12, 0.38, 0.68, 0.38);
      hole.closePath();
      s.holes.push(hole);
      return s;
    }

    function createShapeA(): THREE.Shape {
      const s = new THREE.Shape();
      s.moveTo(0, 0);
      s.lineTo(0.42, 0);
      s.lineTo(0.65, 0.75);
      s.lineTo(1.05, 0.75);
      s.lineTo(1.28, 0);
      s.lineTo(1.7, 0);
      s.lineTo(1.05, 2);
      s.lineTo(0.65, 2);
      s.closePath();

      const hole = new THREE.Path();
      hole.moveTo(0.72, 1.05);
      hole.lineTo(0.98, 1.05);
      hole.lineTo(0.85, 1.58);
      hole.closePath();
      s.holes.push(hole);
      return s;
    }

    function createShapeK(): THREE.Shape {
      const s = new THREE.Shape();
      s.moveTo(0, 0);
      s.lineTo(0.42, 0);
      s.lineTo(0.42, 0.85);
      s.lineTo(1.1, 0);
      s.lineTo(1.65, 0);
      s.lineTo(0.85, 1.0);
      s.lineTo(1.55, 2);
      s.lineTo(1.02, 2);
      s.lineTo(0.42, 1.15);
      s.lineTo(0.42, 2);
      s.lineTo(0, 2);
      s.closePath();
      return s;
    }

    function createShapeH(): THREE.Shape {
      const s = new THREE.Shape();
      s.moveTo(0, 0);
      s.lineTo(0.42, 0);
      s.lineTo(0.42, 0.82);
      s.lineTo(1.15, 0.82);
      s.lineTo(1.15, 0);
      s.lineTo(1.57, 0);
      s.lineTo(1.57, 2);
      s.lineTo(1.15, 2);
      s.lineTo(1.15, 1.18);
      s.lineTo(0.42, 1.18);
      s.lineTo(0.42, 2);
      s.lineTo(0, 2);
      s.closePath();
      return s;
    }

    function createShapeL(): THREE.Shape {
      const s = new THREE.Shape();
      s.moveTo(0, 0);
      s.lineTo(1.4, 0);
      s.lineTo(1.4, 0.4);
      s.lineTo(0.42, 0.4);
      s.lineTo(0.42, 2);
      s.lineTo(0, 2);
      s.closePath();
      return s;
    }

    function createShapeF(): THREE.Shape {
      const s = new THREE.Shape();
      s.moveTo(0, 0);
      s.lineTo(0.44, 0);
      s.lineTo(0.44, 0.85);
      s.lineTo(1.15, 0.85);
      s.lineTo(1.15, 1.22);
      s.lineTo(0.44, 1.22);
      s.lineTo(0.44, 1.62);
      s.lineTo(1.45, 1.62);
      s.lineTo(1.45, 2);
      s.lineTo(0, 2);
      s.closePath();
      return s;
    }

    function createShapeI(): THREE.Shape {
      const s = new THREE.Shape();
      s.moveTo(0.2, 0);
      s.lineTo(0.85, 0);
      s.lineTo(0.85, 0.38);
      s.lineTo(0.65, 0.38);
      s.lineTo(0.65, 1.62);
      s.lineTo(0.85, 1.62);
      s.lineTo(0.85, 2);
      s.lineTo(0.2, 2);
      s.lineTo(0.2, 1.62);
      s.lineTo(0.4, 1.62);
      s.lineTo(0.4, 0.38);
      s.lineTo(0.2, 0.38);
      s.closePath();
      return s;
    }

    function createShapeT(): THREE.Shape {
      const s = new THREE.Shape();
      s.moveTo(0.48, 0);
      s.lineTo(0.96, 0);
      s.lineTo(0.96, 1.6);
      s.lineTo(1.44, 1.6);
      s.lineTo(1.44, 2);
      s.lineTo(0, 2);
      s.lineTo(0, 1.6);
      s.lineTo(0.48, 1.6);
      s.closePath();
      return s;
    }

    function build3DLetter(shape: THREE.Shape, x: number, y: number, scale = 1, mats: THREE.Material[] = dakhlaMaterials): THREE.Mesh {
      const geom = new THREE.ExtrudeGeometry(shape, extrudeOptions);
      geom.computeVertexNormals();
      const mesh = new THREE.Mesh(geom, mats);
      mesh.scale.set(scale, scale, scale);
      mesh.position.set(x, y, 0);
      return mesh;
    }

    // Line 1: D A K H L A (Crisp, high-contrast, bright metallic/semi-matte white)
    const word1Group = new THREE.Group();
    const dMesh = build3DLetter(createShapeD(), -4.9, 0, 1, dakhlaMaterials);
    const a1Mesh = build3DLetter(createShapeA(), -3.05, 0, 1, dakhlaMaterials);
    const kMesh = build3DLetter(createShapeK(), -1.15, 0, 1, dakhlaMaterials);
    const hMesh = build3DLetter(createShapeH(), 0.75, 0, 1, dakhlaMaterials);
    const lMesh = build3DLetter(createShapeL(), 2.6, 0, 1, dakhlaMaterials);
    const a2Mesh = build3DLetter(createShapeA(), 4.25, 0, 1, dakhlaMaterials);

    word1Group.add(dMesh, a1Mesh, kMesh, hMesh, lMesh, a2Mesh);
    word1Group.position.set(-0.3, 0.8, 0);
    textAssembly.add(word1Group);

    // Line 2: F I T (Vibrant luminous electric neon green)
    const word2Group = new THREE.Group();
    const fitScale = 1.18;
    const fMesh = build3DLetter(createShapeF(), -2.2, 0, fitScale, fitMaterials);
    const iMesh = build3DLetter(createShapeI(), -0.3, 0, fitScale, fitMaterials);
    const tMesh = build3DLetter(createShapeT(), 1.05, 0, fitScale, fitMaterials);

    word2Group.add(fMesh, iMesh, tMesh);
    word2Group.position.set(0.1, -1.8, 0.15);
    textAssembly.add(word2Group);

    // Subtitle athletic neon accent bar beneath FIT
    const barGeom = new THREE.BoxGeometry(7.2, 0.08, 0.3);
    const barMesh = new THREE.Mesh(barGeom, fitNeonBevelMaterial);
    barMesh.position.set(0, -2.2, 0.1);
    textAssembly.add(barMesh);

    // =========================================================================
    // 6. STYLIZED 3D FLOATING MICRO-GEAR (Dumbbell, Kettlebell, Resistance Rings)
    // =========================================================================
    interface FloatingGear {
      group: THREE.Group;
      basePos: THREE.Vector3;
      velocity: THREE.Vector3;
      rotSpeed: THREE.Vector3;
      floatFreq: number;
      floatAmp: number;
      type: string;
    }

    const floatingGears: FloatingGear[] = [];
    const gearParent = new THREE.Group();
    rootGroup.add(gearParent);

    // 6.1 Mini Hex Dumbbell Builder (Polished Chrome & Crisp White with Neon Accent)
    function createMiniDumbbell(): THREE.Group {
      const g = new THREE.Group();
      const shaftGeom = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 16);
      const shaftMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.95, roughness: 0.08 });
      const shaft = new THREE.Mesh(shaftGeom, shaftMat);
      shaft.rotation.z = Math.PI / 2;
      g.add(shaft);

      const hexGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 6);
      const hexMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.3,
        roughness: 0.18,
      });
      const ringGlowMat = new THREE.MeshBasicMaterial({ color: 0x00FF66 });

      [-0.48, 0.48].forEach((offset) => {
        const head = new THREE.Mesh(hexGeom, hexMat);
        head.rotation.z = Math.PI / 2;
        head.position.x = offset;
        g.add(head);

        // Neon glowing groove
        const ringGeom = new THREE.TorusGeometry(0.34, 0.03, 8, 24);
        const ring = new THREE.Mesh(ringGeom, ringGlowMat);
        ring.rotation.y = Math.PI / 2;
        ring.position.x = offset > 0 ? offset + 0.15 : offset - 0.15;
        g.add(ring);
      });

      return g;
    }

    // 6.2 Mini Kettlebell Builder (Crisp White Body & Luminous Neon Ring)
    function createMiniKettlebell(): THREE.Group {
      const g = new THREE.Group();
      const bodyGeom = new THREE.SphereGeometry(0.48, 24, 20);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.25,
        roughness: 0.15,
      });
      const body = new THREE.Mesh(bodyGeom, bodyMat);
      body.scale.set(1, 0.9, 1);
      g.add(body);

      // Handle (Polished Chrome)
      const handleGeom = new THREE.TorusGeometry(0.28, 0.07, 16, 24, Math.PI);
      const handleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.95, roughness: 0.08 });
      const handle = new THREE.Mesh(handleGeom, handleMat);
      handle.position.set(0, 0.42, 0);
      g.add(handle);

      // Glowing Neon Belt
      const beltGeom = new THREE.TorusGeometry(0.48, 0.03, 12, 32);
      const beltMat = new THREE.MeshBasicMaterial({ color: 0x39FF14 });
      const belt = new THREE.Mesh(beltGeom, beltMat);
      belt.rotation.x = Math.PI / 2;
      g.add(belt);

      return g;
    }

    // 6.3 Mini Resistance Ring (Crisp White Core with Luminous Neon Edge)
    function createMiniRing(neonColor = 0x00FF66): THREE.Group {
      const g = new THREE.Group();
      const torusGeom = new THREE.TorusGeometry(0.46, 0.1, 16, 36);
      const torusMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.2,
        roughness: 0.15,
      });
      const torus = new THREE.Mesh(torusGeom, torusMat);
      g.add(torus);

      const innerGlowGeom = new THREE.TorusGeometry(0.46, 0.035, 8, 36);
      const innerGlowMat = new THREE.MeshBasicMaterial({ color: neonColor });
      const inner = new THREE.Mesh(innerGlowGeom, innerGlowMat);
      g.add(inner);

      return g;
    }

    // Deploy 6 Micro-Gear pieces floating effortlessly around the title
    const gearConfigs = [
      { builder: createMiniDumbbell, pos: new THREE.Vector3(-6.2, 1.8, 1.5), type: 'dumbbell' },
      { builder: createMiniKettlebell, pos: new THREE.Vector3(6.3, 1.6, 1.8), type: 'kettlebell' },
      { builder: () => createMiniRing(0x00FF66), pos: new THREE.Vector3(-4.8, -2.4, 2.2), type: 'resistance_ring' },
      { builder: createMiniDumbbell, pos: new THREE.Vector3(5.5, -2.1, 1.2), type: 'dumbbell' },
      { builder: createMiniKettlebell, pos: new THREE.Vector3(-1.8, 3.1, -1.0), type: 'kettlebell' },
      { builder: () => createMiniRing(0x22d3ee), pos: new THREE.Vector3(2.5, 3.0, -0.5), type: 'swim_ring' },
    ];

    gearConfigs.forEach((cfg, idx) => {
      const mesh = cfg.builder();
      mesh.position.copy(cfg.pos);
      gearParent.add(mesh);

      floatingGears.push({
        group: mesh,
        basePos: cfg.pos.clone(),
        velocity: new THREE.Vector3(),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.9,
          (Math.random() - 0.5) * 0.6
        ),
        floatFreq: 1.2 + idx * 0.35,
        floatAmp: 0.25 + (idx % 3) * 0.1,
        type: cfg.type,
      });
    });

    // =========================================================================
    // 7. RICH PARTICLE SYSTEM (Glowing Neon Sparks, Sand Embers & Energy Dust)
    // =========================================================================
    const particleCount = isSoftwareGl ? 500 : 1350;
    const pPositions = new Float32Array(particleCount * 3);
    const pVelocities = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const pBaseLife = new Float32Array(particleCount);

    const colNeon = new THREE.Color(0x00FF66);
    const colLime = new THREE.Color(0x39FF14);
    const colWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      pPositions[idx] = (Math.random() - 0.5) * 32;
      pPositions[idx + 1] = (Math.random() - 0.5) * 18;
      pPositions[idx + 2] = (Math.random() - 0.5) * 16 - 1;

      // Drift velocities (upward ember drift + lateral swirl)
      pVelocities[idx] = (Math.random() - 0.5) * 0.012;
      pVelocities[idx + 1] = 0.006 + Math.random() * 0.016; // gentle rising ember
      pVelocities[idx + 2] = (Math.random() - 0.5) * 0.012;

      pBaseLife[i] = Math.random() * Math.PI * 2;

      // Vivid pure white and luminous neon green / lime sparks
      const rand = Math.random();
      const c = rand > 0.52 ? colNeon : rand > 0.22 ? colWhite : colLime;
      pColors[idx] = c.r;
      pColors[idx + 1] = c.g;
      pColors[idx + 2] = c.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    // High-fidelity procedural ember texture with bright white core & glowing neon green halo
    const particleTexture = (() => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      if (ctx) {
        const rad = 32;
        const grad = ctx.createRadialGradient(rad, rad, 0, rad, rad, rad);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.95)');
        grad.addColorStop(0.45, 'rgba(0, 255, 102, 0.85)');
        grad.addColorStop(0.75, 'rgba(57, 255, 20, 0.25)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    })();

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // =========================================================================
    // 8. MOUSE & CURSOR INTERACTION (VORTEX, PARALLAX & ATTRACTION)
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      _pointer.x = nx;
      _pointer.y = ny;

      // Project into 3D world space coordinates
      mouseX = nx * 10;
      mouseY = ny * 6;
      _mouseWorld.set(mouseX, mouseY, 1.5);

      // Deep, smooth spatial tilt targets
      _targetRotation.x = ny * 0.24;
      _targetRotation.y = nx * 0.36;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const nx = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);

        _pointer.x = nx;
        _pointer.y = ny;
        mouseX = nx * 9;
        mouseY = ny * 5;
        _mouseWorld.set(mouseX, mouseY, 1.5);
        _targetRotation.x = ny * 0.18;
        _targetRotation.y = nx * 0.26;
      }
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Responsive Canvas Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;

      if (width < 640) {
        camera.position.z = 21;
      } else if (width < 1024) {
        camera.position.z = 18;
      } else {
        camera.position.z = 16;
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // =========================================================================
    // 9. ANIMATION LOOP & PHYSICS UPDATE
    // =========================================================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Parallax / Spatial Tilt with exponential damping
      _currentRotation.x = THREE.MathUtils.damp(_currentRotation.x, _targetRotation.x, 3.8, delta);
      _currentRotation.y = THREE.MathUtils.damp(_currentRotation.y, _targetRotation.y, 3.8, delta);

      rootGroup.rotation.x = _currentRotation.x;
      rootGroup.rotation.y = _currentRotation.y;

      // Subtle breath oscillation on text assembly
      textAssembly.position.y = Math.sin(elapsed * 1.5) * 0.08;

      // Update Cursor Omni Light
      cursorGlowLight.position.x = THREE.MathUtils.damp(cursorGlowLight.position.x, mouseX, 8, delta);
      cursorGlowLight.position.y = THREE.MathUtils.damp(cursorGlowLight.position.y, mouseY, 8, delta);

      // 9.1 Update Floating Micro-Gear (Physics + Orbital Swirl + Cursor Reaction)
      floatingGears.forEach((gear, idx) => {
        // Natural floating orbit
        const floatY = Math.sin(elapsed * gear.floatFreq + idx) * gear.floatAmp;
        const floatX = Math.cos(elapsed * (gear.floatFreq * 0.7) + idx) * (gear.floatAmp * 0.6);

        // Distance to cursor
        const dx = mouseX - gear.group.position.x;
        const dy = mouseY - gear.group.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Cursor attraction & swirl physics
        if (dist < 6.0 && dist > 0.1) {
          const force = (6.0 - dist) * 0.04;
          // Soft attraction toward cursor
          gear.velocity.x += (dx / dist) * force;
          gear.velocity.y += (dy / dist) * force;
          // Tangential vortex rotation
          gear.group.rotation.z += force * 0.15;
        }

        // Apply velocity with damping
        gear.group.position.x = gear.basePos.x + floatX + gear.velocity.x;
        gear.group.position.y = gear.basePos.y + floatY + gear.velocity.y;
        gear.velocity.multiplyScalar(0.92);

        // Intrinsic rotations
        gear.group.rotation.x += gear.rotSpeed.x * delta;
        gear.group.rotation.y += gear.rotSpeed.y * delta;
      });

      // 9.2 Update Particle Dust & Ember Swirl System
      const posArray = particleGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;

        // Apply natural drift
        posArray[idx] += pVelocities[idx];
        posArray[idx + 1] += pVelocities[idx + 1];
        posArray[idx + 2] += pVelocities[idx + 2];

        // Harmonic gentle curl
        posArray[idx] += Math.sin(elapsed * 1.2 + pBaseLife[i]) * 0.008;

        // Mouse Vortex & Repulsion interaction
        const pdx = posArray[idx] - mouseX;
        const pdy = posArray[idx + 1] - mouseY;
        const distSq = pdx * pdx + pdy * pdy;

        if (distSq < 22 && distSq > 0.02) {
          const dist = Math.sqrt(distSq);
          const influence = (22 - distSq) / 22;

          // Vortex swirl force (tangential)
          const tangentX = -pdy / dist;
          const tangentY = pdx / dist;

          posArray[idx] += tangentX * influence * 0.08;
          posArray[idx + 1] += tangentY * influence * 0.08;

          // Gentle outward dispersion
          posArray[idx] += (pdx / dist) * influence * 0.03;
          posArray[idx + 1] += (pdy / dist) * influence * 0.03;
        }

        // Boundary wrap: recycle rising embers
        if (posArray[idx + 1] > 9.5) {
          posArray[idx + 1] = -9.5;
          posArray[idx] = (Math.random() - 0.5) * 28;
        }
        if (posArray[idx] > 16) posArray[idx] = -16;
        if (posArray[idx] < -16) posArray[idx] = 16;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        animationFrameId = window.setTimeout(animate, 60);
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    // 10. Clean Cleanup on Unmount
    return () => {
      if (isSoftwareGl) {
        clearTimeout(animationFrameId);
      } else {
        cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', handleResize);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });

      particleTexture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[540px] md:h-[640px] lg:h-[700px] overflow-hidden select-none bg-[#0a0a0a]">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-crosshair z-0" />

      {/* Atmospheric Vignette & Contrast Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/65 z-10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />

      {/* Athletic Telemetry Markers */}
      <div className="pointer-events-none absolute top-6 left-6 z-20 hidden md:flex items-center gap-3 text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
        <span className="text-[#00FF66] font-bold">DAKHLA LAB</span>
        <span>·</span>
        <span>ATLANTIC WIND & SWELL PROVING GROUNDS</span>
      </div>

      <div className="pointer-events-none absolute top-6 right-6 z-20 hidden md:flex items-center gap-2 text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] inline-block shadow-[0_0_8px_#00FF66]" />
        <span>3D SOLID METALLIC ENGINE</span>
      </div>

      {/* Interactive Category Filter Shortcuts Integrated Directly Under Hero */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4 flex flex-col items-center gap-3.5">
        <p className="text-xs md:text-sm font-semibold tracking-wider text-zinc-400 text-center uppercase font-mono">
          HIGH-PERFORMANCE ATHLETIC HARDWARE · <span className="text-[#00FF66]">WHATSAPP DIRECT ORDER</span>
        </p>

        {/* 3 Main Categories Direct Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 bg-black/65 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl">
          <button
            onClick={() => onSelectCategory && onSelectCategory('swimming')}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 flex items-center gap-2 ${
              activeCategory === 'swimming'
                ? 'bg-[#00FF66] text-black shadow-[0_0_20px_rgba(0,255,102,0.45)]'
                : 'text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
            }`}
          >
            <span>🏊‍♂️</span>
            <span>Swimming Equipment</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                activeCategory === 'swimming' ? 'bg-black/20 text-black font-extrabold' : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              5 items
            </span>
          </button>

          <button
            onClick={() => onSelectCategory && onSelectCategory('running')}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 flex items-center gap-2 ${
              activeCategory === 'running'
                ? 'bg-[#00FF66] text-black shadow-[0_0_20px_rgba(0,255,102,0.45)]'
                : 'text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
            }`}
          >
            <span>🏃‍♂️</span>
            <span>Running Equipment</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                activeCategory === 'running' ? 'bg-black/20 text-black font-extrabold' : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              5 items
            </span>
          </button>

          <button
            onClick={() => onSelectCategory && onSelectCategory('fitness')}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 flex items-center gap-2 ${
              activeCategory === 'fitness'
                ? 'bg-[#00FF66] text-black shadow-[0_0_20px_rgba(0,255,102,0.45)]'
                : 'text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
            }`}
          >
            <span>⚡</span>
            <span>Fitness Equipment</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                activeCategory === 'fitness' ? 'bg-black/20 text-black font-extrabold' : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              5 items
            </span>
          </button>
        </div>

        {/* Dynamic interactive hint */}
        <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-ping" />
          <span>Move cursor to tilt 3D metallic text & swirl ember particles</span>
        </div>
      </div>
    </div>
  );
};
