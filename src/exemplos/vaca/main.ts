import { reactor } from "../../../lib/universe";
import {
  JOGO_3_CCS,
  atualizaJogo,
  desenhaJogo,
  trataTeclaJogo,
  trataTeclaSoltaJogo,
} from "./jogo";

function main(): void {
  reactor(
    JOGO_3_CCS, // Jogo
    {
      aCadaTick: atualizaJogo, // Jogo -> Jogo
      desenhar: desenhaJogo, // Jogo -> Imagem
      quandoTecla: trataTeclaJogo, // Jogo, String -> Jogo
      quandoSoltaTecla: trataTeclaSoltaJogo, // Jogo, String -> Jogo
      modoDebug: true,
    }
  );
}

main(); // LEMBRAR: ALTERAR PATH DO SCRIPT NO index.html
// SCREENSHOT_COLIDINDO_ATRAS.desenha();
// SCREENSHOT_COLIDINDO_ATRAS.desenha();
// TEXTO_GAME_OVER.desenha();

// colocarImagem(IMG_CC_ESQ, 100, 100, TELA).desenha();
// IMG_CC_ESQ.desenha();
