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
      percentHeight: 0.0,
      graphClass: '',
      graphFill: 'steelblue'
    };
  },
  render() {
    let data = this.props.data.map((value, key) => {
      let lineHeight = this.props.data[key].value / this.props.maxValue * this.props.graphHeight;
      if (isNaN(lineHeight)) lineHeight = 0;
      let oldHeight = this.props.oldData && this.props.oldData[key] ? this.props.oldData[key].value : undefined;
      oldHeight = oldHeight ? oldHeight / this.props.oldMaxValue * this.props.graphHeight : 0;

      let height = lineHeight >= oldHeight ? oldHeight + (lineHeight - oldHeight) * this.props.percentHeight :
        oldHeight - ((oldHeight - lineHeight) * this.props.percentHeight);
      if (height < 0) height = 0;

      return {
        x: key * (this.props.graphWidth / this.props.data.length),
        y: this.props.graphHeight - height
      };
    });

    let path = 'M0,' + this.props.graphHeight + 'L';
    data.forEach(val => {
      path += val.x + ',' + val.y + 'L';
    });
    path += this.props.graphWidth + ',' + this.props.graphHeight + 'Z';

    return <path
      className={this.props.graphClass}
      d={path}
      stroke={this.props.graphFill}
      strokeWidth='2'
      fill={this.props.graphFill}
      fillOpacity='0.3'
    />;
  }
});
