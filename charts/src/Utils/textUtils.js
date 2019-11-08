// eslint-disable-next-line import/prefer-default-export
export const measureText = (context, text, usedFont) => {
    context.font = usedFont;
    return Math.ceil(context.measureText(text).width);
};
