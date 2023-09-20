/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const canvas = (document.getElementById('tela') ?? document.createElement('canvas')) as HTMLCanvasElement

export interface Settings {
  aCadaTick?: Function
  frequencia?: number
  desenhar?: Function
  quandoTecla?: Function
  quandoSoltaTecla?: Function
  quandoMouse?: Function
  pararQuando?: Function
  modoDebug?: boolean
}

const defaultSettings: Settings = {
  aCadaTick: x => x,
  frequencia: 60,
  desenhar: x => null,
  quandoTecla: (x, k) => x,
  quandoSoltaTecla: (x, k) => x,
  pararQuando: x => false,
  quandoMouse: (x, ev) => x,
  modoDebug: false
}

export function reactor(inic: any, settings: Settings = defaultSettings): void {
  Object.keys(defaultSettings).forEach(function (key) {
    if (settings[key] === undefined) {
      settings[key] = defaultSettings[key]
    }
  })

  let estado = inic

  document.addEventListener('keydown', (ev) => {
    estado = settings.quandoTecla!(estado, ev.key)
  })

  document.addEventListener('keyup', (ev) => {
    estado = settings.quandoSoltaTecla!(estado, ev.key)
  })

  const trataMouse = ev => {
    const x = ev.offsetX
    const y = ev.offsetY
    estado = settings.quandoMouse!(estado, x, y, ev.type)
  }

  canvas.addEventListener('mousedown', trataMouse)
  canvas.addEventListener('mousemove', trataMouse)
  canvas.addEventListener('mouseup', trataMouse) // TODO: verificar necessidade de tratar mais eventos de mouse

  const timeStep = 1000 / settings.frequencia!

  let previousTime = 0.0
  let delta = 0.0

  const loop = time => {
    // Calcula o delta-t em relação ao tempo atual (time)
    const dt = time - previousTime

    // Acumula o delta-t
    delta = delta + dt

    // Atualiza o tempo anterior
    previousTime = time

    // Atualiza o jogo
    while (delta > timeStep) {
      if (settings.pararQuando!(estado)) {
        return
      }

      estado = settings.aCadaTick!(estado)

      delta = delta - timeStep
    }

    // Desenha (renderiza) o jogo
    settings.desenhar!(estado).desenha()

    // Repete
    window.requestAnimationFrame(loop)
  }

  // Launch
  window.requestAnimationFrame(time => {
    previousTime = time
    window.requestAnimationFrame(loop)
  })
}
