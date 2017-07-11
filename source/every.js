import Event from 'geval'

export default function every (howMuch, disposePromise) {
  let counter = 0

  return Event(broadcast => {
    const intervalId = setInterval(
        () => broadcast(counter += howMuch),
        howMuch
      )

    const destroy = () => clearInterval(intervalId)
    if (typeof (disposePromise || {}).then === 'function') {
      disposePromise.then(destroy)
    }
  })
}
