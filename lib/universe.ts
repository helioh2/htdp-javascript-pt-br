
const canvas = document.getElementById("tela") as HTMLCanvasElement;

export interface Settings {
    aCadaTick?: Function,
    frequencia?: number,
    desenhar?: Function,
    quandoTecla?: Function,
    quandoSoltaTecla?: Function,
    pararQuando?: Function,
    modoDebug?: boolean
}

const defaultSettings: Settings = {
    aCadaTick: x => x,
    frequencia: 60,
    desenhar: x => null,
    quandoTecla: (x, k) => x,
    quandoSoltaTecla: (x, k) => x,
    pararQuando: x => false,
    modoDebug: false,
}


export function bigBang(inic: any, settings: Settings = defaultSettings) {

    Object.keys(defaultSettings).forEach(function (key) {
        if (settings[key] === undefined) {
            settings[key] = defaultSettings[key];
        }
    });

    let estado = inic;

    const timeStep = 1000 / settings.frequencia!;

    let previousTime = 0.0;
    let delta = 0.0;

    const loop = time => {
        // Calcula o delta-t em relação ao tempo atual (time)
        const dt = time - previousTime;

        // Acumula o delta-t
        delta = delta + dt;

        // Atualiza o tempo anterior
        previousTime = time;

        // Atualiza o jogo
        while (delta > timeStep) {
            estado = settings.aCadaTick!(estado);

            delta = delta - timeStep;
        }

        // Desenha (renderiza) o jogo
        settings.desenhar!(estado).desenha();

        // Repete
        window.requestAnimationFrame(loop);
    };

    // Launch
    window.requestAnimationFrame(time => {
        previousTime = time;
        window.requestAnimationFrame(loop);
    });



// while True:

// pg.display.flip()

// if parar_quando(estado):
//    print(estado)
//    end_time = time.time()
//    print(end_time - inic_time)
//    sys.exit(0)
}


// def big_bang(inic,
//     tela=tela,
//     a_cada_tick=lambda e: e,
//     quando_tick=lambda e: e,
//     frequencia=28,
//     desenhar=lambda e: tela.blit(texto("NADA A MOSTRAR. VERIFIQUE SE VOCÊ PASSOU A FUNÇÃO DE DESENHHAR PARA O BIG-BANG", Fonte("monospace",30),
//                                        Cor("red"), tela.get_width()), (0, tela.get_height()//2)),
//     quando_tecla=lambda e, k: e, \
//     quando_solta_tecla=lambda e, k: e, \
//     quando_mouse=lambda e, x, y, ev: e, \
//     parar_quando=lambda e: False,\
//     modo_debug=False,
//     fonte_debug = 15,
//     cor_fundo = COR_BRANCO):
// '''
// Função que funciona como um framework para desenvolvimento de programas interativos.
// :param inic: EstadoMundo -- estado inicial do mundo (programa). O tipo EstadoMundo deve ser definido pelo programador.
// :param tela: Surface -- (opcional) insere tela diferente da padrão.
// :param quando_tick: Function: EstadoMundo -> EstadoMundo -- função que recebe o estado atual do mundo, gerando um novo estado.
// :param frequencia: Int -- frequência (frame rate) com que a função quando_tick é chamada.
// :param desenhar: Function: EstadoMundo -> Imagem -- função que recebe estado atual do mundo e cria uma imagem.
// :param quando_tecla: Function: EstadoMundo Tecla -> EstadoMundo -- função que recebe estado atual do mundo e o código de uma tecla (definido por pg.<NOME_TECLA>) quando a tecla é pressionada.
// :param quando_solta_tecla: Function: EstadoMundo Tecla -> EstadoMundo -- função que recebe estado atual do mundo e o código de uma tecla (definido por pg.<NOME_TECLA>) quando a tecla é solta.
// :param quando_mouse: Function: EstadoMundo EventoMouse Int Int -> EstadoMundo -- função que recebe estado atual do mundo, um código de evento de mouse (ex: pg.MOUSEBUTTONDOWN, pg.MOUSEBUTTONUP, pg.MOUSEMOTION), e a posição x e y em que o mouse se encontra na tela.
// :param parar_quando: Function: EstadoMundo -> Boolean -- função que recebe estado atual do mundo e responde se deve (True) ou não deve (False) parar o programa.
// :param modo_debug: Boolean -- flag que indica se devem aparecer informações de debug (escreve estado na tela).
// :param fonte_debug: Int -- tamanho da fonte do modo debug.
// :param cor_fundo: Cor -- cor do fundo
// :return: EstadoMundo -- estado final do mundo no momento em que programa foi parado.
// '''

// def verifica_valor_none(prox_estado, nome_funcao):
// if prox_estado is None:
//    raise ValueError("""ERRO: Opa, parece que sua função '"""+nome_funcao+"""' retornou None. 
//            Verifique se você deu return no estado de seu programa!""")
// else:
//    return prox_estado

// def quando_erro_invalido(err):
// raise ValueError("ERRO: Dados Inválidos\n\t--- "+str(err))
// sys.exit(0)

// estado = inic
// clock = pg.time.Clock()
// import time
// inic_time = time.time()

// tela.fill(cor_fundo)

// while True:

// pg.display.flip()

// if parar_quando(estado):
//    print(estado)
//    end_time = time.time()
//    print(end_time - inic_time)
//    sys.exit(0)

// for event in pg.event.get():
//    if event.type == pg.QUIT:
//        print(estado)
//        sys.exit(0)

//    if event.type == pg.KEYDOWN:
//        try:
//            prox_estado = quando_tecla(estado, event.key)
//            estado = verifica_valor_none(prox_estado, 'quando_tecla')
//        except ValueError as err:
//            quando_erro_invalido(err)
//    elif event.type == pg.KEYUP:
//        try:
//            prox_estado = quando_solta_tecla(estado, event.key)
//            estado = verifica_valor_none(prox_estado, 'quando_solta_tecla')
//        except ValueError as err:
//            quando_erro_invalido(err)
//    elif event.type in [pg.MOUSEBUTTONDOWN, pg.MOUSEBUTTONUP, pg.MOUSEMOTION]:
//        try:
//            x, y = pg.mouse.get_pos()
//            prox_estado = quando_mouse(estado, x, y, event.type)
//            estado = verifica_valor_none(prox_estado, 'quando_mouse')
//        except ValueError as err:
//            quando_erro_invalido(err)
// try:
//    prox_estado = quando_tick(a_cada_tick(estado))
//    estado = verifica_valor_none(prox_estado, 'a_cada_tick')
// except ValueError as err:
//    quando_erro_invalido(err)

// tela.fill(cor_fundo)
// desenhar(estado)
// if modo_debug:
//    escreve_estado(estado, fonte_debug)

// clock.tick(frequencia)