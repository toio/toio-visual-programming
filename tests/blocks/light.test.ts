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
  const util = await initialize('10b20103-5b3b-4571-9508-cf3efcd7bbae', true)
  blocks = util.blocks
  bleShouldWrite = util.bleShouldWrite
})

describe('"setLightColorFor" block', () => {
  it('sets a light color correctly', async () => {
    const promise = blocks.setLightColorFor({ COLOR: 'white', DURATION: 1 })

    bleShouldWrite([3, 0, 1, 1, 255, 255, 255])

    jest.advanceTimersByTime(1000)

    return promise.catch(() => {
      bleShouldWrite([1])
    })
  })

  it('sets a light color correctly with ("#...")', async () => {
    const promise = blocks.setLightColorFor({ COLOR: '#ff00ff', DURATION: 1 })

    bleShouldWrite([3, 0, 1, 1, 255, 0, 255])

    jest.advanceTimersByTime(1000)

    return promise.catch(() => {
      bleShouldWrite([1])
    })
  })

  it('sets a light color correctly with ("r g b")', async () => {
    const promise = blocks.setLightColorFor({
      COLOR: '0, 127, 255',
      DURATION: 1
    })

    bleShouldWrite([3, 0, 1, 1, 0, 127, 255])

    jest.advanceTimersByTime(1000)

    return promise.catch(() => {
      bleShouldWrite([1])
    })
  })
})

describe('"turnOffLight" block', () => {
  it('turns off a light correctly', async () => {
    blocks.turnOffLight()

    bleShouldWrite([1])
  })
})
