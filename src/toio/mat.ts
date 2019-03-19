/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

export default class Mat {
  private static Region = {
    X: {
      BOUNDARY: 500,
      RANGE1_MIN: 56,
      RANGE1_MAX: 440,
      RANGE2_MIN: 558,
      RANGE2_MAX: 942
    },
    Y: {
      BOUNDARY: 500,
      RANGE1_MIN: 57,
      RANGE1_MAX: 442,
      RANGE2_MIN: 569,
      RANGE2_MAX: 953
    }
  }

  private static COORDINATE_RANGE = 180

  private static Grid = {
    Border: {
      LEFT: 555,
      RIGHT: 947,
      TOP: 53,
      BOTTOM: 446
    },
    COLUMNS: 9,
    ROWS: 9
  }

  private static COLOR_CODES_ON_MAT_GRID = [
    'wbwywrwrw',
    'gwrwbwbwy',
    'wywywgwgw',
    'bwgwrwbwr',
    'wrwywgwgw',
    'ywbwbwywr',
    'wgwrwgwbw',
    'bwywbwrwy',
    'wrwgwywgw'
  ]
  private static COLORS = {
    w: 'white',
    b: 'blue',
    g: 'green',
    y: 'yellow',
    r: 'red'
  }

  public static normalizeX(x: number): number {
    return x < Mat.Region.X.BOUNDARY
      ? this.convertCoordinateRange(
          x,
          Mat.Region.X.RANGE1_MIN,
          Mat.Region.X.RANGE1_MAX
        )
      : this.convertCoordinateRange(
          x,
          Mat.Region.X.RANGE2_MIN,
          Mat.Region.X.RANGE2_MAX
        )
  }

  public static normalizeY(y: number): number {
    return y < Mat.Region.Y.BOUNDARY
      ? -this.convertCoordinateRange(
          y,
          Mat.Region.Y.RANGE1_MIN,
          Mat.Region.Y.RANGE1_MAX
        )
      : -this.convertCoordinateRange(
          y,
          Mat.Region.Y.RANGE2_MIN,
          Mat.Region.Y.RANGE2_MAX
        )
  }

  private static convertCoordinateRange(
    value: number,
    min: number,
    max: number
  ): number {
    return (((value - min) / (max - min)) * 2 - 1) * Mat.COORDINATE_RANGE
  }

  public static normalizeDirection(direction: number): number {
    const d = direction - 270
    return d + (d <= -180 ? 360 : 0)
  }

  public static convertXToColumn(x: number): number {
    const column = Math.floor(
      ((x - Mat.Grid.Border.LEFT) /
        (Mat.Grid.Border.RIGHT - Mat.Grid.Border.LEFT)) *
        Mat.Grid.COLUMNS
    )

    return Math.min(Math.max(column, 0), 8) - 4
  }

  public static convertYToRow(y: number): number {
    const row = Math.floor(
      ((y - Mat.Grid.Border.TOP) /
        (Mat.Grid.Border.BOTTOM - Mat.Grid.Border.TOP)) *
        Mat.Grid.ROWS
    )

    return 4 - Math.min(Math.max(row, 0), 8)
  }

  public static convertColumnToX(column: number): number {
    return (column / Mat.Grid.COLUMNS) * Mat.COORDINATE_RANGE * 2
  }

  public static convertRowToY(row: number): number {
    return (row / Mat.Grid.ROWS) * Mat.COORDINATE_RANGE * 2
  }

  public static checkIfOnMat(state) {
    return state.isTouched && state.standardId === null
  }

  public static checkIfOnColoredMat(state): boolean {
    return (
      state.rawX >= Mat.Region.X.BOUNDARY && state.rawY < Mat.Region.Y.BOUNDARY
    )
  }

  public static checkIfMatchColor(state: any, type: string): boolean {
    if (!state.isTouched || state.standardId !== null) {
      return false
    }

    const { rawX, rawY } = state

    const column = this.convertXToColumn(rawX)
    const row = this.convertYToRow(rawY)

    const colorCode = Mat.COLOR_CODES_ON_MAT_GRID[4 - row][column + 4]
    const color = Mat.COLORS[colorCode]

    return type.indexOf(color) !== -1
  }
}
