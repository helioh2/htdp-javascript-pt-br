/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Imagem, alturaImagem, carregarImagem, cenaVazia, colocarImagem, espelhar, larguraImagem, redimensionar, texto } from '../../../lib/image'
import { reactor } from '../../../lib/universe'
import { testes } from '../../../lib/utils'
import imgVacaInoUrl from './vaca-ino.png'
import imgCCUrl from './chupacabra.png'

const [LARGURA, ALTURA] = [600, 400]

const TELA = cenaVazia(LARGURA, ALTURA)

const IMG_VACA_INO = carregarImagem(imgVacaInoUrl, 100, 70)
const IMG_VACA_VORTANO = espelhar(IMG_VACA_INO)
const IMG_CC_ESQ = carregarImagem(imgCCUrl, 95, 100)
const IMG_CC_DIR = espelhar(IMG_CC_ESQ)

const LARGURA_IMG_VACA = larguraImagem(IMG_VACA_INO)
const ALTURA_IMG_VACA = alturaImagem(IMG_VACA_INO)

const LARGURA_IMG_CC = larguraImagem(IMG_CC_ESQ)
const ALTURA_IMG_CC = alturaImagem(IMG_CC_ESQ)

const Y_INICIAL_VACA = ALTURA / 2

const RAIO_COLISAO_VACA = (LARGURA_IMG_VACA + ALTURA_IMG_VACA) / 2 / 3
const RAIO_COLISAO_CC = (LARGURA_IMG_CC + ALTURA_IMG_CC) / 2 / 3

const LIMITE_ESQUERDA_VACA = 0 + LARGURA_IMG_VACA / 2
const LIMITE_DIREITA_VACA = LARGURA - LARGURA_IMG_VACA / 2
const LIMITE_BAIXO_VACA = ALTURA - ALTURA_IMG_VACA / 2
const LIMITE_CIMA_VACA = 0 + ALTURA_IMG_VACA / 2

const LIMITE_ESQUERDA_CC = 0 + LARGURA_IMG_CC / 2
const LIMITE_DIREITA_CC = LARGURA - LARGURA_IMG_CC / 2
const LIMITE_BAIXO_CC = ALTURA - ALTURA_IMG_CC / 2
const LIMITE_CIMA_CC = 0 + ALTURA_IMG_CC / 2

const DX_PADRAO = 3
const DX_CC = 0

const TEXTO_GAME_OVER = texto('GAME OVER', 'arial', '50px', 'red')

// DEFINIÇÕES DE DADOS:

interface Vaca {
  x: number
  y: number
  dx: number
  dy: number
}

function makeVaca(x: number, y: number, dx: number, dy: number): Vaca {
  return { x, y, dx, dy }
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
const VACA_MEIO = { x: LARGURA / 2, y: Y_INICIAL_VACA, dx: 3, dy: 0 }
const VACA_FIM = makeVaca(LIMITE_DIREITA_VACA + 1, LIMITE_BAIXO_VACA, 3, 0)
const VACA_VIRANDO = makeVaca(LIMITE_DIREITA_VACA, LIMITE_BAIXO_VACA, -3, 0)
const VACA_VORTANO = makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, -3, 0)

// ------------

interface Chupacabra {
  x: number
  y: number
  dy: number
}
function makeChupacabra(x: number, y: number, dy: number): Chupacabra {
  return { x, y, dy }
}
/**
 * Como criar objeto: makeChupacabra(Int, Int, Int) ou {x: Int, y: Int, dy: Int}
 * interp. representa a posicao x e y de um cc, e o deslocamento
 * a cada tick no eixo y, chamado de dy
 */
// EXEMPLOS:

const CC_SEM_MAKE = {
  x: 100,
  y: 150,
  dy: 5
}
const CC_INICIAL = makeChupacabra(LARGURA / 2, LIMITE_CIMA_CC, 2)
const CC_INICIAL_PROX = makeChupacabra(LARGURA / 2, LIMITE_CIMA_CC + 2, 2)
const CC_INICIAL_PROX_PROX = makeChupacabra(LARGURA / 2, LIMITE_CIMA_CC + 2 + 2, 2)
const CC_MEIO = makeChupacabra(LARGURA / 2, ALTURA / 2, 2)
const CC_BAIXO = makeChupacabra(LARGURA / 2, LIMITE_BAIXO_CC + 1, 2)
const CC_BAIXO_VIRANDO = makeChupacabra(LARGURA / 2, LIMITE_BAIXO_CC, -2)
const CC_BAIXO_VIRANDO_PROX = makeChupacabra(LARGURA / 2, LIMITE_BAIXO_CC - 2, -2)
const CC_CIMA = makeChupacabra(LARGURA / 2, LIMITE_CIMA_CC - 1, -2)
const CC_CIMA_VIRANDO = CC_INICIAL

// --------

interface Jogo {
  vaca: Vaca
  cc: Chupacabra
  pontuacao: number
  gameOver: boolean
}
function makeJogo(vaca: Vaca, cc: Chupacabra, pontuacao: number, gameOver: boolean): { vaca: Vaca, cc: Chupacabra, pontuacao: number, gameOver: boolean } {
  return { vaca, cc, pontuacao, gameOver }
}
/**
 * Cria-se um jogo usando: makeJogo(Vaca, Chupacabra, number, boolean)
 * ou {vaca: Vaca, cc: Chupacabra, pontuacao: number, gameOver: boolean}
 * interp. representa o jogo contendo uma vaca, um cc, pontuacao
 * e flag de game over
 */
// EXEMPLOS
const JOGO_INICIAL = makeJogo(VACA_INICIAL, CC_INICIAL, 0, false)
const JOGO_INICIAL_PROX = makeJogo(VACA_INICIAL2, CC_INICIAL_PROX, 0 + 1, false)
const JOGO_COLIDINDO = makeJogo(VACA_MEIO, CC_MEIO, 500, false)
const JOGO_GAME_OVER = makeJogo(VACA_MEIO, CC_MEIO, 500, true)
const JOGO_GAME_OVER_PROX = JOGO_GAME_OVER

const VACA_COLIDINDO_DIAG1 = makeVaca(LARGURA / 2 - RAIO_COLISAO_VACA - RAIO_COLISAO_CC + 3, Y_INICIAL_VACA, 3, 0) // um pouco antes do meio, à esquerda
const CC_COLIDINDO_DIAG1 = makeChupacabra(LARGURA / 2, ALTURA / 2 - RAIO_COLISAO_CC - RAIO_COLISAO_VACA + 3, 3) // um pouco antes do meio, acima

const JOGO_COLIDINDO_DIAG1 = makeJogo(VACA_COLIDINDO_DIAG1, CC_COLIDINDO_DIAG1, 100, false)
const JOGO_COLIDINDO_DIAG1_PROX = makeJogo(VACA_COLIDINDO_DIAG1, CC_COLIDINDO_DIAG1, 100, true)

const SCREENSHOT_COLIDINDO_DIAG1 = desenhaJogo(JOGO_COLIDINDO_DIAG1)

const VACA_COLIDINDO_FRENTE = makeVaca(LARGURA / 2 - (RAIO_COLISAO_VACA + RAIO_COLISAO_CC) + 3, Y_INICIAL_VACA, 3, 0) // um pouco antes do meio, à esquerda
const CC_COLIDINDO_FRENTE = makeChupacabra(LARGURA / 2 + RAIO_COLISAO_CC - 3, ALTURA / 2, 3) // EXATAMENTE NO MEIO NO y

const JOGO_COLIDINDO_FRENTE = makeJogo(VACA_COLIDINDO_FRENTE, CC_COLIDINDO_FRENTE, 100, false)
const JOGO_COLIDINDO_FRENTE_PROX = makeJogo(VACA_COLIDINDO_FRENTE, CC_COLIDINDO_FRENTE, 100, true)

const SCREENSHOT_COLIDINDO_FRENTE = desenhaJogo(JOGO_COLIDINDO_FRENTE)

const VACA_COLIDINDO_ATRAS = makeVaca(LARGURA / 2 + RAIO_COLISAO_VACA + RAIO_COLISAO_CC - 3, Y_INICIAL_VACA, 3, 0) // um pouco antes do meio, à esquerda
const CC_COLIDINDO_ATRAS = makeChupacabra(LARGURA / 2 - RAIO_COLISAO_CC + 3, ALTURA / 2, 3) // EXATAMENTE NO MEIO NO y

const JOGO_COLIDINDO_ATRAS = makeJogo(VACA_COLIDINDO_ATRAS, CC_COLIDINDO_ATRAS, 100, false)
const JOGO_COLIDINDO_ATRAS_PROX = makeJogo(VACA_COLIDINDO_ATRAS, CC_COLIDINDO_ATRAS, 100, true)

const SCREENSHOT_COLIDINDO_ATRAS = desenhaJogo(JOGO_COLIDINDO_ATRAS)

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
      expect(moveVaca(VACA0)).toStrictEqual(VACA1)
    })
    test('move vaca limite direito', () => {
      expect(moveVaca(VACA_FIM)).toStrictEqual(VACA_VIRANDO)
    })
    test('move vaca limite esquerdo', () => {
      expect(moveVaca(makeVaca(LIMITE_ESQUERDA_VACA - 1, ALTURA / 2, -3, 0)))
        .toStrictEqual(makeVaca(LIMITE_ESQUERDA_VACA, ALTURA / 2, 3, 0))
    })
    test('move vaca limite baixo', () => {
      expect(moveVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA + 1, 0, 3)))
        .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -3))
    })
    test('move vaca limite cima', () => {
      expect(moveVaca(makeVaca(LARGURA / 2, LIMITE_CIMA_VACA - 1, 0, -3)))
        .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_CIMA_VACA, 0, 3))
    })
  })
})

/**
 * Desenha a vaca na tela na posiçao vaca.x, vaca.y.
 * @param vaca: Vaca
 * @returns Imagem
 */
function desenhaVaca(vaca: Vaca): Imagem {
  return colocarImagem(vaca.dx < 0 ? IMG_VACA_VORTANO : IMG_VACA_INO, vaca.x, vaca.y, TELA)
}
testes(() => {
  describe('testes de desenhaVaca', () => {
    test('desenha vaca inicial', () => {
      expect(desenhaVaca(VACA0))
        .toStrictEqual(colocarImagem(IMG_VACA_INO, VACA0.x, VACA0.y, TELA))
    })
  })
})

/**
 * Vaca, String -> Vaca
 * Altera direção de movimento da vaca dependendo da tecla pressionada
 * @param vaca: Vaca
 * @param tecla: string
 * @returns Vaca
 */
function trataTeclaVaca(vaca: Vaca, tecla: string): Vaca {
  if (tecla === 'ArrowRight') {
    return { ...vaca, dx: DX_PADRAO, dy: 0 }
  }
  if (tecla === 'ArrowLeft') {
    return { ...vaca, dx: -DX_PADRAO, dy: 0 }
  }
  if (tecla === 'ArrowDown') {
    return { ...vaca, dx: 0, dy: DX_PADRAO }
  }
  if (tecla === 'ArrowUp') {
    return { ...vaca, dx: 0, dy: -DX_PADRAO }
  }
  return vaca
}
testes(() => {
  describe('testes de trataTeclaVaca', () => {
    test('trata tecla flecha direita quando na horizontal', () => {
      expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, -3, 0), 'ArrowRight'))
        .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 3, 0))
    })
    test('trata tecla flecha direita quando na vertical', () => {
      expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, 3), 'ArrowRight'))
        .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 3, 0))
    })
    test('trata tecla flecha esquerda', () => {
      expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 3, 0), 'ArrowLeft'))
        .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, -3, 0))
    })
    test('trata tecla flecha direita quando na vertical', () => {
      expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, 3), 'ArrowLeft'))
        .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, -3, 0))
    })
    test('trata tecla flecha baixo', () => {
      expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -3), 'ArrowDown'))
        .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, 3))
    })
    test('trata tecla flecha baixo quando na horizontal', () => {
      expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 3, 0), 'ArrowDown'))
        .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, 3))
    })
    test('trata tecla flecha cima', () => {
      expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, 3), 'ArrowUp'))
        .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -3))
    })
    test('trata tecla flecha cima quando na horizontal', () => {
      expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 3, 0), 'ArrowUp'))
        .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -3))
    })
    test('trata tecla outra tecla', () => {
      expect(trataTeclaVaca(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -3), 'a'))
        .toStrictEqual(makeVaca(LARGURA / 2, LIMITE_BAIXO_VACA, 0, -3))
    })
  })
})

/**
 * moveChupacabra: Chupacabra -> Chupacabra
 * Realiza o movimento do chupacabra
 */
function moveChupacabra(cc: Chupacabra): Chupacabra {
  if (cc.y > LIMITE_BAIXO_CC) {
    return { ...cc, y: LIMITE_BAIXO_CC, dy: -cc.dy }
  }
  if (cc.y < LIMITE_CIMA_CC) {
    return { ...cc, y: LIMITE_CIMA_CC, dy: -cc.dy }
  }
  return { ...cc, y: cc.y + cc.dy }
}
testes(() => {
  describe('testes de moveChupacabra', () => {
    test('move cc inicial', () => {
      expect(moveChupacabra(CC_INICIAL)).toStrictEqual(CC_INICIAL_PROX)
    })
    test('move cc inicial prox', () => {
      expect(moveChupacabra(CC_INICIAL_PROX)).toStrictEqual(CC_INICIAL_PROX_PROX)
    })
    test('move cc limite baixo', () => {
      expect(moveChupacabra(CC_BAIXO)).toStrictEqual(CC_BAIXO_VIRANDO)
    })
    test('move cc limite baixo virado andando pra cima', () => {
      expect(moveChupacabra(CC_BAIXO_VIRANDO)).toStrictEqual(CC_BAIXO_VIRANDO_PROX)
    })
    test('move cc limite cima', () => {
      expect(moveChupacabra(CC_CIMA)).toStrictEqual(CC_CIMA_VIRANDO)
    })
  })
})

/**
 * distancia: number, number, number, number -> number
 * Calcula a distância euclidiana entre os dois pontos
 */
function distancia(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}
testes(() => {
  describe('testes distancia', () => {
    test('teste 1', () => {
      expect(distancia(0, 0, 3, 4)).toStrictEqual(5)
    })
    test('teste 2', () => {
      expect(distancia(1, 2, 4, 6)).toStrictEqual(5)
    })
  })
})

/**
 * colidindo: Vaca, Chupacabra -> bool
 * Verifica se a vaca e o chupacabra se colidiram
 */
function colidindo(vaca: Vaca, cc: Chupacabra): boolean {
  let distanciaVacaCc = distancia(vaca.x, vaca.y, cc.x, cc.y)
  return (distanciaVacaCc < (RAIO_COLISAO_VACA + RAIO_COLISAO_CC) * (1.5))
}
testes(() => {
  describe('testes colidindo', () => {
    test('sem colisao', () => {
      expect(colidindo(VACA_INICIAL, CC_INICIAL)).toStrictEqual(false)
    })
    test('colisao diagonal 1', () => {
      expect(colidindo(VACA_COLIDINDO_DIAG1, CC_COLIDINDO_DIAG1)).toStrictEqual(true)
    })
    test('colisao de frente', () => {
      expect(colidindo(VACA_COLIDINDO_FRENTE, CC_COLIDINDO_FRENTE)).toStrictEqual(true)
    })
    test('colisao de trás', () => {
      expect(colidindo(VACA_COLIDINDO_ATRAS, CC_COLIDINDO_ATRAS)).toStrictEqual(true)
    })
  })
})

/**
 * atualizaJogo: Jogo -> Jogo
 * Atualiza o jogo a cada tick.
 * TODO
 */
function atualizaJogo(jogo: Jogo): Jogo {
  // tratamento da colisão
  if (colidindo(jogo.vaca, jogo.cc)) {
    return { ...jogo, gameOver: true }
  }

  let vacaMovida = moveVaca(jogo.vaca)
  let ccMovido = moveChupacabra(jogo.cc)
  //  return makeJogo(vacaMovida, jogo.cc, jogo.pontuacao, jogo.gameOver)
  return { ...jogo, vaca: vacaMovida, cc: ccMovido, pontuacao: jogo.pontuacao + 1 }
}
testes(() => {
  describe('Testes do atualizaJogo', () => {
    test('Jogo tranquilo, sem colisao', () => {
      expect(atualizaJogo(JOGO_INICIAL)).toStrictEqual(JOGO_INICIAL_PROX)
    })
    test('Jogo com colisao diagonal', () => {
      expect(atualizaJogo(JOGO_COLIDINDO_DIAG1)).toStrictEqual(JOGO_COLIDINDO_DIAG1_PROX)
    })
    test('Jogo com colisao frente', () => {
      expect(atualizaJogo(JOGO_COLIDINDO_FRENTE)).toStrictEqual(JOGO_COLIDINDO_FRENTE_PROX)
    })
    test('Jogo com colisao atrás', () => {
      expect(atualizaJogo(JOGO_COLIDINDO_ATRAS)).toStrictEqual(JOGO_COLIDINDO_ATRAS_PROX)
    })
  })
})

/**
 * desenhaJogo: Jogo -> Imagem
 * Desenha o jogo.
 */
function desenhaJogo(jogo: Jogo): Imagem {
  if (jogo.gameOver) {
    return colocarImagem(
      texto(jogo.pontuacao.toString(), 'Arial', '50px', 'blue'),
      LARGURA / 2 - 30,
      ALTURA / 2 + 50,
      colocarImagem(TEXTO_GAME_OVER, LARGURA / 4, ALTURA / 2, TELA))
  }
  // else
  return colocarImagem(
    texto(jogo.pontuacao.toString(), 'Arial', '20px'),
    LARGURA - 50,
    0 + 50,
    colocarImagem(
      jogo.cc.x >= jogo.vaca.x ? IMG_CC_ESQ : IMG_CC_DIR,
      jogo.cc.x,
      jogo.cc.y,
      desenhaVaca(jogo.vaca)
    ))
}

/**
 * trataTeclaJogo: Jogo, String -> Jogo
 * Trata os eventos de tecla.
 * TODO
 */
function trataTeclaJogo(jogo: Jogo, tecla: string): Jogo {
  if (tecla === 'r' && jogo.gameOver) {
    return JOGO_INICIAL
  }
  let vacaAtualizada = trataTeclaVaca(jogo.vaca, tecla)
  return { ...jogo, vaca: vacaAtualizada }
}
testes(() => {
  describe('Testes trata tecla', () => {
    test('Quando tecla restart e game over', () => {
      expect(trataTeclaJogo(JOGO_GAME_OVER, 'r'))
        .toStrictEqual(JOGO_INICIAL)
    })
    test('Quando tecla restart sem game over', () => {
      expect(trataTeclaJogo(JOGO_INICIAL_PROX, 'r'))
        .toStrictEqual(JOGO_INICIAL_PROX)
    })
    test('Quando outra tecla e game over', () => {
      expect(trataTeclaJogo(JOGO_GAME_OVER, 'a'))
        .toStrictEqual(JOGO_GAME_OVER)
    })
  })
})

function main(): void {
  reactor(JOGO_INICIAL, // Jogo
    {
      aCadaTick: atualizaJogo, // Jogo -> Jogo
      desenhar: desenhaJogo, // Jogo -> Imagem
      quandoTecla: trataTeclaJogo // Jogo, String -> Jogo
    })
}

main() // LEMBRAR: ALTERAR PATH DO SCRIPT NO index.html
// SCREENSHOT_COLIDINDO_ATRAS.desenha();
// SCREENSHOT_COLIDINDO_ATRAS.desenha();
// TEXTO_GAME_OVER.desenha();

// colocarImagem(IMG_CC_ESQ, 100, 100, TELA).desenha();
// IMG_CC_ESQ.desenha();
