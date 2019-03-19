/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import CancelableBlock from './cancelableBlock'

import CoreCube from '../toio/coreCube'

export default class CoreCubeBlock extends CancelableBlock {
  protected coreCube: CoreCube
  protected blocks: CoreCubeBlock[]

  constructor(coreCube: CoreCube) {
    super()

    this.coreCube = coreCube
  }

  public setBlocks(blocks: CoreCubeBlock[]) {
    this.blocks = blocks
  }

  public getInfo() {
    return []
  }

  public getFunctions() {
    return this.getInfo().map((block: any) => {
      if (!block.opcode) {
        return block
      }

      const func = this[block.func || block.opcode]
      if (!func) {
        console.warn(`Function "${block.opcode}" is missing`)
        return
      }

      return {
        opcode: block.opcode,
        func: func.bind(this)
      }
    })
  }
}
