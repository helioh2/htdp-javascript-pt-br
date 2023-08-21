import { Imagem, carregarImagem, cenaVazia, colocarImagem, espelhar, redimensionar } from "../../../lib/image"
import { reactor } from "../../../lib/universe";
import { testes } from "../../../lib/utils";

// CONSTANTES:


const [LARGURA, ALTURA] = [600, 400]

const TELA = cenaVazia(LARGURA, ALTURA)
 
const IMG_VACA_INO = carregarImagem("vaca-ino.png", 100, 70);
const IMG_VACA_VORTANO = espelhar(IMG_VACA_INO);

const IMG_CC_INO = redimensionar(carregarImagem("chupacabra.png", 300, 200), 0.5);
const IMG_CC_VORTANO = espelhar(IMG_CC_INO);



const X_CC = LARGURA / 2

const Y_INICIAL_VACA = ALTURA / 2

const LIMITE_ESQUERDA_VACA = 0 + IMG_VACA_INO.largura / 2
const LIMITE_DIREITA_VACA = LARGURA - IMG_VACA_INO.largura / 2
const LIMITE_BAIXO_VACA = ALTURA - IMG_VACA_INO.altura / 2
const LIMITE_CIMA_VACA = 0 + IMG_VACA_INO.altura / 2

const LIMITE_CIMA_CC = 0 + IMG_CC_INO.altura / 2
const LIMITE_BAIXO_CC = ALTURA - IMG_CC_INO.altura / 2

const DX = 3
const G = 3


// DEFINIÇÕES DE DADOS:

/**
 * Como criar objeto: makeVaca(Int, Int, Int, Int) ou {x: Int, y: Int, dx: Int, dy: Int}
 * interp. representa a posicao x e y da vaca, e o deslocamento
 * a cada tick no eixo x e y, chamados de dx e dy
 */
interface Vaca {
    x: number,
    y: number,
    dx: number,
    dy: number
}

function makeVaca(x: number, y: number, dx: number, dy: number): Vaca {
    return { x: x, y: y, dx: dx, dy: dy };
}

// EXEMPLOS:
const VACA_INICIAL = makeVaca(LIMITE_ESQUERDA_VACA, Y_INICIAL_VACA, DX, 0)
const VACA_INICIAL2 = makeVaca(LIMITE_ESQUERDA_VACA + DX, Y_INICIAL_VACA, DX, 0)
const VACA0 = makeVaca(LIMITE_ESQUERDA_VACA, Y_INICIAL_VACA, 3, 4)
const VACA1 = makeVaca(LIMITE_ESQUERDA_VACA + 3, Y_INICIAL_VACA + 4, 3, 4)
// const VACA_MEIO = (x: LARGURA/2, y: 0, dx: 3, dy:0}
const VACA_FIM = makeVaca(LIMITE_DIREITA_VACA + 1, LIMITE_BAIXO_VACA, 3, 0)
const VACA_VIRANDO = makeVaca(LIMITE_DIREITA_VACA, LIMITE_BAIXO_VACA, -3, 0)
const VACA_VORTANO = makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, -3, 0)



/**
 * Como criar objeto: makeChupacabra(Int, Int, Int) ou {x: Int, y: Int, dy: Int}
 * interp. representa a posicao x e y do chupacabra, e o deslocamento
 * a cada tick no eixo x e y, chamado de dy
 */
interface Chupacabra {
    x: number,
    y: number,
    dy: number
}

function makeChupacabra(x: number, y: number, dy: number): Chupacabra {
    return { x: x, y: y, dy: dy };
}

// EXEMPLOS:
const CC_INICIAL = makeChupacabra(X_CC, LIMITE_CIMA_CC, 3)
const CC_INICIAL2 = makeChupacabra(X_CC, LIMITE_CIMA_CC + 3, 3)
const CC_MEIO = makeChupacabra(X_CC, ALTURA / 2, 3)
const CC_FIM = makeChupacabra(X_CC, LIMITE_BAIXO_CC+1, 3)
const CC_VIRANDO = makeChupacabra(X_CC, LIMITE_BAIXO_CC, -3)
const CC_VOLTANDO = makeChupacabra(X_CC, ALTURA / 2, -3)



/**
 *  Jogo eh criado como: Jogo(Vaca, List<Chupacabra>, Boolean) 
 *      ou {vaca: Vaca, cc: Chupacabra, gameOver: Boolean}
 * interp. Um jogo é composto por uma vaca, vários chupacabras,
 * e uma flag (game_over) que indica se o jogo está acontecendo
 * ou nao
 */
interface Jogo {
    vaca: Vaca,
    cc: Chupacabra,
    gameOver: boolean
}

function makeJogo(vaca: Vaca,cc: Chupacabra, gameOver: boolean) {
    return {vaca: vaca, cc: cc, gameOver: gameOver}
}

// EXEMPLOS:
const JOGO_INICIAL = makeJogo(VACA_INICIAL, CC_INICIAL, false);
const JOGO_INICIAL2 = makeJogo(VACA_INICIAL2, CC_INICIAL2, false);


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
        return {...vaca, dx: DX, dy: 0}
    }
    if (tecla == "ArrowLeft") {
        return {...vaca, dx: -DX, dy: 0}
    }
    if (tecla == "ArrowDown") {
        return {...vaca, dx: 0, dy: DX}
    }
    if (tecla == "ArrowUp") {
        return {...vaca, dx: 0, dy: -DX}
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
 * moveChupacabra: Chupacabra -> Chupacabra
 * Move o chupacabra a cada tick
 */
function moveChupacabra(cc: Chupacabra): Chupacabra {
    if (cc.y > LIMITE_BAIXO_CC) {
        return makeChupacabra(cc.x, LIMITE_BAIXO_CC, -cc.dy);
    }
    if (cc.y < LIMITE_CIMA_CC) {
        return makeChupacabra(cc.x, LIMITE_CIMA_CC, -cc.dy);
    }
    return makeChupacabra(cc.x, cc.y + cc.dy, cc.dy);
}
testes(() => {
    describe('testes de moveChupacabra', () => {
            test('move cc inicial', () => {
                expect(moveChupacabra(CC_INICIAL)).toStrictEqual(CC_INICIAL2);
            });
            test('move cc final da tela batendo', () => {
                expect(moveChupacabra(CC_FIM)).toStrictEqual(CC_VIRANDO);
            });
            test('move cc inicio da tela voltando', () => {
                expect(moveChupacabra(makeChupacabra(X_CC, LIMITE_CIMA_CC-1, -3)))
                    .toStrictEqual(makeChupacabra(X_CC, LIMITE_CIMA_CC, 3));
            });
        });
});


/**
 * moveJogo: Jogo -> Jogo
 * Atualiza jogo a cada tick, movendo a vaca e o chupacabra
 * @param jogo 
 * @returns Jogo atualizado
 */
function moveJogo(jogo: Jogo): Jogo {
    return makeJogo(
        moveVaca(jogo.vaca),
        moveChupacabra(jogo.cc),
        jogo.gameOver
    )
}
testes(() => {
    describe('testes de moveJogo', () => {
            test('move jogo inicial', () => {
                expect(moveJogo(JOGO_INICIAL)).toStrictEqual(JOGO_INICIAL2);
            });
            
        });
})


/**
 * desenhaJogo: Jogo -> Imagem
 * Desenha jogo
 */
function desenhaJogo(jogo: Jogo): Imagem {
    return colocarImagem(
        IMG_CC_INO, jogo.cc.x, jogo.cc.y, 
        desenhaVaca(jogo.vaca));
}

/**
 * trataTeclaJogo: Jogo, String -> Jogo
 * Trata eventos de teclado para to o jogo
 * @param jogo 
 * @param tecla 
 */
function trataTeclaJogo(jogo: Jogo, tecla: String): Jogo {
    return jogo;
}


function main() {
    reactor(JOGO_INICIAL,
        {
            aCadaTick: moveJogo,
            desenhar: desenhaJogo,
            quandoTecla: trataTeclaJogo,
        })
}

main()  // LEMBRAR: ALTERAR PATH DO SCRIPT NO index.html

// desenhaVaca(VACA_INICIAL).desenha()

// colocarImagem(
    // IMG_CC_INO, 100, 100, 
    // desenhaVaca(VACA_INICIAL)).desenha()