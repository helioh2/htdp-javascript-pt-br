import { Imagem, colocarImagem, folhaTransparente } from "../../../lib/image";
import { testes } from "../../../lib/utils";
import {
  ALTURA,
  IMG_CC_DIR,
  IMG_CC_ESQ,
  LARGURA,
  LIMITE_BAIXO_CC,
  LIMITE_CIMA_CC,
} from "./constantes";

export interface Chupacabra {
  x: number;
  y: number;
  dy: number;
}
export function makeChupacabra(x: number, y: number, dy: number): Chupacabra {
  return { x, y, dy };
}
/**
 * Como criar objeto: makeChupacabra(Int, Int, Int) ou {x: Int, y: Int, dy: Int}
 * interp. representa a posicao x e y de um cc, e o deslocamento
 * a cada tick no eixo y, chamado de dy
 */

// EXEMPLOS:

export const CC_SEM_MAKE = {
  x: 100,
  y: 150,
  dy: 5,
};
export const CC_INICIAL = makeChupacabra(LARGURA / 2, LIMITE_CIMA_CC, 2);
export const CC_INICIAL_PROX = makeChupacabra(
  LARGURA / 2,
  LIMITE_CIMA_CC + 2,
  2
);
export const CC_INICIAL_PROX_PROX = makeChupacabra(
  LARGURA / 2,
  LIMITE_CIMA_CC + 2 + 2,
  2
);
export const CC_MEIO = makeChupacabra(LARGURA / 2, ALTURA / 2, 2);
export const CC_BAIXO = makeChupacabra(LARGURA / 2, LIMITE_BAIXO_CC + 1, 2);
export const CC_BAIXO_VIRANDO = makeChupacabra(
  LARGURA / 2,
  LIMITE_BAIXO_CC,
  -2
);
export const CC_BAIXO_VIRANDO_PROX = makeChupacabra(
  LARGURA / 2,
  LIMITE_BAIXO_CC - 2,
  -2
);
export const CC_CIMA = makeChupacabra(LARGURA / 2, LIMITE_CIMA_CC - 1, -2);
export const CC_CIMA_VIRANDO = CC_INICIAL;

export const CC_UM_QUARTO_BAIXO = makeChupacabra(
  LARGURA / 4,
  LIMITE_BAIXO_CC,
  -1
);
export const CC_UM_QUARTO_BAIXO_PROX = makeChupacabra(
  LARGURA / 4,
  LIMITE_BAIXO_CC - 1,
  -1
);
export const CC_TRES_QUARTOS_MEIO = makeChupacabra(
  (LARGURA * 3) / 4,
  ALTURA / 2,
  4
);
export const CC_TRES_QUARTOS_MEIO_PROX = makeChupacabra(
  (LARGURA * 3) / 4,
  ALTURA / 2 + 4,
  4
);

// FUNÇÕES

/**
 * moveChupacabra: Chupacabra -> Chupacabra
 * Realiza o movimento do chupacabra
 */
export function moveChupacabra(cc: Chupacabra): Chupacabra {
  if (cc.y > LIMITE_BAIXO_CC) {
    return { ...cc, y: LIMITE_BAIXO_CC, dy: -cc.dy };
  }
  if (cc.y < LIMITE_CIMA_CC) {
    return { ...cc, y: LIMITE_CIMA_CC, dy: -cc.dy };
  }
  return { ...cc, y: cc.y + cc.dy };
}
testes(() => {
  describe("testes de moveChupacabra", () => {
    test("move cc inicial", () => {
      expect(moveChupacabra(CC_INICIAL)).toStrictEqual(CC_INICIAL_PROX);
    });
    test("move cc inicial prox", () => {
      expect(moveChupacabra(CC_INICIAL_PROX)).toStrictEqual(
        CC_INICIAL_PROX_PROX
      );
    });
    test("move cc limite baixo", () => {
      expect(moveChupacabra(CC_BAIXO)).toStrictEqual(CC_BAIXO_VIRANDO);
    });
    test("move cc limite baixo virado andando pra cima", () => {
      expect(moveChupacabra(CC_BAIXO_VIRANDO)).toStrictEqual(
        CC_BAIXO_VIRANDO_PROX
      );
    });
    test("move cc limite cima", () => {
      expect(moveChupacabra(CC_CIMA)).toStrictEqual(CC_CIMA_VIRANDO);
    });
  });
});

export function desenhaChupacabrasRec(
  ccs: Chupacabra[],
  xVaca: number
): Imagem {
  if (ccs.length === 0) {
    // CASO BASE
    return folhaTransparente(LARGURA, ALTURA);
  }

  // else
  let primeiroCc = ccs[0];
  return colocarImagem(
    // desenha a imagem do primeiro
    primeiroCc.x >= xVaca ? IMG_CC_ESQ : IMG_CC_DIR,
    primeiroCc.x,
    primeiroCc.y,
    desenhaChupacabrasRec(ccs.slice(1), xVaca)
  ); // desenha o resto
}

export function desenhaChupacabras(ccs: Chupacabra[], xVaca: number): Imagem {
  let imagem = folhaTransparente(LARGURA, ALTURA);

  for (let cc of ccs) {
    // for each
    imagem = colocarImagem(
      cc.x >= xVaca ? IMG_CC_ESQ : IMG_CC_DIR,
      cc.x,
      cc.y,
      imagem
    );
  }

  return imagem;
}
