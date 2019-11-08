import modes from './modesConfig';

export default class ModeSwitcher {
    constructor(app, body, button) {
        this.app = app;
        this.body = body;
        this.button = button;
        button.onclick = () => this.applyMode(this.getAnotherMode());
        this.applyMode(modes.day); // Use this mode by default
    }

    applyMode(newMode) {
        const { button } = this;
        this.mode = newMode;
        const oldMode = this.getAnotherMode();

        button.innerHTML = `Switch to ${oldMode.title}`;
        const elementsToToggleClass = document.querySelectorAll('.theme');
        Object.values(elementsToToggleClass).forEach((e) => {
            e.classList.remove(oldMode.className);
            e.classList.add(newMode.className);
        });

        if (this.app.charts) this.app.charts.forEach(c => c.update());
    }

    getAnotherMode() {
        return this.mode === modes.day ? modes.night : modes.day;
    }

    getMode() {
        return this.mode.id;
    }

    getCurrentModeClassName() {
        return this.mode.className;
    }
}
