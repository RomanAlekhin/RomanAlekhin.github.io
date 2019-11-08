import {
    chartAxisColor, chartAxisLineThickness, chartTextFont
} from '../../Settings';

import { themeSpecific } from '../../Settings/index';

import { formatValue } from '../../Utils/numberUtils';

const renderAxisLine = (context, chartArea, value) => {
    const theme = window.app.modeSwitcher.getMode();
    const themeSet = themeSpecific[theme];

    context.strokeStyle = themeSet.gridLinesColor;
    context.globalAlpha = themeSet.gridLinesAlpha;

    context.lineWidth = 1 * window.devicePixelRatio;
    const position = chartArea.getCanvasPositionForHorizontalAxis(value);
    context.beginPath();
    context.moveTo(position.xStart, position.y);
    context.lineTo(position.xEnd, position.y);
    context.stroke();
};

export const renderSelectionLine = (context, chartArea, tick) => {
    const theme = window.app.modeSwitcher.getMode();
    const themeSet = themeSpecific[theme];

    context.strokeStyle = themeSet.gridLinesColor;
    context.globalAlpha = themeSet.gridLinesAlpha;

    context.lineWidth = 1 * window.devicePixelRatio;
    const position = chartArea.getCanvasPositionForVerticalAxis(tick);
    context.beginPath();
    context.moveTo(position.x, position.yStart);
    context.lineTo(position.x, position.yEnd);
    context.stroke();
};

export const renderAxes = (axes, canvas, chartArea, percentage, axesTextColor, alternate = false, datasetPresence) => {
    const context = canvas.getContext('2d');

    context.strokeStyle = chartAxisColor;
    // context.lineWidth = chartAxisLineThickness;
    context.fillStyle = axesTextColor || '#8E8E93';
    context.font = axesTextColor ? 'bold 14px Arial' : chartTextFont;
    context.textAlign = alternate ? 'right' : 'left';

    Object.entries(axes).forEach(([value, presence]) => {
        // context.globalAlpha = 0.25;

        if (!alternate) renderAxisLine(context, chartArea, value);

        const point = chartArea.getCanvasPositionForValueLabel(value, alternate);
        
        // if (presence > 1) presence = 1;
        // if (datasetPresence > 1) datasetPresence = 1;
        // if (datasetPresence < 0) datasetPresence = 0;
        
        context.globalAlpha = presence * (datasetPresence !== undefined ? datasetPresence : 1);
        const text = formatValue(value, percentage);
        context.fillText(text, point.x, point.y);
    });

    context.globalAlpha = 1;
    context.textAlign = 'left';
};

export const renderLineChartSelection = (context, chartArea, altChartArea, valueDatasets, tick) => {
    const valueDatasetsToRender = valueDatasets.filter(d => d.enabled);
    valueDatasetsToRender.forEach((dataset) => {
        const area = !dataset.useAlternateAxis ? chartArea : altChartArea;

        const val = tick % 1 === 0 ? dataset.values[tick] : (dataset.values[Math.ceil(tick)] + dataset.values[Math.floor(tick)]) / 2;
        const point = area.getCanvasPositionForPoint(val, tick);

        context.globalAlpha = 1;

        context.strokeStyle = dataset.color;
        context.lineWidth = 3 * window.devicePixelRatio;
        context.beginPath();

        context.arc(point.x, point.y, 3 * window.devicePixelRatio, 0, 2 * Math.PI);
        context.stroke();

        context.fillStyle = window.app.modeSwitcher.getMode() === 'day' ? '#FFFFFF' : '#242F3E';
        context.fill();
        context.fillStyle = '#000000';
    });
}
