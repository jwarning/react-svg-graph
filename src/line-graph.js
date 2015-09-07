import React from 'react/addons';

export default React.createClass({
  mixins: [React.addons.PureRenderMixin],
  getDefaultProps () {
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
  render () {
    var data = this.props.data.map((value, key) => {
      var lineHeight = this.props.data[key].value / this.props.maxValue * this.props.graphHeight;
      if (isNaN(lineHeight)) lineHeight = 0;
      var oldHeight = this.props.oldData[key].value;
      oldHeight = oldHeight ? oldHeight / this.props.oldMaxValue * this.props.graphHeight : 0;

      var height = lineHeight >= oldHeight ? oldHeight + (lineHeight - oldHeight) * this.props.percentHeight :
        oldHeight - ((oldHeight - lineHeight) * this.props.percentHeight);
      if (height < 0) height = 0;

      return {
        x: key * (this.props.graphWidth / this.props.data.length),
        y: this.props.graphHeight - height
      };
    });

    var path = 'M0,' + this.props.graphHeight + 'L';
    data.forEach(val => {
      path += val.x + ',' + val.y + 'L';
    });
    path += this.props.graphWidth + ',' + this.props.graphHeight + 'Z';

    return <path
      className=''
      d={path}
      stroke='rgb(70,130,180)'
      strokeWidth='2'
      fill='rgb(70,130,180)'
      fillOpacity='0.3'
    />;
  }
});
