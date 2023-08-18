import { ModoImagem, carregarImagem, cenaVazia, retangulo } from "../../lib/image";




const LARGURA = 600;
const ALTURA = 600;

const TELA_VAZIA = cenaVazia(LARGURA, ALTURA);

const ret1 = retangulo(50, 150, "red", ModoImagem.SOLID);

const VACA = carregarImagem("./vaca-ino.png", 200, 200);

const ret3 = ret1.rotacionar(62)

const ret4 = ret3.espelhar()

// ret3.desenha()

// const ret4 = ret3.espelhar()

ret4.desenha()


const retEsp = ret1.espelhar();

// retEsp.desenha()

const VACA_ESP = VACA.espelhar();
// VACA_ESP.desenha()

const VACA_ESP_ROT = VACA_ESP.rotacionar(60);
// VACA_ESP_ROT.desenha();

const VACA_ROT = VACA.rotacionar(60);

// VACA_ROT.desenha()

const VACA_ROT_ESP = VACA_ROT.espelhar()

// VACA_ROT_ESP.desenha()