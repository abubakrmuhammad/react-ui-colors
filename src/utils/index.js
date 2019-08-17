import chroma from 'chroma-js';
import slugify from 'slugify';

export default function generatePalette(palette) {
  const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const { paletteName, id, emoji, colors } = palette;
  const newColors = {};

  levels.forEach(level => {
    newColors[level] = [];
  });

  colors.forEach(color => {
    const scale = generateScale(color.color, levels.length).reverse();

    scale.forEach((shade, i) => {
      const level = levels[i];

      const name = `${color.name} ${level}`;
      const id = slugify(color.name, { lower: true });
      const hex = shade;
      const rgb = chroma(shade).css();
      const hsl = chroma(shade).css('hsl');
      const rgba = chroma(shade)
        .alpha(0.9)
        .css()
        .replace('0.9', '1.0');

      newColors[levels[i]].push({ name, id, hex, rgb, rgba, hsl });
    });
  });

  return {
    paletteName,
    id,
    emoji,
    colors: newColors
  };
}

function generateScale(hexColor, numberOfColors) {
  return chroma
    .scale(generateRange(hexColor))
    .mode('lab')
    .colors(numberOfColors);
}

function generateRange(hexColor) {
  const darkShade = chroma(hexColor)
    .darken(1.4)
    .hex();
  const theColor = hexColor;
  const lightShade = '#fff';

  const range = [darkShade, theColor, lightShade];

  return range;
}
