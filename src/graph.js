import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import BarGraph from './bar-graph';
import LineGraph from './line-graph';
import GraphAxes from './graph-axes';

export default React.createClass({
  mixins: [PureRenderMixin],
  getDefaultProps() {
    return {
      graphType: 'bar',
      data: [],
      maxValue: null,
      width: 400,
      height: 200,
      leftPadding: 35,
      topPadding: 5,
      rightPadding: 5,
      bottomPadding: 20,
      animationRenderInterval: 50
    };
  },
  getInitialState() {
    return {
      maxValue: this.props.maxValue || Math.max.apply(null, this.props.data.map(v => v.value)),
      oldMaxValue: this.props.maxValue || Math.max.apply(null, this.props.data.map(v => v.value)),
      percentHeight: 0.0,
      oldData: this.props.data,
      graphWidth: this.props.width - this.props.leftPadding - this.props.rightPadding,
      graphHeight: this.props.height - this.props.topPadding - this.props.bottomPadding
    };
  },
  componentDidMount() {
    this.timer();
  },
  componentWillReceiveProps(nextProps) {
    if (!this.isMounted()) return;

    this.setState({
      maxValue: nextProps.maxValue || Math.max.apply(null, nextProps.data.map(v => v.value)),
      oldMaxValue: this.state.maxValue,
      percentHeight: 0.0,
      graphWidth: this.props.width - this.props.leftPadding - this.props.rightPadding,
      graphHeight: this.props.height - this.props.topPadding - this.props.bottomPadding
    }, this.timer);
  },
  timer() {
    // use a timer to animate changes to the graph's data
    let timer = setInterval(() => {
      if (!this.isMounted()) clearInterval(timer);
      else if (this.state.percentHeight < 1) {
        this.setState({
          percentHeight: parseFloat((this.state.percentHeight + 0.1).toPrecision(2))
        });
      }
      else {
        clearInterval(timer);
        this.setState({
          oldData: this.props.data,
          oldMaxValue: this.props.maxValue || Math.max.apply(null, this.props.data.map(v => v.value))
        });
      }
    }, this.props.animationRenderInterval || 50);
  },
  render() {
    return <svg width={this.props.width} height={this.props.height}>
      <g transform={'translate(' + this.props.leftPadding + ',' + this.props.topPadding + ')'}>
        {this.props.graphType === 'bar' && <BarGraph {...this.props} {...this.state} />}
        {this.props.graphType === 'line' && <LineGraph {...this.props} {...this.state} />}
      </g>
      <GraphAxes {...this.props} {...this.state} />
    </svg>;
  }
});
