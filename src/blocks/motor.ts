/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import ArgumentType = require('scratch-vm/src/extension-support/argument-type')
import BlockType = require('scratch-vm/src/extension-support/block-type')
import Cast = require('scratch-vm/src/util/cast')
import formatMessage = require('format-message')
import PCancelable = require('p-cancelable')

import CoreCubeBlock from './coreCubeBlock'

export default class MotorBlocks extends CoreCubeBlock {
  private static HALF_PI = Math.PI / 2
  private static TWICE_PI = Math.PI * 2
  private static DEGREE_TO_RADIAN = Math.PI / 180

  private static SPEED_THRESHOLD = 10
  private static DISTANCE_THRESHOLD = 16
  private static DIRECTION_THRESHOLD = 8 * MotorBlocks.DEGREE_TO_RADIAN

  public getInfo() {
    return [
      {
        opcode: 'moveFor',
        blockType: BlockType.COMMAND,
        text: formatMessage({
          id: 'toio.moveFor',
          default: 'move [DIRECTION] at [SPEED] speed for [DURATION] seconds',
          description: 'move forward or backward for the specified duration'
        }),
        arguments: {
          DIRECTION: this.menus.MoveDirections,
          SPEED: {
            type: ArgumentType.NUMBER,
            defaultValue: 50
          },
          DURATION: {
            type: ArgumentType.NUMBER,
            defaultValue: 1
          }
        }
      },
      {
        opcode: 'rotateFor',
        blockType: BlockType.COMMAND,
        text: formatMessage({
          id: 'toio.rotateFor',
          default: 'rotate [DIRECTION] at [SPEED] speed for [DURATION] seconds',
          description: 'rotate left or right for the specified duration'
        }),
        arguments: {
          DIRECTION: this.menus.RotateDirections,
          SPEED: {
            type: ArgumentType.NUMBER,
            defaultValue: 30
          },
          DURATION: {
            type: ArgumentType.NUMBER,
            defaultValue: 1
          }
        }
      },
      {
        opcode: 'moveWheelsFor',
        blockType: BlockType.COMMAND,
        text: formatMessage({
          id: 'toio.moveWheelsFor',
          default:
            'move left wheel forward at [LEFT_SPEED] speed and right wheel forward at [RIGHT_SPEED] speed' +
            'for [DURATION] seconds',
          description: 'move left and right wheels for the specified direction'
        }),
        arguments: {
          LEFT_SPEED: {
            type: ArgumentType.NUMBER,
            defaultValue: 50
          },
          RIGHT_SPEED: {
            type: ArgumentType.NUMBER,
            defaultValue: 50
          },
          DURATION: {
            type: ArgumentType.NUMBER,
            defaultValue: 1
          }
        }
      },
      {
        opcode: 'moveTo',
        blockType: BlockType.COMMAND,
        text: formatMessage({
          id: 'toio.moveTo',
          default: 'move to x: [X] y: [Y]',
          description: 'move to the specified position'
        }),
        arguments: {
          X: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          },
          Y: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      },
      {
        opcode: 'pointInDirection',
        blockType: BlockType.COMMAND,
        text: formatMessage({
          id: 'toio.pointInDirection',
          default: 'point in direction [DIRECTION]',
          description: 'point in the specified direction'
        }),
        arguments: {
          DIRECTION: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      },
      {
        opcode: 'stopWheels',
        blockType: BlockType.COMMAND,
        text: formatMessage({
          id: 'toio.stopWheels',
          default: 'stop wheels',
          description: 'stop wheels'
        })
      },
      '---'
    ]
  }

  public get menus() {
    return {
      MoveDirections: {
        type: ArgumentType.STRING,
        menu: 'moveDirections',
        values: [
          {
            text: formatMessage({
              id: 'toio.moveForMenu.forward',
              default: 'forward',
              description: 'forward'
            }),
            value: 'forward'
          },
          {
            text: formatMessage({
              id: 'toio.moveForMenu.backward',
              default: 'backward',
              description: 'backward'
            }),
            value: 'backward'
          }
        ],
        defaultValue: 'forward'
      },
      RotateDirections: {
        type: ArgumentType.STRING,
        menu: 'rotateDirections',
        values: [
          {
            text: formatMessage({
              id: 'toio.rotateForMenu.left',
              default: 'left',
              description: 'left'
            }),
            value: 'left'
          },
          {
            text: formatMessage({
              id: 'toio.rotateForMenu.right',
              default: 'right',
              description: 'right'
            }),
            value: 'right'
          }
        ],
        defaultValue: 'left'
      }
    }
  }

  public moveFor(args: { DIRECTION: string; SPEED: string; DURATION: string }) {
    const duration = Cast.toNumber(args.DURATION)
    if (duration <= 0) {
      return
    }

    const direction = args.DIRECTION === 'forward' ? +1 : -1
    const speed = Cast.toNumber(args.SPEED) * direction

    if (Math.abs(speed) < MotorBlocks.SPEED_THRESHOLD) {
      this.coreCube.move([speed, speed])
      return
    }

    return this.generateCancelablePromise(
      () => {
        this.coreCube.move([speed, speed])
      },
      () => {
        this.stop()
      },
      duration
    )
  }

  public rotateFor(args: {
    DIRECTION: string
    SPEED: string
    DURATION: string
  }) {
    const duration = Cast.toNumber(args.DURATION)
    if (duration <= 0) {
      return
    }

    const direction = args.DIRECTION === 'left' ? +1 : -1
    const speed = Cast.toNumber(args.SPEED) * direction

    if (Math.abs(speed) < MotorBlocks.SPEED_THRESHOLD) {
      this.coreCube.move([-speed, +speed])
      return
    }

    return this.generateCancelablePromise(
      () => {
        this.coreCube.move([-speed, +speed])
      },
      () => {
        this.stop()
      },
      duration
    )
  }

  public moveWheelsFor(args: {
    LEFT_SPEED: string
    RIGHT_SPEED: string
    DURATION: string
  }) {
    const duration = Cast.toNumber(args.DURATION)
    if (duration <= 0) {
      return
    }

    const leftSpeed = Cast.toNumber(args.LEFT_SPEED)
    const rightSpeed = Cast.toNumber(args.RIGHT_SPEED)

    if (
      Math.abs(leftSpeed) < MotorBlocks.SPEED_THRESHOLD &&
      Math.abs(rightSpeed) < MotorBlocks.SPEED_THRESHOLD
    ) {
      this.coreCube.move([leftSpeed, rightSpeed])
      return
    }

    return this.generateCancelablePromise(
      () => {
        this.coreCube.move([leftSpeed, rightSpeed])
      },
      () => {
        this.stop()
      },
      duration
    )
  }

  public moveTo(args: { X: string | number; Y: string | number }) {
    if (!this.coreCube.getState().isTouched) {
      return
    }

    const x = Cast.toNumber(args.X)
    const y = Cast.toNumber(args.Y)

    const speed = 70

    return this.generateCancelablePromiseInterval(
      () => {
        const deltaX = x - this.coreCube.getState().x
        const deltaY = -y + this.coreCube.getState().y

        let deltaAngle =
          Math.atan2(deltaY, deltaX) -
          this.coreCube.getState().rawDirection * MotorBlocks.DEGREE_TO_RADIAN
        while (deltaAngle < -Math.PI) {
          deltaAngle += MotorBlocks.TWICE_PI
        }
        while (deltaAngle > Math.PI) {
          deltaAngle -= MotorBlocks.TWICE_PI
        }

        let leftSpeed = speed
        let rightSpeed = speed
        if (deltaAngle >= 0) {
          rightSpeed *= (MotorBlocks.HALF_PI - deltaAngle) / MotorBlocks.HALF_PI
        } else {
          leftSpeed *= (MotorBlocks.HALF_PI + deltaAngle) / MotorBlocks.HALF_PI
        }

        this.coreCube.move([leftSpeed, rightSpeed])
      },
      () => {
        const deltaX = x - this.coreCube.getState().x
        const deltaY = -y + this.coreCube.getState().y
        const distance = Math.abs(deltaX) + Math.abs(deltaY)

        return distance < MotorBlocks.DISTANCE_THRESHOLD
      },
      () => {
        this.stop()
      },
      0.05
    )
  }

  public pointInDirection(args: { DIRECTION: string }) {
    if (!this.coreCube.getState().isTouched) {
      return
    }

    const direction = Cast.toNumber(args.DIRECTION)
    const baseSpeed = 40

    let speed: number

    return this.generateCancelablePromiseInterval(
      () => {
        let deltaAngle =
          ((direction - this.coreCube.getState().rawDirection + 270) % 360) *
          MotorBlocks.DEGREE_TO_RADIAN

        if (deltaAngle < -Math.PI) {
          deltaAngle += MotorBlocks.TWICE_PI
        }
        if (deltaAngle > Math.PI) {
          deltaAngle -= MotorBlocks.TWICE_PI
        }

        if (Math.abs(deltaAngle) < MotorBlocks.HALF_PI) {
          speed = baseSpeed * Math.sin(deltaAngle)
        } else {
          if (deltaAngle > 0) {
            speed = baseSpeed
          } else {
            speed = -baseSpeed
          }
        }

        this.coreCube.move([speed, -speed])
      },
      () => {
        const deltaAngle =
          ((direction - this.coreCube.getState().rawDirection + 270) % 360) *
          MotorBlocks.DEGREE_TO_RADIAN

        return (
          Math.abs(deltaAngle) < MotorBlocks.DIRECTION_THRESHOLD ||
          Math.abs(deltaAngle) >
            MotorBlocks.TWICE_PI - MotorBlocks.DIRECTION_THRESHOLD ||
          Math.abs(speed) < 11
        )
      },
      () => {
        this.stop()
      },
      0.03
    )
  }

  public stopWheels() {
    this.stop(true)
  }

  public stop(forceToStop: boolean = false): boolean {
    const wasRunning = super.stop()

    if (wasRunning || forceToStop) {
      this.coreCube.move([0, 0])
    }

    return wasRunning
  }
}
