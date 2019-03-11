import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import Jiben from './jiben';
import Dingwei from './dingwei';
import Tishi from './tishi';

const Index = (props) => {
  const { dangan, location } = props;

  const { cuurrNavIndex } = dangan;

  const jibenProps = {
    location,
  };

  return (
    <div>
      {cuurrNavIndex === 1 && <Jiben {...jibenProps} />}
      {cuurrNavIndex === 2 && <Dingwei {...jibenProps} />}
      {cuurrNavIndex === 3 && <Tishi {...jibenProps} />}
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
