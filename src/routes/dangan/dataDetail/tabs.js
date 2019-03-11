import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const tabList = [
  { id: 1, name: '智能床' },
  { id: 2, name: '智能床垫' },
  { id: 3, name: '多体征设备' },
  { id: 4, name: '智汇鞋' },
];

const Tabs = (props) => {
  const { detaiTabIndex, onClickTab } = props;

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
              detaiTabIndex === index + 1
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
