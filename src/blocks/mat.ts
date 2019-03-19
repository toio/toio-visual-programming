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
import Card from '../toio/card'

import translations from '../translations'
import Mat from '../toio/mat'

export default class MatBlocks extends CoreCubeBlock {
  public getInfo() {
    return [
      {
        opcode: 'whenTouched',
        blockType: BlockType.HAT,
        text: formatMessage({
          id: 'toio.whenTouched',
          default: 'when [TYPE] is touched',
          description: 'when mat, card or sticker is touched'
        }),
        arguments: {
          TYPE: this.menus.DetectedTypes
        }
      },
      {
        opcode: 'isTouched',
        blockType: BlockType.BOOLEAN,
        text: formatMessage({
          id: 'toio.isTouched',
          default: '[TYPE] is touched',
          description: 'If mat, card or sticker is touched'
        }),
        func: 'whenTouched',
        arguments: {
          TYPE: this.menus.DetectedTypes
        }
      }
    ]
  }

  private static MENUS = [
    'mat',

    'frontCard',
    'backCard',
    'leftCard',
    'rightCard',
    'goCard',
    'typhoonCard',
    'rushCard',
    'autoTackleCard',
    'randomCard',
    'pushPowerUpCard',
    'strutPowerUpCard',
    'sideAttackCard',
    'easyModeCard',
    'anyCard',

    'spinSticker',
    'shockSticker',
    'wobbleSticker',
    'panicSticker',
    'speedUpSticker',
    'speedDownSticker',
    'anySticker',

    'whiteCell',
    'redCell',
    'greenCell',
    'yellowCell',
    'blueCell'
  ]

  public get menus() {
    const values = MatBlocks.MENUS.map((menuItem: string) => {
      const id = 'toio.whenTouchedMenu.' + menuItem
      const value = translations.en[id]

      return {
        text: formatMessage({
          id,
          default: value,
          description: value
        }),
        value
      }
    })

    return {
      DetectedTypes: {
        type: ArgumentType.STRING,
        menu: 'detectedTypes',
        values,
        defaultValue: values[0].value
      }
    }
  }

  public whenTouched(args: { TYPE: string }): boolean {
    const state = this.coreCube.getState()

    switch (args.TYPE) {
      case 'mat':
        return Mat.checkIfOnMat(state)

      case 'any card':
        return Card.checkIfMatchAnyType(state, 'card')

      case 'any sticker':
        return Card.checkIfMatchAnyType(state, 'sticker')

      case 'white cell':
      case 'red cell':
      case 'green cell':
      case 'yellow cell':
      case 'blue cell':
        return Mat.checkIfMatchColor(state, args.TYPE)

      default:
        return Card.checkIfMatchStandardId(state, args.TYPE)
    }

    return false
  }
}
