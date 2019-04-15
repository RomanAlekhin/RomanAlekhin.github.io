
// eslint-disable-next-line import/prefer-default-export
export const calculateTransition = (observable, target, delta) => {
    const difference = target - observable;
    let newDifference = difference - delta * Math.sign(difference);
    if (Math.sign(newDifference) !== Math.sign(difference)) newDifference = 0;
    return target - newDifference;
};
