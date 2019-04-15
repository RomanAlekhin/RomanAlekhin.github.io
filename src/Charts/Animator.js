export default class Animator {
    constructor(chart) {
        this.chart = chart;

        this.animations = {};

        this.updateAnimationsBound = this.updateAnimations.bind(this);
    }

    startAnimation(id, updateCallback, from, to, duration, shouldRerenderMain, shouldRerenderSlider, onEndCallback, fixedFrames = null) {
        this.animations[id] = {
            updateCallback,
            from,
            to,
            delta: to - from,
            start: performance.now(),
            duration,
            shouldRerenderMain,
            shouldRerenderSlider,
            onEndCallback,
            fixedFrames,
            fixedFramesLeft: fixedFrames
        };
    }

    updateAnimations(time) {
        let shouldRerenderMain = this.chart.mainWindow.shouldRerender;
        let shouldRerenderSlider = this.chart.slider.shouldRerender;


        /// DEBUG performance;
        let mainrerenderes = [];

        Object.entries(this.animations).forEach(([id, anim]) => {
            
            if (anim.shouldRerenderMain) shouldRerenderMain = true;

            /// DEBUG performance;
            if (anim.shouldRerenderMain) mainrerenderes.push(id);

            if (anim.shouldRerenderSlider) shouldRerenderSlider = true;

            let timeFraction;
            if (!anim.fixedFrames) {
                timeFraction = (time - anim.start) / anim.duration;
            } else {
                timeFraction = ((anim.fixedFrames - anim.fixedFramesLeft + 1) / anim.fixedFrames);
                anim.fixedFramesLeft -= 1;
            }

            if (timeFraction > 1) timeFraction = 1;
            const newValue = anim.from + anim.delta * timeFraction;

            if (timeFraction > 1) {
            }

            if (timeFraction < 0) {
            }

            anim.updateCallback(newValue, timeFraction);

            if (timeFraction >= 1) {
                if (anim.onEndCallback) anim.onEndCallback();
                delete this.animations[id];
            }
        });

        requestAnimationFrame(this.updateAnimationsBound);

        if (shouldRerenderMain) {

            this.chart.mainWindow.render();
        }

        if (shouldRerenderSlider) {
            this.chart.slider.render();
        }
    }
}
