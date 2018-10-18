'use strict';

const getRandomColor = () => {
  const red = 100 + Math.round(Math.random() * 150);
  const green = 100 + Math.round(Math.random() * 150);
  const blue = 50 + Math.round(Math.random() * 50);
  const color = `rgba(${red}, ${green}, ${blue})`;
  return color;
};

module.exports = {
  getRandomColor
};
