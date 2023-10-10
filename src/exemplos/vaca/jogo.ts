import {
  Imagem,
  colocarImagem,
  texto,
} from "../../../lib/image";
import { testes } from "../../../lib/utils";
import {
  CC_INICIAL,
  CC_INICIAL_PROX,
  CC_MEIO,
  CC_TRES_QUARTOS_MEIO,
  CC_TRES_QUARTOS_MEIO_PROX,
  CC_UM_QUARTO_BAIXO,
  CC_UM_QUARTO_BAIXO_PROX,
  Chupacabra,
  desenhaChupacabras,
  makeChupacabra,
  moveChupacabra,
} from "./chupacabra";
import {
  ALTURA,
  DX_PADRAO,
  FPS,
  LARGURA,
  RAIO_COLISAO_CC,
  RAIO_COLISAO_VACA,
  TELA,
  TEXTO_GAME_OVER,
  Y_INICIAL_VACA,
} from "./constantes";
import { distancia } from "./utils";
import {
  VACA_INICIAL,
  VACA_INICIAL_ANDANDO,
  VACA_MEIO,
  Vaca,
  desenhaVaca,
  makeVaca,
  moveVaca,
  trataTeclaVaca,
} from "./vaca";

// DEFINIÇÃO DE DADOS

export interface Jogo {
  vaca: Vaca;
  ccs: Chupacabra[];
  pontuacao: number;
  gameOver: boolean;
  cont: number;
}
export function makeJogo(
  vaca: Vaca,
  ccs: Chupacabra[],
  pontuacao: number,
  gameOver: boolean,
  cont: number
) {
  return { vaca, ccs, pontuacao, gameOver, cont };
}
/**
 * Cria-se um jogo usando: makeJogo(Vaca, Chupacabra, number, boolean)
 * ou {vaca: Vaca, cc: Chupacabra, pontuacao: number, gameOver: boolean}
 * interp. representa o jogo contendo uma vaca, um cc, pontuacao
 * e flag de game over
 */

// EXEMPLOS

export const JOGO_INICIAL = makeJogo(VACA_INICIAL, [CC_INICIAL], 0, false, 1);
export const JOGO_INICIAL_PROX = makeJogo(
  VACA_INICIAL,
  [CC_INICIAL_PROX],
  0,
  false,
  2
);
export const JOGO_INICIAL_ANDANDO = makeJogo(
  VACA_INICIAL_ANDANDO,
  [CC_INICIAL],
  0,
  false,
  1
);
export const JOGO_COLIDINDO = makeJogo(VACA_MEIO, [CC_MEIO], 500, false, 50);
export const JOGO_GAME_OVER = makeJogo(VACA_MEIO, [CC_MEIO], 500, true, 51);
export const JOGO_GAME_OVER_PROX = JOGO_GAME_OVER;

export const JOGO_PASSANDO_UM_SEGUNDO = makeJogo(
  VACA_INICIAL,
  [CC_INICIAL],
  0,
  false,
  59
);
export const JOGO_PASSANDO_UM_SEGUNDO_PROX = makeJogo(
  VACA_INICIAL,
  [CC_INICIAL_PROX],
  1,
  false,
  0
);

export const VACA_COLIDINDO_DIAG1 = makeVaca(
  LARGURA / 2 - RAIO_COLISAO_VACA - RAIO_COLISAO_CC + DX_PADRAO,
  Y_INICIAL_VACA,
  DX_PADRAO,
  0
); // um pouco antes do meio, à esquerda
export const CC_COLIDINDO_DIAG1 = makeChupacabra(
  LARGURA / 2,
  ALTURA / 2 - RAIO_COLISAO_CC - RAIO_COLISAO_VACA + DX_PADRAO,
  DX_PADRAO
); // um pouco antes do meio, acima

export const JOGO_COLIDINDO_DIAG1 = makeJogo(
  VACA_COLIDINDO_DIAG1,
  [CC_COLIDINDO_DIAG1],
  100,
  false,
  50
);
export const JOGO_COLIDINDO_DIAG1_PROX = makeJogo(
  VACA_COLIDINDO_DIAG1,
  [CC_COLIDINDO_DIAG1],
  100,
  true,
  1
);

export const SCREENSHOT_COLIDINDO_DIAG1 = desenhaJogo(JOGO_COLIDINDO_DIAG1);

export const VACA_COLIDINDO_FRENTE = makeVaca(
  LARGURA / 2 - (RAIO_COLISAO_VACA + RAIO_COLISAO_CC) + DX_PADRAO,
  Y_INICIAL_VACA,
  DX_PADRAO,
  0
); // um pouco antes do meio, à esquerda
export const CC_COLIDINDO_FRENTE = makeChupacabra(
  LARGURA / 2 + RAIO_COLISAO_CC - DX_PADRAO,
  ALTURA / 2,
  DX_PADRAO
); // EXATAMENTE NO MEIO NO y

export const JOGO_COLIDINDO_FRENTE = makeJogo(
  VACA_COLIDINDO_FRENTE,
  [CC_COLIDINDO_FRENTE],
  100,
  false,
  50
);
export const JOGO_COLIDINDO_FRENTE_PROX = makeJogo(
  VACA_COLIDINDO_FRENTE,
  [CC_COLIDINDO_FRENTE],
  100,
  true,
  1
);

export const SCREENSHOT_COLIDINDO_FRENTE = desenhaJogo(JOGO_COLIDINDO_FRENTE);

export const VACA_COLIDINDO_ATRAS = makeVaca(
  LARGURA / 2 + RAIO_COLISAO_VACA + RAIO_COLISAO_CC - DX_PADRAO,
  Y_INICIAL_VACA,
  DX_PADRAO,
  0
); // um pouco antes do meio, à esquerda
export const CC_COLIDINDO_ATRAS = makeChupacabra(
  LARGURA / 2 - RAIO_COLISAO_CC + DX_PADRAO,
  ALTURA / 2,
  DX_PADRAO
); // EXATAMENTE NO MEIO NO y

export const JOGO_COLIDINDO_ATRAS = makeJogo(
  VACA_COLIDINDO_ATRAS,
  [CC_COLIDINDO_ATRAS],
  100,
  false,
  50
);
export const JOGO_COLIDINDO_ATRAS_PROX = makeJogo(
  VACA_COLIDINDO_ATRAS,
  [CC_COLIDINDO_ATRAS],
  100,
  true,
  1
);

export const SCREENSHOT_COLIDINDO_ATRAS = desenhaJogo(JOGO_COLIDINDO_ATRAS);

export const JOGO_3_CCS = makeJogo(
  VACA_INICIAL,
  [CC_UM_QUARTO_BAIXO, CC_INICIAL, CC_TRES_QUARTOS_MEIO],
  0,
  false,
  1
);
export const JOGO_3_CCS_PROX = makeJogo(
  VACA_INICIAL,
  [CC_UM_QUARTO_BAIXO_PROX, CC_INICIAL_PROX, CC_TRES_QUARTOS_MEIO_PROX],
  0,
  false,
  2
);

export const JOGO_3_CCS_COLIDINDO_SEGUNDO = makeJogo(
  VACA_COLIDINDO_FRENTE,
  [CC_UM_QUARTO_BAIXO, CC_COLIDINDO_FRENTE, CC_TRES_QUARTOS_MEIO],
  50,
  false,
  50
);
export const JOGO_3_CCS_COLIDINDO_SEGUNDO_PROX = makeJogo(
  VACA_COLIDINDO_FRENTE,
  [CC_UM_QUARTO_BAIXO, CC_COLIDINDO_FRENTE, CC_TRES_QUARTOS_MEIO],
  50,
  true,
  1
);

export const JOGO_3_CCS_COLIDINDO_TERCEIRO = makeJogo(
  VACA_COLIDINDO_FRENTE,
  [CC_UM_QUARTO_BAIXO, CC_TRES_QUARTOS_MEIO, CC_COLIDINDO_FRENTE],
  50,
  false,
  50
);
export const JOGO_3_CCS_COLIDINDO_TERCEIRO_PROX = makeJogo(
  VACA_COLIDINDO_FRENTE,
  [CC_UM_QUARTO_BAIXO, CC_TRES_QUARTOS_MEIO, CC_COLIDINDO_FRENTE],
  50,
  true,
  1
);

/// FUNCOES DE NEGÓCIO

/**
 * colidindo: Vaca, Chupacabra -> bool
 * Verifica se a vaca e o chupacabra se colidiram
 */
export function colidindo(vaca: Vaca, cc: Chupacabra): boolean {
  let distanciaVacaCc = distancia(vaca.x, vaca.y, cc.x, cc.y);
  return distanciaVacaCc < (RAIO_COLISAO_VACA + RAIO_COLISAO_CC) * 1.5;
}
testes(() => {
  describe("testes colidindo", () => {
    test("sem colisao", () => {
      expect(colidindo(VACA_INICIAL, CC_INICIAL)).toStrictEqual(false);
    });
    test("colisao diagonal 1", () => {
      expect(colidindo(VACA_COLIDINDO_DIAG1, CC_COLIDINDO_DIAG1)).toStrictEqual(
        true
      );
    });
    test("colisao de frente", () => {
      expect(
        colidindo(VACA_COLIDINDO_FRENTE, CC_COLIDINDO_FRENTE)
      ).toStrictEqual(true);
    });
    test("colisao de trás", () => {
      expect(colidindo(VACA_COLIDINDO_ATRAS, CC_COLIDINDO_ATRAS)).toStrictEqual(
        true
      );
    });
  });
});

/**
 * atualizaJogo: Jogo -> Jogo
 * Atualiza o jogo a cada tick.
 */
export function atualizaJogo(jogo: Jogo): Jogo {

  function colidindoComAlgum(vaca: Vaca, ccs: Chupacabra[]): boolean {
    return ccs.some((cc) => colidindo(vaca, cc));
  }

  function moveChupacabras(ccs: Chupacabra[]): Chupacabra[] {
    return ccs.map(moveChupacabra);
  }

  if (colidindoComAlgum(jogo.vaca, jogo.ccs)) {
    return { ...jogo, gameOver: true, cont: 1 };
  }

  let vacaMovida = moveVaca(jogo.vaca);
  let ccsMovidos = moveChupacabras(jogo.ccs);

  let novoCont = (jogo.cont + 1) % FPS;
  let novaPontuacao = novoCont === 0 ? jogo.pontuacao + 1 : jogo.pontuacao;

  return {
    ...jogo,
    vaca: vacaMovida,
    ccs: ccsMovidos,
    pontuacao: novaPontuacao,
    cont: novoCont,
  };
}
testes(() => {
  describe("Testes do atualizaJogo", () => {
    test("Jogo tranquilo, sem colisao", () => {
      expect(atualizaJogo(JOGO_INICIAL)).toStrictEqual(JOGO_INICIAL_PROX);
    });
    test("Jogo com colisao diagonal", () => {
      expect(atualizaJogo(JOGO_COLIDINDO_DIAG1)).toStrictEqual(
        JOGO_COLIDINDO_DIAG1_PROX
      );
    });
    test("Jogo com colisao frente", () => {
      expect(atualizaJogo(JOGO_COLIDINDO_FRENTE)).toStrictEqual(
        JOGO_COLIDINDO_FRENTE_PROX
      );
    });
    test("Jogo com colisao atrás", () => {
      expect(atualizaJogo(JOGO_COLIDINDO_ATRAS)).toStrictEqual(
        JOGO_COLIDINDO_ATRAS_PROX
      );
    });
    test("Jogo com varios chupacabras", () => {
      expect(atualizaJogo(JOGO_3_CCS)).toStrictEqual(JOGO_3_CCS_PROX);
    });
    test("Jogo com varios chupacabras colidindo com o segundo da lista", () => {
      expect(atualizaJogo(JOGO_3_CCS_COLIDINDO_SEGUNDO)).toStrictEqual(
        JOGO_3_CCS_COLIDINDO_SEGUNDO_PROX
      );
    });
    test("Jogo com varios chupacabras colidindo com o terceiro da lista", () => {
      expect(atualizaJogo(JOGO_3_CCS_COLIDINDO_TERCEIRO)).toStrictEqual(
        JOGO_3_CCS_COLIDINDO_TERCEIRO_PROX
      );
    });
  });
});

/**
 * trataTeclaJogo: Jogo, String -> Jogo
 * Trata os eventos de tecla.
 */
export function trataTeclaJogo(jogo: Jogo, tecla: string): Jogo {
  if (tecla === "r" && jogo.gameOver) {
    return JOGO_3_CCS;
  }
  let vacaAtualizada = trataTeclaVaca(jogo.vaca, tecla);
  return { ...jogo, vaca: vacaAtualizada };
}
testes(() => {
  describe("Testes trata tecla", () => {
    test("Quando tecla restart e game over", () => {
      expect(trataTeclaJogo(JOGO_GAME_OVER, "r")).toStrictEqual(JOGO_3_CCS);
    });
    test("Quando tecla restart sem game over", () => {
      expect(trataTeclaJogo(JOGO_INICIAL_PROX, "r")).toStrictEqual(
        JOGO_INICIAL_PROX
      );
    });
    test("Quando outra tecla e game over", () => {
      expect(trataTeclaJogo(JOGO_GAME_OVER, "a")).toStrictEqual(JOGO_GAME_OVER);
    });
  });
});

/**
 * trataTeclaSoltaJogo: Jogo, String -> Jogo
 * Trata evento de soltar tecla do jogo.
 */
export function trataTeclaSoltaJogo(jogo: Jogo, tecla: string): Jogo {
  if (["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(tecla)) {
    return { ...jogo, vaca: { ...jogo.vaca, dx: 0, dy: 0 } };
  }
  return jogo;
}
testes(() => {
  describe("Testes trata tecla solta", () => {
    test("Quando solta tecla direita", () => {
      expect(
        trataTeclaSoltaJogo(JOGO_INICIAL_ANDANDO, "ArrowRight")
      ).toStrictEqual(JOGO_INICIAL);
    });
    test("Quando solta qualquer outra tecla", () => {
      expect(trataTeclaSoltaJogo(JOGO_INICIAL_ANDANDO, "a")).toStrictEqual(
        JOGO_INICIAL_ANDANDO
      );
    });
  });
});


// LÓGICA DE APRESENTAÇÃO

/**
 * desenhaJogo: Jogo -> Imagem
 * Desenha o jogo.
 */
export function desenhaJogo(jogo: Jogo): Imagem {
    if (jogo.gameOver) {
      return colocarImagem(
        texto(jogo.pontuacao.toString(), "Arial", "50px", "blue"),
        LARGURA / 2 - 30,
        ALTURA / 2 + 50,
        colocarImagem(TEXTO_GAME_OVER, LARGURA / 4, ALTURA / 2, TELA)
      );
    }
    // else
    return colocarImagem(
      texto(jogo.pontuacao.toString(), "Arial", "20px"),
      LARGURA - 50,
      0 + 50,
      colocarImagem(
        desenhaChupacabras(jogo.ccs, jogo.vaca.x),
        LARGURA / 2,
        ALTURA / 2,
        desenhaVaca(jogo.vaca)
      )
    );
  }
  