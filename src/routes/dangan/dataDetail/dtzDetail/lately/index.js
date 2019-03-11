import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import Filter from './Filter';
import Chart from './chart';
import styles from './index.less';

const Index = (props) => {
  const { dangan, location } = props;

  const { zuijinDtz } = dangan;

  const listProps = {
    location,
    pagination: false,
    dataSource: zuijinDtz,
  };
  return (
    <div>
      <Filter />
      <Chart {...listProps} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.dangan,
  };
}

export default connect(mapStateToProps)(Form.create()(Index));
