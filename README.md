# React SVG Graph

A simple svg-based graph component for React that plots the given data as either a bar or line graph.
Any changes to the data will trigger an animated transition between the old and new graph.
The component accepts various props that allow you to set the sizing and behaviour of the graphs.

Inspired by libraries like d3.js and dc.js, this provides a simple component without any extra
dependencies or the overhead of any libraries other than React.

** More features to come in the future **

## Demo

[jwarning.github.io/react-svg-graph](http://jwarning.github.io/react-svg-graph)

## Options

Optional props to set on the component:

- graphType: 'bar' or 'line'
- data: an array of data to plot
- maxValue: maximum value of the y axis
- width: width of the graph
- height: height of the graph
- leftPadding: amount of padding on the left of the graph in px
- topPadding: amount of padding on the top of the graph in px
- rightPadding: amount of padding on the right of the graph in px
- bottomPadding: amount of padding on the bottom of the graph in px
- animationRenderInterval: time between re-renders of the graphs during a transition
- graphClass: the class to set on the svg bars or line of the graph
- fill: colour for the fill on the bars or the line of the graph

The data points should be structured in an array as follows:
```
[{
  id: // key of the point (will appear on the x axis),
  value: // numeric value of the point
}, ...]
```

## License

[MIT](./LICENSE)
