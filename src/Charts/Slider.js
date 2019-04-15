import ChartArea from './ChartArea';
import DataRenderer from './Render/DataRenderer';
import { renderSliderUI } from './Render/uiRenderUtils';
import SliderDraggableArea from './SliderDraggableArea';

import { settings } from '../Settings/slider';

import { style } from '../Styles/slider';

const ANIM_DURATION = 200;

export default class Slider {
    constructor(chart) {
        this.chart = chart;
        this.canvas = chart.node.querySelector('.canvas-slider');
        this.chartArea = new ChartArea(chart, this.canvas, settings.padding);
        this.dataRenderer = new DataRenderer(this.chart, this.chartArea, style.lineWidth);

        this.selection = {
            from: 1 - settings.selectionInitialRange,
            to: 1
        };

        const { canvas, chartArea, selection } = this;
        this.startDraggable = new SliderDraggableArea(canvas, chartArea, 'cursor-resize');
        this.centralDraggable = new SliderDraggableArea(canvas, chartArea, 'cursor-move');
        this.endDraggable = new SliderDraggableArea(canvas, chartArea, 'cursor-resize');

        this.updateDraggableAreaBounds();

        this.startDraggable.onDrag = (newValue) => {
            const maxValue = selection.to - settings.selectionMinRange;
            if (newValue > maxValue) newValue = maxValue;

            this.selection.from = newValue;
            this.updateDraggableAreaBounds();

            this.shouldRerender = true;
            this.chart.onSliderChanged();
        };

        this.centralDraggable.onDrag = (newValue) => {
            const halfRange = (this.selection.to - this.selection.from) / 2;
            const minValue = 0 + halfRange;
            const maxValue = 1 - halfRange;

            if (newValue < minValue) newValue = minValue;
            if (newValue > maxValue) newValue = maxValue;

            this.selection.from = newValue - halfRange;
            this.selection.to = newValue + halfRange;
            this.updateDraggableAreaBounds();

            this.shouldRerender = true;
            this.chart.onSliderChanged();
        };

        this.endDraggable.onDrag = (newValue) => {
            const minValue = this.selection.from + settings.selectionMinRange;
            if (newValue < minValue) newValue = minValue;

            this.selection.to = newValue;
            this.updateDraggableAreaBounds();

            this.shouldRerender = true;
            this.chart.onSliderChanged();
        };

        this.canvas.ontouchstart = (e) => {
            const allChartWindows = window.app.charts.map(c => c.mainWindow);
            allChartWindows.forEach((c) => { c.hidePopup(); });
        };
    }

    enable() {
        console.log('slider enabled');
    }

    disable() {
        console.log('slider disabled');
    }

    updateDraggableAreaBounds() {
        const { canvas, selection } = this;
        const pixelRatio = window.devicePixelRatio;

        const fromX = Math.floor(canvas.width * selection.from);
        const toX = Math.ceil(canvas.width * selection.to);

        const dragStartX = fromX - settings.draggableOffset * pixelRatio;
        const dragEndX = toX + settings.draggableOffset * pixelRatio - settings.draggableWidth * pixelRatio;
        this.startDraggable.setBounds(dragStartX, 0, settings.draggableWidth * pixelRatio, canvas.height);
        this.centralDraggable.setBounds(dragStartX + settings.draggableWidth * pixelRatio, 0, dragEndX - dragStartX - settings.draggableWidth * pixelRatio, canvas.height);
        this.endDraggable.setBounds(dragEndX, 0, settings.draggableWidth * pixelRatio, canvas.height);
    }

    attachData(data) {
        this.data = data;
        this.dataRenderer.attachData(data);
        this.minMax = data.getMinMaxValues();

        if (data.options.doubleAxis) {
            this.altChartArea = new ChartArea(this.chart, this.canvas, settings.padding);
            this.dataRenderer.altChartArea = this.altChartArea;
        }
    }

    getSelectedTicks() {
        const startTick = Math.floor((this.data.totalTicks - 1) * this.selection.from);
        const endTick = Math.ceil((this.data.totalTicks - 1) * this.selection.to);
        return { startTick, endTick };
    }


    onAdjustToScreen() {
        const boundingRect = this.chartArea.canvas.getBoundingClientRect();

        const { width, height } = boundingRect;
        const { canvas } = this;

        const pixelRatio = window.devicePixelRatio;

        if (width * pixelRatio !== canvas.width || height * pixelRatio !== canvas.height) {
            // alert(`${this.chart.node.id}, SLIDER: c.w/h = ${canvas.width} ; ${canvas.height}.   bcr. w/h = ${width} ; ${height} `);

            this.canvas.setAttribute('width', width * pixelRatio);
            this.canvas.setAttribute('height', height * pixelRatio);

            this.updateDraggableAreaBounds();
            if (this.data) {
                this.render();
            }
        }
    }


    render() {
        const { chartArea, minMax } = this;

        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
        chartArea.updateSizing(minMax, { from: 0, to: 1 });

        if (this.altChartArea) {
            const altMinMax = this.data.getMinMaxValuesForAlternateAxis(0, this.data.totalTicks - 1);
            this.altChartArea.updateSizing(altMinMax, { from: 0, to: 1 });
        }

        if (this.dataRenderer) this.dataRenderer.render();

        renderSliderUI(this.canvas, this.selection, window.app.modeSwitcher.getMode());

        this.shouldRerender = false;

        const renderDragArea = (color, draggable) => {
            this.canvas.getContext('2d').fillStyle = color;
            this.canvas.getContext('2d').fillRect(draggable.x, draggable.y, draggable.width, draggable.height);
        };
        if (window.DEBUG_MODE) {
            renderDragArea('rgba(255,0,0,0.25)', this.startDraggable);
            renderDragArea('rgba(0,255,0,0.25)', this.centralDraggable);
            renderDragArea('rgba(0,0,255,0.25)', this.endDraggable);
        }
    }


    animateUpdateMinMax() {
        if (this.data.isAllDataDisabled()) return;

        const newMinMax = this.data.getMinMaxValues();

        this.chart.animator.startAnimation('slider_minValue', (newValue) => {
            this.minMax.min = newValue;
        }, this.minMax.min, newMinMax.min, ANIM_DURATION, false, true);

        this.chart.animator.startAnimation('slider_maxValue', (newValue) => {
            this.minMax.max = newValue;
        }, this.minMax.max, newMinMax.max, ANIM_DURATION, false, true);
    }
}
