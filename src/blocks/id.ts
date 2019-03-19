/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import BlockType = require('scratch-vm/src/extension-support/block-type')
import formatMessage = require('format-message')

import CoreCubeBlock from './coreCubeBlock'

export default class IdBlocks extends CoreCubeBlock {
  public getInfo() {
    return [
      {
        opcode: 'getXPosition',
        blockType: BlockType.REPORTER,
        text: formatMessage({
          id: 'toio.stateTypeMenu.x',
          default: 'x position',
          description: 'x position'
        })
      },
      {
        opcode: 'getYPosition',
        blockType: BlockType.REPORTER,
        text: formatMessage({
          id: 'toio.stateTypeMenu.y',
          default: 'y position',
          description: 'y position'
        })
      },
      {
        opcode: 'getDirection',
        blockType: BlockType.REPORTER,
        text: formatMessage({
          id: 'toio.stateTypeMenu.direction',
          default: 'direction',
          description: 'direction'
        })
      },
      '---'
    ]
  }

  public getXPosition() {
    return this.coreCube.getState().x
  }

  public getYPosition() {
    return this.coreCube.getState().y
  }

  public getDirection() {
    return this.coreCube.getState().direction
  }
}
