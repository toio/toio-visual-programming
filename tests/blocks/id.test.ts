/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import { initialize, convertFromIntegerToByteArray } from '../util'

let blocks
let notify

beforeEach(async () => {
  const util = await initialize('')
  blocks = util.blocks
  notify = util.notify
})

describe('"getXPosition" block', () => {
  it('gets a x position on a mat correctly', async () => {
    notify(
      1,
      convertFromIntegerToByteArray(200, 2),
      convertFromIntegerToByteArray(300, 2),
      convertFromIntegerToByteArray(45, 2)
    )

    expect(blocks.getXPosition()).toMatchSnapshot()
  })
})

describe('"getYPosition" block', () => {
  it('gets a y position on a mat correctly', async () => {
    notify(
      1,
      convertFromIntegerToByteArray(200, 2),
      convertFromIntegerToByteArray(300, 2),
      convertFromIntegerToByteArray(45, 2)
    )

    expect(blocks.getYPosition()).toMatchSnapshot()
  })
})

describe('"getDirection" block', () => {
  it('gets a direction on a mat correctly', async () => {
    notify(
      1,
      convertFromIntegerToByteArray(200, 2),
      convertFromIntegerToByteArray(300, 2),
      convertFromIntegerToByteArray(45, 2)
    )

    expect(blocks.getDirection()).toMatchSnapshot()
  })
})
