import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import styles from './index.less';

const Filter = (props) => {
  // const {
  // } = props;

  return (
    <div className={styles.filterBox}>
      <div className="detaiTitle">最近监测数据</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.dangan,
  };
}

export default connect(mapStateToProps)(Form.create()(Filter));
