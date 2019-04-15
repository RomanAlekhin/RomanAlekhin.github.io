export default class SliderDraggableArea {
    constructor(canvas, chartArea, cursorClassName) {
        this.canvas = canvas;
        this.chartArea = chartArea;
        this.active = false;

        // this.divForCursor = document.createElement('div');
        // this.divForCursor.classList.add('canvas-draggable-cursor');
        // this.divForCursor.classList.add(cursorClassName);
        // canvas.parentElement.insertBefore(this.divForCursor, canvas);

        canvas.addEventListener('mousedown', (e) => {
            this.handleClick(e.clientX, e.clientY);
        });

        canvas.addEventListener('touchstart', (e) => {
            this.handleClick(e.touches[0].clientX, e.touches[0].clientY);
        });

        document.addEventListener('mouseup', () => {
            this.active = false;
        });

        document.addEventListener('touchend', () => {
            this.active = false;
        });

        document.addEventListener('touchcancel', () => {
            this.active = false;
        });

        document.addEventListener('mousemove', (e) => {
            if (this.active) this.handleMove(e.clientX, e.clientY);
        });

        document.addEventListener('touchmove', (e) => {
            if (this.active) this.handleMove(e.touches[0].clientX, e.touches[0].clientY);
        });
    }

    setBounds(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // this.divForCursor.setAttribute('style', `left:${x + this.canvas.offsetLeft}px;width:${width}px;height:${height}px;`);
        // this.divForCursor.setAttribute('height', height);
    }

    getCenterPosition() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
    }

    testPointEntry(pointX, pointY) {
        const {
            x, y, width, height
        } = this;

        return x <= pointX && pointX <= x + width
            && y <= pointY && pointY <= y + height;
    }

    handleClick(clientX, clientY) {
        const positionOnCanvas = this.chartArea
            .getCanvasPositionFromClientOverCanvas(clientX, clientY);
        const clicked = this.testPointEntry(positionOnCanvas.x, positionOnCanvas.y);
        if (clicked) {
            this.active = true;
            this.offset = { x: positionOnCanvas.x - this.x - this.width / 2, y: positionOnCanvas.y - this.y - this.height / 2 };
        }
    }

    handleMove(clientX, clientY) {
        const positionOnCanvas = this.chartArea
            .getCanvasPositionFromClientOverCanvas(clientX, clientY);
        let relativeX = (positionOnCanvas.x - this.offset.x) / this.canvas.width;
        if (relativeX < 0) relativeX = 0;
        if (relativeX > 1) relativeX = 1;
        this.onDrag(relativeX);
    }
}
