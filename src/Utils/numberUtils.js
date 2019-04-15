export const roundToDigitsAfterPoint = (number, digits) => Math.round(number / (10 ** -digits))
    / (10 ** digits);

export const formatValue = (value, percentage) => {
    if (percentage) return `${roundToDigitsAfterPoint(value, 0)}%`;

    if (value >= 1000 * 1000) {
        const formattedValue = roundToDigitsAfterPoint(value / 1000000, 2);
        return `${formattedValue}M`;
    }

    if (value >= 1000) {
        const formattedValue = roundToDigitsAfterPoint(value / 1000, 2);
        return `${formattedValue}K`;
    }

    if (value >= 1) {
        return roundToDigitsAfterPoint(value, 1);
    }

    return roundToDigitsAfterPoint(value, 2);
};

const roundValue = (value) => {
    if (value >= 1000) {
        return roundToDigitsAfterPoint(value, 2);
    }

    if (value >= 1) {
        return roundToDigitsAfterPoint(value, 1);
    }

    return roundToDigitsAfterPoint(value, 2);
};

export const calculateHorizontalAxisValues = (valuesRange, countOfAxisToDraw) => {
    const range = valuesRange.max - valuesRange.min;

    let valuesDelta = range / (countOfAxisToDraw - 0.5);

    if (range < 1000 && valuesDelta > 2) valuesDelta = Math.round(valuesDelta);

    const values = {};
    for (let i = 0; i < countOfAxisToDraw; i++) {
        const value = roundValue(valuesRange.min + valuesDelta * i);
        values[value] = 1;
    }
    return values;
};
