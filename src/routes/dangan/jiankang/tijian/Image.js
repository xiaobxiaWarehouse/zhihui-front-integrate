import React from 'react';
// import { routerRedux } from 'dva/router';
import { connect } from 'dva';
// import queryString from 'query-string';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: '350px', height: '350px' };
  }

  handleImageLoad() {
    const { naturalWidth, naturalHeight } = this.thumbImgUrl;
    let width;
    let height;
    if (naturalWidth > naturalHeight) {
      width = '100%';
      height = 'auto';
    } else {
      height = '100%';
      width = 'auto';
    }
    this.setState({ width, height });
  }

  render() {
    const { imageUrl } = this.props;
    const { height, width } = this.state;

    const style = {
      height,
      width,
    };

    return (
      <img
        ref={(el) => {
          this.thumbImgUrl = el;
        }}
        src={imageUrl}
        style={style}
        onLoad={this.handleImageLoad.bind(this)}
        alt=""
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.dangan,
  };
}

export default connect(mapStateToProps)(Image);
