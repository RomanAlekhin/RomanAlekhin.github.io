import Dataset from './Dataset';
import { roundToDigitsAfterPoint } from '../Utils/numberUtils';

// TODO - this is for performance tests.
const multiplyColumns = (columns, rate) => {
    let bigColumn = [];
    const jsonColumns = JSON.stringify(columns);
    for (let i = 0; i < rate; i++) bigColumn = bigColumn.concat(JSON.parse(jsonColumns));
    return bigColumn;
};

const mapRawDataToDatasets = (rawData) => {
    const {
        colors, columns, names, types
    } = rawData;

    const datasets = columns.map((column) => {
        const id = column[0];
        return new Dataset(id, names[id], types[id], colors[id], column.slice(1));
    });

    return datasets;
};

export default class Data {
    constructor(rawData) {
        const datasets = mapRawDataToDatasets(rawData);

        this.axisDataset = datasets.find(d => d.type === 'x');
        this.valueDatasets = datasets.filter(d => d.type !== 'x');
        this.totalTicks = this.axisDataset.values.length;

        this.options = {};
        if (rawData.y_scaled) {
            this.options.doubleAxis = rawData.y_scaled;
            // Stick second line to alternate axis for this type of data (by default)
            this.valueDatasets[1].useAlternateAxis = true;
        }
        if (rawData.stacked) this.options.stacked = rawData.stacked;
        if (rawData.percentage) this.options.percentage = rawData.percentage;
    }

    isAllDataDisabled() {
        return this.valueDatasets.filter(d => d.enabled).length === 0;
    }

    // Cache all min/max values and stacked/percentages values for all the data.
    refreshCache() {
        const { valueDatasets, options, totalTicks } = this;
        delete this.cache;

        this.cache = [];
        if (options.doubleAxis) return; // cache for this option is currently not supported.

        if (!options.stacked) {
            // Absolute not stacked values

            const enabledDatasets = valueDatasets.filter(d => d.enabled);
            if (enabledDatasets.length <= 1) return; // do not cache if don't need

            for (let i = 0; i < totalTicks; i++) {
                let min = Infinity;
                let max = -Infinity;

                enabledDatasets.forEach((dataset) => {
                    if (dataset.values[i] < min) min = dataset.values[i];
                    if (dataset.values[i] > max) max = dataset.values[i];
                });

                this.cache.push({ min, max });
            }
        } else if (!options.percentage) {
            // Absolute stacked values

            for (let i = 0; i < totalTicks; i++) {
                let sum = 0; // sum of enabled datasets (for chart scaling)
                let animSum = 0; // used for animation
                const values = {};

                valueDatasets.forEach((dataset, ind) => {
                    if (dataset.enabled) sum += dataset.values[i];
                    animSum += dataset.values[i] * dataset.presence;
                    values[ind] = animSum;
                });

                this.cache.push({ values, sum });
            }
        } else {
            // Percentage stacked values.

            // TODO - delete snippet ?      SHOULD TEST THIS METHOD!!!
            // const presentDatasets = valueDatasets.filter(d => d.presence > 0);
            // if (presentDatasets.length <= 1) return; // do not cache if don't need
            // TODO - delete snippet ?

            for (let i = 0; i < totalTicks; i++) {
                let sum = 0;
                const values = {};

                valueDatasets.forEach((dataset, ind) => {
                    const value = dataset.values[i] * dataset.presence;
                    sum += value;
                    values[ind] = sum;
                });

                valueDatasets.forEach((dataset, ind) => {
                    values[ind] = values[ind] / sum * 100;
                });

                this.cache.push({ values });
            }
        }

        this.minMax = this.getMinMaxValues();
    }

    getMinMaxValues(startTick = 0, endTick = this.totalTicks - 1) {
        const { valueDatasets, options, cache } = this;

        if (options.stacked && options.percentage) return { min: 0, max: 100 };

        const isLineType = valueDatasets.every(d => d.type === 'line');


        if (options.doubleAxis) { // calculate min max just right here.
            const mainDataset = valueDatasets.find(d => !d.useAlternateAxis);
            if (!mainDataset.enabled) {
                return this.minMax; // return cached result for main axis.
            }

            let min = mainDataset.values[startTick];
            let max = mainDataset.values[startTick];

            for (let i = startTick + 1; i <= endTick; i++) {
                if (min > mainDataset.values[i]) min = mainDataset.values[i];
                if (max < mainDataset.values[i]) max = mainDataset.values[i];
            }

            this.minMax = { min, max };
            return { min: !isLineType ? 0 : min, max };
        }


        if (!options.stacked) {
            const enabledDatasets = valueDatasets.filter(d => d.enabled);
            if (enabledDatasets.length > 1) {
                let { min, max } = cache[startTick];
                for (let i = startTick + 1; i < endTick; i++) {
                    if (min > cache[i].min) min = cache[i].min;
                    if (max < cache[i].max) max = cache[i].max;
                }
                return { min: !isLineType ? 0 : min, max };
            }
            if (enabledDatasets.length === 1) {
                let min = enabledDatasets[0].values[startTick];
                let max = enabledDatasets[0].values[startTick];
                for (let i = startTick + 1; i < endTick; i++) {
                    if (min > enabledDatasets[0].values[i]) min = enabledDatasets[0].values[i];
                    if (max < enabledDatasets[0].values[i]) max = enabledDatasets[0].values[i];
                }
                const minMax = { min: !isLineType ? 0 : min, max };
                this.minMax = minMax; // cache this value for case when last data is disabled (TODO)
                return minMax;
            }
            return this.minMax;
        }

        // Stacked absolute
        const enabledDatasets = valueDatasets.filter(d => d.enabled);
        if (enabledDatasets.length > 1) {
            let max = cache[startTick].sum;
            for (let i = startTick + 1; i < endTick; i++) {
                if (max < cache[i].sum) max = cache[i].sum;
            }
            return { min: 0, max };
        }
        if (enabledDatasets.length === 1) {
            let max = enabledDatasets[0].values[startTick];
            for (let i = startTick + 1; i < endTick; i++) {
                if (max < enabledDatasets[0].values[i]) max = cache[i].sum;
            }
            return { min: 0, max };
        }
        return this.minMax;
    }






    getMinMaxValuesForAlternateAxis(startTick = 0, endTick = this.totalTicks - 1) {
        if (!this.options.doubleAxis) return undefined;

        const isLineType = this.valueDatasets.every(d => d.type === 'line');

        const altDataset = this.valueDatasets.find(d => d.useAlternateAxis);
        if (!altDataset.enabled) {
            return this.altMinMax; // return cached result.
        }

        let min = altDataset.values[startTick];
        let max = altDataset.values[startTick];

        for (let i = startTick + 1; i <= endTick; i++) {
            if (min > altDataset.values[i]) min = altDataset.values[i];
            if (max < altDataset.values[i]) max = altDataset.values[i];
        }

        this.altMinMax = { min, max };
        return { min: !isLineType ? 0 : min, max };
    }



    // TODO - refactor / move ???
    getStackedPercentageValues(tick, datasetsToInclude = this.valueDatasets, digits = 2) {
        const result = {};
        let sum = 0;
        let animatedSum = 0;
        datasetsToInclude.forEach((dataset, index) => {
            const value = dataset.values[tick];
            sum += value;

            // This values are used only for animation.
            const animatedValue = value * dataset.alpha;
            animatedSum += animatedValue;
            result[index] = { value, animatedValue };
        });

        let stackedAnimPercent = 0;
        datasetsToInclude.forEach((dataset, index) => {
            result[index].percent = roundToDigitsAfterPoint(result[index].value / sum * 100, digits);
            result[index].animatedPercent = roundToDigitsAfterPoint(result[index].animatedValue / animatedSum * 100,
                digits);
            stackedAnimPercent += result[index].animatedPercent;

            // TODO - deal with this rounding.
            result[index].stackedAnimPercent = roundToDigitsAfterPoint(stackedAnimPercent, 2);
        });
        return result;
    }

    // TODO - refactor / move ???
    getStackedPercentageValuesForTicks(tickStart, tickEnd, digits = 2) {
        const datasetsToInclude = this.valueDatasets.filter(d => d.alpha > 0);

        const result = {};
        for (let tick = tickStart; tick <= tickEnd; tick++) {
            result[tick] = this.getStackedPercentageValues(tick, datasetsToInclude, digits);
        }

        return result;
    }
}
