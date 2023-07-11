

const canvas = document.getElementById("tela") as HTMLCanvasElement | null;

export enum ModoImagem {
    OUTLINE="outline",
    SOLID="solid"
}

export abstract class Imagem {
    
    abstract desenha(x?: number|null, y?: number|null): void;

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

abstract class RetLike extends Imagem {

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
}

class Retangulo extends RetLike {
 
    desenha(x: number|null = null, y: number|null = null) {

        x = x == null? canvas!.width/2: x;
        y = y == null? canvas!.height/2: y;

        let ctx = canvas!.getContext("2d");
        if (this.modo == ModoImagem.OUTLINE) {
            ctx!.strokeStyle = this.cor;
            ctx!.strokeRect(x-this.largura/2, y-this.altura/2, this.largura, this.altura);
        } else {
            ctx!.fillStyle = this.cor;
            ctx!.fillRect(x-this.largura/2, y-this.altura/2, this.largura, this.altura);
        }
    }
}


class Elipse extends RetLike {

    desenha(x: number|null = null, y: number|null = null) {

        x = x == null? canvas!.width/2: x;
        y = y == null? canvas!.height/2: y;

        let ctx = canvas!.getContext("2d");
        ctx!.beginPath();
        ctx!.ellipse(x, y, this.largura/2, this.altura/2, 0, 0, 2*Math.PI);
        if (this.modo == ModoImagem.OUTLINE) {
            ctx!.stroke();
            ctx!.strokeStyle = this.cor;
        } else {
            ctx!.fill();
            ctx!.fillStyle = this.cor;
        }      
    }
}


class ImagemDeArquivo extends Imagem {
    src: string;
    img: HTMLImageElement;
    largura: number;
    altura: number;

    constructor(src: string, largura: number, altura: number) {
        super();
        this.largura = largura;
        this.altura = altura;
        this.src = src;
        this.img = new Image();
        this.img.src = this.src
    }

    desenha(x: number|null = null, y: number|null = null) {
        x = x == null? canvas!.width/2: x;
        y = y == null? canvas!.height/2: y;

        let ctx = canvas!.getContext("2d");
        if (this.img.complete) {           
            ctx!.drawImage(this.img, x!-this.largura/2, y!-this.altura/2, this.largura, this.altura);
        } else {
            this.img.onload = () => {
                ctx!.drawImage(this.img, x!-this.largura/2, y!-this.altura/2, this.largura, this.altura);
            };
        }

    }
}




function limparCanvas() {
    let ctx = canvas!.getContext("2d");
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
}



// FUNÇÕES EXPORTADAS:

export function colocarImagem(imagemFrente: Imagem, x: number, y: number, imagemFundo: ImagemVazia|ImagemComposta) {
    return new ImagemComposta(imagemFrente, x, y, imagemFundo)
}

export function cenaVazia(largura: number, altura: number) {
    return new ImagemVazia(largura, altura);
}

export function retangulo(largura: number, altura: number, cor: string = "black", modo: string = "outline"): Retangulo {
    return new Retangulo(largura, altura, cor, modo as ModoImagem);
}

export function elipse(largura: number, altura: number, cor: string = "black", modo: string = "outline"): Elipse {
    return new Elipse(largura, altura, cor, modo as ModoImagem);
}

export function quadrado(lado: number, cor: string = "black", modo: string = "outline"): Retangulo {
    return new Retangulo(lado, lado, cor, modo as ModoImagem);
}

export function circulo(raio: number, cor: string = "black", modo: string = "outline"): Elipse {
    return new Elipse(raio*2, raio*2, cor, modo as ModoImagem);
}

export function carregarImagem(nomeArquivo: string, largura: number = 50, altura: number = 50) {
    return new ImagemDeArquivo(nomeArquivo, largura, altura);
}