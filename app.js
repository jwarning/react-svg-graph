var React = require('react');
var ReactDOM = require('react-dom');
var ReactSVGGraph = require('./index.js');

var renderGraphs = function () {
  var data = [];
  for (var i = 0; i < 16; i++) {
    data.push({ id: i, value: parseInt(Math.random() * 100, 10) });
  }

  ReactDOM.render(React.createElement(ReactSVGGraph, {
    graphType: 'bar',
    data: data,
    maxValue: 100,
    width: 400,
    height: 150
  }), document.getElementById('bar-graph'));

  ReactDOM.render(React.createElement(ReactSVGGraph, {
    graphType: 'line',
    data: data,
    maxValue: 100,
    width: 400,
    height: 150
  }), document.getElementById('line-graph'));
};

var toggle = false;
var interval = null;

var toggleAnimation = function () {
  if (!toggle) {
    renderGraphs();
    interval = setInterval(renderGraphs, 2000);
  }
  else clearInterval(interval);
  toggle = !toggle;
};

document.querySelector('.buttonToggle').addEventListener('click', toggleAnimation);

renderGraphs();
