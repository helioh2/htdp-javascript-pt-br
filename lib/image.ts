

const canvas = document.getElementById("tela") as HTMLCanvasElement | null;

export enum ModoImagem {
    OUTLINE,
    SOLID
}

export abstract class Imagem {
    
    abstract desenha(x?: number|null, y?: number|null): void;

}

class Retangulo extends Imagem {

    largura: number;
    altura: number;
    cor: string;
    modo: ModoImagem;

    constructor(largura: number, altura: number, cor: string, modo: ModoImagem) {
        super()
        this.largura = largura;
        this.altura = altura;
        this.cor = cor;
        this.modo = modo;
    }

    desenha(x: number|null = null, y: number|null = null) {

        x = x == null? canvas!.width/2: x;
        y = y == null? canvas!.height/2: y;

        let ctx = canvas!.getContext("2d");
        if (this.modo == ModoImagem.OUTLINE) {
            ctx!.strokeStyle = this.cor;
            ctx!.strokeRect(x, y, this.largura, this.altura);
        } else {
            ctx!.fillStyle = this.cor;
            ctx!.fillRect(x, y, this.largura, this.altura);
        }
    }
}


class ImagemVazia extends Imagem {

    largura: number;
    altura: number;

    constructor(largura: number, altura: number) {
        super()
        this.largura = largura;
        this.altura = altura;
        canvas!.width = largura;
        canvas!.height = altura;

    }

    desenha(x: number|null = null, y: number|null = null) {
        limparCanvas();
    }
}

class ImagemComposta extends Imagem {

    imagemFrente: Imagem;
    x: number;
    y: number;
    imagemFundo: ImagemVazia | ImagemComposta;

    constructor(imagemFrente: Imagem, x: number, y: number, imagemFundo: ImagemVazia|ImagemComposta) {
        super();
        this.imagemFrente = imagemFrente;
        this.x = x;
        this.y = y;
        this.imagemFundo = imagemFundo;
    }

    desenha(x: number|null = null, y: number|null = null) {
        this.imagemFundo.desenha();
        this.imagemFrente.desenha(this.x, this.y);

    }

}

function limparCanvas() {
    let ctx = canvas!.getContext("2d");
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
}



// FUNÇÕES EXPORTADAS:

export function retangulo(largura: number, altura: number, cor: string, modo: ModoImagem): Retangulo {
    return new Retangulo(largura, altura, cor, modo);
}

export function colocarImagem(imagemFrente: Imagem, x: number, y: number, imagemFundo: ImagemVazia|ImagemComposta) {
    return new ImagemComposta(imagemFrente, x, y, imagemFundo)
}

export function cenaVazia(largura: number, altura: number) {
    return new ImagemVazia(largura, altura);
}
