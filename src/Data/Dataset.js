export default class Dataset {
    constructor(id, name, type, color, values) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.color = color;
        this.values = values;
        this.enabled = true;
        this.presence = 1; // this property is used for animations.
        this.useAlternateAxis = false;
    }

    isAxisType() {
        return this.type === 'x';
    }

    isValueType() {
        return this.type !== 'x';
    }

    getMinMaxValues(startIndex = 0, endIndex = this.values.length - 1) {
        let min = this.values[startIndex];
        let max = this.values[startIndex];

        for (let i = startIndex + 1; i <= endIndex; i++) {
            const value = this.values[i];
            if (value < min) min = value;
            if (value > max) max = value;
        }

        return { min, max };
    }
}
