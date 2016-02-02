import TWEEN from 'tween.js';

function r() {
  const distance = 8;
  return -(distance / 2) + Math.random() * distance;
}

export default function vanish({element, duration}) {
  return new Promise((resolve, reject) => {

    element.style.opacity = 1;
    new TWEEN.Tween(element.style)
      .to({ opacity: 0 }, duration || 3000)
      .onUpdate(() => {
        //console.log(element.style.opacity);
        element.style.textShadow =
          `green ${r()}px ${r()}px ${r()}px`;
      })
      .onComplete(resolve)
      .onStop(reject)
      .start();

    function animate(time) {
      requestAnimationFrame(animate);
      TWEEN.update(time);
    }
    requestAnimationFrame(animate);
  });
}
