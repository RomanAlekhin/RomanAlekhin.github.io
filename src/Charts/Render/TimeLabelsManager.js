import RenderedObject from './RenderedObject';
import { chartTextColor, chartTextFont } from '../../Settings';
import { getShortDate, getHour } from '../../Utils/dateFormaters';
import { measureText } from '../../Utils/textUtils';

const TEXT_X_OFFSET = -16*0;
const LABEL_WIDTH = 90;
const ANIM_DURATION = 200;

export default class TimeLabelsManager extends RenderedObject {
    constructor(chart, chartArea) {
        super(chartArea);
        this.chart = chart;
    }

    attachData(data) {
        this.data = data;
        this.labels = {};
        this.scale = this.calculateNewScale();
        const initialLabels = this.calculateNewLabels(this.scale, true);
        this.updateLabels(initialLabels);
    }

    calculateNewScale() {
        const p = this.chartArea.padding;
        const totTicks = this.data.totalTicks;
        const canvFullWidth = (this.canvas.width - p.right - p.left) / (this.chart.slider.selection.to - this.chart.slider.selection.from);
        const totalTicksScale = Math.floor(Math.log2(totTicks));
        const labelsOnScreen = Math.floor(Math.log2(canvFullWidth / LABEL_WIDTH));
        return (2 ** totalTicksScale) / (2 ** labelsOnScreen);
    }

    calculateNewLabels(scale, present = false) {
        const newLabels = {};
        for (let i = this.data.totalTicks - 1; i >= 0; i -= scale) {
            const time = this.data.axisDataset.values[i];
            newLabels[time] = {
                tick: i,
                text: !this.chart.isZoomed ? getShortDate(time) : getHour(time),
                presence: present ? 1 : 0
            };
        }
        return newLabels;
    }

    updateLabels(newLabels) {
        // Remove old.
        Object.entries(this.labels).forEach(([time, label]) => {
            if (newLabels[time] === undefined) {
                this.chart.animator.startAnimation(`timelabel_${time}`, (newValue) => {
                    this.labels[time].presence = newValue;
                }, label.presence, 0, ANIM_DURATION, true, false, () => {
                    delete this.labels[time];
                });
            }
        });

        // Add new and update existing.
        Object.entries(newLabels).forEach(([time, label]) => {
            if (this.labels[time] === undefined) {
                this.labels[time] = label;
            }
            if (this.labels[time].presence < 1) {
                this.chart.animator.startAnimation(`timelabel_${time}`, (newValue) => {
                    this.labels[time].presence = newValue;
                }, label.presence, 1, ANIM_DURATION, true, false);
            }
        });
    }

    onResize() {
        if (this.scale !== undefined) {
            const newScale = this.calculateNewScale();

            if (this.scale !== newScale) {
                this.scale = newScale;
                const newLabels = this.calculateNewLabels(newScale);
                this.updateLabels(newLabels);
            }
        }
    }


    render() {
        const { chartArea, context } = this;

        context.fillStyle = chartTextColor;
        context.font = chartTextFont;
        context.textAlign = 'right';

        const { startTick, endTick } = this.chart.slider.getSelectedTicks();
        Object.values(this.labels).forEach((label) => {
            if (startTick <= label.tick && label.tick <= endTick) {
                const position = chartArea.getCanvasPositionForTimestamp(label.tick);
                context.globalAlpha = label.presence;
                context.fillText(label.text, position.x + TEXT_X_OFFSET, position.y);
            }
        });

        context.globalAlpha = 1;
        context.textAlign = 'left';
    }
}
