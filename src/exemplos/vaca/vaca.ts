import { carregarImagem, cenaVazia, espelhar } from "../../../lib/image"

// CONSTANTES:


const [LARGURA, ALTURA] = [600, 400]

const TELA = cenaVazia(LARGURA, ALTURA)

const IMG_VACA_INO = carregarImagem("vaca-ino.png");
const IMG_VACA_VORTANO = espelhar(IMG_VACA_INO);

const IMG_CC_INO = carregarImagem("cc-ino.png");
const IMG_CC_VORTANO = espelhar(IMG_CC_INO);

const CHAO = ALTURA - IMG_VACA_INO.altura / 2

const X_CC = LARGURA / 2

const PAREDE_ESQUERDA = 0 + IMG_VACA_INO.largura / 2
const PAREDE_DIREITA = LARGURA - IMG_VACA_INO.largura / 2

const PAREDE_CIMA = 0 + IMG_CC_INO.altura / 2
const PAREDE_BAIXO = ALTURA - IMG_CC_INO.altura / 2

const DX = 3
const G = 3


// DEFINIÇÕES DE DADOS:

/**
 * Como criar objeto: makeVaca(Int, Int, Int, Int)
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
    return {x: x, y: y, dx: dx, dy: dy};
}

// EXEMPLOS:
const VACA_INICIAL = makeVaca(PAREDE_ESQUERDA, 0, 3, 0)
const VACA1 = makeVaca(PAREDE_ESQUERDA + 3, 0, 3, 0)
// const VACA_MEIO = (x: LARGURA/2, y: 0, dx: 3, dy:0}
const VACA_FIM = makeVaca(LARGURA, CHAO, 3, 0)
const VACA_VIRANDO = makeVaca(LARGURA, CHAO, -3, 0)
// const VACA_VOLTANDO = makeVaca(LARGURA / 2, -3, CHAO, 0)



/**
 * Como criar objeto: makeChupacabra(Int, Int, Int)
 * interp. representa a posicao x e y do chupacabra, e o deslocamento
 * a cada tick no eixo x e y, chamado de dy
 */
interface Chupacabra {
    x: number,
    y: number,
    dy: number
}

function makeChupacabra(x: number, y: number, dy: number): Chupacabra {
    return {x: x, y: y, dy: dy};
}

// EXEMPLOS:
const CC_INICIAL = makeChupacabra(X_CC, PAREDE_CIMA, 3)
const CC_MEIO = makeChupacabra(X_CC, ALTURA/2, 3)
const CC_FIM = makeChupacabra(X_CC, PAREDE_BAIXO, 3)
const CC_VIRANDO = makeChupacabra(X_CC, PAREDE_BAIXO, -3)
const CC_VOLTANDO = makeChupacabra(X_CC, ALTURA/2, -3)



/**
 *  Jogo eh criado como: Jogo(Vaca, List<Chupacabra>, Boolean)
 * interp. Um jogo é composto por uma vaca, vários chupacabras,
 * e uma flag (game_over) que indica se o jogo está acontecendo
 * ou nao
Exemplos:
 */
interface Jogo {
    vaca: Vaca,
    cc: Chupacabra,
    gameOver: boolean
}





/// FUNCOES

function moveVaca(vaca: Vaca): Vaca {
    return makeVaca(vaca.x + vaca.dx, vaca.y, vaca.dx, vaca.dy);
}
