/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import BLE = require('scratch-vm/src/io/ble')
import Base64Util = require('scratch-vm/src/util/base64-util')

const BLEDataStoppedError = 'the extension stopped receiving data from BLE'

export default class Peripheral {
  private static WRITE_TIMEOUT = 1000

  private runtime: any
  private extensionId: string
  private ble: any

  protected ServiceUuid = 'Service UUID is not defined'

  protected watchdogTimer: any = null
  protected watchdogPromise: Promise<void> = null

  private busy: boolean = false

  public constructor(runtime: any, extensionId: string) {
    this.runtime = runtime
    this.extensionId = extensionId

    this.runtime.registerPeripheralExtension(extensionId, this)
  }

  public isConnected(): boolean {
    return this.ble && this.ble.isConnected()
  }

  public scan(): void {
    this.ble = new BLE(
      this.runtime,
      this.extensionId,
      {
        filters: [{ services: [this.ServiceUuid] }]
      },
      this.onConnected
    )
  }

  public connect(id: string): void {
    this.ble.connectPeripheral(id)
  }

  protected onConnected = (): void => {
    return
  }

  public disconnect(): void {
    this.stopWatchdogTimer()

    this.ble.disconnect()
  }

  public startWatchdogTimer(checkFunction, interval: number) {
    this.stopWatchdogTimer()

    this.watchdogTimer = setInterval(() => {
      if (this.watchdogPromise) {
        this.stopWatchdogTimer()

        this.ble.handleDisconnectError(BLEDataStoppedError)
      }

      if (checkFunction) {
        this.watchdogPromise = checkFunction().then(() => {
          this.watchdogPromise = null
        })
      }
    }, interval)
  }

  public stopWatchdogTimer() {
    if (this.watchdogTimer) {
      clearInterval(this.watchdogTimer)

      this.watchdogTimer = null
    }

    this.watchdogPromise = null
  }

  protected read(characteristic: string, onRead): Promise<any> {
    return this.ble.read(this.ServiceUuid, characteristic, false, onRead)
  }

  protected write(
    characteristic: string,
    data: number[],
    withResponse: boolean = false
  ): Promise<any> {
    if (!this.isConnected()) {
      return
    }

    if (this.busy) {
      return
    }
    this.busy = true

    const busyTimer = setTimeout(() => {
      this.busy = false
    }, Peripheral.WRITE_TIMEOUT)

    const base64 = Base64Util.uint8ArrayToBase64(data)

    return this.ble
      .write(this.ServiceUuid, characteristic, base64, 'base64', withResponse)
      .then(() => {
        this.busy = false
        clearTimeout(busyTimer)
      })
  }

  protected startNotifications(
    characteristic: string,
    onNotified: (base64: string) => void
  ): void {
    this.ble.startNotifications(this.ServiceUuid, characteristic, onNotified)
  }
}
