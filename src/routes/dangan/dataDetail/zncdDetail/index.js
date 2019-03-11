import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import RealTime from './realTime';
import Sleep from './sleep';
import Offbed from './offbed';
import History from './history';
import styles from './index.less';

const Index = (props) => {
  const { dangan, location } = props;
  const { cuurrNavIndex } = dangan;

  const realTimeProps = {
    location,
  };

  const sleepProps = {
    location,
  };

  const offbedProps = {
    location,
  };

  const historyProps = {
    location,
  };

  return (
    <div>
      {cuurrNavIndex === 1 && <RealTime {...realTimeProps} />}
      {cuurrNavIndex === 2 && <Sleep {...sleepProps} />}
      {cuurrNavIndex === 3 && <Offbed {...offbedProps} />}
      {cuurrNavIndex === 4 && <History {...historyProps} />}
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
