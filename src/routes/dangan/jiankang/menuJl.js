import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './index.less';

const menuList = [
  { id: 'jili1', name: '入住信息' },
  { id: 'jili2', name: '基本信息' },
  { id: 'jili3', name: '个人简历' },
  { id: 'jili4', name: '特长性格兴趣' },
  { id: 'jili5', name: '家庭成员' },
  { id: 'jili6', name: '既往病史' },
];

const scrollToAnchor = (anchorName) => {
  if (anchorName) {
    let anchorElement = document.getElementById(anchorName);
    if (anchorElement) {
      anchorElement.scrollIntoView();
    }
  }
};

const isMac = () => {
  return /macintosh|mac os x/i.test(navigator.userAgent);
};

const menuPg = (props) => {
  const { app: { currScrollTop } } = props;

  return (
    <div className={currScrollTop >= 170 ? styles.menuFixBox : styles.menuBox} style={{right: isMac() ? 40 : 57}}>
      {menuList.map((item) => {
        return (
          <div
            className={styles.menuItem}
            key={item.id}
            onClick={() => {
              scrollToAnchor(item.id);
            }}
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

export default connect(mapStateToProps)(menuPg);
