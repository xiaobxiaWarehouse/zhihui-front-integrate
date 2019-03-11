import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import Filter from './Filter';
import Chart from './chart';
import styles from './index.less';

const Index = (props) => {
  const { location } = props;

  const chartProps = {
    location,
  };

  return (
    <div className="content-inner">
      <Filter />
      <Chart {...chartProps} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    shebei: state.shebei,
  };
}

export default connect(mapStateToProps)(Form.create()(Index));
