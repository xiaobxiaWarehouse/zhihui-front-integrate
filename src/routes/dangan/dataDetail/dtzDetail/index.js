import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import Lately from './lately';
import HistoryForm from './historyForm';
import HistoryChart from './historyChart';
import styles from './index.less';

const Index = (props) => {
  const { dangan, location } = props;

  const { cuurrNavIndex } = dangan;

  const latelyProps = {
    location,
  };

  const historyFormProps = {
    location,
  };

  const historyChartProps = {
    location,
  };

  return (
    <div>
      {cuurrNavIndex === 1 && <Lately {...latelyProps} />}
      {cuurrNavIndex === 2 && <HistoryForm {...historyFormProps} />}
      {cuurrNavIndex === 3 && <HistoryChart {...historyChartProps} />}
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
