import { Imagem, alturaImagem, carregarImagem, cenaVazia, colocarImagem, espelhar, larguraImagem, redimensionar } from "../../../lib/image"
import { reactor } from "../../../lib/universe";
import { testes } from "../../../lib/utils";
import imgVacaInoUrl from "./vaca-ino.png";
import imgCcEsqUrl from "./chupacabra.png";
// CONSTANTES:

//TESTE


// TESTE DO GIT 2

const [LARGURA, ALTURA] = [600, 400]

const TELA = cenaVazia(LARGURA, ALTURA)
 
const IMG_VACA_INO = carregarImagem(imgVacaInoUrl, 100, 60);
const IMG_VACA_VORTANO = espelhar(IMG_VACA_INO);

const IMG_CC_ESQ = carregarImagem(imgCcEsqUrl, 60, 100);
const IMG_CC_DIR = espelhar(IMG_CC_ESQ);

const Y_INICIAL_VACA = ALTURA / 2

const LIMITE_ESQUERDA_VACA = 0 + larguraImagem(IMG_VACA_INO) / 2
const LIMITE_DIREITA_VACA = LARGURA - larguraImagem(IMG_VACA_INO) / 2
const LIMITE_BAIXO_VACA = ALTURA - alturaImagem(IMG_VACA_INO) / 2
const LIMITE_CIMA_VACA = 0 + alturaImagem(IMG_VACA_INO) / 2

const LIMITE_ESQUERDA_CC = 0 + larguraImagem(IMG_CC_ESQ) / 2
const LIMITE_DIREITA_CC = LARGURA - larguraImagem(IMG_CC_ESQ) / 2
const LIMITE_BAIXO_CC = ALTURA - alturaImagem(IMG_CC_ESQ) / 2
const LIMITE_CIMA_CC = 0 + alturaImagem(IMG_CC_ESQ) / 2

const DX_PADRAO = 3


// DEFINIÇÕES DE DADOS:

interface Vaca {
    x: number,
    y: number,
    dx: number,
    dy: number
}
function makeVaca(x: number, y: number, dx: number, dy: number): Vaca {
    return { x: x, y: y, dx: dx, dy: dy };
}
/**
 * Como criar objeto: makeVaca(Int, Int, Int, Int) ou {x: Int, y: Int, dx: Int, dy: Int}
 * interp. representa a posicao x e y da vaca, e o deslocamento
 * a cada tick no eixo x e y, chamados de dx e dy
 */
// EXEMPLOS:
const VACA_SEM_MAKE: Vaca = {
    x: 200,
    y: 300,
    dx: 3,
    dy: 0
}
const VACA_INICIAL = makeVaca(LIMITE_ESQUERDA_VACA, Y_INICIAL_VACA, DX_PADRAO, 0)
const VACA_INICIAL_PROX = makeVaca(LIMITE_ESQUERDA_VACA + DX_PADRAO, Y_INICIAL_VACA, DX_PADRAO, 0)
const VACA0 = makeVaca(LIMITE_ESQUERDA_VACA, Y_INICIAL_VACA, 3, 4)
const VACA1 = makeVaca(LIMITE_ESQUERDA_VACA + 3, Y_INICIAL_VACA + 4, 3, 4)
const VACA_MEIO = makeVaca(LARGURA/2, ALTURA/2, 3, 0)
// const VACA_MEIO = (x: LARGURA/2, y: 0, dx: 3, dy:0}
const VACA_FIM = makeVaca(LIMITE_DIREITA_VACA + 1, LIMITE_BAIXO_VACA, 3, 0)
const VACA_VIRANDO = makeVaca(LIMITE_DIREITA_VACA, LIMITE_BAIXO_VACA, -3, 0)
const VACA_VORTANO = makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, -3, 0)

// ----------------

interface Chupacabra {
    x: number,
    y: number,
    dy: number
}
function makeChupacabra(x: number, y: number, dy: number): Chupacabra {
    return { x: x, y: y, dy: dy };
}
/**
 * Como criar objeto: makeChupacabra(Int, Int, Int) ou {x: Int, y: Int, dy: Int}
 * interp. representa a posicao x e y de um cc, e o deslocamento
 * a cada tick no eixo y, chamado de dy
 */
//EXEMPLOS:
const CC_INICIAL = makeChupacabra(LARGURA/2, LIMITE_CIMA_CC, 2);
const CC_INICIAL_PROX = makeChupacabra(LARGURA/2, LIMITE_CIMA_CC+2, 2);
const CC_INICIAL_PROX_PROX = makeChupacabra(LARGURA/2, LIMITE_CIMA_CC+2+2, 2);
const CC_MEIO = makeChupacabra(LARGURA/2, ALTURA/2, 2);
const CC_BAIXO = makeChupacabra(LARGURA/2, LIMITE_BAIXO_CC+1, 2);
const CC_BAIXO_VIRANDO = makeChupacabra(LARGURA/2, LIMITE_BAIXO_CC, -2);
const CC_BAIXO_VIRANDO_PROX = makeChupacabra(LARGURA/2, LIMITE_BAIXO_CC-2, -2);
const CC_CIMA = makeChupacabra(LARGURA/2, LIMITE_CIMA_CC-1, -2);
const CC_CIMA_VIRANDO = CC_INICIAL

// ------------

interface Jogo {
    vaca: Vaca, 
    cc: Chupacabra,
    gameOver: boolean
}
function makeJogo(vaca: Vaca, cc: Chupacabra, gameOver: boolean) {
    return {vaca: vaca, cc: cc, gameOver: gameOver};
}
/**
 * Como criar objeto: makeJogo(Vaca, Chupacabra, boolean) ou {vaca: Vaca, cc: Chupacabra, gameOver: boolean}
 * interp. representa o jogo com todos os seus elementos,
 * incluindo a vaca (personagem controlado), um chupacabra (cc, inimigo) e uma flag
 * booleana indicando se o jogo está em "game over" ou não
 */
// EXEMPLOS:
const JOGO_INICIAL = {vaca: VACA_INICIAL, cc: CC_INICIAL, gameOver: false};
const JOGO_INICIAL_PROX = {vaca: VACA_INICIAL_PROX, cc: CC_INICIAL_PROX, gameOver: false};
const JOGO_INICIAL_CC_PEGA_VACA = {vaca: VACA_MEIO, cc: CC_MEIO, gameOver: false};
const JOGO_INICIAL_CC_PEGA_VACA_PROX = {...JOGO_INICIAL_CC_PEGA_VACA, gameOver: true};


/// -------------- FUNCOES

/**
 * moveVaca: Vaca -> Vaca
 * Move a vaca nos eixos dx e dy
 * @param vaca: Vaca 
 * @returns Vaca
 */
function moveVaca(vaca: Vaca): Vaca {
    if (vaca.x > LIMITE_DIREITA_VACA) {
        return { ...vaca, x: LIMITE_DIREITA_VACA, dx: -vaca.dx }
    }
    if (vaca.x < LIMITE_ESQUERDA_VACA) {
        return { ...vaca, x: LIMITE_ESQUERDA_VACA, dx: -vaca.dx }
    }
    if (vaca.y > LIMITE_BAIXO_VACA) {
        return { ...vaca, y: LIMITE_BAIXO_VACA, dy: -vaca.dy }
    }
    if (vaca.y < LIMITE_CIMA_VACA) {
        return { ...vaca, y: LIMITE_CIMA_VACA, dy: -vaca.dy }
    }
    return { ...vaca, x: vaca.x + vaca.dx, y: vaca.y + vaca.dy }
}
testes(() => {
    describe('testes de moveVaca', () => {
            test('move vaca inicial', () => {
                expect(moveVaca(VACA0)).toStrictEqual(VACA1);
            });
            test('move vaca limite direito', () => {
                expect(moveVaca(VACA_FIM)).toStrictEqual(VACA_VIRANDO);
            });
            test('move vaca limite esquerdo', () => {
                expect(moveVaca(makeVaca(LIMITE_ESQUERDA_VACA - 1, ALTURA/2, -3, 0)))
                    .toStrictEqual(makeVaca(LIMITE_ESQUERDA_VACA, ALTURA/2, 3, 0));
            });
            test('move vaca limite baixo', () => {
                expect(moveVaca(makeVaca(LARGURA/2, LIMITE_BAIXO_VACA+1, 0, 3)))
                    .toStrictEqual(makeVaca(LARGURA/2, LIMITE_BAIXO_VACA, 0, -3));
            });
            test('move vaca limite cima', () => {
                expect(moveVaca(makeVaca(LARGURA/2, LIMITE_CIMA_VACA-1, 0, -3)))
                    .toStrictEqual(makeVaca(LARGURA/2, LIMITE_CIMA_VACA, 0, 3));
            });
        });
})


/**
 * Desenha a vaca na tela na posiçao vaca.x, vaca.y.
 * @param vaca: Vaca 
 * @returns Imagem
 */
function desenhaVaca(vaca: Vaca): Imagem {
    return colocarImagem(vaca.dx < 0? IMG_VACA_VORTANO: IMG_VACA_INO, vaca.x, vaca.y, TELA);
}
testes(() => {
    describe('testes de desenhaVaca', () => {
        test('desenha vaca inicial', () => {
            expect(desenhaVaca(VACA0))
                .toStrictEqual(colocarImagem(IMG_VACA_INO, VACA0.x, VACA0.y, TELA));
        });
    });
})


/**
 * Vaca, String -> Vaca
 * Altera direção de movimento da vaca dependendo da tecla pressionada
 * @param vaca: Vaca
 * @param tecla: string
 * @returns Vaca
 */
function trataTeclaVaca(vaca: Vaca, tecla: string): Vaca {
    if (tecla == "ArrowRight") {
        return {...vaca, dx: DX_PADRAO, dy: 0}
    }
    if (tecla == "ArrowLeft") {
        return {...vaca, dx: -DX_PADRAO, dy: 0}
    }
    if (tecla == "ArrowDown") {
        return {...vaca, dx: 0, dy: DX_PADRAO}
    }
    if (tecla == "ArrowUp") {
        return {...vaca, dx: 0, dy: -DX_PADRAO}
    }
    return vaca;
}
testes(() => {
    describe('testes de trataTeclaVaca', () => {
        test('trata tecla flecha direita quando na horizontal', () => {
            expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, -3, 0), "ArrowRight"))
                .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 3, 0));
        });
        test('trata tecla flecha direita quando na vertical', () => {
            expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, 3), "ArrowRight"))
                .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 3, 0));
        });
        test('trata tecla flecha esquerda', () => {
            expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 3, 0), "ArrowLeft"))
                .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, -3, 0));
        });
        test('trata tecla flecha direita quando na vertical', () => {
            expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, 3), "ArrowLeft"))
                .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, -3, 0));
        });
        test('trata tecla flecha baixo', () => {
            expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -3), "ArrowDown"))
                .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, 3));
        });
        test('trata tecla flecha baixo quando na horizontal', () => {
            expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 3, 0), "ArrowDown"))
                .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, 3));
        });
        test('trata tecla flecha cima', () => {
            expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, 3), "ArrowUp"))
                .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -3));
        });
        test('trata tecla flecha cima quando na horizontal', () => {
            expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 3, 0), "ArrowUp"))
                .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -3));
        });
        test('trata tecla outra tecla', () => {
            expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -3), "a"))
                .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -3));
        });
        
    });
})



/**
 * moveJogo: Jogo -> Jogo
 * Realiza as ações necessárias no jogo a cada tick
 * TODO
 */
// stub:
function moveJogo(jogo: Jogo): Jogo {
    return jogo;
}
testes(() => {
    describe("testes do moveJogo", () => {
        test("transição de jogo sem colisões", () => {
            expect(moveJogo(JOGO_INICIAL)).toStrictEqual(JOGO_INICIAL_PROX)
        })
    });
})


/**
 * desenhaJogo: Jogo -> Imagem
 * Desenha jogo
 * TODO
 */
// stub:
function desenhaJogo(jogo: Jogo): Imagem {
    return TELA;
}

/**
 * trataTeclaJogo: Jogo, String -> Jogo
 * Trata eventos do teclado
 * TODO
 */
// stub:
function trataTeclaJogo(jogo: Jogo, tecla: string) {
    return jogo;
}


function main() {
    reactor(JOGO_INICIAL,   // Jogo
        {
            aCadaTick: moveJogo,   // Jogo -> Jogo
            desenhar: desenhaJogo,  // Jogo -> Imagem
            quandoTecla: trataTeclaJogo,  // Jogo, String -> Jogo
        })
}

main()  // LEMBRAR: ALTERAR PATH DO SCRIPT NO index.html
