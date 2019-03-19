/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import PCancelable from 'p-cancelable'

export default class CancelableBlock {
  private static DELAY_FOR_COMPLETION: number = 50

  protected promise: PCancelable<void> | null = null
  protected resolve: () => void | null = null

  protected generateCancelablePromise(
    execFunction,
    onCompleted,
    duration: number
  ): PCancelable<void> {
    if (this.promise) {
      this.promise.cancel()
    }

    this.promise = new PCancelable((resolve, reject, onCancel) => {
      this.resolve = resolve

      const timer = setTimeout(() => {
        resolve()
        this.resolve = null

        this.promise = this.generateCancelablePromiseDelayed(onCompleted)
      }, duration * 1000)

      onCancel.shouldReject = false
      onCancel(() => {
        clearTimeout(timer)
        resolve()
      })

      if (execFunction) {
        execFunction()
      }
    })

    return this.promise
  }

  protected generateCancelablePromiseInterval(
    execFunction,
    checkFunction,
    onCompleted,
    duration
  ): PCancelable<void> {
    if (this.promise) {
      this.promise.cancel()
    }

    this.promise = new PCancelable((resolve, reject, onCancel) => {
      this.resolve = resolve

      const interval = setInterval(() => {
        if (checkFunction && checkFunction()) {
          resolve()
          this.resolve = null

          clearInterval(interval)

          this.promise = this.generateCancelablePromiseDelayed(onCompleted, 0)

          return
        }

        if (execFunction) {
          execFunction()
        }
      }, duration * 1000)

      onCancel.shouldReject = false
      onCancel(() => {
        clearInterval(interval)
        resolve()
      })
    })

    return this.promise
  }

  private generateCancelablePromiseDelayed(
    onCompleted,
    delay: number = CancelableBlock.DELAY_FOR_COMPLETION
  ): PCancelable<void> {
    return new PCancelable((resolve, reject, onCancel) => {
      const timer = setTimeout(() => {
        resolve()

        if (onCompleted) {
          onCompleted()
        }

        this.promise = null
      }, delay)

      onCancel.shouldReject = false
      onCancel(() => {
        clearTimeout(timer)
      })
    })
  }

  public stop(forceToStop: boolean = false): boolean {
    let result: boolean = false

    if (this.promise) {
      this.promise.cancel()
      this.promise = null

      result = true
    }

    if (this.resolve) {
      this.resolve()
      this.resolve = null
    }

    return result
  }
}
