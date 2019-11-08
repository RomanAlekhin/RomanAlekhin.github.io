import RenderedObject from './RenderedObject';
import {
    renderLine, renderBars, renderStacked, renderStackedPercentage
} from './renderDataUtils';
import { renderSelectionLine, renderLineChartSelection } from './chartRenderUtils';

export default class DataRenderer extends RenderedObject {
    constructor(chart, chartArea, lineWidth) {
        super(chartArea);
        this.chart = chart;
        this.lineWidth = lineWidth;
        this.context.lineJoin = 'round';

        this.selectedTick = null;
        this.selectedTickAnim = null;
    }

    attachData(data) {
        this.data = data;
    }

    updateDataSelectionWithAnimation(pointedTick) {
        this.selectedTick = pointedTick;

        const ANIM_DURATION = 200;

        if (this.selectedTickAnim !== this.selectedTick) {
            if (this.selectedTick === null) {
                this.selectedTickAnim = null;
                delete this.chart.animator.animations['animSelection'];

            } else if (this.selectedTickAnim === null) {
                this.selectedTickAnim = this.selectedTick;

            } else { 
                this.chart.animator.startAnimation('animSelection', (newVal) => {
                    this.selectedTickAnim = newVal;
                }, this.selectedTickAnim, this.selectedTick, ANIM_DURATION, true, false, undefined);
            }

            this.chart.mainWindow.shouldRerender = true;
        }
    }

    updateDataSelectionInstantly(pointedTick) {
        this.selectedTick = pointedTick;
        this.selectedTickAnim = pointedTick;
        this.chart.mainWindow.shouldRerender = true;
    }



    render(startTick = 0, endTick = this.data.totalTicks - 1) {
        const {
            canvas, chartArea, context, data, altChartArea
        } = this;

        if (!data.options.stacked) {
            data.valueDatasets.forEach((dataset) => {
                if (dataset.presence <= 0) return;

                if (dataset.type === 'line') renderLine(context, !dataset.useAlternateAxis ? chartArea : altChartArea, dataset, startTick, endTick, this.lineWidth);

                if (dataset.type === 'bar') renderBars(context, chartArea, dataset, startTick, endTick, this.selectedTickAnim);
            });
        } else if (!data.options.percentage) {
            // TODO - implemented just for bars now.
            renderStacked(context, chartArea, data.valueDatasets, data.cache, startTick, endTick, this.selectedTickAnim);
        } else {
            renderStackedPercentage(context, chartArea, data.valueDatasets, data.cache, startTick, endTick);
        }

        if (this.selectedTick) {
            if (data.valueDatasets[0].type === 'line' || data.valueDatasets[0].type === 'area') {
                renderSelectionLine(context, chartArea, this.selectedTick);
            }

            if (data.valueDatasets[0].type === 'line') renderLineChartSelection(context, chartArea, altChartArea, data.valueDatasets, this.selectedTickAnim);
        }
    }
}
