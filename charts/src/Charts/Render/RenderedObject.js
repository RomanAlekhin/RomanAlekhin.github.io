export default class RenderedObject {
    constructor(chartArea) {
        this.chartArea = chartArea;
        this.canvas = chartArea.canvas;
        this.context = chartArea.canvas.getContext('2d');
    }
}
