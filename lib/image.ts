

const canvas = document.getElementById("tela") as HTMLCanvasElement | null;

export enum ModoImagem {
    OUTLINE="outline",
    SOLID="solid"
}

function em_radianos(angulo_em_graus: number) {
    return angulo_em_graus * Math.PI / 180
}

export abstract class Imagem {

    largura: number;
    altura: number;
    angulo: number;
    espelhado: boolean;

    constructor(largura: number, altura: number, angulo: number) {
        this.largura = largura;
        this.altura = altura;
        this.angulo = angulo;
        this.espelhado = false;
    }
    
    abstract desenha(x?: number|null, y?: number|null): void;

    redimensionar(proporcao: number) {
        return Object.assign(Object.create(this), 
            {
                largura: this.largura * proporcao, 
                altura: this.altura * proporcao
            })
    }

    rotacionar(angulo: number): Imagem {
        return Object.assign(Object.create(this), {...this, angulo: this.angulo + angulo})
    }

    espelhar(): Imagem {
        return Object.assign(Object.create(this), {...this, espelhado: !this.espelhado})
    }

}


class FolhaTransparente extends Imagem {

    constructor(largura: number, altura: number) {
        super(largura, altura, 0);
    }

    desenha(x: number|null = null, y: number|null = null) {

        x = x == null? canvas!.width/2: x;
        y = y == null? canvas!.height/2: y;

        let ctx = canvas!.getContext("2d");
        ctx!.save();
        ctx!.translate(x-this.largura/2, y-this.altura/2);
    }

    
}

class CenaVazia extends Imagem {


    constructor(largura: number, altura: number) {
        super(largura, altura, 0);
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
    imagemFundo: FolhaTransparente | ImagemComposta | CenaVazia;

    constructor(imagemFrente: Imagem, x: number, y: number, imagemFundo: CenaVazia|ImagemComposta) {
        super(imagemFundo.largura, imagemFundo.altura, 0);
        this.imagemFrente = imagemFrente;
        this.x = x;
        this.y = y;
        this.imagemFundo = imagemFundo;
    }

    desenha(x: number|null = null, y: number|null = null) {
        this.imagemFundo.desenha(x, y);
        // let ctx = canvas!.getContext("2d");
        // ctx!.save();
        // ctx!.translate(x!, y!);
        this.imagemFrente.desenha(this.x, this.y);

    }

    redimensionar(proporcao: number) {
        return Object.assign(Object.create(this), {
            ...super.redimensionar(proporcao),
            imagemFundo: this.imagemFundo.redimensionar(proporcao),
            imagemFrente: this.imagemFrente.redimensionar(proporcao)
        })//TODO: criar versão que redimensiona considerando o distanciamento dos objetos
    }

    rotacionar(angulo: number): Imagem {
        return Object.assign(Object.create(this), {
            ...super.rotacionar(angulo),
            imagemFundo: this.imagemFundo.rotacionar(angulo),
            imagemFrente: this.imagemFrente.rotacionar(angulo)
        })//TODO: criar versão que redimensiona considerando o distanciamento dos objetos
    }

}

abstract class RetLike extends Imagem {

    cor: string;
    modo: ModoImagem;

    constructor(largura: number, altura: number, cor: string, modo: ModoImagem, angulo: number) {
        super(largura, altura, angulo)
        this.cor = cor;
        this.modo = modo;
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

        if (this.espelhado) {
            ctx!.translate(this.largura, 0);
            ctx!.scale(-1,1)
        }

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

        if (this.espelhado) {
            ctx!.translate(this.largura, 0);
            ctx!.scale(-1,1)
        }
        
           
        ctx!.ellipse(x, y, this.largura/2, this.altura/2, em_radianos(this.angulo), 0, 2*Math.PI);
        if (this.modo == ModoImagem.OUTLINE) {         
            ctx!.strokeStyle = this.cor;
            ctx!.stroke();
        } else {          
            ctx!.fillStyle = this.cor;
            ctx!.fill();
        }   
    }
}


class ImagemDeArquivo extends Imagem {
    src: string;
    img: HTMLImageElement;

    constructor(src: string, largura: number, altura: number, angulo: number) {
        super(largura, altura, angulo);
        this.src = src;
        this.img = new Image();
        this.img.src = this.src
    }

    private desenha_rotacionando(x:number, y:number) {
        let ctx = canvas!.getContext("2d");
        ctx!.save()    
        ctx!.translate(x, y);
        ctx!.rotate(em_radianos(this.angulo));
        ctx!.translate(-this.largura / 2, -this.altura / 2);    
        
        if (this.espelhado) {
            ctx!.translate(this.largura, 0)
            ctx!.scale(-1,1)        
        } 
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

}



function limparCanvas() {
    let ctx = canvas!.getContext("2d");
    ctx!.restore();
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
}



// FUNÇÕES EXPORTADAS:

export function colocarImagem(imagemFrente: Imagem, x: number, y: number, imagemFundo: CenaVazia|ImagemComposta) {
    return new ImagemComposta(imagemFrente, x, y, imagemFundo)
}

export function cenaVazia(largura: number, altura: number) {
    return new CenaVazia(largura, altura, 0);
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

export function folhaTransparente(largura: number, altura: number) {
    return new FolhaTransparente(largura, altura);
}

export function lado(img1: Imagem, img2: Imagem) {
    let folhaT = folhaTransparente(img1.largura + img2.largura, Math.max(img1.altura, img2.altura));
    let layer1 = colocarImagem(img1, 0+img1.largura/2, 0+img1.altura/2, folhaT);
    let layer2 = colocarImagem(img2, img1.largura+img2.largura/2, 0+img2.altura/2, layer1);

    return layer2
}

export function encima(img1: Imagem, img2: Imagem) {
    let folhaT = folhaTransparente(Math.max(img1.largura, img2.largura), img1.altura + img2.altura);
    let layer1 = colocarImagem(img1, 0+img1.largura/2, 0+img1.altura/2, folhaT);
    let layer2 = colocarImagem(img2, img2.largura/2, img1.altura+img2.altura/2, layer1);

    return layer2
}


export function sobrepor(img1: Imagem, img2: Imagem) {
    let folhaT = folhaTransparente(Math.max(img1.largura, img2.largura), Math.max(img1.altura, img2.altura));
    let layer1 = colocarImagem(img1, 0+img1.largura/2, 0+img1.altura/2, folhaT);
    let layer2 = colocarImagem(img2, 0+img1.largura/2, 0+img2.altura/2, layer1);

    return layer2

}