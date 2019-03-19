/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import formatMessage = require('format-message')

import CoreCube from './toio/coreCube'
import Blocks from './blocks'
import coreCubeImage from './images/cube_s.svg'
import translations from './translations'

class ToioBlocks {
  private static EXTENSION_NAME = 'toio'

  private runtime: any
  private coreCube: CoreCube
  private blocks: Blocks

  public static get gui() {
    return require('./gui')
  }

  constructor(runtime: any) {
    this.runtime = runtime

    formatMessage.setup({
      translations,
      locale: 'ja'
    })

    this.coreCube = new CoreCube(this.runtime, ToioBlocks.EXTENSION_NAME)

    this.blocks = new Blocks(this.coreCube)
    for (const blockFunction of this.blocks.functions) {
      ToioBlocks.prototype[blockFunction.opcode] = blockFunction.func
    }

    this.runtime.on('PROJECT_RUN_STOP', this.stop.bind(this))
    this.runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this))
  }

  public getInfo(locale: string) {
    formatMessage.setup({
      translations,
      locale: locale || 'ja'
    })

    this.blocks.updateTexts()

    return {
      id: ToioBlocks.EXTENSION_NAME,
      blockIconURI: coreCubeImage,
      colour: '#00aeca',
      colourSecondary: '#0094ab',
      colourTertiary: '#0189a0',
      showStatusButton: true,
      blocks: this.blocks.info,
      menus: this.blocks.menus
    }
  }

  private stop() {
    this.blocks.stop(false)
  }

  private stopAll() {
    this.blocks.stop(true)
  }
}

module.exports = ToioBlocks
