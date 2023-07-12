import { Imagem, ModoImagem, carregarImagem, cenaVazia, circulo, colocarImagem, elipse, quadrado, retangulo, rotacionar } from "../lib/image"
import { bigBang } from "../lib/universe";


const ret1 = retangulo(50, 150, "red", ModoImagem.SOLID);
const ret2 = retangulo(150, 50, "blue", ModoImagem.SOLID);

const LARGURA = 600;
const ALTURA = 600;

const TELA_VAZIA = cenaVazia(LARGURA, ALTURA);

const IMAGEM = colocarImagem(ret2, 100, 100, colocarImagem(ret1, 20, 40, TELA_VAZIA));

const FOGUETE = carregarImagem("./foguete.png", 200, 200);
const FOGUETE2 = FOGUETE.rotacionar(45);

const ret3 = ret1.rotacionar(62)
// const FOGUETE = retangulo(50, 50, "blue", ModoImagem.OUTLINE);
const ret4 = ret3.espelhar()

const el1 = elipse(300,100, "red", "solid")
const el2 = el1.espelhar()

const VACA = carregarImagem("./vaca-ino.png", 160, 100);

const VACA2 = VACA.espelhar()

// VACA2.rotacionar(45).desenha()

// VACA.rotacionar(45).desenha()

const FOGUETE3 = FOGUETE2.espelhar();

// FOGUETE2.desenha() 
// FOGUETE3.desenha()   
// ret2.desenha()
// ret3.desenha()
ret4.desenha()
// el1.rotacionar(45).desenha()




const X_FOGUETE = LARGURA / 2

// IMAGEM.desenha();

// ret1.desenha();

// IMAGEM.desenha();

function desce(foguete: number): number {
    return foguete+1
}


function desenhar(foguete: number): Imagem {
    return colocarImagem(rotacionar(FOGUETE, foguete), X_FOGUETE, foguete, TELA_VAZIA);
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
    return foguete >= ALTURA-50/2
}

function main() {
    bigBang(0, 
        {
            aCadaTick: desce, 
            desenhar: desenhar, 
            frequencia: 60,
            quandoTecla: trataTecla,
            quandoMouse: trataMouse,
            pararQuando: pararQuando
        });
}


// main();

