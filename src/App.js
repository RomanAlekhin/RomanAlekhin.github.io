import Chart from './Charts/Chart';
import DataProvider from './Data/DataProvider';
import ModeSwitcher from './ApplicationModes/ModeSwitcher';
// import { getShortDate } from './Utils/dateFormaters';
import { CHART_TYPES } from './constants';

export default class App {
    init() {
        this.modeSwitcher = new ModeSwitcher(this, document.body, document.getElementById('mode-switcher'));

        // Initialize charts.
        this.charts = [
            new Chart(this, document.getElementById('chart1'), 'Followers', CHART_TYPES.LINE_CHART, 1),
            new Chart(this, document.getElementById('chart2'), 'Interactions', CHART_TYPES.DOUBLE_AXIS_LINE_CHART, 2),
            new Chart(this, document.getElementById('chart3'), 'Messages', CHART_TYPES.STACKED_BAR_CHART, 3),
            new Chart(this, document.getElementById('chart4'), 'Views', CHART_TYPES.DAILY_BAR_CHART, 4),
            new Chart(this, document.getElementById('chart5'), 'Apps', CHART_TYPES.PERCENTAGE_STACKED_AREA_CHART, 5)
            // new Chart(this, document.getElementById('chartPie'))
        ];
        this.dataProvider = new DataProvider();
    }

    loadData() {
        for (let i = 0; i < 5; i++) {
            this.dataProvider.loadOverviewData(i + 1)
                .then((data) => {
                    this.charts[i].attachData(data);
                });
        }

        // // Data for Pie chart.
        // this.dataProvider.loadOverviewData(5)
        //     .then(data => this.charts[5].attachData(data));

        this.timestampLabels = {};
    }

    reinit(dataId, chartId) {
        this.dataProvider.loadOverviewData(dataId)
            .then((data) => {
                this.charts[chartId].attachData(data);
            });
    }

    adjustChartsToScreen() {
        this.charts.forEach(chart => chart.onAdjustToScreen());
    }
}
