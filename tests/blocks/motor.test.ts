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
  const util = await initialize('10b20102-5b3b-4571-9508-cf3efcd7bbae')
  blocks = util.blocks
  bleShouldWrite = util.bleShouldWrite
})

describe('"moveFor" block', () => {
  it('moves forward correctly', () => {
    const promise = blocks.moveFor({
      DIRECTION: 'forward',
      SPEED: 100,
      DURATION: 1
    })

    bleShouldWrite([1, 1, 1, 100, 2, 1, 100])

    jest.advanceTimersByTime(1000)

    return promise.catch(() => {
      bleShouldWrite([1, 1, 1, 0, 2, 1, 0])
    })
  })

  it('moves backward correctly', () => {
    const promise = blocks.moveFor({
      DIRECTION: 'backward',
      SPEED: 100,
      DURATION: 1
    })

    bleShouldWrite([1, 1, 2, 100, 2, 2, 100])

    jest.advanceTimersByTime(1000)

    return promise.catch(() => {
      bleShouldWrite([1, 1, 1, 0, 2, 1, 0])
    })
  })

  it('moves backward correctly with minus speed', () => {
    blocks.moveFor({
      DIRECTION: 'forward',
      SPEED: -100,
      DURATION: 1
    })

    bleShouldWrite([1, 1, 2, 100, 2, 2, 100])
  })

  it('moves forward correctly with minus speed', () => {
    blocks.moveFor({
      DIRECTION: 'backward',
      SPEED: -100,
      DURATION: 1
    })

    bleShouldWrite([1, 1, 1, 100, 2, 1, 100])
  })

  it('does not move with 0 duration', () => {
    blocks.moveFor({ LEFT_SPEED: 100, RIGHT_SPEED: 100, DURATION: 0 })

    expect(blocks.coreCube.ble.write).not.toHaveBeenCalled()
  })

  it('does not move with minus duration', () => {
    blocks.moveFor({ LEFT_SPEED: 100, RIGHT_SPEED: 100, DURATION: -1 })

    expect(blocks.coreCube.ble.write).not.toHaveBeenCalled()
  })

  it('does not move with string duration', () => {
    blocks.moveFor({ LEFT_SPEED: 100, RIGHT_SPEED: 100, DURATION: 'a' })

    expect(blocks.coreCube.ble.write).not.toHaveBeenCalled()
  })
})

describe('"rotateFor" block', () => {
  it('turns left correctly', () => {
    const promise = blocks.rotateFor({
      DIRECTION: 'left',
      SPEED: 100,
      DURATION: 1
    })

    bleShouldWrite([1, 1, 2, 100, 2, 1, 100])

    jest.advanceTimersByTime(1000)

    return promise.catch(() => {
      bleShouldWrite([1, 1, 1, 0, 2, 1, 0])
    })
  })

  it('turns right correctly', () => {
    const promise = blocks.rotateFor({
      DIRECTION: 'right',
      SPEED: 100,
      DURATION: 1
    })

    bleShouldWrite([1, 1, 1, 100, 2, 2, 100])

    jest.advanceTimersByTime(1000)

    return promise.catch(() => {
      bleShouldWrite([1, 1, 1, 0, 2, 1, 0])
    })
  })

  it('turns right correctly with minus speed', () => {
    blocks.rotateFor({ DIRECTION: 'left', SPEED: -100, DURATION: 1 })

    bleShouldWrite([1, 1, 1, 100, 2, 2, 100])
  })

  it('turns left correctly with minus speed', () => {
    blocks.rotateFor({ DIRECTION: 'right', SPEED: -100, DURATION: 1 })

    bleShouldWrite([1, 1, 2, 100, 2, 1, 100])
  })
})

describe('"moveWheelsFor" block', () => {
  it('moves correctly', () => {
    const promise = blocks.moveWheelsFor({
      LEFT_SPEED: 100,
      RIGHT_SPEED: 100,
      DURATION: 1
    })

    bleShouldWrite([1, 1, 1, 100, 2, 1, 100])

    jest.advanceTimersByTime(1000)

    return promise.catch(() => {
      bleShouldWrite([1, 1, 1, 0, 2, 1, 0])
    })
  })

  it('moves correctly with minus speed', () => {
    blocks.moveWheelsFor({ LEFT_SPEED: -100, RIGHT_SPEED: -100, DURATION: 1 })

    bleShouldWrite([1, 1, 2, 100, 2, 2, 100])
  })

  it('moves correctly with exceeded maximum speed', () => {
    blocks.moveWheelsFor({ LEFT_SPEED: 200, RIGHT_SPEED: 150, DURATION: 1 })

    bleShouldWrite([1, 1, 1, 100, 2, 1, 100])
  })

  it('moves correctly with exceeded minimum speed', () => {
    blocks.moveWheelsFor({
      LEFT_SPEED: -200,
      RIGHT_SPEED: -150,
      DURATION: 1
    })

    bleShouldWrite([1, 1, 2, 100, 2, 2, 100])
  })
})

describe('"moveTo" block', () => {
  it('moves to a specified position correctly', () => {
    const promise = blocks.moveTo({ X: 100, Y: 50 })

    jest.advanceTimersByTime(60)

    bleShouldWrite([1, 1, 1, 49, 2, 1, 70])

    blocks.coreCube.state.x = 100
    blocks.coreCube.state.y = 50

    jest.advanceTimersByTime(60)

    return promise.catch(() => {
      bleShouldWrite([1, 1, 1, 0, 2, 1, 0])
    })
  })
})

describe('"pointInDirection" block', () => {
  it('turns correctly', () => {
    const promise = blocks.pointInDirection({ DIRECTION: 45 })

    jest.advanceTimersByTime(60)

    bleShouldWrite([1, 1, 2, 28, 2, 1, 28])

    blocks.coreCube.state.rawDirection = 45 + 270

    jest.advanceTimersByTime(60)

    return promise.catch(() => {
      bleShouldWrite([1, 1, 1, 0, 2, 1, 0])
    })
  })

  it('turns correctly with exceeded maximum angle', () => {
    blocks.pointInDirection({ DIRECTION: 10000 })

    jest.advanceTimersByTime(60)

    bleShouldWrite([1, 1, 2, 40, 2, 1, 40])
  })
})

describe('"stopWheels" block', () => {
  it('stops correctly', () => {
    const promise = blocks.stopWheels()

    bleShouldWrite([1, 1, 1, 0, 2, 1, 0])
  })
})
