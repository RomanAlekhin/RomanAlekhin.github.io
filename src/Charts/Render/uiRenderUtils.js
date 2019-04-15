
import { settings } from '../../Settings/slider';
import { style, themeDependent } from '../../Styles/slider';

// eslint-disable-next-line import/prefer-default-export
export const renderSliderUI = (canvas, selection, mode) => {
    const context = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    const vertBordWidth = style.uiVertBorderWidth * pixelRatio;
    const horBordWidth = style.uiHorBorderWidth * pixelRatio;

    const startX = canvas.width * selection.from;
    const endX = canvas.width * selection.to;

    const theme = themeDependent[mode];
    context.fillStyle = theme.scrollBackgroundColor;
    context.globalAlpha = theme.scrollBackgroundOpacity;

    // Areas
    context.fillRect(0, 0, startX + vertBordWidth, canvas.height);
    context.fillRect(endX - vertBordWidth, 0, canvas.width - endX + vertBordWidth, canvas.height);

    // Frame
    context.fillStyle = theme.scrollSelectorColor;
    context.globalAlpha = 1;

    context.fillRect(startX + vertBordWidth, 0, endX - startX - vertBordWidth * 2, horBordWidth);
    context.fillRect(startX + vertBordWidth, canvas.height - horBordWidth,
        endX - startX - vertBordWidth * 2, horBordWidth);

    const radius = style.borderRadius * pixelRatio;

    context.beginPath();
    context.moveTo(startX + vertBordWidth, 0);
    context.quadraticCurveTo(startX, 0, startX, radius);
    context.lineTo(startX, canvas.height - radius);
    context.quadraticCurveTo(startX, canvas.height, startX + vertBordWidth, canvas.height);
    context.fill();

    context.beginPath();
    context.moveTo(endX - vertBordWidth, 0);
    context.quadraticCurveTo(endX, 0, endX, radius);
    context.lineTo(endX, canvas.height - radius);
    context.quadraticCurveTo(endX, canvas.height, endX - vertBordWidth, canvas.height);
    context.fill();

    context.strokeStyle = '#ffffff';
    context.lineCap = 'round';
    context.lineWidth = 3 * pixelRatio;
    const height = 13 * pixelRatio;
    const y = canvas.height / 2 - height / 2;
    let x = startX + vertBordWidth / 2;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + height);
    context.stroke();

    x = endX - vertBordWidth / 2;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + height);
    context.stroke();

    context.globalAlpha = 1;
};
