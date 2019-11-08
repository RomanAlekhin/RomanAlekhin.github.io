import RenderedObject from './base/RenderedObject';
import {
    alpha,
    captionsInterval,
    dateColor,
    dateFont,
    dateYOffset,
    lineColor,
    lineThickness,
    nameFont,
    namesYOffset,
    padding,
    valueFont,
    valuesYOffset,
    modes
} from '../../Settings/popupWindow';
import { getShortDateWithDayOfWeek } from '../../Utils/dateFormaters';
import { formatValue } from '../../Utils/numberUtils';
import { measureText } from '../../Utils/textUtils';

export default class PopupWindow extends RenderedObject {
    attachDatasets(valueDatasets, axisDataset) {
        this.valueDatasets = valueDatasets;
        this.axisDataset = axisDataset;
    }

    render(selectedTickIndex) {
        const {
            chartArea, context, axisDataset, valueDatasets
        } = this;

        if (selectedTickIndex) {
            const timestamp = axisDataset.values[selectedTickIndex];
            const dateText = getShortDateWithDayOfWeek(timestamp);
            const dateWidth = measureText(context, dateText, dateFont);

            let dataWidth = -captionsInterval;

            // Group data in suitable format for render.
            const dataForRender = valueDatasets.filter(d => d.enabled)
                .map((d) => {
                    const valueText = formatValue(d.values[selectedTickIndex]);
                    const elementWidth = Math.max(measureText(context, d.name, nameFont),
                        measureText(context, valueText, valueFont));

                    const res = {
                        name: d.name,
                        value: valueText,
                        color: d.color,
                        xPosition: dataWidth + captionsInterval
                    };

                    dataWidth += elementWidth + captionsInterval;
                    return res;
                });

            const windowTextWidth = Math.max(dateWidth, dataWidth);
            const windowHeight = dateYOffset + valuesYOffset + namesYOffset;

            // Render window.
            context.strokeStyle = lineColor;
            context.lineWidth = lineThickness;

            // Get starting position for window.
            const position = chartArea.getCanvasPositionForPopupWindow(selectedTickIndex,
                windowTextWidth);

            // Render window.
            context.rect(position.x, position.y,
                windowTextWidth + padding * 2, windowHeight + padding * 2);
            context.stroke();
            context.globalAlpha = alpha;


            const currentMode = window.app.modeSwitcher.getMode();
            const fillStyle = modes.fillStyle[currentMode];
            const textColor = modes.textColor[currentMode];

            context.fillStyle = fillStyle;
            context.fill();
            context.globalAlpha = 1;

            // Render content.
            position.x += padding;
            position.y += padding;

            context.font = dateFont;
            context.fillStyle = textColor;
            context.fillText(dateText, position.x, position.y + dateYOffset);

            dataForRender.forEach((data) => {
                context.fillStyle = data.color;

                context.font = valueFont;
                context.fillText(data.value,
                    position.x + data.xPosition,
                    position.y + dateYOffset + valuesYOffset);

                context.font = nameFont;
                context.fillText(data.name,
                    position.x + data.xPosition,
                    position.y + dateYOffset + valuesYOffset + namesYOffset);
            });
        }
    }
}
