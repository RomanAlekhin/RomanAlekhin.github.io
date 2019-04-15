import Animator from './Animator';
import AxisManager from './AxisManager';
import DataButtons from './DataButtons';
import MainWindow from './MainWindow';
import Slider from './Slider';

const STACKED_ANIM_DURATION = 300;
const LINE_ANIM_DURATION = 150;

export default class Chart {
    constructor(app, node, name, chartType, relatedDataId) {
        this.app = app;
        this.node = node;
        this.name = name;
        this.chartType = chartType;

        this.relatedDataId = relatedDataId;
        this.isZoomed = false;

        this.animator = new Animator(this);
        this.mainWindow = new MainWindow(this);
        this.slider = new Slider(this);
        this.dataButtons = new DataButtons(this);
        this.axisManager = new AxisManager(this, this.mainWindow.chartArea, 'main_axes');

        if (!chartType.sliderEnabled) this.slider.disable();
        if (!chartType.buttonsEnabled) this.dataButtons.disable();

        this.zoomer = node.querySelector('.zoom');
        if (this.zoomer) {
            this.zoomer.onclick = () => {
                debugger
                if (!this.isZoomed) {
                    const tick = this.mainWindow.dataRenderer.selectedTick || this.slider.getSelectedTicks().endTick;
                    this.enterZoomedMode(this.data.axisDataset.values[tick]);
                    this.mainWindow.hidePopup();
                } else {
                    this.exitZoomedMode();
                }
            };
        }

        this.onAdjustToScreen();
    }

    attachData(data) {
        if (!data) return;

        this.data = data;
        data.refreshCache();

        this.dataButtons.attachDatasets(data.valueDatasets);
        this.slider.attachData(data);
        this.axisManager.attachData(data);
        this.mainWindow.attachData(data);

        this.update(); // ???? should we make the first render here ???

        requestAnimationFrame(this.animator.updateAnimationsBound);
    }


    // Events
    onDatasetToggled(dataset) {
        if (!this.data.valueDatasets.some(d => d.enabled)) {
            this.dataButtons.shakeButton(dataset);
            this.dataButtons.forciblyToggleButton(dataset, true);
            return false;
        }

        this.animateToggleDataset(dataset);

        this.data.refreshCache();
        this.slider.animateUpdateMinMax();
        const { startTick, endTick } = this.slider.getSelectedTicks();
        const { min, max } = this.data.getMinMaxValues(startTick, endTick);
        this.axisManager.animateUpdateMinMax(min, max);
        return true;
    }

    onDatasetPrioritized(dataset) {
        if (this.data.valueDatasets.length <= 1) {
            this.shake();
            this.dataButtons.forciblyToggleButton(dataset, true);
            return;
        }

        this.data.valueDatasets.forEach((d) => {
            this.dataButtons.forciblyToggleButton(d, d === dataset);
            this.animateToggleDataset(d);
        });

        this.data.refreshCache();
        this.slider.animateUpdateMinMax();
        const { startTick, endTick } = this.slider.getSelectedTicks();
        const { min, max } = this.data.getMinMaxValues(startTick, endTick);
        this.axisManager.animateUpdateMinMax(min, max);
    }

    onSliderChanged() {
        this.axisManager.onSliderChanged();
        this.mainWindow.timeLabelsManager.onResize();
    }

    onAdjustToScreen() {
        this.mainWindow.onAdjustToScreen();
        this.slider.onAdjustToScreen();
    }


    update() {
        this.mainWindow.render();
        this.slider.render();
    }


    // Animations
    animateToggleDataset(dataset) {
        const animId = `data_presence_${dataset.id}`;
        const from = dataset.presence;
        const to = dataset.enabled ? 1 : 0;
        const duration = dataset.type === 'line' ? LINE_ANIM_DURATION : STACKED_ANIM_DURATION;

        this.animator.startAnimation(animId, (newValue) => {
            dataset.presence = newValue;
            if (this.data.options.stacked) this.data.refreshCache();
        }, from, to, duration, true, true);
    }

    enterZoomedMode(timestamp) {
        this.overviewData = this.data;

        window.app.dataProvider.loadDetailedData(this.relatedDataId, timestamp)
            .then((data) => {
                this.zoomer.innerHTML = 'zoom out';
                this.isZoomed = true;
                this.attachData(data);
            });
    }

    exitZoomedMode() {
        this.isZoomed = false;
        this.zoomer.innerHTML = 'zoom in';
        this.attachData(this.overviewData);
    }
}
