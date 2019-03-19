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
  const util = await initialize('10b20102-5b3b-4571-9508-cf3efcd7bbae')
  blocks = util.blocks
  notify = util.notify
})

describe('"whenTouched" block', () => {
  it('gets a state that mat is touched correctly', async () => {
    notify(
      1,
      convertFromIntegerToByteArray(200, 2),
      convertFromIntegerToByteArray(300, 2),
      convertFromIntegerToByteArray(45, 2)
    )

    expect(blocks.whenTouched({ TYPE: 'mat' })).toBeTruthy()
    expect(blocks.whenTouched({ TYPE: 'front card' })).toBeFalsy()
    expect(blocks.whenTouched({ TYPE: 'panic sticker' })).toBeFalsy()
    expect(blocks.whenTouched({ TYPE: 'red cell' })).toBeFalsy()
  })

  it('gets a state that the front card is touched correctly', async () => {
    notify(
      2,
      convertFromIntegerToByteArray(3670026, 4),
      convertFromIntegerToByteArray(300, 2)
    )

    expect(blocks.whenTouched({ TYPE: 'mat' })).toBeFalsy()
    expect(blocks.whenTouched({ TYPE: 'front card' })).toBeTruthy()
    expect(blocks.whenTouched({ TYPE: 'any card' })).toBeTruthy()
    expect(blocks.whenTouched({ TYPE: 'panic sticker' })).toBeFalsy()
    expect(blocks.whenTouched({ TYPE: 'red cell' })).toBeFalsy()
  })

  it('gets a state that the panic sticker is touched correctly', async () => {
    notify(
      2,
      convertFromIntegerToByteArray(3670032, 4),
      convertFromIntegerToByteArray(300, 2)
    )

    expect(blocks.whenTouched({ TYPE: 'mat' })).toBeFalsy()
    expect(blocks.whenTouched({ TYPE: 'front card' })).toBeFalsy()
    expect(blocks.whenTouched({ TYPE: 'panic sticker' })).toBeTruthy()
    expect(blocks.whenTouched({ TYPE: 'any sticker' })).toBeTruthy()
    expect(blocks.whenTouched({ TYPE: 'red cell' })).toBeFalsy()
  })

  it('gets a state that red cell is touched correctly', async () => {
    notify(
      1,
      convertFromIntegerToByteArray(750, 2),
      convertFromIntegerToByteArray(200, 2),
      convertFromIntegerToByteArray(45, 2)
    )

    expect(blocks.whenTouched({ TYPE: 'mat' })).toBeTruthy()
    expect(blocks.whenTouched({ TYPE: 'front card' })).toBeFalsy()
    expect(blocks.whenTouched({ TYPE: 'panic sticker' })).toBeFalsy()
    expect(blocks.whenTouched({ TYPE: 'red cell' })).toBeTruthy()
  })

  it('gets a state that mat is not touched correctly', async () => {
    notify(3)

    expect(blocks.whenTouched({ TYPE: 'mat' })).toBeFalsy()
    expect(blocks.whenTouched({ TYPE: 'front card' })).toBeFalsy()
    expect(blocks.whenTouched({ TYPE: 'panic sticker' })).toBeFalsy()
    expect(blocks.whenTouched({ TYPE: 'red cell' })).toBeFalsy()
  })

  it('gets a state that mat is not touched correctly', async () => {
    notify(4)

    expect(blocks.whenTouched({ TYPE: 'mat' })).toBeFalsy()
    expect(blocks.whenTouched({ TYPE: 'front card' })).toBeFalsy()
    expect(blocks.whenTouched({ TYPE: 'panic sticker' })).toBeFalsy()
    expect(blocks.whenTouched({ TYPE: 'red cell' })).toBeFalsy()
  })
})
