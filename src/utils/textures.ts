import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

// =========================================
// 1. CHÃO: NORMAL MAP DO SALAR
// =========================================
export const generateSaltNormalMap = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = 'rgb(128, 128, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const noise2D = createNoise2D();
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Hexágonos orgânicos do deserto
    const drawHexagon = (x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const angle = (Math.PI / 3) * i;
        const noiseX = noise2D(x * 0.02, y * 0.02) * 10;
        const noiseY = noise2D((x + 100) * 0.02, (y + 100) * 0.02) * 10;
        const px = x + r * Math.cos(angle) + noiseX;
        const py = y + r * Math.sin(angle) + noiseY;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    };

    const r = 80;
    const w = r * 2;
    const h = Math.sqrt(3) * r;
    
    for (let y = -h; y < canvas.height + h; y += h) {
      for (let x = -w; x < canvas.width + w; x += w * 1.5) {
        ctx.strokeStyle = `rgb(${128 + Math.random() * 20 - 10}, ${128 + Math.random() * 20 - 10}, 255)`;
        drawHexagon(x, y, r);
        ctx.strokeStyle = `rgb(${128 + Math.random() * 20 - 10}, ${128 + Math.random() * 20 - 10}, 255)`;
        drawHexagon(x + r * 1.5, y + h / 2, r);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  return texture;
};

// =========================================
// 2. BALÃO: COR (ALBEDO) FOTOREALISTA
// =========================================
export const generateBalloonAlbedoMap = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 4096; // 4K para nitidez absoluta
  canvas.height = 4096;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Cores reais dessaturadas fotográficamente (exatas do balão real)
    const colors = [
      '#eecbd2', // Rosa Pastel (Rose)
      '#fbfaf5', // Off-white / Cream
      '#b4d5e8', // Azul Céu Pastel
      '#fbfaf5', // Off-white / Cream
      '#b6dac3', // Verde Menta Pastel
      '#fbfaf5', // Off-white / Cream
      '#eedaa6', // Amarelo Pastel
      '#fbfaf5', // Off-white / Cream
    ];
    
    const numStripes = 24;
    const stripeWidth = canvas.width / numStripes;

    // Fundo base cru (tecido natural)
    ctx.fillStyle = '#f6f6f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ondas senoidais de cores onduladas (1.5 ciclos, 220px amplitude)
    for (let i = 0; i < numStripes; i++) {
      ctx.fillStyle = colors[i % colors.length];
      ctx.beginPath();
      
      for (let y = 0; y <= canvas.height; y += 20) {
        // Ondulação suave natural
        const sway = Math.sin((y / canvas.height) * Math.PI * 1.5) * 220; 
        const x = (i * stripeWidth) + sway;
        if (y === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      for (let y = canvas.height; y >= 0; y -= 20) {
        const sway = Math.sin((y / canvas.height) * Math.PI * 1.5) * 220;
        const x = ((i + 1) * stripeWidth) + sway;
        ctx.lineTo(x, y);
      }
      
      ctx.closePath();
      ctx.fill();
    }

    // Costuras Verticais Reais (Straight Load-Tapes)
    ctx.strokeStyle = 'rgba(20, 20, 20, 0.35)'; // Costuras mais escuras para contraste 3D
    ctx.lineWidth = 6;
    for (let i = 0; i < numStripes; i++) {
      ctx.beginPath();
      ctx.moveTo(i * stripeWidth, 0);
      ctx.lineTo(i * stripeWidth, canvas.height);
      ctx.stroke();
    }

    // 1. Registro Real "PS-UYU"
    ctx.save();
    ctx.fillStyle = '#111111';
    ctx.font = 'bold 100px "Plus Jakarta Sans", "Helvetica Neue", sans-serif';
    ctx.translate(17.5 * stripeWidth, canvas.height * 0.22);
    ctx.rotate(0.04);
    ctx.fillText('PS-UYU', 0, 0);
    ctx.restore();

    // 2. Logotipo Equator: SALAR BALLOONS
    ctx.save();
    ctx.fillStyle = '#111111';
    ctx.font = '800 130px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '15px';
    const logoPositions = [
      6 * stripeWidth,   // Lateral Esquerda
      12.5 * stripeWidth, // Frontal
      18 * stripeWidth   // Lateral Direita
    ];
    logoPositions.forEach((pos) => {
      ctx.fillText('SALAR BALLOONS', pos, canvas.height * 0.45);
    });
    ctx.restore();
    
    // 3. Assinatura Real "Magic happens" na base (em 3 lados para visualização 360)
    ctx.save();
    ctx.fillStyle = '#111111';
    ctx.font = 'italic 85px "Caveat", "Brush Script MT", "Playfair Display", "Times New Roman", serif, cursive';
    ctx.textAlign = 'center';
    
    const sigPositions = [
      6 * stripeWidth,   
      12.5 * stripeWidth, 
      18 * stripeWidth   
    ];
    
    sigPositions.forEach((pos) => {
      ctx.fillText('Magic happens', pos, canvas.height * 0.78);
    });
    ctx.restore();

    // 4. Saia Preta Pura Real
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, canvas.height * 0.85, canvas.width, canvas.height * 0.15);
    
    // Adiciona sujeira sutil na base da saia para realismo extra
    const gradient = ctx.createLinearGradient(0, canvas.height * 0.95, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(40,35,30,0.6)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, canvas.height * 0.95, canvas.width, canvas.height * 0.05);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16; // Máxima nitidez
  return texture;
};

// =========================================
// 3. BALÃO: BUMP MAP FOTOREALISTA (Ripstop + Gomos)
// =========================================
export const generateBalloonBumpMap = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 4096; // Resolução massiva para a trama do tecido
  canvas.height = 4096;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 1. Trama de Nylon Ripstop (Grid minúsculo cruzado)
    // Isso cria a textura microscópica que quebra o brilho plástico
    ctx.strokeStyle = 'rgba(110, 110, 110, 0.4)';
    ctx.lineWidth = 1;
    const gridSpacing = 8; // Micro-quadrados
    
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x += gridSpacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();

    // 2. Painéis horizontais principais (Costuras do tecido)
    ctx.strokeStyle = '#404040'; // Sulco profundo
    ctx.lineWidth = 4;
    const numHorizontalPanels = 50;
    const panelHeight = canvas.height / numHorizontalPanels;
    
    for(let i = 0; i < numHorizontalPanels; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * panelHeight);
      ctx.lineTo(canvas.width, i * panelHeight);
      ctx.stroke();
      
      // Degradê cilíndrico para o estufamento do tecido (bump local)
      const gradient = ctx.createLinearGradient(0, i * panelHeight, 0, (i+1) * panelHeight);
      gradient.addColorStop(0, 'rgba(128,128,128,0)');
      gradient.addColorStop(0.5, 'rgba(160,160,160,0.4)'); // Ponto mais alto do tecido inflado
      gradient.addColorStop(1, 'rgba(128,128,128,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, i * panelHeight, canvas.width, panelHeight);
    }
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 16;
  return texture;
};

// =========================================
// 4. CESTA: MAPA DE NORMAS DE VIME (Wicker)
// =========================================
export const generateWickerNormalMap = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Cor neutra de Normal Map (flat blue)
    ctx.fillStyle = 'rgb(128, 128, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const spacing = 16;
    
    // Desenha relevos de trançado cruzado de vime
    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        const isHorizontal = ((x / spacing) + (y / spacing)) % 2 === 0;
        
        if (isHorizontal) {
          // Trançado Horizontal: Gradiente de vetor normal no eixo R (esquerda-direita)
          const grad = ctx.createLinearGradient(x, y, x + spacing, y);
          grad.addColorStop(0, 'rgb(80, 128, 255)');
          grad.addColorStop(0.5, 'rgb(128, 128, 255)');
          grad.addColorStop(1, 'rgb(176, 128, 255)');
          ctx.fillStyle = grad;
          ctx.fillRect(x, y + 1, spacing, spacing - 2);
        } else {
          // Trançado Vertical: Gradiente de vetor normal no eixo G (cima-baixo)
          const grad = ctx.createLinearGradient(x, y, x, y + spacing);
          grad.addColorStop(0, 'rgb(128, 80, 255)');
          grad.addColorStop(0.5, 'rgb(128, 128, 255)');
          grad.addColorStop(1, 'rgb(128, 176, 255)');
          ctx.fillStyle = grad;
          ctx.fillRect(x + 1, y, spacing - 2, spacing);
        }
      }
    }
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 4);
  return texture;
};