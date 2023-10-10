import {
    alturaImagem,
    carregarImagem,
    cenaVazia,
    espelhar,
    larguraImagem,
    texto,
  } from "../../../lib/image";

  import imgVacaInoUrl from "./assets/vaca-ino.png";
  import imgCCUrl from "./assets/chupacabra.png";
  
  export const [LARGURA, ALTURA] = [600, 400];
  
  export const TELA = cenaVazia(LARGURA, ALTURA);
  
  export const IMG_VACA_INO = carregarImagem(imgVacaInoUrl, 100, 70);
  export const IMG_VACA_VORTANO = espelhar(IMG_VACA_INO);
  export const IMG_CC_ESQ = carregarImagem(imgCCUrl, 95, 100);
  export const IMG_CC_DIR = espelhar(IMG_CC_ESQ);
  
  export const LARGURA_IMG_VACA = larguraImagem(IMG_VACA_INO);
  export const ALTURA_IMG_VACA = alturaImagem(IMG_VACA_INO);
  
  export const LARGURA_IMG_CC = larguraImagem(IMG_CC_ESQ);
  export const ALTURA_IMG_CC = alturaImagem(IMG_CC_ESQ);
  
  export const Y_INICIAL_VACA = ALTURA / 2;
  
  export const RAIO_COLISAO_VACA = (LARGURA_IMG_VACA + ALTURA_IMG_VACA) / 2 / 3;
  export const RAIO_COLISAO_CC = (LARGURA_IMG_CC + ALTURA_IMG_CC) / 2 / 3;
  
  export const LIMITE_ESQUERDA_VACA = 0 + LARGURA_IMG_VACA / 2;
  export const LIMITE_DIREITA_VACA = LARGURA - LARGURA_IMG_VACA / 2;
  export const LIMITE_BAIXO_VACA = ALTURA - ALTURA_IMG_VACA / 2;
  export const LIMITE_CIMA_VACA = 0 + ALTURA_IMG_VACA / 2;
  
  export const LIMITE_ESQUERDA_CC = 0 + LARGURA_IMG_CC / 2;
  export const LIMITE_DIREITA_CC = LARGURA - LARGURA_IMG_CC / 2;
  export const LIMITE_BAIXO_CC = ALTURA - ALTURA_IMG_CC / 2;
  export const LIMITE_CIMA_CC = 0 + ALTURA_IMG_CC / 2;
  
  export const DX_PADRAO = 4;
  export const DX_CC = 0;
  
  export const TEXTO_GAME_OVER = texto("GAME OVER", "arial", "50px", "red");
  
  export const FPS = 60;