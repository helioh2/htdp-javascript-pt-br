import { Imagem, colocarImagem } from "../../../lib/image";
import { testes } from "../../../lib/utils";
import {
    ALTURA,
  DX_PADRAO,
  IMG_VACA_INO,
  IMG_VACA_VORTANO,
  LARGURA,
  LIMITE_BAIXO_VACA,
  LIMITE_CIMA_VACA,
  LIMITE_DIREITA_VACA,
  LIMITE_ESQUERDA_VACA,
  TELA,
  Y_INICIAL_VACA,
} from "./constantes";

export interface Vaca {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export function makeVaca(x: number, y: number, dx: number, dy: number): Vaca {
  return { x, y, dx, dy };
}
/**
 * Como criar objeto: makeVaca(Int, Int, Int, Int) ou {x: Int, y: Int, dx: Int, dy: Int}
 * interp. representa a posicao x e y da vaca, e o deslocamento
 * a cada tick no eixo x e y, chamados de dx e dy
 */

// EXEMPLOS:
export const VACA_INICIAL = makeVaca(
  LIMITE_ESQUERDA_VACA,
  Y_INICIAL_VACA,
  0,
  0
);
export const VACA_INICIAL_ANDANDO = makeVaca(
  LIMITE_ESQUERDA_VACA,
  Y_INICIAL_VACA,
  DX_PADRAO,
  0
);
export const VACA_INICIAL_ANDANDO_PROX = makeVaca(
  LIMITE_ESQUERDA_VACA + DX_PADRAO,
  Y_INICIAL_VACA,
  DX_PADRAO,
  0
);
export const VACA0 = makeVaca(LIMITE_ESQUERDA_VACA, Y_INICIAL_VACA, 3, 4);
export const VACA1 = makeVaca(
  LIMITE_ESQUERDA_VACA + 3,
  Y_INICIAL_VACA + 4,
  3,
  4
);
export const VACA_MEIO = {
  x: LARGURA / 2,
  y: Y_INICIAL_VACA,
  dx: DX_PADRAO,
  dy: 0,
};
export const VACA_FIM = makeVaca(
  LIMITE_DIREITA_VACA + 1,
  LIMITE_BAIXO_VACA,
  DX_PADRAO,
  0
);
export const VACA_VIRANDO = makeVaca(
  LIMITE_DIREITA_VACA,
  LIMITE_BAIXO_VACA,
  -DX_PADRAO,
  0
);
export const VACA_VORTANO = makeVaca(
  LARGURA / 2,
  LIMITE_BAIXO_VACA,
  -DX_PADRAO,
  0
);

// FUNÇÕES

/**
 * Vaca -> Vaca
 * Move a vaca nos eixos dx e dy
 * @param vaca: Vaca
 * @returns Vaca
 */
export function moveVaca(vaca: Vaca): Vaca {
  if (vaca.x > LIMITE_DIREITA_VACA) {
    return { ...vaca, x: LIMITE_DIREITA_VACA, dx: -vaca.dx };
  }
  if (vaca.x < LIMITE_ESQUERDA_VACA) {
    return { ...vaca, x: LIMITE_ESQUERDA_VACA, dx: -vaca.dx };
  }
  if (vaca.y > LIMITE_BAIXO_VACA) {
    return { ...vaca, y: LIMITE_BAIXO_VACA, dy: -vaca.dy };
  }
  if (vaca.y < LIMITE_CIMA_VACA) {
    return { ...vaca, y: LIMITE_CIMA_VACA, dy: -vaca.dy };
  }
  return { ...vaca, x: vaca.x + vaca.dx, y: vaca.y + vaca.dy };
}
testes(() => {
  describe("testes de moveVaca", () => {
    test("move vaca inicial", () => {
      expect(moveVaca(VACA0)).toStrictEqual(VACA1);
    });
    test("move vaca limite direito", () => {
      expect(moveVaca(VACA_FIM)).toStrictEqual(VACA_VIRANDO);
    });
    test("move vaca limite esquerdo", () => {
      expect(
        moveVaca(makeVaca(LIMITE_ESQUERDA_VACA - 1, ALTURA / 2, -DX_PADRAO, 0))
      ).toStrictEqual(makeVaca(LIMITE_ESQUERDA_VACA, ALTURA / 2, DX_PADRAO, 0));
    });
    test("move vaca limite baixo", () => {
      expect(
        moveVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA + 1, 0, DX_PADRAO))
      ).toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -DX_PADRAO));
    });
    test("move vaca limite cima", () => {
      expect(
        moveVaca(makeVaca(LARGURA / 2, LIMITE_CIMA_VACA - 1, 0, -DX_PADRAO))
      ).toStrictEqual(makeVaca(LARGURA / 2, LIMITE_CIMA_VACA, 0, DX_PADRAO));
    });
  });
});

/**
 * Vaca, String -> Vaca
 * Altera direção de movimento da vaca dependendo da tecla pressionada
 * @param vaca: Vaca
 * @param tecla: string
 * @returns Vaca
 */
export function trataTeclaVaca(vaca: Vaca, tecla: string): Vaca {
  if (tecla === "ArrowRight") {
    return { ...vaca, dx: DX_PADRAO, dy: 0 };
  }
  if (tecla === "ArrowLeft") {
    return { ...vaca, dx: -DX_PADRAO, dy: 0 };
  }
  if (tecla === "ArrowDown") {
    return { ...vaca, dx: 0, dy: DX_PADRAO };
  }
  if (tecla === "ArrowUp") {
    return { ...vaca, dx: 0, dy: -DX_PADRAO };
  }
  return vaca;
}
testes(() => {
  describe("testes de trataTeclaVaca", () => {
    test("trata tecla flecha direita quando na horizontal", () => {
      expect(
        trataTeclaVaca(
          makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, -DX_PADRAO, 0),
          "ArrowRight"
        )
      ).toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, DX_PADRAO, 0));
    });
    test("trata tecla flecha direita quando na vertical", () => {
      expect(
        trataTeclaVaca(
          makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, DX_PADRAO),
          "ArrowRight"
        )
      ).toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, DX_PADRAO, 0));
    });
    test("trata tecla flecha esquerda", () => {
      expect(
        trataTeclaVaca(
          makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, DX_PADRAO, 0),
          "ArrowLeft"
        )
      ).toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, -DX_PADRAO, 0));
    });
    test("trata tecla flecha direita quando na vertical", () => {
      expect(
        trataTeclaVaca(
          makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, DX_PADRAO),
          "ArrowLeft"
        )
      ).toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, -DX_PADRAO, 0));
    });
    test("trata tecla flecha baixo", () => {
      expect(
        trataTeclaVaca(
          makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -DX_PADRAO),
          "ArrowDown"
        )
      ).toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, DX_PADRAO));
    });
    test("trata tecla flecha baixo quando na horizontal", () => {
      expect(
        trataTeclaVaca(
          makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, DX_PADRAO, 0),
          "ArrowDown"
        )
      ).toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, DX_PADRAO));
    });
    test("trata tecla flecha cima", () => {
      expect(
        trataTeclaVaca(
          makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, DX_PADRAO),
          "ArrowUp"
        )
      ).toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -DX_PADRAO));
    });
    test("trata tecla flecha cima quando na horizontal", () => {
      expect(
        trataTeclaVaca(
          makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, DX_PADRAO, 0),
          "ArrowUp"
        )
      ).toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -DX_PADRAO));
    });
    test("trata tecla outra tecla", () => {
      expect(
        trataTeclaVaca(
          makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -DX_PADRAO),
          "a"
        )
      ).toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -DX_PADRAO));
    });
  });
});


/**
 * Desenha a vaca na tela na posiçao vaca.x, vaca.y.
 * @param vaca: Vaca
 * @returns Imagem
 */
export function desenhaVaca(vaca: Vaca): Imagem {
  return colocarImagem(
    vaca.dx < 0 ? IMG_VACA_VORTANO : IMG_VACA_INO,
    vaca.x,
    vaca.y,
    TELA
  );
}
testes(() => {
  describe("testes de desenhaVaca", () => {
    test("desenha vaca inicial", () => {
      expect(desenhaVaca(VACA0)).toStrictEqual(
        colocarImagem(IMG_VACA_INO, VACA0.x, VACA0.y, TELA)
      );
    });
  });
});
