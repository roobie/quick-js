import Event from 'geval'
import pattern from './non_printable_char_re'
import every from './every'
import fulfiller from './fulfiller'

const printableChars = new Array(0xff).join(' ').split(' ')
        .map(function (_, i) {
          return String.fromCharCode(i)
        })
        .filter(function (c) {
          return !pattern().test(c)
        })

function randomChar () {
  const randIdx = Math.floor(Math.random() * printableChars.length)
  return printableChars[randIdx]
}

function getRandomCharStream (targetChar) {
  const dispose = fulfiller()
  const ticker = every(
    Math.random() * 170 | 0,
    dispose.promise)

  const timer = ticker
  const max = 30
  let count = 0

  return Event(broadcast => {
    const hasRunOnce = () => count > 0
    const atTarget = () => Math.random() < 0.02 || count > max
    const release = timer(() => {
      count++

      if (hasRunOnce() && atTarget()) {
        dispose()
        release()
        broadcast({
          done: true,
          target: targetChar,
          char: targetChar
        })
      } else {
        broadcast({
          done: false,
          target: targetChar,
          char: randomChar()
        })
      }
    })
  })
}

export default function samaritan (input) {
  return Event(broadcast => {
    input(char => {
      broadcast(getRandomCharStream(char))
    })
  })
}
