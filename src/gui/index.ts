/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import toioLogo from '../images/logo.png'
import coreCubeImageL from '../images/cube_l.svg'
import coreCubeImageM from '../images/cube_m.svg'

import './about'

const SCRATCH_TRADEMARKS = [
  'Cat',
  'Cat Flying',
  'Gobo',
  'Pico',
  'Pico Walking',
  'Nano',
  'Tera',
  'Giga',
  'Giga Walking'
]

class Gui {
  public get INFO() {
    return {
      name: 'toio',
      extensionId: 'toio',
      collaborator: 'Sony Interactive Entertainment Inc.',
      iconURL: toioLogo,
      insetIconURL: coreCubeImageM,
      description: 'つくって、あそんで、ひらめいて。',
      featured: true,
      disabled: false,
      bluetoothRequired: true,
      launchPeripheralConnectionFlow: true,
      useAutoScan: false,
      peripheralImage: coreCubeImageL,
      smallPeripheralImage: coreCubeImageM,
      connectingMessage: '接続中',
      helpLink: 'https://toio.io/programming/visual-programming.html'
    }
  }

  public get ANALYTICS() {
    return {
      debug: false,
      testMode: true
    }
  }

  public get DEFAULT_PROJECT() {
    return require('./default-project').default
  }

  public filter(sprites: any[]) {
    return sprites.filter(
      (sprite: any) => !SCRATCH_TRADEMARKS.includes(sprite.name)
    )
  }
}

module.exports = new Gui()
