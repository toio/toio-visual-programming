/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import Base64Util = require('scratch-vm/src/util/base64-util')

import Peripheral from '../peripheral'
import Mat from './mat'

export default class CoreCube extends Peripheral {
  private static uuid = (id: string): string =>
    `10b2${id}-5b3b-4571-9508-cf3efcd7bbae`

  protected ServiceUuid: string = CoreCube.uuid('0100')

  private static CharacteristicUuid = {
    ID: CoreCube.uuid('0101'),
    MOTOR: CoreCube.uuid('0102'),
    LIGHT: CoreCube.uuid('0103'),
    SOUND: CoreCube.uuid('0104'),
    SENSOR: CoreCube.uuid('0106'),
    BUTTON: CoreCube.uuid('0107')
  }

  private static BLE_WATCHDOG_INTERVAL = 1000
  private watchdogResolve: any = null

  private state: {
    isTouched: boolean
    x?: number
    y?: number
    direction?: number
    rawX?: number
    rawY?: number
    rawDirection?: number
    standardId?: number
  }

  public constructor(runtime: any, extensionId: string) {
    super(runtime, extensionId)

    this.state = {
      isTouched: false,
      x: 0,
      y: 0,
      direction: 0,
      rawX: 0,
      rawY: 0,
      rawDirection: 0,
      standardId: null
    }
  }

  protected onConnected = () => {
    this.startNotifications(CoreCube.CharacteristicUuid.ID, this.onNotified)

    this.startWatchdogTimer(() => {
      return new Promise((resolve: any) => {
        this.watchdogResolve = resolve

        this.read(CoreCube.CharacteristicUuid.ID, this.onNotified)
      })
    }, CoreCube.BLE_WATCHDOG_INTERVAL)
  }

  private onNotified = (base64: string): void => {
    if (this.watchdogResolve) {
      this.watchdogResolve()
      this.watchdogResolve = null
    }

    const data = Base64Util.base64ToUint8Array(base64)

    switch (data[0]) {
      case 1: {
        /* tslint:disable:no-bitwise */
        const x = data[1] | (data[2] << 8)
        const y = data[3] | (data[4] << 8)
        const direction = data[5] | (data[6] << 8)
        /* tslint:enable:no-bitwise */

        this.state = {
          isTouched: true,
          x: Mat.normalizeX(x),
          y: Mat.normalizeY(y),
          direction: Mat.normalizeDirection(direction),
          rawX: x,
          rawY: y,
          rawDirection: direction,
          standardId: null
        }

        break
      }

      case 2: {
        /* tslint:disable:no-bitwise */
        const standardId =
          data[1] | (data[2] << 8) | (data[3] << 16) | (data[4] << 24)
        const direction = data[5] | (data[6] << 8)
        /* tslint:enable:no-bitwise */

        this.state = {
          isTouched: true,
          direction: Mat.normalizeDirection(direction),
          rawDirection: direction,
          standardId
        }

        break
      }

      default:
        this.state.isTouched = false
        this.state.standardId = null

        break
    }
  }

  public getState() {
    return this.state
  }

  public move(speeds: number[], duration: number = 0) {
    const data = []

    data.push(duration ? 2 : 1)

    for (let i = 0; i < speeds.length; i++) {
      const speed = Math.max(Math.min(speeds[i], 100), -100)
      data.push(i + 1, speed >= 0 ? 1 : 2, Math.abs(speed))
    }

    if (duration) {
      data.push(duration * (1000 / 10))
    }

    this.write(CoreCube.CharacteristicUuid.MOTOR, data)
  }

  public setLightColor(color: number[], duration: number = 0) {
    const data = [3, duration * (1000 / 10), 1, 1, ...color]

    this.write(CoreCube.CharacteristicUuid.LIGHT, data, true)
  }

  public turnOffLight() {
    const data = [1]

    this.write(CoreCube.CharacteristicUuid.LIGHT, data, true)
  }

  public playSound(note: number, loudness: number, duration: number = 0) {
    const data = [3, 0, 1, duration * (1000 / 10), note, loudness]

    this.write(CoreCube.CharacteristicUuid.SOUND, data, true)
  }

  public stopSound() {
    const data = [1]

    this.write(CoreCube.CharacteristicUuid.SOUND, data, true)
  }
}
