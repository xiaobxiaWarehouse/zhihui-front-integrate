import React from 'react';
import { connect } from 'dva';
import { Button, Icon } from 'antd';
import moment from 'moment';
import styles from './index.less';

const Filter = (props) => {
  const {
    qita, createTime, currentBgIndex, onFilterChange,
  } = props;

  return (
    <div>
      <div className="ant-form-item-borderLeft">
        <span className="ant-form-item-borderLefthight">体检报告</span>
      </div>
      <div className={styles.pageBox}>
        <Button
          type="primary"
          disabled={currentBgIndex <= 1}
          onClick={() => {
            onFilterChange('left');
          }}
        >
          <Icon type="left" />
        </Button>
        <span className={styles.time}>
          {createTime
            ? `${currentBgIndex}/${qita && qita.length}：${moment(createTime).format('YYYY-MM-DD')}`
            : ''}
        </span>
        <Button
          type="primary"
          disabled={currentBgIndex >= Number(qita && qita.length)}
          onClick={() => {
            onFilterChange('right');
          }}
        >
          <Icon type="right" />
        </Button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.danan,
  };
}

export default connect(mapStateToProps)(Filter);
