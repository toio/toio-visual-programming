/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import Runtime = require('scratch-vm/src/engine/runtime.js')
import Base64Util = require('scratch-vm/src/util/base64-util')

// tslint:disable-next-line:no-var-requires
const ToioBlocks = require('../src/index')

const SERVICE_UUID = '10b20100-5b3b-4571-9508-cf3efcd7bbae'

const initialize = async (
  characteristic: string,
  withResponse: boolean = false
) => {
  jest.useFakeTimers()

  const runtime = new Runtime()

  const blocks = new ToioBlocks(runtime)
  blocks.getInfo()

  const bleShouldRead = getCheckerForBleRead(blocks, characteristic)

  const bleShouldWrite = getCheckerForBleWrite(
    blocks,
    characteristic,
    withResponse
  )

  const notify = getNotifierForBleRead(blocks)

  await blocks.coreCube.scan()
  blocks.coreCube.ble.isConnected = jest.fn().mockImplementation(() => true)
  blocks.coreCube.ble.read = jest.fn().mockImplementation(() => true)
  blocks.coreCube.ble.write = jest.fn().mockImplementation(
    () =>
      new Promise((resolve: any) => {
        resolve()
      })
  )
  blocks.coreCube.state.isTouched = true

  return {
    blocks,
    bleShouldRead,
    bleShouldWrite,
    notify
  }
}

const getCheckerForBleRead = (blocks: any, characteristic: string) => (
  callback: () => void
) => {
  expect(blocks.coreCube.ble.read).toHaveBeenCalledWith(
    SERVICE_UUID,
    characteristic,
    false,
    callback
  )
}

const getCheckerForBleWrite = (
  blocks: any,
  characteristic: string,
  withResponse: boolean = false
) => (data: number[]) => {
  expect(blocks.coreCube.ble.write).toHaveBeenCalledWith(
    SERVICE_UUID,
    characteristic,
    Base64Util.uint8ArrayToBase64(data),
    'base64',
    withResponse
  )
}

const getNotifierForBleRead = (blocks: any) => (...data) => {
  blocks.coreCube.onNotified(Base64Util.uint8ArrayToBase64([].concat(...data)))
}

const convertFromIntegerToByteArray = (value: number, length: number) => {
  const array = new Array(length)
  for (let i = 0; i < array.length; i++) {
    /* tslint:disable:no-bitwise */
    array[i] = value & 0xff
    value >>= 8
    /* tslint:enable:no-bitwise */
  }

  return array
}

export {
  initialize,
  getCheckerForBleWrite,
  getNotifierForBleRead,
  convertFromIntegerToByteArray
}
