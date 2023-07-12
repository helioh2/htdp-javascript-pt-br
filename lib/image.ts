

const canvas = document.getElementById("tela") as HTMLCanvasElement | null;

export enum ModoImagem {
    OUTLINE="outline",
    SOLID="solid"
}

function em_radianos(angulo_em_graus: number) {
    return angulo_em_graus * Math.PI / 180
}

export abstract class Imagem {

    angulo: number;

    constructor(angulo: number) {
        this.angulo = angulo;
    }
    
    abstract desenha(x?: number|null, y?: number|null): void;

    abstract redimensionar(proporcao: number);

    rotacionar(angulo: number): Imagem {
        return Object.assign(Object.create(this), {...this, angulo: this.angulo + angulo})
    }

}


class ImagemVazia extends Imagem {

    largura: number;
    altura: number;

    constructor(largura: number, altura: number) {
        super(0);
        this.largura = largura;
        this.altura = altura;
        canvas!.width = largura;
        canvas!.height = altura;

    }

    desenha(x: number|null = null, y: number|null = null) {
        limparCanvas();
    }

    redimensionar(proporcao: number) {
        return Object.assign(Object.create(this), 
            {
                largura: this.largura * proporcao, 
                altura: this.altura * proporcao
            })
    }

}

class ImagemComposta extends Imagem {

    imagemFrente: Imagem;
    x: number;
    y: number;
    imagemFundo: ImagemVazia | ImagemComposta;

    constructor(imagemFrente: Imagem, x: number, y: number, imagemFundo: ImagemVazia|ImagemComposta) {
        super(0);
        this.imagemFrente = imagemFrente;
        this.x = x;
        this.y = y;
        this.imagemFundo = imagemFundo;
    }

    desenha(x: number|null = null, y: number|null = null) {
        this.imagemFundo.desenha();
        this.imagemFrente.desenha(this.x, this.y);

    }

    redimensionar(proporcao: number) {
        return Object.assign(Object.create(this), {
            imagemFundo: this.imagemFundo.redimensionar(proporcao),
            imagemFrente: this.imagemFrente.redimensionar(proporcao)
        })//TODO: criar versão que redimensiona considerando o distanciamento dos objetos
    }

    rotacionar(angulo: number): Imagem {
        return Object.assign(Object.create(this), {
            imagemFundo: this.imagemFundo.rotacionar(angulo),
            imagemFrente: this.imagemFrente.rotacionar(angulo)
        })//TODO: criar versão que redimensiona considerando o distanciamento dos objetos
    }

}

abstract class RetLike extends Imagem {

    largura: number;
    altura: number;
    cor: string;
    modo: ModoImagem;

    constructor(largura: number, altura: number, cor: string, modo: ModoImagem, angulo: number) {
        super(angulo)
        this.largura = largura;
        this.altura = altura;
        this.cor = cor;
        this.modo = modo;
    }

    redimensionar(proporcao: number) {
        return Object.assign(Object.create(this), {
            largura: this.largura * proporcao, 
            altura: this.altura * proporcao
        })
    }
}

class Retangulo extends RetLike {
 
    desenha(x: number|null = null, y: number|null = null) {

        x = x == null? canvas!.width/2: x;
        y = y == null? canvas!.height/2: y;

        let ctx = canvas!.getContext("2d");
        ctx!.save()
        ctx!.translate(x, y);
        ctx!.rotate(em_radianos(this.angulo));
        ctx!.translate(-this.largura / 2, -this.altura / 2);

        if (this.modo == ModoImagem.OUTLINE) {
            ctx!.strokeStyle = this.cor;
            ctx!.strokeRect(0, 0, this.largura, this.altura);
        } else {
            ctx!.fillStyle = this.cor;
            ctx!.fillRect(0, 0, this.largura, this.altura);
        }
        ctx!.restore()
    }
}


class Elipse extends RetLike {

    desenha(x: number|null = null, y: number|null = null) {

        x = x == null? canvas!.width/2: x;
        y = y == null? canvas!.height/2: y;

        let ctx = canvas!.getContext("2d");
        ctx!.beginPath();
        ctx!.ellipse(x, y, this.largura/2, this.altura/2, em_radianos(this.angulo), 0, 2*Math.PI);
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

    constructor(src: string, largura: number, altura: number, angulo: number) {
        super(angulo);
        this.largura = largura;
        this.altura = altura;
        this.src = src;
        this.img = new Image();
        this.img.src = this.src
    }

    private desenha_rotacionando(x:number, y:number) {
        let ctx = canvas!.getContext("2d");
        ctx!.save()    
        ctx!.beginPath();
        ctx!.translate(x, y);
        ctx!.rotate(em_radianos(this.angulo));
        ctx!.translate(-this.largura / 2, -this.altura / 2);     
        ctx!.drawImage(this.img, 0, 0, this.largura, this.altura);
        ctx!.restore()
    }

    desenha(x: number|null = null, y: number|null = null) {
        x = x == null? canvas!.width/2: x;
        y = y == null? canvas!.height/2: y;

        if (this.img.complete) { 
            this.desenha_rotacionando(x, y);
        } else {
            this.img.onload = () => {
                this.desenha_rotacionando(x!, y!);
            };
        }
    }

    redimensionar(proporcao: number) {
        return Object.assign(Object.create(this), {
            ...this, 
            largura: this.largura * proporcao, 
            altura: this.altura * proporcao
        })
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
    return new ImagemVazia(largura, altura, 0);
}

export function retangulo(largura: number, altura: number, cor: string = "black", modo: string = "outline"): Retangulo {
    return new Retangulo(largura, altura, cor, modo as ModoImagem, 0);
}

export function elipse(largura: number, altura: number, cor: string = "black", modo: string = "outline"): Elipse {
    return new Elipse(largura, altura, cor, modo as ModoImagem, 0);
}

export function quadrado(lado: number, cor: string = "black", modo: string = "outline"): Retangulo {
    return new Retangulo(lado, lado, cor, modo as ModoImagem, 0);
}

export function circulo(raio: number, cor: string = "black", modo: string = "outline"): Elipse {
    return new Elipse(raio*2, raio*2, cor, modo as ModoImagem, 0);
}

export function carregarImagem(nomeArquivo: string, largura: number = 50, altura: number = 50) {
    return new ImagemDeArquivo(nomeArquivo, largura, altura, 0);
}


export function redimensionar(imagem: Imagem, proporcao: number) {
    return imagem.redimensionar(proporcao);
}

export function rotacionar(imagem: Imagem, angulo: number) {
    return imagem.rotacionar(angulo);
}
