/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import { initialize, convertFromIntegerToByteArray } from '../util'

let blocks
let bleShouldWrite
let notify

beforeEach(async () => {
  const util = await initialize('10b20102-5b3b-4571-9508-cf3efcd7bbae')
  blocks = util.blocks
  bleShouldWrite = util.bleShouldWrite
  notify = util.notify
})

describe('"moveToOnGrid" block', () => {
  it('moves to a specified column and row correctly', () => {
    jest.useFakeTimers()

    const promise = blocks.moveToOnGrid({
      COLUMN: 4,
      ROW: 4
    })

    jest.advanceTimersByTime(60)

    bleShouldWrite([1, 1, 1, 35, 2, 1, 70])
  })
})

describe('"getColumnIndex" block', () => {
  it('gets a column index on a grid mat correctly', async () => {
    notify(
      1,
      convertFromIntegerToByteArray(930, 2),
      convertFromIntegerToByteArray(400, 2),
      convertFromIntegerToByteArray(45, 2)
    )

    expect(blocks.getColumnIndex()).toMatchSnapshot()
  })
})

describe('"getRowIndex" block', () => {
  it('gets a y position on a mat correctly', async () => {
    notify(
      1,
      convertFromIntegerToByteArray(930, 2),
      convertFromIntegerToByteArray(400, 2),
      convertFromIntegerToByteArray(45, 2)
    )

    expect(blocks.getRowIndex()).toMatchSnapshot()
  })
})
