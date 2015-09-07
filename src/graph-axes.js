import React from 'react/addons';

export default React.createClass({
  displayName: 'GraphAxes',
  mixins: [React.addons.PureRenderMixin],
  getDefaultProps () {
    return {
      graphType: 'bar',
      maxValue: 0,
      data: [],
      leftPadding: 35,
      topPadding: 5,
      rightPadding: 5,
      bottomPadding: 20,
      graphWidth: 0,
      graphHeight: 0,
    };
  },
  render () {
    var tickWidth = this.props.graphWidth / this.props.data.length;

    return <g>
      <line
        // vertical axis
        x1={this.props.leftPadding}
        y1={this.props.topPadding}
        x2={this.props.leftPadding}
        y2={this.props.graphHeight + this.props.topPadding}
        stroke='rgb(0,0,0)'
        strokeWidth='1'
      />
      <line
        // top vertical tick
        x1={this.props.leftPadding - 5}
        y1={this.props.topPadding}
        x2={this.props.leftPadding}
        y2={this.props.topPadding}
        stroke='rgb(0,0,0)'
        strokeWidth='1'
      />
      <line
        // bottom vertical tick
        x1={this.props.leftPadding - 5}
        y1={this.props.graphHeight + this.props.topPadding}
        x2={this.props.leftPadding}
        y2={this.props.graphHeight + this.props.topPadding}
        stroke='rgb(0,0,0)'
        strokeWidth='1'
      />
      <text
        // count label
        x={this.props.leftPadding - 5}
        y={this.props.graphHeight / 2 + this.props.topPadding}
        textAnchor='middle'
        transform={'rotate(270 ' + (this.props.leftPadding - 5) + ',' + (this.props.graphHeight / 2 + this.props.topPadding) + ')'}
        fill='black'
        fontSize='10px'
      >Count</text>
      <text
        // top vertical text
        x={this.props.leftPadding - 7}
        y={this.props.topPadding + 3}
        textAnchor='end'
        fill='black'
        fontSize='10px'
      >{this.props.maxValue.toString()}</text>
      <text
        // bottom vertical text
        x={this.props.leftPadding - 7}
        y={this.props.graphHeight + this.props.topPadding + 3}
        textAnchor='end'
        fill='black'
        fontSize='10px'
      >0</text>
      <rect
        // box to stop any lines from showing beneath the axis line
        width={this.props.graphWidth > 0 ? this.props.graphWidth : 0}
        height={this.props.bottomPadding}
        fill='rgb(255,255,255)'
        x={this.props.leftPadding}
        y={this.props.graphHeight + this.props.topPadding}
      />
      <line
        // horizontal axis
        x1={this.props.leftPadding}
        y1={this.props.graphHeight + this.props.topPadding}
        x2={this.props.graphWidth + this.props.leftPadding}
        y2={this.props.graphHeight + this.props.topPadding}
        stroke='rgb(0,0,0)'
        strokeWidth='1'
      />
    {this.props.data.map((val, index) => <line
        // horizontal ticks
        x1={index * tickWidth + this.props.leftPadding}
        y1={this.props.graphHeight + this.props.topPadding}
        x2={index * tickWidth + this.props.leftPadding}
        y2={this.props.graphHeight + this.props.topPadding + (val === '' ? 3 : 5)}
        stroke='rgb(0,0,0)'
        strokeWidth='1'
        key={'graph-horizontal-tick-' + index}
      />)}
      {this.props.data.map((val, index) => <text
        // horizontal text
        x={this.props.graphType === 'bar' ? index * tickWidth + this.props.leftPadding + (tickWidth / 2) : index * tickWidth + this.props.leftPadding}
        y={this.props.graphHeight + this.props.topPadding + 15}
        textAnchor='middle'
        fill='black'
        fontSize='10px'
        key={'graph-horizontal-text-' + index}
      >{val.id.toString()}</text>)}
    </g>;
  }
});
