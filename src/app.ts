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

function desce(foguete: number): number {
    return foguete+1
}


function desenhar(foguete: number): Imagem {
    return colocarImagem(FOGUETE, X_FOGUETE, foguete, TELA_VAZIA);
}


function trataTecla(foguete: number, tecla: string) {
    if (tecla === " ") {
        return 0;
    } else {
        return foguete;
    }
}

function trataMouse(foguete: number, x: number, y: number, evType) {
    if (evType === "mousemove") {
        return y;
    } else {
        return foguete;
    }
}


function pararQuando(foguete: number) {
    return foguete >= ALTURA-50
}

bigBang(0, 
    {
        aCadaTick: desce, 
        desenhar: desenhar, 
        frequencia: 60,
        quandoTecla: trataTecla,
        quandoMouse: trataMouse,
        pararQuando: pararQuando
    });

