import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  getDefaultProps() {
    return {
      graphWidth: 0,
      graphHeight: 0,
      maxValue: 0,
      oldMaxValue: 0,
      data: [],
      oldData: [],
      percentHeight: 0.0
    };
  },
  render() {
    return <g>
      {this.props.data.map((value, key) => {
        let barHeight = this.props.data[key].value / this.props.maxValue * this.props.graphHeight;
        if (isNaN(barHeight)) barHeight = 0;
        let oldHeight = this.props.oldData && this.props.oldData[key] ? this.props.oldData[key].value : undefined;
        oldHeight = oldHeight ? oldHeight / this.props.oldMaxValue * this.props.graphHeight : 0;

        let height = barHeight >= oldHeight ? oldHeight + (barHeight - oldHeight) * this.props.percentHeight :
          oldHeight - ((oldHeight - barHeight) * this.props.percentHeight);
        if (height < 0) height = 0;
        if (height < 2 && value > 0) height = 2; // min height to stop firefox showing no bar at some widths

        return <rect
          width={this.props.graphWidth > 0 ? this.props.graphWidth / this.props.data.length - 2 : 0}
          height={height}
          fill='steelblue'
          x={key * (this.props.graphWidth / this.props.data.length) + 1}
          y={this.props.graphHeight - height}
          key={'bar-graph-bar-' + key}
        />;
      })}
    </g>;
  }
});
