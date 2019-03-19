/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import { initialize } from '../util'

let blocks
let bleShouldWrite

beforeEach(async () => {
  const util = await initialize('10b20104-5b3b-4571-9508-cf3efcd7bbae', true)
  blocks = util.blocks
  bleShouldWrite = util.bleShouldWrite
})

describe('"playNoteFor" block', () => {
  it('plays a note correctly', async () => {
    const promise = blocks.playNoteFor({ NOTE: 60, DURATION: 1 })

    bleShouldWrite([3, 0, 1, 254, 60, 127])

    jest.advanceTimersByTime(1000)

    return promise.catch(() => {
      bleShouldWrite([1])
    })
  })
})

describe('"stopNote" block', () => {
  it('stops a note correctly', async () => {
    blocks.stopNote()

    bleShouldWrite([1])
  })
})
