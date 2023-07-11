import { Imagem, ModoImagem, cenaVazia, colocarImagem, retangulo } from "../lib/image"
import { bigBang } from "../lib/universe";


const ret1 = retangulo(50, 50, "blue", ModoImagem.OUTLINE);
const ret2 = retangulo(150, 50, "blue", ModoImagem.SOLID);

const LARGURA = 800;
const ALTURA = 500;

const TELA_VAZIA = cenaVazia(LARGURA, ALTURA);

const IMAGEM = colocarImagem(ret2, 100, 100, colocarImagem(ret1, 20, 40, TELA_VAZIA));

const FOGUETE = retangulo(50, 50, "red", ModoImagem.SOLID);

const X_FOGUETE = LARGURA / 2

// IMAGEM.desenha();

// ret1.desenha();

// IMAGEM.desenha();

function desce(y: number): number {
    return y+1
}


function desenhar(y: number): Imagem {
    return colocarImagem(FOGUETE, X_FOGUETE, y, TELA_VAZIA);
}

// desenhar(100).desenha()

bigBang(0, {aCadaTick: desce, desenhar: desenhar, frequencia: 60});

