import React from 'react';
import ReactDOM from 'react-dom';
import ReactSVGGraph from '../dist/index.js';

function renderGraphs() {
  let data = [];

  for (let i = 0; i < 16; i++) {
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

let toggle = false;
let interval = null;

function toggleAnimation() {
  if (!toggle) {
    renderGraphs();
    interval = setInterval(renderGraphs, 2000);
  }
  else clearInterval(interval);
  toggle = !toggle;
};

document.querySelector('.buttonToggle').addEventListener('click', toggleAnimation);

renderGraphs();
