/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import { initialize } from './util'

let blocks
let bleShouldRead

beforeEach(async () => {
  const util = await initialize('10b20101-5b3b-4571-9508-cf3efcd7bbae')
  blocks = util.blocks
  bleShouldRead = util.bleShouldRead
})

describe('peripheral', () => {
  it('reads data', async () => {
    const onRead = jest.fn()

    await blocks.coreCube.read('10b20101-5b3b-4571-9508-cf3efcd7bbae', onRead)

    bleShouldRead(onRead)
  })

  it('is disconnected', async () => {
    blocks.coreCube.disconnect()
  })

  it('does not write after disconnected', async () => {
    blocks.coreCube.disconnect()
    blocks.coreCube.ble.isConnected = jest.fn().mockImplementation(() => false)

    await blocks.coreCube.write('10b20101-5b3b-4571-9508-cf3efcd7bbae', null)

    expect(blocks.coreCube.ble.write).not.toHaveBeenCalled()
  })

  it('starts and stops watchdog timer correctly', async () => {
    const callback = jest.fn()

    const checkFunction = () =>
      new Promise((resolve: any) => {
        callback()
        resolve()
      })

    blocks.coreCube.startWatchdogTimer(checkFunction, 1000)

    expect(callback).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1000)

    expect(callback).toHaveBeenCalledTimes(1)

    blocks.coreCube.stopWatchdogTimer()

    jest.advanceTimersByTime(1000)

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
