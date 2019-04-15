import {
    chartAxisColor, chartAxisLineThickness, chartTextColor, chartTextFont
} from '../Settings';

import { renderAxes } from './Render/chartRenderUtils';
import ChartArea from './ChartArea';

import { padding } from '../Settings/mainWindow';


const DEFAULT_AXES_COUNT = 6;
const PERCENTAGE_AXES_COUNT = 5;
const LAST_AXIS_OFFSET = 0.25;
const RESCALE_RATE = 0.10;

const RESCALE_ANIM_DURATION_LINE = 150;
const RESCALE_ANIM_DURATION_STACKED = 300;

const AXIS_ANIM_DURATION = 150;


const calculateNewAxes = (min, max, count, percentage) => {
    const newAxes = {};
    const delta = (max - min) / (count - 1 + (!percentage ? LAST_AXIS_OFFSET : 0));
    for (let i = 0; i < count; i++) {
        newAxes[min + delta * i] = 0;
    }
    return newAxes;
};


export default class AxisManager {
    constructor(chart, chartArea, idForAnimator) {
        this.chart = chart;
        this.chartArea = chartArea;
        this.idForAnimator = idForAnimator;
    }

    attachData(data) {
        this.data = data;
        this.axes = {};
        this.axesCount = data.options.percentage ? PERCENTAGE_AXES_COUNT : DEFAULT_AXES_COUNT;

        if (data.options.doubleAxis) {
            this.altAxes = {};
            this.altChartArea = new ChartArea(this.chart, this.chart.mainWindow.canvas, padding);
            this.chart.mainWindow.dataRenderer.altChartArea = this.altChartArea;
        } else {
            delete this.altAxes;
            delete this.altChartArea;
        }

        this.init();
    }

    init() {
        const { startTick, endTick } = this.chart.slider.getSelectedTicks();
        const { min, max } = this.data.getMinMaxValues(startTick, endTick);
        this.min = min;
        this.max = max;
        this.renderedMinMax = { min: this.min, max: this.max }; // this property is used for render

        if (this.data.options.doubleAxis) {
            this.altMinMax = this.data.getMinMaxValuesForAlternateAxis(startTick, endTick, true);
            this.altRenderedMinMax = { min: this.altMinMax.min, max: this.altMinMax.max }; // this property is used for render
        }

        const initialAxes = calculateNewAxes(min, max, this.axesCount, this.data.options.percentage);
        Object.keys(initialAxes).forEach((val) => {
            this.axes[val] = 1;
        });

        if (this.data.options.doubleAxis) {
            const initialAltAxes = calculateNewAxes(this.altMinMax.min, this.altMinMax.max, this.axesCount, this.data.options.percentage);
            Object.keys(initialAltAxes).forEach((val) => {
                this.altAxes[val] = 1;
            });
        }

        this.chartArea.updateSizing({ min, max }, this.chart.slider.selection);
        if (this.altChartArea) this.altChartArea.updateSizing({ min: this.altMinMax.min, max: this.altMinMax.max }, this.chart.slider.selection);
    }


    // Events
    onSliderChanged() {
        const { startTick, endTick } = this.chart.slider.getSelectedTicks();
        const { min: newMin, max: newMax } = this.data.getMinMaxValues(startTick, endTick);

        const deltaMax = Math.abs(this.max - newMax) / (this.max - this.min);
        const deltaMin = Math.abs(this.min - newMin) / (this.max - this.min);


        if (deltaMax + deltaMin >= RESCALE_RATE) {
            this.min = newMin;
            this.max = newMax;
            this.animateUpdateMinMax(newMin, newMax);
        }

        if (this.data.options.doubleAxis) {
            const { min: newAltMin, max: newAltMax } = this.data.getMinMaxValuesForAlternateAxis(startTick, endTick);

            const deltaAltMax = Math.abs(this.altMinMax.max - newAltMax) / (this.altMinMax.max - this.altMinMax.min);
            const deltaAltMin = Math.abs(this.altMinMax.min - newAltMin) / (this.altMinMax.max - this.altMinMax.min);

            if (deltaAltMax + deltaAltMin >= RESCALE_RATE) {
                this.altMinMax.min = newAltMin;
                this.altMinMax.max = newAltMax;
                this.animateUpdateAltMinMax(newAltMin, newAltMax);
            }
        }

        this.chart.mainWindow.shouldRerender = true;
    }


    resizeChartAreas() {
        this.chartArea.updateSizing({ min: this.renderedMinMax.min, max: this.renderedMinMax.max },
            this.chart.slider.selection);

        // debugger
        if (this.data.options.doubleAxis) {
            // debugger
            this.altChartArea.updateSizing({ min: this.altRenderedMinMax.min, max: this.altRenderedMinMax.max },
                this.chart.slider.selection);
        }
    }

    calcZoomInAnimValues() {
        const { xScale, xOffset } = this.chartArea;
        const xOffsetNew = xOffset - this.chartArea.canvas.width * 13;
        this.targSizing = {
            xScale: xScale * 5,
            xOffset: xOffsetNew
        };
        this.initSizing = {
            xScale,
            xOffset
        };

        if (this.altChartArea) {
            const { xScale: xScaleAlt, xOffset: xOffsetAlt } = this.altChartArea;
            const xOffsetAltNew = xOffsetAlt - this.altChartArea.canvas.width * 13;
            this.targSizingAlt = {
                xScale: xScaleAlt * 5,
                xOffset: xOffsetAltNew
            };
            this.initSizingAlt = {
                xScale: xScaleAlt,
                xOffset: xOffsetAlt
            };
        }
    }

    renderAxes() {
        // debugger
        const { doubleAxis, percentage } = this.data.options;

        renderAxes(this.axes, this.chart.mainWindow.canvas, this.chartArea, percentage,
            doubleAxis ? this.data.valueDatasets[0].color : undefined, false,
            doubleAxis ? this.data.valueDatasets[0].presence : undefined);

        if (doubleAxis) {
            renderAxes(this.altAxes, this.chart.mainWindow.canvas, this.altChartArea, percentage,
                this.data.valueDatasets[1].color, true, this.data.valueDatasets[1].presence);
        }
    }

    animateUpdateMinMax(newMin, newMax) {
        this.min = newMin;
        this.max = newMax;

        const { stacked } = this.data.options;

        this.chart.animator.startAnimation(`${this.idForAnimator}_main_min`, (newValue) => {
            this.renderedMinMax.min = newValue;
        }, this.renderedMinMax.min, newMin, stacked ? RESCALE_ANIM_DURATION_STACKED : RESCALE_ANIM_DURATION_LINE, true, false);
        this.chart.animator.startAnimation(`${this.idForAnimator}_main_max`, (newValue) => {
            this.renderedMinMax.max = newValue;
        }, this.renderedMinMax.max, newMax, stacked ? RESCALE_ANIM_DURATION_STACKED : RESCALE_ANIM_DURATION_LINE, true, false);

        this.animateAxesUpdate();
    }

    animateUpdateAltMinMax(newAltMin, newAltMax) {
        this.altMinMax = { min: newAltMin, max: newAltMax };

        const { stacked } = this.data.options;

        this.chart.animator.startAnimation(`${this.idForAnimator}_alt_min`, (newValue) => {
            this.altRenderedMinMax.min = newValue;
        }, this.altRenderedMinMax.min, newAltMin,
        stacked ? RESCALE_ANIM_DURATION_STACKED : RESCALE_ANIM_DURATION_LINE, true, false);
        this.chart.animator.startAnimation(`${this.idForAnimator}_alt_max`, (newValue) => {
            this.altRenderedMinMax.max = newValue;
        }, this.altRenderedMinMax.max, newAltMax,
        stacked ? RESCALE_ANIM_DURATION_STACKED : RESCALE_ANIM_DURATION_LINE, true, false);

        this.animateAltAxesUpdate();
    }

    animateAxesUpdate() {
        if (!this.data.options.percentage) {
            const newAxes = calculateNewAxes(this.min, this.max, this.axesCount);

            // Remove old axes.
            Object.entries(this.axes).forEach(([val, currentPresence]) => {
                if (newAxes[val] === undefined) {
                    this.chart.animator.startAnimation(`${this.idForAnimator}_${val}`, (newValue) => {
                        this.axes[val] = newValue;
                    }, currentPresence, 0, AXIS_ANIM_DURATION, true, false, () => {
                        delete this.axes[val];
                    });
                }
            });

            // Add new axes.
            Object.keys(newAxes).forEach((val) => {
                if (this.axes[val] === undefined) this.axes[val] = 0;
                if (this.axes[val] < 1) {
                    this.chart.animator.startAnimation(`${this.idForAnimator}_${val}`, (newValue) => {
                        this.axes[val] = newValue;
                    }, 0, 1, AXIS_ANIM_DURATION, true, false);
                }
            });
        }
    }

    animateAltAxesUpdate() {
        if (!this.data.options.percentage) {
            const newAxes = calculateNewAxes(this.altMinMax.min, this.altMinMax.max, this.axesCount);

            // Remove old axes.
            Object.entries(this.altAxes).forEach(([val, currentPresence]) => {
                if (newAxes[val] === undefined) {
                    this.chart.animator.startAnimation(`${this.idForAnimator}_${val}`, (newValue) => {
                        this.altAxes[val] = newValue;
                    }, currentPresence, 0, AXIS_ANIM_DURATION, true, false, () => {
                        delete this.altAxes[val];
                    });
                }
            });

            // Add new axes.
            Object.keys(newAxes).forEach((val) => {
                if (this.altAxes[val] === undefined) this.altAxes[val] = 0;
                if (this.altAxes[val] < 1) {
                    this.chart.animator.startAnimation(`${this.idForAnimator}_${val}`, (newValue) => {
                        this.altAxes[val] = newValue;
                    }, 0, 1, AXIS_ANIM_DURATION, true, false);
                }
            });
        }
    }
}
