import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const tabList = [
  { id: 1, name: '入住信息' },
  { id: 2, name: '入住评估表' },
  { id: 3, name: '体检报告' },
  { id: 4, name: '入住健康记录' },
];

const Tabs = (props) => {
  const { jiankangTabIndex, onClickTab } = props;

  return (
    <div className={styles.tabsBox}>
      {tabList.map((item, index) => {
        return (
          <div
            onClick={() => {
              onClickTab(item.id);
            }}
            key={item.id}
            className={
              jiankangTabIndex === index + 1
                ? styles.tabActiveItem
                : styles.tabItem
            }
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.dangan,
  };
}

export default connect(mapStateToProps)(Tabs);
