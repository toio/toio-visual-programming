/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import ArgumentType = require('scratch-vm/src/extension-support/argument-type')
import BlockType = require('scratch-vm/src/extension-support/block-type')
import Cast = require('scratch-vm/src/util/cast')
import formatMessage = require('format-message')

import CoreCubeBlock from './coreCubeBlock'

export default class LightBlocks extends CoreCubeBlock {
  private static LightColors = {
    white: [255, 255, 255],
    red: [255, 0, 0],
    green: [0, 255, 0],
    yellow: [255, 255, 0],
    blue: [0, 0, 255],
    magenta: [255, 0, 255],
    cyan: [0, 255, 255]
  }

  public getInfo() {
    return [
      {
        opcode: 'setLightColorFor',
        blockType: BlockType.COMMAND,
        text: formatMessage({
          id: 'toio.setLightColorFor',
          default: '"set light color to [COLOR] for [DURATION] seconds',
          description: 'set light color'
        }),
        arguments: {
          COLOR: {
            type: ArgumentType.COLOR
          },
          DURATION: {
            type: ArgumentType.NUMBER,
            defaultValue: 1
          }
        }
      },
      {
        opcode: 'turnOffLight',
        blockType: BlockType.COMMAND,
        text: formatMessage({
          id: 'toio.turnOffLight',
          default: 'turn off light',
          description: 'turn off light'
        })
      },
      '---'
    ]
  }

  public setLightColorFor(args: { COLOR: string; DURATION: string }) {
    const duration = Cast.toNumber(args.DURATION)
    if (duration <= 0) {
      return
    }

    const color = this.convertColorFromStringIntoIntegers(args.COLOR)

    return this.generateCancelablePromise(
      () => {
        this.coreCube.setLightColor(color)
      },
      () => {
        this.stop()
      },
      duration
    )
  }

  private convertColorFromStringIntoIntegers(color: string): number[] {
    const presetColor = LightBlocks.LightColors[color]
    if (presetColor) {
      return presetColor
    }

    if (color[0] === '#') {
      // Hex
      const r = parseInt(color.slice(1, 3), 16)
      const g = parseInt(color.slice(3, 5), 16)
      const b = parseInt(color.slice(5, 7), 16)

      return [r, g, b]
    } else {
      // Array of decimal
      return color.split(' ').map((value: string) => parseInt(value, 10))
    }
  }

  public turnOffLight() {
    this.stop(true)
  }

  public stop(forceToStop: boolean = false): boolean {
    const wasRunning = super.stop()

    if (wasRunning || forceToStop) {
      this.coreCube.turnOffLight()
    }

    return wasRunning
  }
}
