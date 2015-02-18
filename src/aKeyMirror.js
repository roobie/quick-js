// Copyright (c) 2015 Björn Roberg

// The MIT License (MIT)
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * Constructs a hash enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var LEVELS = aKeyMirror(['low', 'medium', 'high]);
 *   var aLevel = LEVELS.high; // => 'high'
 *   var isLevelValid = !!LEVELS[aLevel]; // => true
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  [ key1, key2 ]
 *   Output: { key1: key1, key2: key2 }
 *
 * @param {Array} list
 * @return {object}
 */
function aKeyMirror(list) {
  var i, key, result = {};
  if (!Array.isArray(list)) {
    throw new Error('Argument must be an array.');
  }

  for(i = 0; i < list.length; i++) {
    key = list[i];
    result[key] = key;
  }

  return result;
}

module.exports = aKeyMirror;
