export default function fulfiller () {
  let resolve
  const promise = new Promise(fn => resolve = fn)
  resolve.promise = promise
  return resolve
}
