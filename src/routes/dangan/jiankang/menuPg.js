import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './index.less';

const menuList = [
  { id: '1', name: '入住信息' },
  { id: '2', name: '基本信息' },
  { id: '3', name: '既往健康史' },
  { id: '4', name: '目前用药史' },
  { id: '5', name: '呼吸与循环' },
  { id: '6', name: '饮食与营养' },
  { id: '7', name: '排便与排尿' },
  { id: '8', name: '感知' },
  { id: '9', name: '认知与沟通' },
  { id: '10', name: '活动' },
  { id: '11', name: '卫生与皮肤' },
  { id: '12', name: '舒适' },
  { id: '13', name: '休息与休眠' },
  { id: '14', name: '精神与信仰' },
  { id: '15', name: '体格检查' },
  { id: '16', name: '评估信息' },
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
