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
import Mat from '../toio/mat'
import MotorBlocks from './motor'

export default class GridBlocks extends CoreCubeBlock {
  private motorBlocks: MotorBlocks

  public getInfo() {
    return [
      {
        opcode: 'moveToOnGrid',
        blockType: BlockType.COMMAND,
        text: formatMessage({
          id: 'toio.moveToOnGrid',
          default: 'move to column: [COLUMN] row: [ROW]',
          description: 'move to the specified column and row'
        }),
        arguments: {
          COLUMN: this.menus.Values,
          ROW: this.menus.Values
        }
      },
      {
        opcode: 'getColumnIndex',
        blockType: BlockType.REPORTER,
        text: formatMessage({
          id: 'toio.getColumnIndex',
          default: 'column index on grid"',
          description: 'get column index on grid'
        })
      },
      {
        opcode: 'getRowIndex',
        blockType: BlockType.REPORTER,
        text: formatMessage({
          id: 'toio.getRowIndex',
          default: 'row index on grid"',
          description: 'get row index on grid'
        })
      },
      '---'
    ]
  }

  public get menus() {
    return {
      Values: {
        type: ArgumentType.STRING,
        menu: 'stateTypes',
        values: ['4', '3', '2', '1', '0', '-1', '-2', '-3', '-4'],
        defaultValue: '0'
      },
      MatAxes: {
        type: ArgumentType.STRING,
        menu: 'matAxes',
        values: [
          {
            text: formatMessage({
              id: 'toio.getColumnOrRowIndexMenu.column',
              default: 'column',
              description: 'column'
            }),
            value: 'column'
          },
          {
            text: formatMessage({
              id: 'toio.getColumnOrRowIndexMenu.row',
              default: 'row',
              description: 'row'
            }),
            value: 'row'
          }
        ],
        defaultValue: 'column'
      }
    }
  }

  public setBlocks(blocks: CoreCubeBlock[]) {
    super.setBlocks(blocks)

    this.blocks.forEach((block: CoreCubeBlock) => {
      if (block instanceof MotorBlocks) {
        this.motorBlocks = block
      }
    })
  }

  public moveToOnGrid(args: { COLUMN: string; ROW: string }) {
    const column = Cast.toNumber(args.COLUMN)
    const row = Cast.toNumber(args.ROW)

    const x = Mat.convertColumnToX(column)
    const y = Mat.convertRowToY(row)

    return this.motorBlocks.moveTo({ X: x, Y: y })
  }

  public getColumnIndex(): number {
    const state = this.coreCube.getState()

    if (!Mat.checkIfOnColoredMat(state)) {
      return 0
    }

    return Mat.convertXToColumn(state.rawX)
  }

  public getRowIndex(): number {
    const state = this.coreCube.getState()

    if (!Mat.checkIfOnColoredMat(state)) {
      return 0
    }

    return Mat.convertYToRow(state.rawY)
  }
}
