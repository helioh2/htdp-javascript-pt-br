import { Imagem, alturaImagem, carregarImagem, cenaVazia, colocarImagem, espelhar, larguraImagem, redimensionar, texto } from "../../../lib/image"
import { reactor } from "../../../lib/universe";
import { testes } from "../../../lib/utils";
import imgVacaInoUrl from "./vaca-ino.png";
import imgCCUrl from "./chupacabra.png";

const [LARGURA, ALTURA] = [600, 400]

const TELA = cenaVazia(LARGURA, ALTURA)
 
const IMG_VACA_INO = carregarImagem(imgVacaInoUrl, 100, 70);
const IMG_VACA_VORTANO = espelhar(IMG_VACA_INO);
const IMG_CC_ESQ = carregarImagem(imgCCUrl, 95, 100);
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
const DX_CC = 0

const TEXTO_GAME_OVER = texto("GAME OVER", "Arial", "50px");


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
const VACA_INICIAL = makeVaca(LIMITE_ESQUERDA_VACA, Y_INICIAL_VACA, DX_PADRAO, 0)
const VACA_INICIAL2 = makeVaca(LIMITE_ESQUERDA_VACA + DX_PADRAO, Y_INICIAL_VACA, DX_PADRAO, 0)
const VACA0 = makeVaca(LIMITE_ESQUERDA_VACA, Y_INICIAL_VACA, 3, 4)
const VACA1 = makeVaca(LIMITE_ESQUERDA_VACA + 3, Y_INICIAL_VACA + 4, 3, 4)
const VACA_MEIO = {x: LARGURA/2, y: Y_INICIAL_VACA, dx: 3, dy:0}
const VACA_FIM = makeVaca(LIMITE_DIREITA_VACA + 1, LIMITE_BAIXO_VACA, 3, 0)
const VACA_VIRANDO = makeVaca(LIMITE_DIREITA_VACA, LIMITE_BAIXO_VACA, -3, 0)
const VACA_VORTANO = makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, -3, 0)


//------------

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

const CC_SEM_MAKE = {
    x: 100,
    y: 150,
    dy: 5
}
const CC_INICIAL = makeChupacabra(LARGURA/2, LIMITE_CIMA_CC, 2);
const CC_INICIAL_PROX = makeChupacabra(LARGURA/2, LIMITE_CIMA_CC+2, 2);
const CC_INICIAL_PROX_PROX = makeChupacabra(LARGURA/2, LIMITE_CIMA_CC+2+2, 2);
const CC_MEIO = makeChupacabra(LARGURA/2, ALTURA/2, 2);
const CC_BAIXO = makeChupacabra(LARGURA/2, LIMITE_BAIXO_CC+1, 2);
const CC_BAIXO_VIRANDO = makeChupacabra(LARGURA/2, LIMITE_BAIXO_CC, -2);
const CC_BAIXO_VIRANDO_PROX = makeChupacabra(LARGURA/2, LIMITE_BAIXO_CC-2, -2);
const CC_CIMA = makeChupacabra(LARGURA/2, LIMITE_CIMA_CC-1, -2);
const CC_CIMA_VIRANDO = CC_INICIAL


//--------

interface Jogo {
    vaca: Vaca,
    cc: Chupacabra,
    pontuacao: number,
    gameOver: boolean
}
function makeJogo(vaca: Vaca, cc: Chupacabra, pontuacao: number, gameOver: boolean) {
    return {vaca: vaca, cc: cc, pontuacao: pontuacao, gameOver: gameOver};
}
/**
 * Cria-se um jogo usando: makeJogo(Vaca, Chupacabra, number, boolean)
 * ou {vaca: Vaca, cc: Chupacabra, pontuacao: number, gameOver: boolean}
 * interp. representa o jogo contendo uma vaca, um cc, pontuacao
 * e flag de game over 
 */
// EXEMPLOS
const JOGO_INICIAL = makeJogo(VACA_INICIAL, CC_INICIAL, 0, false);
const JOGO_INICIAL_PROX = makeJogo(VACA_INICIAL2, CC_INICIAL_PROX, 0+1, false);
const JOGO_COLIDINDO = makeJogo(VACA_MEIO, CC_MEIO, 500, false);
const JOGO_GAME_OVER= makeJogo(VACA_MEIO, CC_MEIO, 500, true);
const JOGO_GAME_OVER_PROX = JOGO_GAME_OVER;



/// FUNCOES

/**
 * Vaca -> Vaca
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


function main() {
    reactor(VACA_INICIAL,
        {
            aCadaTick: moveVaca,
            desenhar: desenhaVaca,
            quandoTecla: trataTeclaVaca,
        })
}

// main()  // LEMBRAR: ALTERAR PATH DO SCRIPT NO index.html


TEXTO_GAME_OVER.desenha();

// colocarImagem(IMG_CC_ESQ, 100, 100, TELA).desenha();
// IMG_CC_ESQ.desenha();