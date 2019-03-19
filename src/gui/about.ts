/**
 * Copyright (c) Sony Interactive Entertainment Inc.
 *
 * This source code is licensed under the BSD-3-Clause license found
 * in the LICENSE file in the root directory of this source tree.
 */

import info = require('../../package.json')

const a = document.createElement('a')
a.setAttribute(
  'style',
  'position: absolute; right: 8px; top: 14px; font-size: 12px; z-Index: 1000; color: #ffffff; text-decoration: none'
)
a.innerHTML = `このサイトについて`
a.href = 'https://toio.io/programming/visual-programming.html'
a.title = `v${info.version}`

document.body.appendChild(a)
