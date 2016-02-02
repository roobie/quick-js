export default function timeout(duration, optionalCancel) {
  /**
   @parameter `duration`:Number
   - the duration as passed to the underlying impl. Usually ms.

   @parameter `optionalCancel`:Promise<void>
   - a Promise, that, when filfilled, will cancel the timeout and
   trigger a rejection.

   @returns p:Promise<void>
   - a promise that is fulfilled when the specified duration
   has gone by, or rejected if cancelled by user.
   */
  return new Promise((resolve, reject) => {
    const id = setTimeout(resolve, duration);

    if (typeof (optionalCancel || {}).then === 'function') {
      optionalCancel.then(() => {
        clearTimeout(id);
        reject(new Error('Cancelled'));
      });
    }
  });
}
