const createButton = (chartId, dataId, name, color) => {
    const buttonId = `${chartId}-${dataId}`;
    const themeClassName = window.app.modeSwitcher.getCurrentModeClassName();

    return `<div class="round on" style="background-color:${color};border-color:${color};">
                <input type="checkbox" id="${buttonId}" checked>
                <label for="${buttonId}" style="background-color: ${color}; border-color:${color};"></label>
                <div class="checkbox_text theme ${themeClassName}">${name}</div>
            </div>`;
};

const LONG_TAP_TIMEOUT = 600;

const applyOnStyle = (dataset, button) => {
    button.querySelector('input').checked = dataset.enabled;
    const round = button.querySelector('.round');
    round.classList.remove('off');
    round.classList.add('on');
    round.style = `background-color:${dataset.color};border-color:${dataset.color};`;
    button.querySelector('.checkbox_text').style.color = '#FFFFFF';
};

const applyOffStyle = (dataset, button) => {
    button.querySelector('input').checked = dataset.enabled;
    const round = button.querySelector('.round');
    round.classList.remove('on');
    round.classList.add('off');
    round.style = `border-color:${dataset.color};`;
    button.querySelector('.checkbox_text').style.color = dataset.color;
};

const handleSimpleClick = (dataset, chart, button) => {
    dataset.enabled = !dataset.enabled;

    if (chart.onDatasetToggled(dataset)) {
        pressButton(button);
        if (dataset.enabled) {
            applyOnStyle(dataset, button);
        } else {
            applyOffStyle(dataset, button);
        }
    }
};

const handleLongTap = (dataset, chart, button) => {
    console.log('long tap');

    chart.onDatasetPrioritized(dataset);
    animateLongTap(button);
};

const createDataButton = (dataset, chart, dataButtons) => {
    const button = document.createElement('div');
    button.className = 'button-container';
    button.innerHTML = createButton(chart.node.id, dataset.id, dataset.name, dataset.color);
    const checkbox = button.querySelector('input');
    const round = button.querySelector('.round');


    button.ontouchstart = (e) => {
        // e.preventDefault();
        // alert('touch start');
        // console.log('touch start', dataButtons.ignoreSimpleTouch);

        dataButtons.longTap = setTimeout(() => {
            handleLongTap(dataset, chart, button);
            dataButtons.ignoreSimpleTouch = true;
        }, LONG_TAP_TIMEOUT);
    };

    button.ontouchend = (e) => {
        // e.preventDefault();
        // alert('touch end');
        // console.log('touch end', dataButtons.ignoreSimpleTouch);

        clearTimeout(dataButtons.longTap);
    };

    button.ontouchcancel = (e) => {
        // e.preventDefault();
        // alert('touch cancel');
        // console.log('touch cancel', dataButtons.ignoreSimpleTouch);

        clearTimeout(dataButtons.longTap);
    };

    button.ontouchmove = (e) => {
        // e.preventDefault();
        // alert('touch move');
        // console.log('touch move', dataButtons.ignoreSimpleTouch);

        clearTimeout(dataButtons.longTap);
    };


    button.onmousedown = (e) => {
        // e.preventDefault();
        // alert('mouse down');
        // console.log('mouse down', dataButtons.ignoreSimpleMouseClick);

        dataButtons.longTap = setTimeout(() => {
            handleLongTap(dataset, chart, button);
            dataButtons.ignoreSimpleMouseClick = true;
        }, LONG_TAP_TIMEOUT);
    };


    button.onmouseup = (e) => {
        // e.preventDefault();
        // alert('mouse down');
        // console.log('mouse up', dataButtons.ignoreSimpleMouseClick);

        clearTimeout(dataButtons.longTap);
    };

    button.onmouseleave = (e) => {
        // e.preventDefault();
        // alert('mouse leave');
        // console.log('mouse leave', dataButtons.ignoreSimpleMouseClick);

        clearTimeout(dataButtons.longTap);
        if (dataButtons.ignoreSimpleMouseClick) dataButtons.ignoreSimpleMouseClick = false;
    };


    button.firstChild.onclick = (e) => {
        // e.preventDefault();
        // alert('click');
        // console.log('click', dataButtons.ignoreSimpleMouseClick, dataButtons.ignoreSimpleTouch);

        e.preventDefault();
        if (!dataButtons.ignoreSimpleMouseClick && !dataButtons.ignoreSimpleTouch) {
            clearTimeout(dataButtons.longTap);
            handleSimpleClick(dataset, chart, button);
        }
        dataButtons.ignoreSimpleMouseClick = false;
        dataButtons.ignoreSimpleTouch = false;
    };

    return button;
};

// const applyAnimation = (button, anim) => {
//     const animatedElement = button.querySelector('.round');
//     animatedElement.classList.remove(anim);
//     void animatedElement.offsetWidth;
//     animatedElement.classList.add(anim);
//     void animatedElement.offsetWidth;
// }

const pressButton = (button) => {
    const animatedElement = button.querySelector('.round');
    animatedElement.classList.remove('shake');
    animatedElement.classList.remove('press');
    animatedElement.classList.remove('longTap');
    void animatedElement.offsetWidth;
    animatedElement.classList.add('press');
};

const animateLongTap = (button) => {
    const animatedElement = button.querySelector('.round');
    animatedElement.classList.remove('shake');
    animatedElement.classList.remove('press');
    animatedElement.classList.remove('longTap');
    // void animatedElement.offsetWidth;
    animatedElement.classList.add('longTap');
};

export default class DataButtons {
    constructor(chart) {
        this.chart = chart;
        this.node = chart.node.querySelector('.chart-data-selection');
    }

    enable() {
        console.log('dataButtons enabled');
    }

    disable() {
        console.log('dataButtons disabled');
    }

    attachDatasets(datasets) {
        this.datasets = datasets;
        const { chart, node } = this;

        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }

        this.dataButtons = {};
        datasets.forEach((dataset) => {
            const button = createDataButton(dataset, chart, this);
            node.appendChild(button);
            this.dataButtons[dataset.id] = button;
        });
    }

    forciblyToggleButton(dataset, checked) {
        dataset.enabled = checked;
        if (checked) {
            applyOnStyle(dataset, this.dataButtons[dataset.id]);
        } else {
            applyOffStyle(dataset, this.dataButtons[dataset.id]);
        }
    }

    shakeButton(dataset) {
        const button = this.dataButtons[dataset.id];
        const animatedElement = button.querySelector('.round');
        animatedElement.classList.remove('press');
        animatedElement.classList.remove('shake');
        animatedElement.classList.remove('longTap');
        void animatedElement.offsetWidth;
        animatedElement.classList.add('shake');
        void animatedElement.offsetWidth;
    }
}
