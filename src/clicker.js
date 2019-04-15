// eslint-disable-next-line import/prefer-default-export
export const createClickEffect = (x, y) => {
    const pulse = document.createElement('div');
    pulse.className = 'pulseEffect animated';
    return pulse;
};

// document.addEventListener('click', (e) => {
//     const pulse = createClickEffect(e.pageX, e.pageY);
//     const parent = document.querySelector('#pulsar');
//     parent.appendChild(pulse);
//     const ratio = window.devicePixelRatio;
//     console.log(e);
//     pulse.style.marginLeft = `${e.pageX - 25 * ratio}px`;
//     pulse.style.marginTop = `${e.pageY - 25 * ratio}px`;
// });
