function choose(choices) {
  index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function isInside(y) {
	return y > 0.2*rince.settings.cellSize * rince.settings.cols;
}

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}
