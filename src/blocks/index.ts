/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import MotorBlocks from './motor'
import IdBlocks from './id'
import LightBlocks from './light'
import SoundBlocks from './sound'
import MatGridBlocks from './matGrid'
import MatBlocks from './mat'

import CoreCubeBlock from './coreCubeBlock'
import CoreCube from '../toio/coreCube'

export default class Blocks {
  private static BLOCK_CLASSES = [
    MotorBlocks,
    IdBlocks,
    LightBlocks,
    SoundBlocks,
    MatGridBlocks,
    MatBlocks
  ]

  public info: any
  public functions: any
  public menus: any

  private blocks: CoreCubeBlock[]

  constructor(coreCube: CoreCube) {
    this.blocks = Blocks.BLOCK_CLASSES.map(
      (blockClass: any) => new blockClass(coreCube)
    )
    this.blocks.forEach((block: CoreCubeBlock) => {
      block.setBlocks(this.blocks)
    })

    this.info = this.merge(this.blocks, (block: CoreCubeBlock) =>
      block.getInfo()
    )

    this.functions = this.merge(this.blocks, (block: CoreCubeBlock) =>
      block.getFunctions()
    )

    const menus = this.merge(this.blocks, (block: CoreCubeBlock) =>
      this.getMenus(block)
    )
    this.menus = menus.reduce((acc, menu) => ({ ...acc, ...menu }), {})
  }

  public updateTexts() {
    this.info = this.merge(this.blocks, (block: CoreCubeBlock) =>
      block.getInfo()
    )

    const menus = this.merge(this.blocks, (block: CoreCubeBlock) =>
      this.getMenus(block)
    )
    this.menus = menus.reduce((acc, menu) => ({ ...acc, ...menu }), {})
  }

  private merge(blocks, func) {
    return blocks.reduce((acc, block) => {
      const result = func(block)
      return result ? acc.concat(result) : acc
    }, [])
  }

  private getMenus(blocks) {
    if (!blocks.menus) {
      return
    }

    const result = {}
    for (const key of Object.keys(blocks.menus)) {
      const menu = blocks.menus[key]
      result[menu.menu] = menu.values
    }

    return result
  }

  public stop(forceToStop: boolean) {
    this.blocks.forEach((block: CoreCubeBlock) => {
      block.stop(forceToStop)
    })
  }
}
