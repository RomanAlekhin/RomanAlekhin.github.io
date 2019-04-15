import { chartValueLabelYOffset, chartTimestampXOffset, chartTimestampYOffset } from '../Settings';
import { canvasMinXMargin, padding as popupWindowPadding, yOffset as popupWindowYOffset } from '../Settings/popupWindow';

// Represents area for chart.
export default class ChartArea {
    constructor(chart, canvas, padding = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }) {
        this.chart = chart;
        this.canvas = canvas;
        this.padding = padding;
    }

    updateSizing(valuesRange, selection) {
        const { canvas, chart, padding } = this;
        const intervalsBetweenTicks = chart.data.totalTicks - 1;

        this.xScale = (canvas.width - padding.left - padding.right) / intervalsBetweenTicks
            / (selection.to - selection.from);
        this.xOffset = -selection.from * this.xScale * intervalsBetweenTicks
            + padding.right;
        this.yScale = (canvas.height - padding.bottom - padding.top)
            / (valuesRange.max - valuesRange.min);
        this.yOffset = valuesRange.max * this.yScale + padding.top;

        if (this.shake) {
            this.xOffset += this.shake.x;
            this.yOffset += this.shake.y;
        }
    }

    getCanvasPositionForPoint(value, tickIndex) {
        const {
            xOffset, xScale, yOffset, yScale
        } = this;
        const x = Math.round(tickIndex * xScale + xOffset - this.padding.right);
        const y = Math.round(yOffset - value * yScale);

        return { x, y };
    }

    getCanvasPositionForBar(tickIndex, value) {
        const {
            xOffset, xScale, yOffset, yScale, canvas, padding
        } = this;

        const x1 = Math.round((tickIndex - 0.5) * xScale + xOffset);
        const x2 = Math.round((tickIndex + 0.5) * xScale + xOffset);

        const y = Math.round(yOffset - value * yScale); // TODO - negative values support ???
        const height = canvas.height - padding.bottom - y;

        return {
            x1, x2, y, height
        };
    }

    getCanvasPositionForStackedValues_BARS(tickIndex, stacked) {
        const {
            xOffset, xScale, yOffset, yScale, canvas, padding
        } = this;

        const x1 = Math.round((tickIndex - 0.5) * xScale + xOffset);
        const x2 = Math.round((tickIndex + 0.5) * xScale + xOffset);

        const bars = {};

        let prevBarY = null;
        Object.entries(stacked.values).forEach(([datasetIndex, value]) => {
            const y = Math.round(yOffset - value * yScale);
            const height = (prevBarY !== null) ? prevBarY - y : canvas.height - padding.bottom - y;
            prevBarY = y; // TODO - check do I really need this
            bars[datasetIndex] = { y, height };
        });

        return {
            x1, x2, bars
        };
    }

    getCanvasPositionForStackedPercentageValues(tickIndex, stackedPercentage) {
        const {
            xOffset, xScale, yOffset, yScale
        } = this;

        const x = Math.round(tickIndex * xScale + xOffset);
        const ys = {};

        Object.entries(stackedPercentage.values).forEach(([ind, value]) => {
            const y = Math.round(yOffset - value * yScale);
            ys[ind] = y;
        });

        return { x, ys };
    }

    getChartBottomY() {
        return this.canvas.height - this.padding.bottom;
    }






    getCanvasPositionForHorizontalAxis(value) {
        const { canvas, yOffset, yScale } = this;
        const y = Math.round(yOffset - value * yScale);
        return { xStart: 0, xEnd: canvas.width, y };
    }

    getCanvasPositionForValueLabel(value, alternate) {
        const { yOffset, yScale, padding } = this;
        const y = Math.round(yOffset - value * yScale + chartValueLabelYOffset);
        return { x: !alternate ? padding.left*0 : this.canvas.width - padding.right*0, y };
    }

    getCanvasPositionForTimestamp(tickIndex) {
        const {
            canvas, xOffset, xScale
        } = this;
        const x = Math.round(tickIndex * xScale + xOffset + chartTimestampXOffset);
        const y = canvas.height - chartTimestampYOffset;

        return { x, y };
    }

    getTickIndexFromClientXOverCanvas(clientX) {
        const { canvas, xOffset, xScale } = this;
        const boundingRect = canvas.getBoundingClientRect();
        const clientXOverCanvas = (clientX - boundingRect.left + 1) * window.devicePixelRatio;
        const tickIndex = Math.round((clientXOverCanvas - xOffset) / xScale);
        return tickIndex;
    }

    getCanvasPositionForVerticalAxis(tickIndex) {
        const {
            canvas,
            padding,
            xOffset, xScale
        } = this;
        const x = tickIndex * xScale + xOffset;
        return { x, yStart: 0, yEnd: canvas.height - padding.bottom };
    }

    getCanvasPositionForPopupWindow(tickIndex, textWidth) {
        const { canvas, xOffset, xScale } = this;

        const tickX = tickIndex * xScale + xOffset;
        const windowWidth = textWidth + popupWindowPadding * 2;

        let x = tickX - windowWidth / 2;
        if (x + windowWidth > canvas.width - canvasMinXMargin) {
            x = canvas.width - canvasMinXMargin - windowWidth;
        }
        if (x < 0) x = canvasMinXMargin;

        return { x, y: popupWindowYOffset };
    }

    getCanvasPositionFromClientOverCanvas(clientX, clientY) {
        const { canvas } = this;
        const boundingRect = canvas.getBoundingClientRect();
        const ratio = window.devicePixelRatio;
        const clientXOverCanvas = (clientX - boundingRect.left + 1) * ratio;
        const clientYOverCanvas = (clientY - boundingRect.top + 1) * ratio;
        return { x: clientXOverCanvas, y: clientYOverCanvas };
    }

    

    getCanvasPositionForStackedBar(tickIndex, values) {
        const {
            xOffset, xScale, yOffset, yScale, canvas, padding
        } = this;

        const x1 = Math.round((tickIndex - 0.5) * xScale + xOffset);
        const x2 = Math.round((tickIndex + 0.5) * xScale + xOffset);

        const bars = {};

        let prevBarY = null;
        Object.entries(values).forEach(([datasetIndex, stacked]) => {
            if (prevBarY === null) {
                const y = Math.round(yOffset - stacked.sum * yScale);
                prevBarY = y;
                const height = canvas.height - padding.bottom - y;
                bars[datasetIndex] = { y, height };
            } else {
                const y = Math.round(yOffset - stacked.sum * yScale);
                const height = prevBarY - y;
                prevBarY = y;
                bars[datasetIndex] = { y, height };
            }
        });

        return {
            x1, x2, bars
        };
    }

    


    getCanvasPositionForPieChart(data) {
        const { canvas, padding } = this;

        const INITIAL_ANGLE_OFFSET = 30;
        const RADIUS = 0.3 * Math.min(canvas.width, canvas.height);

        // padding is ignored here
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const degToRad = deg => deg * (Math.PI / 180);

        const result = {
            centerX: Math.round(centerX),
            centerY: Math.round(centerY),
            radius: RADIUS,
            slices: {}
        };

        // TODO - inject pixel perfect angles HERE ????
        Object.entries(data).forEach(([dataInd, values]) => {
            // const startAngle = INITIAL_ANGLE_OFFSET + (values.stackedAnimPercent - values.animatedPercent) / 100 * 360;
            // const angle = values.animatedPercent / 100 * 360;

            const endAngle = INITIAL_ANGLE_OFFSET + values.stackedAnimPercent / 100 * 360;
            const startAngle = endAngle - values.animatedPercent / 100 * 360;
            
            const x1 = Math.round(centerX + Math.cos(degToRad(startAngle)));
            const y1 = Math.round(centerY + Math.sin(degToRad(startAngle)));

            // const x2 = Math.round(centerX + Math.cos(degToRad(endAngle)));
            // const y2 = Math.round(centerY + Math.sin(degToRad(endAngle)));

            result.slices[dataInd] = { startAngle: degToRad(startAngle), endAngle: degToRad(endAngle), x1, y1 };
        });

        return result;
    }

    // clear() {
    //     this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
    // }
}
