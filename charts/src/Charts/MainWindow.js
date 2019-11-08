// import AxesRenderer from './Render/AxesRenderer';
import ChartArea from './ChartArea';
import DataRenderer from './Render/DataRenderer';
import TimeLabelsManager from './Render/TimeLabelsManager';

import {
    axesToDisplay,
    padding,
    timestampsToDisplay,
    valueLineThickness
} from '../Settings/mainWindow';
import { getFullDate, getDateForPopup, getHour, getFullDateWithDayOfWeek } from '../Utils/dateFormaters';
// import { calculateRenderedTimestamps } from '../Utils/timestampUtils';
import { formatValue } from '../Utils/numberUtils';


const SLIDING_ANIMATION_DURATION_RATE = 200;
const ANIM_DURATION = 300;
const RESIZE_THROTTLE_DURATION = 200;
const INITIAL_AXE_ALPHA = 0.25;
const TIMESTAMP_DEFAULT_WIDTH = 64;


export default class MainWindow {
    constructor(chart) {
        this.chart = chart;
        this.canvas = chart.node.querySelector('.canvas-main-window');

        this.chartArea = new ChartArea(chart, this.canvas, padding);
        this.dataRenderer = new DataRenderer(this.chart, this.chartArea, valueLineThickness);
        this.timeLabelsManager = new TimeLabelsManager(this.chart, this.chartArea);

        this.zoomAnimAreaStartScale = null;
        this.zoomAnimAltAreaStartScale = null;

        this.popup = chart.node.querySelector('.popup');
        this.popupFixed = false;

        const getSelTick = (clientX, clientY) => {
            let tickIndex = this.chartArea.getTickIndexFromClientXOverCanvas(clientX);
            // const { start, end } = chart.slider.getSelectedTicks();
            if (tickIndex < 0) tickIndex = 0;
            if (tickIndex > this.data.totalTicks - 1) tickIndex = this.data.totalTicks - 1;
            return tickIndex;
        };



        // this.canvas.onmouseover = (e) => {
        //     if (this.data) {
        //         let tickIndex = this.chartArea.getTickIndexFromClientXOverCanvas(e.clientX);
        //         console.log(tickIndex);
        //         // const { start, end } = chart.slider.getSelectedTicks();
        //         if (tickIndex < 0) tickIndex = 0;
        //         if (tickIndex > this.data.totalTicks - 1) tickIndex = this.data.totalTicks - 1;

        //         if (tickIndex !== this.dataRenderer.selectedTick) {
        //             // this.dataRenderer.updateDataSelectionWithAnimation(tickIndex);
        //             this.dataRenderer.updateDataSelectionInstantly(tickIndex);
        //             this.shouldRerender = true;
        //         }

        //         this.updatePopup();
        //     }
        // };

        this.canvas.onmousemove = (e) => {
            if (this.data && !this.popupFixed) {
                const tickIndex = getSelTick(e.pageX, e.pageY);
                if (tickIndex !== this.dataRenderer.selectedTick) {
                    this.dataRenderer.updateDataSelectionInstantly(tickIndex);
                    this.shouldRerender = true;
                }
                this.updatePopup(e.pageX, e.pageY, tickIndex);
            }
        };

        // this.canvas.ontouchmove = (e) => {
        //     e = e.touches[0];
        //     if (this.data //&& !this.popupFixed
        //         ) {
        //         const tickIndex = getSelTick(e.pageX, e.pageY);
        //         if (tickIndex !== this.dataRenderer.selectedTick) {
        //             this.dataRenderer.updateDataSelectionInstantly(tickIndex);
        //             this.shouldRerender = true;
        //         }
        //         this.updatePopup(e.pageX, e.pageY, tickIndex);
        //     }
        // };

        this.canvas.ontouchstart = (e) => {
            this.handleClickOrTouch(e.touches[0].pageX, e.touches[0].pageY);
        };

        this.canvas.onclick = (e) => {
            this.handleClickOrTouch(e.pageX, e.pageY);
        };

        this.handleClickOrTouch = (x, y) => {
            const tickIndex = getSelTick(x, y);
            this.fixPopup(tickIndex);
            this.updatePopup(x, y, tickIndex);
        };

        this.canvas.onmouseout = () => {
            // this.dataRenderer.updateDataSelectionWithAnimation(null);

            if (!this.popupFixed) this.hidePopup();
        };
    }

    attachData(data) {
        this.data = data;
        this.dataRenderer.attachData(data);
        this.timeLabelsManager.attachData(data);
    }


    onAdjustToScreen() {
        const { canvas } = this;
        const boundingRect = this.canvas.getBoundingClientRect();
        const { width, height } = boundingRect;

        // TODO - which size to use ????
        const pixelRatio = window.devicePixelRatio;

        if (width * pixelRatio !== canvas.width || height * pixelRatio !== canvas.height) {
            canvas.setAttribute('width', canvas.clientWidth * pixelRatio);
            canvas.setAttribute('height', canvas.clientHeight * pixelRatio);
            if (this.data) this.shouldRerender = true;
        }

        this.timeLabelsManager.onResize();
    }


    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.chart.axisManager.resizeChartAreas();


        const { startTick, endTick } = this.chart.slider.getSelectedTicks();
        this.dataRenderer.render(startTick, endTick);
        this.chart.axisManager.renderAxes();
        this.timeLabelsManager.render();

        this.shouldRerender = false;

        const mode = window.app.modeSwitcher.getMode();

        ctx.fillStyle = mode === 'day' ? '#000000' : '#FFFFFF';
        ctx.font = `bold ${window.devicePixelRatio >= 2 ? 24 : 16}px Arial`;
        ctx.fillText(this.chart.name, 5, 18);

        const selectedDates = !this.chart.isZoomed
            ? `${getFullDate(this.data.axisDataset.values[startTick])} - ${getFullDate(this.data.axisDataset.values[endTick])}`
            : `${getFullDateWithDayOfWeek(this.data.axisDataset.values[(this.dataRenderer.selectedTick
                ? this.dataRenderer.selectedTick : endTick)])}`;

        ctx.font = `bold ${window.devicePixelRatio >= 2 ? 21 : 14}px Arial`;
        ctx.textAlign = 'right';
        ctx.fillText(selectedDates, this.canvas.width - 5, 18);

        if (this.popupFixed && this.dataRenderer.selectedTickAnim !== null) {
            this.rerenderPopupValues(Math.round(this.dataRenderer.selectedTick));
        }
    }

    // updatePopup(pageX, pageY) {
    updatePopup(x, y, selectedTick) {
        const allChartWindows = window.app.charts.map(c => c.mainWindow);
        allChartWindows.forEach((c) => { if (c !== this) c.hidePopup(); });

        this.popup.style.display = 'block';
        
        const ratio = window.devicePixelRatio;
        const canvBound = this.canvas.getBoundingClientRect();
        const popOffsetX = -40;
        const popOffsetY = -100;

        this.popup.style.left = `${x + popOffsetX}px`;
        this.popup.style.top = `${y + popOffsetY}px`;
        this.popup.style.display = 'block';

        this.rerenderPopupValues(selectedTick);
    }

    hidePopup() {
        this.popup.style.display = 'none';
        this.popupFixed = false;
        this.popup.classList.add('noEvents');
        this.dataRenderer.selectedTick = null;
        this.dataRenderer.selectedTickAnim = null;
        this.shouldRerender = true;
    }

    fixPopup(tickIndex) {
        this.popupFixed = true;
        this.popup.classList.remove('noEvents');
        this.dataRenderer.updateDataSelectionWithAnimation(tickIndex);
    }

    rerenderPopupValues(selectedTick) {
        this.popup.querySelector('.title').innerText = !this.chart.isZoomed
            ? getDateForPopup(this.data.axisDataset.values[selectedTick])
            : getHour(this.data.axisDataset.values[selectedTick]);

        const dataDiv = this.popup.querySelector('.data');
        while (dataDiv.firstChild) {
            dataDiv.removeChild(dataDiv.firstChild);
        }

        let sum = 0;
        this.data.valueDatasets.forEach((d) => {
            if (d.enabled) {
                sum += d.values[selectedTick];
                const row = document.createElement('p');
                row.className = 'column';
                row.innerHTML = `<div class='label'>${d.name}</div>
                                <div class='value' style='color:${d.color}'>${formatValue(d.values[selectedTick])}</div>`;
                dataDiv.appendChild(row);
            }
        });
        if (this.data.options.stacked && !this.data.options.percentage) {
            const row = document.createElement('p');
            row.className = 'column';
            row.innerHTML = `<div class='label all'>All</div>
                             <div class='value'>${formatValue(sum)}</div>`;
            dataDiv.appendChild(row);
        }

       
        
    }

}
