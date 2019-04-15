// eslint-disable-next-line import/prefer-default-export
export const calculateRenderedTimestamps = (interval, start, end, axisDataset) => {
    const result = {};
    const lastTick = axisDataset.values.length - 1;

    for (let i = end; i >= start; i--) {
        if ((lastTick - i) % interval === 0) {
            result[i] = { time: axisDataset.values[i] };
        }
    }

    return result;
};
