/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import Runtime = require('scratch-vm/src/engine/runtime.js')

// tslint:disable-next-line:no-var-requires
const ToioBlocks = require('../src/index')

describe('ToioBlocks', () => {
  let blocks

  beforeEach(() => {
    const runtime = new Runtime()

    blocks = new ToioBlocks(runtime)
    blocks.getInfo()
  })

  it('stops a block', () => {
    blocks.stop()
  })

  it('stops all blocks', () => {
    blocks.stopAll()
  })
})
