/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

export default class Card {
  private static Types = {
    // Rhythm and Go
    LEFT: {
      label: 'left card',
      id: 3670024
    },
    RIGHT: {
      label: 'right card',
      id: 3670062
    },
    FRONT: {
      label: 'front card',
      id: 3670026
    },
    BACK: {
      label: 'back card',
      id: 3670064
    },
    GO: {
      label: 'go card',
      id: 3670028
    },

    // Craft Fighter
    TYPHOON: {
      label: 'typhoon card',
      id: 3670016
    },
    RUSH: {
      label: 'rush card',
      id: 3670054
    },
    AUTO_TACKLE: {
      label: 'auto tackle card',
      id: 3670018
    },
    RANDOM: {
      label: 'random card',
      id: 3670056
    },
    PUSH_POWER_UP: {
      label: 'push power up card',
      id: 3670020
    },
    STRUT_POWER_UP: {
      label: 'strut power up card',
      id: 3670058
    },
    SIDE_ATTACK: {
      label: 'side attack card',
      id: 3670022
    },
    EASY_MODE: {
      label: 'easy mode card',
      id: 3670060
    },

    // Common
    SPEED_UP: {
      label: 'speed up sticker',
      id: 3670066
    },
    SPEED_DOWN: {
      label: 'speed down sticker',
      id: 3670030
    },
    WOBBLE: {
      label: 'wobble sticker',
      id: 3670068
    },
    PANIC: {
      label: 'panic sticker',
      id: 3670032
    },
    SPIN: {
      label: 'spin sticker',
      id: 3670070
    },
    SHOCK: {
      label: 'shock sticker',
      id: 3670034
    }
  }

  private static cardTypes = null

  public static checkIfMatchStandardId(state: any, type: string): boolean {
    if (!this.cardTypes) {
      this.cardTypes = this.getCardTypes()
    }

    return state.isTouched && this.cardTypes[type].id === state.standardId
  }

  public static checkIfMatchAnyType(state: any, type: string) {
    if (!this.cardTypes) {
      this.cardTypes = this.getCardTypes()
    }

    return (
      state.isTouched &&
      state.standardId &&
      this.cardTypes[state.standardId].label.indexOf(type) !== -1
    )
  }

  private static getCardTypes() {
    const cardTypes = {}
    for (const key of Object.keys(Card.Types)) {
      const cardType = Card.Types[key]

      cardTypes[cardType.label] = cardType
      cardTypes[cardType.id] = cardType
    }

    return cardTypes
  }
}
