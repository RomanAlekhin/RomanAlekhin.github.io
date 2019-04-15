import App from './App';
import { createClickEffect } from './clicker';

window.app = new App();

window.app.init();

window.app.loadData();

window.onresize = () => {
    window.app.adjustChartsToScreen();
};

