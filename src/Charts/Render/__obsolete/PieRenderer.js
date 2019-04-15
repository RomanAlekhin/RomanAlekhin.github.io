import DataRenderer from '../base/DataRenderer';

export default class PieRenderer extends DataRenderer {
    render(ticks) {

        // TODO - several ticks
        //ticks = { start: 0, end: this.data.totalTicks - 1 }) {

        const {
            chartArea, context, data
        } = this;
        const { stacked, percentage } = data.options;

        const tick = 300;

        if (stacked && percentage) { // TODO - should support other options ???
            const datasetsToInclude = data.valueDatasets.filter(d => d.alpha > 0);
            
            const percentageData = this.data.getStackedPercentageValues(tick, datasetsToInclude);
            // debugger
            
            const position = this.chartArea.getCanvasPositionForPieChart(percentageData);
            const { centerX, centerY, radius } = position;

            Object.entries(position.slices).forEach(([dataInd, values]) => {
                const dataset = datasetsToInclude[dataInd];

                const {
                    x1, y1, startAngle, endAngle
                } = values;

                context.globalAlpha = dataset.alpha;
                context.fillStyle = dataset.color;

                context.beginPath();
                context.moveTo(centerX, centerY);
               
                context.lineTo(x1, y1);
                context.arc(centerX, centerY, radius, startAngle, endAngle);
                context.lineTo(centerX, centerY);

                context.closePath();
                context.fill();
            });
            
            context.globalAlpha = 1;
        }
    }
}
