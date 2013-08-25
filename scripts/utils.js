function choose(choices) {
  index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function isInside(y) {
	return y > 0.2*rince.settings.cellSize * rince.settings.cols;
}
