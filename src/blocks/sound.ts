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

export default class SoundBlocks extends CoreCubeBlock {
  public getInfo() {
    return [
      {
        opcode: 'playNoteFor',
        blockType: BlockType.COMMAND,
        text: formatMessage({
          id: 'toio.playNoteFor',
          default: 'play note [NOTE] for [DURATION] seconds',
          description: 'play note for the specified duration'
        }),
        arguments: {
          NOTE: {
            type: ArgumentType.NOTE,
            defaultValue: 60
          },
          DURATION: {
            type: ArgumentType.NUMBER,
            defaultValue: 1
          }
        }
      },
      {
        opcode: 'stopNote',
        blockType: BlockType.COMMAND,
        text: formatMessage({
          id: 'toio.stopNote',
          default: 'stop note',
          description: 'stop note'
        })
      },
      '---'
    ]
  }

  public playNoteFor(args: { NOTE: string; DURATION: string }) {
    const duration = Cast.toNumber(args.DURATION)
    if (duration <= 0) {
      return
    }

    const note = Cast.toNumber(args.NOTE)

    return this.generateCancelablePromise(
      () => {
        this.coreCube.playSound(note, 127, 2.55)
      },
      () => {
        this.stop()
      },
      duration
    )
  }

  public stopNote() {
    this.stop(true)
  }

  public stop(forceToStop: boolean = false): boolean {
    const wasRunning = super.stop()

    if (wasRunning || forceToStop) {
      this.coreCube.stopSound()
    }

    return wasRunning
  }
}
