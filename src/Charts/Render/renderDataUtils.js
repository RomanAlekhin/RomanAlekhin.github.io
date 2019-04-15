export const renderLine = (context, chartArea, dataset, startTick, endTick, lineWidth) => {
    const { color, presence, values } = dataset;

    context.strokeStyle = color;
    context.globalAlpha = presence;
    context.lineWidth = lineWidth * window.devicePixelRatio;

    context.beginPath();

    const startPoint = chartArea.getCanvasPositionForPoint(values[startTick], startTick);
    context.moveTo(startPoint.x, startPoint.y);

    for (let i = startTick + 1; i <= endTick; i++) {
        const point = chartArea.getCanvasPositionForPoint(values[i], i);
        context.lineTo(point.x, point.y);
    }

    context.stroke();
    context.globalAlpha = 1;
};

export const renderBars = (context, chartArea, dataset, startTick, endTick, selectedTickAnim) => {
    let { x2: prevBarEndX } = chartArea.getCanvasPositionForBar(startTick - 1, 0, 0);

    const barSelected = !(selectedTickAnim === undefined || selectedTickAnim === null);
    const selected = Math.round(selectedTickAnim);

    for (let i = startTick; i <= endTick; i++) {
        context.fillStyle = dataset.color;
        context.globalAlpha = !barSelected ? dataset.presence
            : dataset.presence * (selected === i ? 1 : 0.5);

        const position = chartArea.getCanvasPositionForBar(i, dataset.values[i]);
        context.fillRect(position.x1, position.y, position.x2 - position.x1, position.height);

        // Adjust x coordinate.
        // position.x1 = prevBarEndX;
        prevBarEndX = position.x2;
    }

    context.globalAlpha = 1;
};


// TODO - implemented just for bars now.
export const renderStacked = (context, chartArea, valueDatasets, cache, startTick, endTick, selectedTickAnim) => {
    const barSelected = !(selectedTickAnim === undefined || selectedTickAnim === null);
    const selected = Math.round(selectedTickAnim);

    let { x2: prevBarEndX } = chartArea.getCanvasPositionForBar(startTick - 1, 0, 0);
    for (let i = startTick; i <= endTick; i++) {
        const position = chartArea.getCanvasPositionForStackedValues_BARS(i, cache[i]);

        // TODO - Adjust x coordinate.
        // position.x1 = prevBarEndX;
        prevBarEndX = position.x2;

        // eslint-disable-next-line no-loop-func
        valueDatasets.forEach((dataset, ind) => {
            if (dataset.presence <= 0 || position.bars[ind].height === 0) return;

            context.fillStyle = dataset.color;
            context.globalAlpha = !barSelected ? dataset.presence
                : dataset.presence * (selected === i ? 1 : 0.5);


            context.fillRect(position.x1, position.bars[ind].y, position.x2 - position.x1, position.bars[ind].height);
        });
    }

    context.globalAlpha = 1;
};


// first point of path should already be initiated!
const buildPathForStackedPoints = (context, stackedPoints, dataInd, reverted) => {
    if (!reverted) {
        for (let i = 1; i < stackedPoints.length; i++) {
            context.lineTo(stackedPoints[i].x, stackedPoints[i].ys[dataInd]);
        }
    } else {
        for (let i = stackedPoints.length - 1; i >= 0; i--) {
            context.lineTo(stackedPoints[i].x, stackedPoints[i].ys[dataInd]);
        }
    }
};


const renderArea = (context, stackedPoints, dataset, dataInd, chartBottomY) => {
    context.fillStyle = dataset.color;
    context.globalAlpha = dataset.presence;
    const endTick = stackedPoints.length - 1;

    context.beginPath();
    context.moveTo(stackedPoints[0].x, stackedPoints[0].ys[dataInd]);
    buildPathForStackedPoints(context, stackedPoints, dataInd, false);

    if (dataInd !== 0) {
        context.lineTo(stackedPoints[endTick].x, stackedPoints[endTick].ys[dataInd - 1]);
        buildPathForStackedPoints(context, stackedPoints, dataInd - 1, true);
        context.lineTo(stackedPoints[0].x, stackedPoints[0].ys[dataInd]);
    } else {
        context.lineTo(stackedPoints[endTick].x, chartBottomY);
        context.lineTo(stackedPoints[0].x, chartBottomY);
        context.lineTo(stackedPoints[0].x, stackedPoints[0].ys[dataInd]);
    }

    context.closePath();
    context.fill();
};


export const renderStackedPercentage = (context, chartArea, valueDatasets, cache, startTick, endTick) => {
    const stackedPoints = [];
    const step = (endTick - startTick) 
    for (let i = startTick; i <= endTick; i += 1) {
        stackedPoints.push(chartArea.getCanvasPositionForStackedPercentageValues(i, cache[i]));
    }
    const chartBottomY = chartArea.getChartBottomY();
    valueDatasets.forEach((dataset, dataInd) => {
        renderArea(context, stackedPoints, dataset, dataInd, chartBottomY);
    });
};
