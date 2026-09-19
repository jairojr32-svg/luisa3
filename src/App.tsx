import React, { useMemo, useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshReflectorMaterial, BakeShadows, Sky, Clouds, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';

import { SplitText } from './utils/SplitText';
import { generateBalloonAlbedoMap, generateBalloonBumpMap, generateSaltNormalMap, generateWickerNormalMap } from './utils/textures';

// Subpages
import AboutUs from './pages/AboutUs';
import Experience from './pages/Experience';
import LuxuryFlight from './pages/LuxuryFlight';
import ExclusiveFlight from './pages/ExclusiveFlight';
import SpecialLocations from './pages/SpecialLocations';
import Sustainability from './pages/Sustainability';
import Safety from './pages/Safety';
import FAQ from './pages/FAQ';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. COMPONENTES DO CENÁRIO IMERSIVO 3D
// ==========================================

// Cordilheira dos Andes 3D (Montanhas escarpadas e realistas com glaciares procedurais)
function AndeanMountains() {
  const mountainGeom = useMemo(() => {
    // Geometria de plano de alta subdivisão para capturar detalhes rochosos finos
    const geom = new THREE.PlaneGeometry(180, 35, 128, 64);
    const pos = geom.attributes.position;
    const vertex = new THREE.Vector3();

    // Deformador de terreno que preserva a estrutura 2D e UVs
    for (let i = 0; i < pos.count; i++) {
      vertex.fromBufferAttribute(pos, i);
      
      // Ondas senoidais combinadas + ruído de alta frequência absoluto para picos andinos pontiagudos e realistas
      const w1 = Math.sin(vertex.x * 0.05) * 8;
      const w2 = Math.cos(vertex.x * 0.12) * 3;
      const w3 = Math.sin(vertex.x * 0.28) * 1.2;
      
      // Detalhe áspero/escarpado de cristas montanhosas reais
      const jaggy = Math.abs(Math.sin(vertex.x * 0.6) * Math.cos(vertex.x * 1.2)) * 1.6;
      
      const edgeFactor = Math.sin((vertex.x + 90) / 180 * Math.PI);
      const height = (w1 + w2 + w3 + jaggy) * edgeFactor;
      const mountainHeight = Math.max(0, height + 8);

      // Preserva a distribuição vertical de vértices de 0 (base) a 1 (picos) para mapear UVs perfeitamente
      const normalizedY = (vertex.y + 17.5) / 35;
      vertex.y = normalizedY * mountainHeight;
      
      pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Textura procedural ultra-realista que simula rochas vulcânicas do Altiplano e picos nevados
  const mountainMaterial = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; // Resolução ampliada para texturização nítida
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // 1. Degradê de base geológica (rocha escura na base, tons terrosos quentes e neve no topo)
      const grad = ctx.createLinearGradient(0, 1024, 0, 0);
      grad.addColorStop(0.0, '#100b09'); // Base rochosa escura
      grad.addColorStop(0.25, '#2b1a13'); // Marrom vulcânico terracota
      grad.addColorStop(0.55, '#4a3024'); // Argila andina exposta pelo vento
      grad.addColorStop(0.78, '#d9e2ec'); // Transição para neve e gelo
      grad.addColorStop(1.0, '#ffffff'); // Neve brilhante acumulada
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // 2. Ruído de estratificação sedimentar horizontal (camadas geológicas)
      ctx.fillStyle = 'rgba(8, 4, 2, 0.18)';
      for (let i = 0; i < 600; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const w = 80 + Math.random() * 250;
        const h = 4 + Math.random() * 8;
        ctx.fillRect(x, y, w, h);
      }

      // Adiciona fissuras verticais de erosão pluvial nas encostas
      ctx.strokeStyle = 'rgba(6, 3, 1, 0.28)';
      ctx.lineWidth = 2.0;
      for (let i = 0; i < 50; i++) {
        let x = Math.random() * 1024;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        for (let y = 0; y < 1024; y += 15) {
          x += (Math.random() - 0.5) * 12;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // 3. Glaciares e canais de neve que escorrem organicamente dos picos (Y = 0) para os vales
      const snowGrad = ctx.createLinearGradient(0, 0, 0, 1024);
      snowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
      snowGrad.addColorStop(0.4, 'rgba(235, 245, 255, 0.85)');
      snowGrad.addColorStop(0.8, 'rgba(220, 225, 230, 0.0)'); // Desaparece antes de tocar o solo quente
      ctx.fillStyle = snowGrad;
      
      for (let i = 0; i < 30; i++) {
        const xCenter = Math.random() * 1024;
        ctx.beginPath();
        ctx.moveTo(xCenter, 0);
        ctx.lineTo(xCenter - 25 - Math.random() * 30, 0);
        ctx.bezierCurveTo(
          xCenter - 18, 300,
          xCenter - 8, 600,
          xCenter - 2, 800
        );
        ctx.lineTo(xCenter + 2, 800);
        ctx.bezierCurveTo(
          xCenter + 8, 600,
          xCenter + 18, 300,
          xCenter + 25 + Math.random() * 30, 0
        );
        ctx.closePath();
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    return new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.92,
      metalness: 0.08,
      side: THREE.DoubleSide
    });
  }, []);

  return (
    <mesh geometry={mountainGeom} material={mountainMaterial} position={[0, -1.98, -38]} receiveShadow />
  );
}

// Nuvens Volumétricas e Ultrarrealistas usando Drei Clouds
function SkyClouds() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      // Flutuação sutil simulando vento constante no deserto
      groupRef.current.position.x = Math.sin(time * 0.008) * 4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Usamos MeshBasicMaterial para auto-iluminação, garantindo nuvens perfeitamente brilhantes e brancas de Uyuni */}
      <Clouds limit={40} material={THREE.MeshBasicMaterial}>
        {/* Nuvem Esquerda - Fluffy, densa e com volume realista */}
        <Cloud
          position={[-12, 6.5, -16]}
          segments={10}
          bounds={[5, 1.8, 1.8]}
          volume={3.5}
          color="#ffffff"
          opacity={0.42}
          speed={0.12}
          growth={1.5}
          fade={15}
          concentrate="inside"
        />
        {/* Nuvem Direita - Equilibrando o horizonte */}
        <Cloud
          position={[12, 7.2, -18]}
          segments={8}
          bounds={[5, 1.6, 1.6]}
          volume={3.0}
          color="#ffffff"
          opacity={0.35}
          speed={0.1}
          growth={1.2}
          fade={15}
          concentrate="inside"
        />
        {/* Nuvem de Horizonte Distante e Suave */}
        <Cloud
          position={[0, 3.8, -24]}
          segments={12}
          bounds={[15, 1.2, 1.2]}
          volume={5.5}
          color="#f0f7ff" // Leve tom azulado refrescante refletindo o céu limpo
          opacity={0.3}
          speed={0.06}
          fade={15}
        />
      </Clouds>
    </group>
  );
}

// O Sol Brilhante e Suave no Horizonte (Alinhado fisicamente atrás das montanhas, sem influência de Fog e Tone Mapping)
function SunMesh() {
  return (
    <group position={[18, 2.2, -45]}>
      {/* O Sol Emissivo Puro */}
      <mesh>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} fog={false} />
      </mesh>
      {/* Corona solar brilhante de lente */}
      <mesh scale={[1.6, 1.5, 1.5]}>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial color="#ffeba1" transparent opacity={0.3} depthWrite={false} toneMapped={false} fog={false} />
      </mesh>
      <pointLight color="#ffe5ab" intensity={3.5} distance={70} decay={1.5} />
    </group>
  );
}

// O Balão de Ar Quente (Geometria 100% lisa e contínua + gomos inflados tridimensionais)
function HotAirBalloon({ scrollProgressRef }: { scrollProgressRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  
  const albedoMap = useMemo(() => generateBalloonAlbedoMap(), []);
  const bumpMap = useMemo(() => generateBalloonBumpMap(), []);
  const wickerNormalMap = useMemo(() => generateWickerNormalMap(), []);
  
  // GEOMETRIA MANUAL: GOTA DE BALÃO REAL
  // Desenhado ponto a ponto com base exata na foto original para fidelidade de 100%
  const points = useMemo(() => {
    return [
      new THREE.Vector2(0.42, -1.80), // Boca cilíndrica de metal na base
      new THREE.Vector2(0.45, -1.65), 
      new THREE.Vector2(0.50, -1.45), 
      new THREE.Vector2(0.68, -1.10), // Cone liso abrindo diagonalmente
      new THREE.Vector2(0.92, -0.70), 
      new THREE.Vector2(1.18, -0.30), 
      new THREE.Vector2(1.45,  0.15), 
      new THREE.Vector2(1.70,  0.60), 
      new THREE.Vector2(1.92,  1.10), // Ombros largos arredondados (Equador)
      new THREE.Vector2(2.05,  1.55), // Max bulge realístico
      new THREE.Vector2(2.10,  1.95), // Max bulge realístico
      new THREE.Vector2(2.05,  2.35), 
      new THREE.Vector2(1.92,  2.70), 
      new THREE.Vector2(1.70,  3.00), 
      new THREE.Vector2(1.38,  3.25), 
      new THREE.Vector2(0.95,  3.45), // Dome superior curvando rápido
      new THREE.Vector2(0.45,  3.55), 
      new THREE.Vector2(0.00,  3.58)  // Topo fechado com cúpula esférica plana
    ];
  }, []);

  // MATEMÁTICA DE GOMOS (LOBOS 3D):
  const balloonGeometry = useMemo(() => {
    const geom = new THREE.LatheGeometry(points, 48); // 48 divisões radiais
    const pos = geom.attributes.position;
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < pos.count; i++) {
      vertex.fromBufferAttribute(pos, i);
      const angle = Math.atan2(vertex.x, vertex.z);
      const numGores = 24; // 24 gomos reais
      
      const goreEffect = Math.sin(angle * numGores) * 0.055;
      
      // Amortecimento nas extremidades para emendas suaves (De -1.80 a 3.58 = 5.38 de altura total)
      const heightFactor = Math.sin((vertex.y + 1.80) / 5.38 * Math.PI);
      const intensity = goreEffect * Math.max(0, heightFactor);
      
      const dir = new THREE.Vector3(vertex.x, 0, vertex.z).normalize();
      vertex.addScaledVector(dir, intensity);
      
      pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geom.computeVertexNormals();
    return geom;
  }, [points]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const progress = scrollProgressRef.current;

    if (groupRef.current) {
      // Correção do Bug de Posicionamento e Elevação Dinâmica:
      // A base Y inicia em 1.35 (evitando que o cesto afunde no chão em Y = -2.0)
      // Conforme o scroll avança (progress), o balão sobe cinematicamente por mais 2.6 unidades
      groupRef.current.position.y = 1.35 + Math.sin(time * 0.45) * 0.15 + (progress * 2.6);
      
      // Ângulo inicial ajustado para focar o logotipo original de frente
      groupRef.current.rotation.y = -Math.PI / 2.8 + time * 0.01 + (progress * 1.5);
    }

    // Tremulação Cinematográfica da Chama do Queimador (Flicker do Fogo)
    if (flameRef.current) {
      const flicker = 1.0 + Math.sin(time * 12.0) * 0.15 + Math.cos(time * 24.0) * 0.08;
      flameRef.current.scale.set(flicker, flicker * (1.1 + Math.sin(time * 8.0) * 0.2), flicker);
    }
    if (lightRef.current) {
      lightRef.current.intensity = 4.5 + Math.sin(time * 14.0) * 1.8 + Math.cos(time * 25.0) * 0.6;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.35, -6]}>
      {/* 1. O Envelope do Balão (PBR Tecido Nylon Ripstop Realista) */}
      <mesh geometry={balloonGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial 
          map={albedoMap} 
          bumpMap={bumpMap}
          bumpScale={0.015} // Relevo da trama Ripstop e costuras
          roughness={0.65} // Nylon de alta performance possui acabamento fosco e denso
          metalness={0.0}   // Tecido não é metálico
          clearcoat={0.0}   // Sem camada de brilho plástico
          sheen={0.9}       // Efeito acetinado macio nas silhuetas (característico de tecidos finos)
          sheenColor={new THREE.Color('#ffffff')}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* 2. Cesto de Passageiros AUMENTADO e Queimador Realista */}
      <group position={[0, -1.0, 0]}>
        
        {/* Cabos de Aço Finos de Segurança conectando a boca ao cesto */}
        {[-0.35, 0.35].map((x, i) => (
          [-0.35, 0.35].map((z, j) => (
            <mesh key={`${i}-${j}`} position={[x, -0.6, z]} rotation={[x * 0.1, 0, z * 0.1]}>
              <cylinderGeometry args={[0.005, 0.005, 1.2, 8]} />
              <meshBasicMaterial color="#1a1a1a" />
            </mesh>
          ))
        ))}

        {/* Queimador de Metal Duplo */}
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.25, 0.04, 0.25]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.06, -0.08, 0]}>
          <cylinderGeometry args={[0.045, 0.05, 0.1, 12]} />
          <meshStandardMaterial color="#8a8a8a" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.06, -0.08, 0]}>
          <cylinderGeometry args={[0.045, 0.05, 0.1, 12]} />
          <meshStandardMaterial color="#8a8a8a" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* A Chama de Fogo Brilhante com sua luz que ilumina o bocal do balão */}
        <pointLight ref={lightRef} position={[0, 0.2, 0]} color="#ff7b00" intensity={4.5} distance={10} decay={1.8} />
        <mesh ref={flameRef} position={[0, 0.05, 0]}>
          <coneGeometry args={[0.1, 0.4, 16]} />
          <meshBasicMaterial color="#ffbd50" transparent opacity={0.9} />
        </mesh>

        {/* A Cesta de Vime de Passageiros com Normal Map Realístico (PROPORÇÃO GIGANTE REAL) */}
        <mesh position={[0, -1.3, 0]} castShadow>
          <boxGeometry args={[0.85, 0.65, 0.85]} />
          <meshStandardMaterial 
            color="#8d6851" // Tom de vime rattan natural dourado
            normalMap={wickerNormalMap}
            normalScale={new THREE.Vector2(1.2, 1.2)} // Relevo acentuado trançado
            roughness={0.85} // Sem reflexos metálicos
          />
        </mesh>
      </group>
    </group>
  );
}

// O Chão do Deserto de Sal de Uyuni (Espelho realístico impecável - Sem artefatos fluorescentes)
function InfiniteSaltFlat() {
  const saltNormalMap = useMemo(() => generateSaltNormalMap(), []);
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[140, 140]} />
      <MeshReflectorMaterial
        blur={[0, 0]}
        resolution={256}
        mixBlur={0}
        mixStrength={1.5} // Corrigido de 45 para 1.5! Elimina completamente o estouro arco-íris
        roughness={0.12} // Água suave sobre as placas de sal
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#ffc2a3" // Salar reflete o degradê avermelhado do pôr do sol
        metalness={0.05}
        normalMap={saltNormalMap} // Textura de placas poligonais de sal
        normalScale={new THREE.Vector2(0.2, 0.2)}
        mirror={0.78} // Reflexo cristalino de altíssimo luxo
      />
    </mesh>
  );
}

// Câmera Cinemática com Acompanhamento de Alvo (Tracking)
function CinematicCamera({ scrollProgressRef }: { scrollProgressRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  useFrame(() => {
    const progress = scrollProgressRef.current;
    const easeProgress = Math.pow(progress, 3);

    camera.position.z = 5 - (easeProgress * 3);
    camera.position.y = easeProgress * 0.4;
    
    const baseFov = 45;
    const targetFov = baseFov + (easeProgress * 45);
    if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.1);
        camera.updateProjectionMatrix();
    }
    
    // A câmera inclina-se para cima para acompanhar o balão enquanto ele sobe
    const targetY = 1.05 + (progress * 1.9);
    camera.lookAt(0, targetY, -6);
  });

  return null;
}

// ==========================================
// 2. O APLICATIVO PRINCIPAL (Montanhas + Nuvens + Sol)
// ==========================================

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPage(hash || 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 1. REF-BASED ZERO-LAG CUSTOM CURSOR STATE & EFFECTS
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFirstFrameDrawn, setIsFirstFrameDrawn] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMouseMove);

    let animFrameId: number;
    const updateCursor = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId = requestAnimationFrame(updateCursor);
    };
    updateCursor();

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const closestInteractive = target.closest('a, button, [role="button"], .group, .diff-card, .exp-card, .gallery-item, .arched-card, .timeline-item');
      setIsHovered(!!closestInteractive);

      const closestDarkSection = target.closest('.bg-[#0a0a0a], .bg-[#0b0c10]');
      setIsDarkBg(!!closestDarkSection);
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  const scrollProgressRef = useRef(0);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const whiteTransitionOverlayRef = useRef<HTMLDivElement>(null);
  const whiteSectionRef = useRef<HTMLDivElement>(null);
  const webglContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);

  // Referências para o segundo frame sequencer (Salar de Uyuni - O Infinito)
  const scrollProgress2Ref = useRef(0);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);
  const preloadedImages2Ref = useRef<HTMLImageElement[]>([]);
  const sectionInfinityRef = useRef<HTMLDivElement>(null);

  // Referências adicionais de GSAP
  const sectionJourneyRef = useRef<HTMLDivElement>(null);
  const sectionDifferencesRef = useRef<HTMLDivElement>(null);
  const sectionExperiencesRef = useRef<HTMLDivElement>(null);
  const sectionGalleryRef = useRef<HTMLDivElement>(null);
  const sectionSafetyRef = useRef<HTMLDivElement>(null);

  // Desenha o frame atual de forma responsiva (object-fit: cover via Canvas)
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = preloadedImagesRef.current[index];
    if (!img || !img.complete) {
      let found = false;
      for (let i = index - 1; i >= 0; i--) {
        const candidate = preloadedImagesRef.current[i];
        if (candidate && candidate.complete) {
          img = candidate;
          found = true;
          break;
        }
      }
      if (!found) return;
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Ajusta o tamanho físico para nitidez absoluta em telas retina/4K
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    } else {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Desenha o frame atual da segunda sequência (Salar de Uyuni - O Infinito) de forma responsiva
  const drawFrame2 = (index: number) => {
    const canvas = canvas2Ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = preloadedImages2Ref.current[index];
    if (!img || !img.complete) {
      let found = false;
      for (let i = index - 1; i >= 0; i--) {
        const candidate = preloadedImages2Ref.current[i];
        if (candidate && candidate.complete) {
          img = candidate;
          found = true;
          break;
        }
      }
      if (!found) return;
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Ajusta o tamanho físico para nitidez absoluta em telas retina/4K
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    } else {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Precarregar toda a sequência de 300 frames em cache de memória para o segundo sequencer
  useEffect(() => {
    if (currentPage !== 'home') return;
    
    const images: HTMLImageElement[] = [];
    preloadedImages2Ref.current = images;
    let loadedCount = 0;

    for (let i = 0; i < 300; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames2/frame_${numStr}.jpg`;
      img.onload = () => {
        loadedCount++;
        // Renderiza o primeiro frame assim que ele estiver pronto
        if (i === 0) {
          drawFrame2(0);
        }
        if (loadedCount === 300) {
          ScrollTrigger.refresh();
        }
      };
      images.push(img);
    }

    const handleResize = () => {
      const progress = scrollProgress2Ref.current;
      const frameIndex = Math.min(Math.floor(progress * 299), 299);
      drawFrame2(frameIndex);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage]);

  // Precarregar toda a sequência de 300 frames em cache de memória
  useEffect(() => {
    if (currentPage !== 'home') return;
    
    const images: HTMLImageElement[] = [];
    preloadedImagesRef.current = images;
    let loadedCount = 0;

    for (let i = 0; i < 300; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames/frame_${numStr}.jpg`;
      img.onload = () => {
        loadedCount++;
        // Renderiza o primeiro frame assim que ele estiver pronto
        if (i === 0) {
          drawFrame(0);
          setIsFirstFrameDrawn(true);
        }
        if (loadedCount === 300) {
          ScrollTrigger.refresh();
        }
      };
      images.push(img);
    }

    const handleResize = () => {
      const frameIndex = Math.min(Math.floor(scrollProgressRef.current * 299), 299);
      drawFrame(frameIndex);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage]);

  useLenis(({ progress, scroll }) => {
    if (currentPage === 'home') {
      const heroHeight = window.innerHeight * 2;
      const scrollProgress = Math.min(scroll / heroHeight, 1);
      scrollProgressRef.current = scrollProgress;

      // Renderização instantânea do frame correspondente
      const frameIndex = Math.min(Math.floor(scrollProgress * 299), 299);
      drawFrame(frameIndex);

      // Otimização de Performance
      if (scroll > heroHeight) {
        if (webglContainerRef.current && webglContainerRef.current.style.display !== 'none') {
          webglContainerRef.current.style.display = 'none';
        }
        if (videoContainerRef.current && videoContainerRef.current.style.display !== 'none') {
          videoContainerRef.current.style.display = 'none';
        }
      } else {
        if (videoContainerRef.current && videoContainerRef.current.style.display !== 'block') {
          videoContainerRef.current.style.display = 'block';
        }
        if (webglContainerRef.current && webglContainerRef.current.style.display !== 'none') {
          webglContainerRef.current.style.display = 'none';
        }
      }
    } else {
      // Lock WebGL in gorgeous static sunrise position on subpages
      scrollProgressRef.current = 0;
      
      if (videoContainerRef.current && videoContainerRef.current.style.display !== 'none') {
        videoContainerRef.current.style.display = 'none';
      }

      if (webglContainerRef.current) {
        if (progress > 0.15) {
          if (webglContainerRef.current.style.display !== 'none') {
            webglContainerRef.current.style.display = 'none';
          }
        } else {
          if (webglContainerRef.current.style.display !== 'block') {
            webglContainerRef.current.style.display = 'block';
          }
        }
      }
    }
  });

  useLayoutEffect(() => {
    if (currentPage !== 'home') return;

    // Orquestração Awwwards GSAP
    
    // 1. Wipe Branco Perfeito
    gsap.fromTo(whiteTransitionOverlayRef.current,
      { opacity: 0 },
      {
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: '50% top',  // Começa no meio do hero (100vh)
          end: '100% top',  // Termina no final do hero (200vh)
          scrub: true,
        },
        opacity: 1,
        ease: 'power1.inOut'
      }
    );

    // 2. Título Hero desvanece
    gsap.to('.hero-title-group', {
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: 'top top',   // Começa a sumir no início do scroll
        end: '50% top',    // Desvanece totalmente na metade do hero (100vh)
        scrub: true,
      },
      opacity: 0,
      y: -50,
      scale: 1.05,
    });

    // 3. Revelação Letra-por-Letra (SplitText na primeira seção branca)
    const chars = whiteSectionRef.current?.querySelectorAll('.split-char');
    if (chars && chars.length > 0) {
      gsap.fromTo(chars, 
        { y: '100%', opacity: 0 },
        {
          scrollTrigger: {
            trigger: whiteSectionRef.current,
            start: 'top 65%',
            end: 'top 20%',
            scrub: 1,
          },
          y: '0%',
          opacity: 1,
          stagger: 0.01,
          ease: 'power3.out',
        }
      );
    }

    // 4. Animação de entrada dos cards arqueados na Seção Journey (Revelados individualmente ao entrarem em cena)
    const archedCards = sectionJourneyRef.current?.querySelectorAll('.arched-card');
    if (archedCards && archedCards.length > 0) {
      archedCards.forEach((card) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.5,
            },
            y: 0,
            opacity: 1,
            ease: 'power2.out'
          }
        );
      });
    }

    // Animação do balão flutuante principal (The Odyssey)
    const journeyBalloon = sectionJourneyRef.current?.querySelector('.journey-balloon');
    if (journeyBalloon) {
      gsap.fromTo(journeyBalloon,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: journeyBalloon,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 0.5,
          },
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out'
        }
      );
    }

    // 5. Revelação dos itens da Timeline (Cada passo aparece exatamente quando passa por sua respectiva tela)
    const timelineItems = sectionJourneyRef.current?.querySelectorAll('.timeline-item');
    if (timelineItems && timelineItems.length > 0) {
      timelineItems.forEach((item) => {
        gsap.fromTo(item,
          { x: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.5,
            },
            x: 0,
            opacity: 1,
            ease: 'power2.out'
          }
        );
      });
    }

    // 6. Diferenciais Ultra-Premium
    const diffItems = sectionDifferencesRef.current?.querySelectorAll('.diff-card');
    if (diffItems && diffItems.length > 0) {
      gsap.fromTo(diffItems,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionDifferencesRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }

    // 7. Cards de Escolha de Experiência
    const expCards = sectionExperiencesRef.current?.querySelectorAll('.exp-card');
    if (expCards && expCards.length > 0) {
      gsap.fromTo(expCards,
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionExperiencesRef.current,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 1,
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );
    }

    // 8. Galeria de Fotos
    const galleryItems = sectionGalleryRef.current?.querySelectorAll('.gallery-item');
    if (galleryItems && galleryItems.length > 0) {
      gsap.fromTo(galleryItems,
        { scale: 0.9, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionGalleryRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
          scale: 1,
          opacity: 1,
          stagger: 0.08,
          ease: 'power1.out'
        }
      );
    }

    // 9. Sequência de Frames da Seção Infinito (Segunda Animação de Scroll)
    if (sectionInfinityRef.current) {
      ScrollTrigger.create({
        trigger: sectionInfinityRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          scrollProgress2Ref.current = self.progress;
          const frameIndex = Math.min(Math.floor(self.progress * 299), 299);
          drawFrame2(frameIndex);
        }
      });
    }

    // Recalcula todas as posições absolutas de ScrollTrigger após o carregamento completo do layout
    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, orientation: 'vertical' }}>
      
      {/* High-Performance Film Grain Overlay */}
      <div className="film-grain" />

      {/* Custom Premium Interactive Magnetic Cursor */}
      <div 
        ref={cursorDotRef} 
        className={`custom-cursor-dot pointer-events-none hidden lg:block ${isDarkBg ? 'bg-white' : 'bg-black'} ${isHovered ? 'scale-50 opacity-40' : 'scale-100'}`}
      />
      <div 
        ref={cursorRingRef} 
        className={`custom-cursor-ring pointer-events-none hidden lg:block ${isDarkBg ? 'border-white/25' : 'border-black/15'} ${isHovered ? 'w-14 h-14 border-[#c5a880]/55 bg-[#c5a880]/5' : 'w-8 h-8'}`}
      />

      {/* Editorial Structural Gridlines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 grid grid-cols-4 max-w-7xl mx-auto px-8 md:px-24 lg:px-32">
        <div className={`h-full border-r ${isDarkBg ? 'border-white/[0.015]' : 'border-black/[0.015]'}`} />
        <div className={`h-full border-r ${isDarkBg ? 'border-white/[0.015]' : 'border-black/[0.015]'}`} />
        <div className={`h-full border-r ${isDarkBg ? 'border-white/[0.015]' : 'border-black/[0.015]'}`} />
        <div className="h-full" />
      </div>

      {/* O Fundo de Sequência de Imagens Realista do Balão Original (Veo 3.1 / Nano-Banana) */}
      <div 
        ref={videoContainerRef} 
        className="fixed top-0 left-0 w-full h-screen z-0 bg-[#0b0c10]"
        style={{ display: currentPage === 'home' ? 'block' : 'none' }}
      >
        {/* Placeholder estático instantâneo de primeiro frame */}
        {!isFirstFrameDrawn && (
          <img 
            src="/frames/frame_000.jpg" 
            alt="First frame placeholder" 
            className="absolute inset-0 w-full h-full object-cover z-10" 
          />
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full block relative z-0"
        />
      </div>

      {/* A Árvore WebGL - Fotorealismo PBR de Uyuni com cores quentes de Sunset */}
      <div 
        ref={webglContainerRef} 
        className="fixed top-0 left-0 w-full h-screen z-0 bg-[#ff9e79]"
        style={{ display: currentPage === 'home' ? 'none' : 'block' }}
      >
        <Canvas dpr={[1, 1.5]} shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}>
          <CinematicCamera scrollProgressRef={scrollProgressRef} />
          
          {/* Névoa Atmosférica de Pôr do Sol Quente */}
          <fog attach="fog" args={['#ff9e79', 15, 65]} />
          
          {/* Luz PBR: Ambiente sutilmente quente e luz direcional dourada intensa vinda diretamente de trás das montanhas */}
          <ambientLight intensity={0.28} color="#ffebd1" />
          <directionalLight position={[18, 2.2, -45]} intensity={7.5} color="#ff7d45" castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} />
          
          {/* Simulação física da atmosfera (Pôr do Sol Avermelhado espetacular no deserto) */}
          <Sky 
            distance={450000} 
            sunPosition={[18, 2.2, -45]} 
            turbidity={12.0} 
            rayleigh={4.0} 
            mieCoefficient={0.005} 
            mieDirectionalG={0.85} 
          />
          
          {/* HDRI de alvorecer para reflexos metálicos/água fotorealistas */}
          <Environment preset="dawn" background={false} />
          
          {/* O Sol Físico Brilhante */}
          <SunMesh />

          {/* Nuvens Volumétricas Flutuando */}
          <SkyClouds />

          {/* Cadeia de Montanhas dos Andes ao fundo */}
          <AndeanMountains />

          {/* O Balão Real com Cesta e Queimador Realista */}
          <HotAirBalloon scrollProgressRef={scrollProgressRef} />
          
          {/* O Chão Espelhado Real de Uyuni */}
          <InfiniteSaltFlat />
          
          <BakeShadows />
        </Canvas>
      </div>

      {/* Overlay Branco de Transição Fluida */}
      <div 
        ref={whiteTransitionOverlayRef}
        className="fixed top-0 left-0 w-full h-screen z-10 bg-[#f8f9fa] pointer-events-none opacity-0"
      />

      {/* A Camada de HTML (Scroll) */}
      <div ref={scrollSectionRef} className="relative z-20 w-full font-sans">
        
        {currentPage === 'home' ? (
          <>
            {/* HEADER */}
            <header className="hero-title-group fixed top-0 left-0 w-full px-5 py-4 xs:px-6 md:px-12 md:py-8 flex justify-between items-center z-50 text-white mix-blend-difference">
              <div className="cursor-pointer" onClick={() => { window.location.hash = '#home'; setIsMobileMenuOpen(false); }}>
                <img src="/Negative Salar Balloons Arc.png" alt="Salar Balloons Logo" className="h-16 md:h-18 w-auto object-contain" />
              </div>
              <nav className="hidden md:flex space-x-10 text-[9px] font-semibold tracking-[0.3em] uppercase">
                <a href="#experience" className="hover:text-[#c5a880] transition-colors duration-500 ease-out">Experience</a>
                <a href="#about" className="hover:text-[#c5a880] transition-colors duration-500 ease-out">About Us</a>
                <a href="#sustainability" className="hover:text-[#c5a880] transition-colors duration-500 ease-out">Sustainability</a>
                <a href="#safety" className="hover:text-[#c5a880] transition-colors duration-500 ease-out">Safety Standard</a>
                <a href="#faq" className="hover:text-[#c5a880] transition-colors duration-500 ease-out">FAQ</a>
                <a href="#gallery" className="hover:text-[#c5a880] transition-colors duration-500 ease-out">Gallery</a>
              </nav>
              <a href="#contact" className="hidden md:inline-block text-[9px] font-semibold tracking-[0.25em] border border-white/10 px-6 py-2.5 rounded-full cursor-pointer hover:border-white hover:bg-white hover:text-black transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) uppercase">
                RESERVAR
              </a>

              {/* Hamburger Button for Mobile */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 relative"
                aria-label="Toggle Menu"
              >
                <span className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'transform rotate-45 translate-y-[7.5px]' : ''}`} />
                <span className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-[7.5px]' : ''}`} />
              </button>
            </header>

        {/* CENA 1: HERO - Mantido limpo com o logotipo central */}
        <section ref={heroSectionRef} className="relative w-full h-[200vh]">
          <div className="hero-title-group sticky top-0 h-screen w-full flex flex-col justify-center items-center pointer-events-none px-4">
            
            <div className="w-[85vw] md:w-[50vw] max-w-4xl py-4 flex justify-center items-center pointer-events-auto">
              <img 
                src="/Negative Salar Balloons Arc.png" 
                alt="Salar Balloons" 
                className="w-full h-auto object-contain drop-shadow-2xl" 
              />
            </div>

            <div className="absolute bottom-12 flex flex-col items-center">
              <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-white animate-[scroll-down_2s_ease-in-out_infinite]" />
              </div>
              <span className="text-[8px] uppercase tracking-[0.4em] font-medium mt-3 text-white/40">Scroll</span>
            </div>
          </div>
        </section>

        {/* CENA 2: INTRODUÇÃO EDITORIAL (Abaixo do Balão 3D, Fundo Off-White) */}
        <section id="experiencia" className="relative z-30 w-full bg-[#fcfbf7] pt-32 pb-32">
          
          <div ref={whiteSectionRef} className="min-h-screen flex flex-col justify-center items-center px-6 md:px-24 text-center relative">
            
            {/* Index Counter and Coordinate Stamp */}
            <div className="flex flex-col items-center space-y-2 mb-12 text-[9px] font-mono tracking-[0.3em] text-black/35 select-none pointer-events-none">
              <span>( 01 // 06 )</span>
              <span className="font-sans text-[8px] opacity-75">20°11'52"S 67°28'30"W</span>
            </div>

            <div className="w-20 h-20 border border-black/5 rounded-full flex items-center justify-center mb-16 relative">
              <svg className="absolute w-28 h-28 animate-[spin_25s_linear_infinite]" viewBox="0 0 100 100">
                <defs>
                  <path id="circle-path" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                </defs>
                <text fill="#111" fontSize="9" fontWeight="500" letterSpacing="4.5" className="opacity-80">
                  <textPath href="#circle-path" startOffset="0%">
                    • SALAR BALLOONS • PRIVATE & EXCLUSIVITY
                  </textPath>
                </text>
              </svg>
              <div className="w-1.5 h-1.5 bg-black/80 rounded-full" />
            </div>

            {/* Nova Tipografia Refinada e Compactada a partir do DOCX */}
            <div className="max-w-6xl space-y-4">
              <SplitText className="text-3xl md:text-6xl lg:text-[4.5rem] font-serif text-[#111] font-medium tracking-tight leading-[1.05] uppercase">
                The World’s Most
              </SplitText>
              <SplitText className="text-3xl md:text-6xl lg:text-[4.5rem] font-serif text-[#111] font-medium tracking-tight leading-[1.05] uppercase">
                Extraordinary Balloon
              </SplitText>
              <SplitText className="text-3xl md:text-6xl lg:text-[4.5rem] font-serif text-black/40 font-medium tracking-tight leading-[1.05] uppercase">
                Experience Above the
              </SplitText>
              <SplitText className="text-3xl md:text-6xl lg:text-[4.5rem] font-serif text-[#111] font-medium tracking-tight leading-[1.05] uppercase">
                Breathtaking Uyuni Mirror.
              </SplitText>
            </div>

            <div className="mt-20 max-w-xl text-center mx-auto space-y-6">
              <p className="text-black/60 text-[13px] md:text-[14px] leading-[1.85] font-light tracking-wide">
                An extraordinary private balloon journey designed with sartorial precision. 
                Float in absolute silence over the largest reflective mirror on Earth — where every 
                detail of your flight is tailored to deliver the experience of a lifetime.
              </p>
              <div className="pt-6 flex justify-center space-x-6">
                <a href="#voos" className="px-8 py-3.5 border border-black text-black bg-transparent rounded-full text-[10px] font-semibold tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)">
                  Discover Flight
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* SEÇÃO B: A JORNADA ÚNICA (Inspirada no Layout de Arcos e Timeline) */}
        <section ref={sectionJourneyRef} className="relative z-30 w-full bg-[#fcfbf7] pt-32 pb-40 px-6 md:px-16 lg:px-24 border-t border-black/5">
          <div className="max-w-7xl mx-auto space-y-32">
            
            {/* 1. Cabeçalho Editorial Estendido (Full Width Header) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end pb-12 border-b border-black/5">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center space-x-3 text-[9px] font-mono tracking-[0.3em] text-black/35 select-none pointer-events-none mb-1">
                  <span>( 02 // 06 )</span>
                  <span className="w-8 h-[1px] bg-black/10"></span>
                  <span className="font-sans text-[8px] opacity-75">BOLIVIAN ALTIPLANO</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-black/40 block">THE ODYSSEY</span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#111] leading-[1.05] uppercase font-light tracking-tight">
                  More Than a Flight.<br />
                  <span className="font-serif italic font-normal text-black/50">A Journey Built to Be Unforgettable.</span>
                </h2>
              </div>
              <div className="lg:col-span-4 lg:border-l lg:border-black/5 lg:pl-10 lg:pb-1">
                <p className="text-[13px] md:text-sm text-black/60 leading-relaxed font-light">
                  From a breathtaking sunrise above the infinite salt flat to a high-altitude champagne toast, discover each chapter of our carefully choreographed experience.
                </p>
              </div>
            </div>

            {/* 2. Conteúdo da Jornada: Bloco Alternado 1 (A Partida) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              {/* Esquerda: Imagem em Arco (Recepção/Lobby do Hotel) */}
              <div className="lg:col-span-5 relative">
                <div className="arched-card w-full max-w-[290px] xs:max-w-[360px] h-[460px] mx-auto overflow-hidden border border-black/5 shadow-[0_12px_40px_rgba(0,0,0,0.015)] relative group">
                  <img 
                    src="/Fotos melhores /ps2.jpg" 
                    alt="Luxury Hotel Lobby" 
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>
              </div>
              
              {/* Direita: Passos 01 e 02 */}
              <div className="lg:col-span-7 space-y-12 lg:pl-8">
                <div className="border-l border-black/5 pl-8 space-y-12">
                  {[
                    { num: "01", title: "Luxury Hotel Pickup", desc: "Private, seamless premium transfers straight from your hotel or luxury accommodation directly to the launch site." },
                    { num: "02", title: "Sunrise Lounge & Hot Drinks", desc: "Warm up with curated herbal infusions, fresh coffee, and gourmet pastries as dawn breaks." }
                  ].map((step, idx) => (
                    <div key={idx} className="timeline-item relative group cursor-pointer transition-all duration-500">
                      <div className="absolute -left-[36px] top-2 w-1.5 h-1.5 rounded-full bg-black/15 group-hover:bg-[#c5a880] group-hover:scale-125 transition-all duration-500" />
                      <div className="space-y-2">
                        <span className="font-serif text-xs italic text-black/30 group-hover:text-[#c5a880] transition-colors duration-500">{step.num}</span>
                        <h4 className="font-sans font-semibold text-[15px] md:text-[16px] tracking-wide text-[#111] group-hover:text-[#c5a880] transition-colors duration-500">{step.title}</h4>
                        <p className="text-[13px] text-black/65 leading-relaxed max-w-xl font-light">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Bloco Alternado 2 (A Ascensão & Voo) - O Balão Flutuando com muito espaço */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              {/* Esquerda: Passos 03 e 04 */}
              <div className="lg:col-span-7 space-y-12 lg:pr-8 order-2 lg:order-1">
                <div className="border-r border-b-0 lg:border-r lg:border-black/5 pr-0 lg:pr-12 space-y-12 text-left lg:text-right relative">
                  
                  {/* Trilha e Bullet points específicos para o lado direito da linha no desktop */}
                  {[
                    { num: "03", title: "Balloon Inflation Experience", desc: "Witness the magnificent ritual of inflating the giant envelope under the pristine Uyuni sky." },
                    { num: "04", title: "Flight Above Salar de Uyuni", desc: "Float silently above the surreal mirror plane, experiencing infinite horizons and dramatic light." }
                  ].map((step, idx) => (
                    <div key={idx} className="timeline-item relative group cursor-pointer transition-all duration-500">
                      {/* Bullet point posicionado na borda direita da div para desktop */}
                      <div className="absolute -right-[40px] top-2 w-1.5 h-1.5 rounded-full bg-black/15 group-hover:bg-[#c5a880] group-hover:scale-125 transition-all duration-500 hidden lg:block" />
                      <div className="space-y-2">
                        <span className="font-serif text-xs italic text-black/30 group-hover:text-[#c5a880] transition-colors duration-500">{step.num}</span>
                        <h4 className="font-sans font-semibold text-[15px] md:text-[16px] tracking-wide text-[#111] group-hover:text-[#c5a880] transition-colors duration-500">{step.title}</h4>
                        <p className="text-[13px] text-black/65 leading-relaxed max-w-xl font-light ml-auto">{step.desc}</p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>

              {/* Direita: Imagem em Arco (Voo) */}
              <div className="lg:col-span-5 relative order-1 lg:order-2">
                <div className="arched-card w-full max-w-[290px] xs:max-w-[360px] h-[460px] mx-auto overflow-hidden border border-black/5 shadow-[0_12px_40px_rgba(0,0,0,0.015)] relative group z-20">
                  <img 
                    src="/1 - SALAR/7E66BD85-1EED-4B07-8516-32FA296B5FF1_2.PNG" 
                    alt="Hot Air Balloon over Salar" 
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            {/* 4. Bloco Alternado 3 (A Celebração) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              {/* Esquerda: Imagem em Arco (Brunch) */}
              <div className="lg:col-span-5 relative">
                <div className="arched-card w-full max-w-[290px] xs:max-w-[360px] h-[460px] mx-auto overflow-hidden border border-black/5 shadow-[0_12px_40px_rgba(0,0,0,0.015)] relative group">
                  <img 
                    src="/Fotos melhores /Imagem 23-07-2026 às 19.54.jpg" 
                    alt="Luxury Breakfast" 
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>
              </div>

              {/* Direita: Passos 05 e 06 + Botão Final de Reserva */}
              <div className="lg:col-span-7 space-y-12 lg:pl-8">
                <div className="border-l border-black/5 pl-8 space-y-12">
                  {[
                    { num: "05", title: "Champagne Celebration", desc: "A traditional high-altitude aeronautical toast on the salt flats with premium French champagne." },
                    { num: "06", title: "Premium Breakfast on the Salt", desc: "Savor a fully-catered, private breakfast styled elegantly in the middle of the breathtaking white salt desert." }
                  ].map((step, idx) => (
                    <div key={idx} className="timeline-item relative group cursor-pointer transition-all duration-500">
                      <div className="absolute -left-[36px] top-2 w-1.5 h-1.5 rounded-full bg-black/15 group-hover:bg-[#c5a880] group-hover:scale-125 transition-all duration-500" />
                      <div className="space-y-2">
                        <span className="font-serif text-xs italic text-black/30 group-hover:text-[#c5a880] transition-colors duration-500">{step.num}</span>
                        <h4 className="font-sans font-semibold text-[15px] md:text-[16px] tracking-wide text-[#111] group-hover:text-[#c5a880] transition-colors duration-500">{step.title}</h4>
                        <p className="text-[13px] text-black/65 leading-relaxed max-w-xl font-light">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 pl-8">
                  <a href="#voos" className="inline-block px-10 py-4 border border-black text-black bg-transparent rounded-full text-[10px] font-semibold tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)">
                    Book Your Experience
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SEÇÃO C: O DIFERENCIAL ULTRA-PREMIUM (Diferenciais Técnicos Word) */}
        <section id="diferenciais" ref={sectionDifferencesRef} className="relative z-30 w-full bg-[#fcfbf7] pb-40 px-8 md:px-24 border-t border-black/5 pt-32">
          <div className="max-w-7xl mx-auto space-y-24">
            
            {/* Cabeçalho Minimalista */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="flex justify-center items-center space-x-3 text-[9px] font-mono tracking-[0.3em] text-black/35 select-none pointer-events-none mb-1">
                <span>( 03 // 06 )</span>
                <span className="w-8 h-[1px] bg-black/10"></span>
                <span className="font-sans text-[8px] opacity-75">SARTORIAL BENCHMARK</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-black/40">THE BENCHMARK</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#111] uppercase font-light tracking-tight">
                Designed Around <span className="font-serif italic font-normal text-black/50">Comfort, Privacy & Excellence</span>
              </h2>
              <p className="text-black/60 text-[13px] md:text-sm font-light max-w-2xl mx-auto leading-relaxed">
                Unlike traditional, high-volume tourist operations, we have elevated every detail of our flight structure to ensure unmatched safety and ultimate comfort.
              </p>
            </div>

            {/* Grid 4 Colunas com Linhas Horizontais Finas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { num: "01", title: "ONLY BALLOON IN UYUNI", desc: "The sole hot air balloon company operating in the world’s most iconic and breathtaking salt plains, guaranteeing unrivaled sky access." },
                { num: "02", title: "PRIVATE BY DESIGN", desc: "Forget cramped conditions with strangers. Couples, families, and private groups enjoy dedicated, spacious basket compartments." },
                { num: "03", title: "WORLD-CLASS PILOT", desc: "decades of high-altitude flight safety. Internationally certified in Europe and Brazil, ensuring masterful, calm piloting." },
                { num: "04", title: "PREMIUM SAFETY TECH", desc: "Equipped with advanced satellite weather tracking, supplemental oxygen, and certified top-tier European flight technology." }
              ].map((diff, idx) => (
                <div key={idx} className="diff-card border-t border-black/5 pt-8 space-y-4 group cursor-pointer hover:border-black/30 transition-colors duration-500">
                  <span className="font-serif text-xs font-semibold text-black/30">{diff.num}</span>
                  <h3 className="font-sans font-semibold text-xs tracking-[0.25em] uppercase text-[#111] group-hover:text-[#c5a880] transition-colors duration-500">{diff.title}</h3>
                  <p className="text-[12px] text-black/60 leading-relaxed font-light">{diff.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SEÇÃO D: ESCOLHA SUA EXPERIÊNCIA (Cards de Luxo) */}
        <section id="voos" ref={sectionExperiencesRef} className="relative z-30 w-full bg-[#fcfbf7] pb-40 px-8 md:px-24">
          <div className="max-w-7xl mx-auto space-y-20">
            
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="flex justify-center items-center space-x-3 text-[9px] font-mono tracking-[0.3em] text-black/35 select-none pointer-events-none mb-1">
                <span>( 04 // 06 )</span>
                <span className="w-8 h-[1px] bg-black/10"></span>
                <span className="font-sans text-[8px] opacity-75">PRIVATE FLEET</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-black/40">THE FLEET</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#111] uppercase font-light tracking-tight">
                Tailored <span className="font-serif italic font-normal text-black/50">Flight Journeys</span>
              </h2>
              <p className="text-black/60 text-[13px] md:text-sm font-light">
                Choose the flight configuration that perfectly mirrors how you wish to experience Uyuni.
              </p>
            </div>

            {/* Grid de Cards de Luxo (Glassmorphism sutil para dialogar com o 3D) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  num: "01", 
                  title: "Luxury Flight", 
                  desc: "Perfect for couples or small families. Premium private compartments, champagne toast, and beautifully catered hot breakfast on the white flats.",
                  cta: "Discover Luxury",
                  bg: "/1 - SALAR/7E66BD85-1EED-4B07-8516-32FA296B5FF1_2.PNG"
                },
                { 
                  num: "02", 
                  title: "Exclusive Flight", 
                  desc: "The entire hot air balloon reserved exclusively for you and your guests. Fully customized gourmet menu, bespoke launch coordinates, and direct butler service.",
                  cta: "Explore Exclusive",
                  bg: "/1 - SALAR/61C18353-D6D0-405D-A480-732F1B14FAF8.PNG"
                },
                { 
                  num: "03", 
                  title: "Special Locations", 
                  desc: "Secret takeoffs from remote Andean volcanic fields, available on highly restricted dates for seasoned world-travelers seeking ultimate rarity.",
                  cta: "View Locations",
                  bg: "/1 - SALAR/2D6A17FC-C073-4365-8E61-27C6D6B3BC66_2.PNG"
                }
              ].map((card, idx) => (
                <div key={idx} className="exp-card min-h-[460px] h-auto pb-8 border border-white/10 rounded-[2rem] p-6 xs:p-8 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.01] transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                  {/* Background Image */}
                  <img 
                    src={card.bg} 
                    alt={card.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out -z-20" 
                  />
                  {/* Dark overlay for perfect legibility */}
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/50 transition-colors duration-500 -z-10" />

                  <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <span className="font-serif text-sm font-semibold text-white/60">{card.num}</span>
                      <span className="text-[8px] uppercase tracking-[0.25em] border border-white/20 text-white px-3.5 py-1 rounded-full font-semibold bg-white/10 backdrop-blur-sm">VIP</span>
                    </div>
                    <h3 className="font-serif text-2xl text-white font-light uppercase tracking-tight">{card.title}</h3>
                    <p className="text-[12px] text-white/80 leading-relaxed font-light">{card.desc}</p>
                  </div>
                  <div className="relative z-10">
                    <button className="w-full py-3.5 border border-white text-white bg-transparent rounded-full text-[9px] font-semibold tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)">
                      {card.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SEÇÃO E: SALAR DE UYUNI - O INFINITO (Contraste Escuro Dramático) */}
        <section ref={sectionInfinityRef} className="relative h-screen bg-[#0a0a0a] text-white flex flex-col justify-center px-8 md:px-24 overflow-hidden z-30">
          
          {/* Background de Sequência de Vídeo com Rolagem (Exibido nas cores originais vibrantes do vídeo) */}
          <div className="absolute inset-0 z-0">
            <canvas
              ref={canvas2Ref}
              className="w-full h-full block opacity-100"
            />
          </div>

          <div className="relative z-10 max-w-5xl space-y-8">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#c5a880]">THE LANDSCAPE</span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight uppercase font-light max-w-4xl">
              One of the Most <span className="font-serif italic font-normal text-white/50">Extraordinary Places</span> on Earth
            </h2>
            <p className="font-sans text-[13px] md:text-sm text-white/60 max-w-xl leading-relaxed font-light">
              Infinite white horizons, surreal mirror reflections, and a breathtaking absolute silence. 
              Salar de Uyuni is a magical landscape that transforms across the seasons, waiting to be discovered from above.
            </p>
            <div className="pt-4">
              <button className="px-10 py-3.5 border border-white text-white bg-transparent rounded-full text-[10px] font-semibold tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)">
                Discover Salar de Uyuni
              </button>
            </div>
          </div>
        </section>

        {/* SEÇÃO F: GALERIA EDITORIAL STAGGERED MASONRY */}
        <section ref={sectionGalleryRef} className="relative z-30 w-full bg-[#fcfbf7] pt-40 pb-40 px-8 md:px-24">
          <div className="max-w-7xl mx-auto space-y-20">
            
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="flex justify-center items-center space-x-3 text-[9px] font-mono tracking-[0.3em] text-black/35 select-none pointer-events-none mb-1">
                <span>( 05 // 06 )</span>
                <span className="w-8 h-[1px] bg-black/10"></span>
                <span className="font-sans text-[8px] opacity-75">SARTORIAL GALLERY</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-black/40">THE DIARY</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#111] uppercase font-light tracking-tight">
                Moments Above <span className="font-serif italic font-normal text-black/50">the Mirror</span>
              </h2>
            </div>

            {/* Editorial Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="gallery-item md:col-span-8 min-h-[300px] md:h-[380px] rounded-[2rem] overflow-hidden border border-black/5 group relative cursor-pointer">
                <img 
                  src="/1 - SALAR/AdobeStock_680985457.jpeg" 
                  alt="Balloon Sky" 
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                />
              </div>
              <div className="gallery-item md:col-span-4 min-h-[300px] md:h-[380px] rounded-[2rem] overflow-hidden border border-black/5 group relative cursor-pointer">
                <img 
                  src="/Fotos melhores /Imagem 23-07-2026 às 19.53.jpg" 
                  alt="Champagne Celebration" 
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                />
              </div>
              <div className="gallery-item md:col-span-4 min-h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden border border-black/5 group relative cursor-pointer">
                <img 
                  src="/Experiencia Salar Balloons/Snapinst.app_444485847_843359851167119_158335465410395033_n_1080.jpg" 
                  alt="Gourmet Service" 
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                />
              </div>
              <div className="gallery-item md:col-span-8 min-h-[300px] md:h-[450px] rounded-[2rem] overflow-hidden border border-black/5 group relative cursor-pointer">
                <img 
                  src="/Fotos melhores /Imagem 23-07-2026 às 19.52.jpg" 
                  alt="Unforgettable reflections" 
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                />
              </div>
            </div>

          </div>
        </section>

        {/* SEÇÃO G: SEGURANÇA, SUSTENTABILIDADE & PROJETOS ESPECIAIS (Double-Sided Minimal) */}
        <section ref={sectionSafetyRef} className="relative z-30 w-full bg-[#fcfbf7] pb-40 px-8 md:px-24 border-t border-black/5 pt-32">
          <div className="max-w-7xl mx-auto flex justify-center mb-16 select-none pointer-events-none">
            <div className="flex items-center space-x-3 text-[9px] font-mono tracking-[0.3em] text-black/35">
              <span>( 06 // 06 )</span>
              <span className="w-8 h-[1px] bg-black/10"></span>
              <span className="font-sans text-[8px] opacity-75">COMPLIANCE & ECOLOGY</span>
            </div>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Bloco 1: Segurança e Preparação */}
            <div className="space-y-6 border-b border-black/5 lg:border-b-0 lg:border-r border-black/5 pb-16 lg:pb-0 lg:pr-16">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c5a880]">SAFETY COMPLIANCE</span>
              <h3 className="font-serif text-2xl uppercase font-light tracking-tight text-[#111]">
                Extraordinary Preparation <span className="font-serif italic font-normal text-black/50">for Sublime Journeys</span>
              </h3>
              <p className="text-[13px] text-black/65 leading-[1.8] font-light">
                We manage our fleet with meticulous technical rigor. Decades of combined high-altitude balloon engineering, 
                supplemental oxygen, advanced military-grade weather terminals, and Europe-certified structural rigs 
                ensure that absolute peace of mind is guaranteed before take-off.
              </p>
              <div>
                <a href="#contato" className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-1 hover:text-[#c5a880] hover:border-[#c5a880] transition-colors duration-500">
                  Learn About Safety
                </a>
              </div>
            </div>

            {/* Bloco 2: Sustentabilidade e Projetos Especiais */}
            <div className="space-y-6">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c5a880]">PRESERVATION & SPECIALS</span>
              <h3 className="font-serif text-2xl uppercase font-light tracking-tight text-[#111]">
                Protecting What Makes <span className="font-serif italic font-normal text-black/50">This Place Extraordinary</span>
              </h3>
              <p className="text-[13px] text-black/65 leading-[1.8] font-light">
                Our flights strictly respect local ecology. We leave zero environmental trace and continuously fund 
                sustainable initiatives within the local communities of Salar de Uyuni. Additionally, we support remote 
                cinematic operations, documentaries, and luxury media campaigns under bespoke arrangements.
              </p>
              <div>
                <a href="#contato" className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-black border-b border-black pb-1 hover:text-[#c5a880] hover:border-[#c5a880] transition-colors duration-500">
                  Explore Special Projects
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* SEÇÃO FINAL: CTA EDITORIAL */}
        <section id="contato" className="relative z-30 w-full bg-[#fcfbf7] pb-40 border-t border-black/5 pt-32 text-center">
          <div className="max-w-4xl mx-auto space-y-12 px-6">
            
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-black/40">SECURE YOUR SEAT</span>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[#111] uppercase font-light tracking-tight">
              Ready to Experience <span className="font-serif italic font-normal text-black/50">Salar de Uyuni</span><br />Like Never Before?
            </h2>
            
            <p className="text-[13px] md:text-sm text-black/65 max-w-xl mx-auto leading-relaxed font-light">
              Get in touch with our private concierges to reserve your desired flight dates or to style a bespoke romantic celebration.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <button className="px-10 py-4 bg-black text-white border border-black rounded-full text-[10px] font-semibold tracking-[0.25em] uppercase hover:bg-transparent hover:text-black transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) w-full sm:w-auto shadow-sm">
                Book Your Flight
              </button>
              <button className="px-10 py-4 border border-black/10 text-black rounded-full text-[10px] font-semibold tracking-[0.25em] uppercase hover:bg-black hover:text-white hover:border-black transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) w-full sm:w-auto">
                Contact Our Team
              </button>
            </div>

          </div>
        </section>

        {/* FOOTER ULTRA-MINIMALISTA */}
        <footer className="relative z-30 w-full bg-[#fcfbf7] border-t border-black/5 py-16 px-8 md:px-24 text-black/40">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs space-y-6 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="font-semibold tracking-widest text-black">UYUNI AIR</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
            <div className="flex space-x-8">
              <a href="#experience" className="hover:text-[#c5a880] transition-colors duration-500">Sartorial Flight</a>
              <a href="#safety" className="hover:text-[#c5a880] transition-colors duration-500">Safety Standard</a>
              <a href="#contact" className="hover:text-[#c5a880] transition-colors duration-500">Privacy Policy</a>
            </div>
            <div className="text-[9px] tracking-widest uppercase font-medium">
              Sartorial Luxury in the Sky
            </div>
          </div>
        </footer>
          </>
        ) : (
          <div className="relative z-20 w-full bg-[#f8f9fa]/75 backdrop-blur-md">
            {/* SUBPAGE HEADER */}
            <header className="fixed top-0 left-0 w-full px-5 py-4 xs:p-6 md:p-8 flex justify-between items-center z-50 bg-[#f8f9fa]/85 backdrop-blur-md border-b border-black/5 text-black">
              <div className="cursor-pointer" onClick={() => { window.location.hash = '#home'; setIsMobileMenuOpen(false); }}>
                <img src="/Negative Salar Balloons Arc.png" alt="Salar Balloons Logo" className="h-14 sm:h-20 md:h-28 w-auto object-contain filter brightness-0" />
              </div>
              <nav className="hidden md:flex space-x-8 text-[10px] font-bold tracking-[0.2em] uppercase">
                <a href="#home" className="hover:text-black transition-colors">Home</a>
                <a href="#experience" className="hover:text-black transition-colors">Experience</a>
                <a href="#about" className="hover:text-black transition-colors">About Us</a>
                <a href="#sustainability" className="hover:text-black transition-colors">Sustainability</a>
                <a href="#safety" className="hover:text-black transition-colors">Safety</a>
                <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
                <a href="#gallery" className="hover:text-black transition-colors">Gallery</a>
              </nav>
              <a href="#contact" className="hidden md:inline-block text-[10px] font-bold tracking-[0.2em] border border-black/20 px-6 py-2 rounded-full cursor-pointer hover:bg-black hover:text-white transition-colors uppercase">
                Book
              </a>

              {/* Hamburger Button for Mobile Subpages */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 relative"
                aria-label="Toggle Menu"
              >
                <span className={`w-6 h-[1.5px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'transform rotate-45 translate-y-[7.5px]' : ''}`} />
                <span className={`w-6 h-[1.5px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-6 h-[1.5px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-[7.5px]' : ''}`} />
              </button>
            </header>

            {currentPage === 'about' && <AboutUs />}
            {currentPage === 'experience' && <Experience />}
            {currentPage === 'luxury-flight' && <LuxuryFlight />}
            {currentPage === 'exclusive-flight' && <ExclusiveFlight />}
            {currentPage === 'special-locations' && <SpecialLocations />}
            {currentPage === 'sustainability' && <Sustainability />}
            {currentPage === 'safety' && <Safety />}
            {currentPage === 'faq' && <FAQ />}
            {currentPage === 'gallery' && <Gallery />}
            {currentPage === 'contact' && <Contact />}

            {/* Shared Subpage Footer */}
            <footer className="relative z-30 w-full bg-[#f8f9fa]/75 backdrop-blur-md border-t border-black/10 py-16 px-8 md:px-24 text-black/40">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs space-y-6 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <span className="font-bold tracking-widest text-black cursor-pointer" onClick={() => window.location.hash = '#home'}>UYUNI AIR</span>
                  <span>© {new Date().getFullYear()}</span>
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                  <a href="#home" className="hover:text-black transition-colors">Home</a>
                  <a href="#experience" className="hover:text-black transition-colors">Experience</a>
                  <a href="#about" className="hover:text-black transition-colors">About Us</a>
                  <a href="#sustainability" className="hover:text-black transition-colors">Sustainability</a>
                  <a href="#safety" className="hover:text-black transition-colors">Safety</a>
                  <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
                  <a href="#gallery" className="hover:text-black transition-colors">Gallery</a>
                  <a href="#contact" className="hover:text-black transition-colors">Contact</a>
                </div>
                <div className="text-[10px] tracking-widest uppercase">
                  Sartorial Luxury in the Sky
                </div>
              </div>
            </footer>
          </div>
        )}

      </div>

      {/* Mobile Menu Drawer Overlay */}
      <div className={`fixed inset-0 w-full h-screen bg-[#fcfbf7]/98 backdrop-blur-xl text-black z-[100] flex flex-col justify-center items-center px-8 transition-all duration-500 ease-out md:hidden ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        {/* Close Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-black focus:outline-none w-10 h-10 flex items-center justify-center border border-black/10 rounded-full"
          aria-label="Close Menu"
        >
          ✕
        </button>
        
        <nav className="flex flex-col space-y-6 text-center text-[11px] font-bold tracking-[0.3em] uppercase">
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors duration-300">Home</a>
          <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors duration-300">Experience</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors duration-300">About Us</a>
          <a href="#sustainability" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors duration-300">Sustainability</a>
          <a href="#safety" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors duration-300">Safety</a>
          <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors duration-300">FAQ</a>
          <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c5a880] transition-colors duration-300">Gallery</a>
          
          <div className="pt-6">
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="inline-block text-[10px] font-bold tracking-[0.25em] border border-black px-12 py-3.5 rounded-full hover:bg-black hover:text-white transition-all duration-300 uppercase">
              RESERVAR
            </a>
          </div>
        </nav>
      </div>
      
      <style>{`
        @keyframes scroll-down {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}</style>

    </ReactLenis>
  );
}
