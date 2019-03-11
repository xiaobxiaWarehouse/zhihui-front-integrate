import React from 'react';
import { connect } from 'dva';
import queryString from 'query-string';
import styles from './index.less';

const Nav = (props) => {
  const {
    navList = [], dangan, dispatch, location,
  } = props;

  const { search } = location;

  const query = queryString.parse(search);

  const { cuurrNavIndex } = dangan;

  const getShishiZnc = () => {};

  const getShumianZnc = () => {
    dispatch({
      type: 'dangan/getShumianZnc',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const getZailichuangZnc = () => {
    dispatch({
      type: 'dangan/getZailichuangZnc',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const getLishiZnc = () => {
    dispatch({
      type: 'dangan/getLishiZnc',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const onChangeNav = (id) => {
    dispatch({
      type: 'dangan/changeCuurrNavIndex',
      payload: id,
    });
    switch (id) {
      case 1:
        getShishiZnc();
        break;
      case 2:
        getShumianZnc();
        break;
      case 3:
        getZailichuangZnc();
        break;
      case 4:
        getLishiZnc();
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ marginLeft: 20 }}>
      {navList.map((item, index) => {
        return (
          <div
            onClick={() => {
              onChangeNav(item.id);
            }}
            key={item.id}
            className={
              cuurrNavIndex === index + 1
                ? styles.navActiveItem
                : styles.navItem
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

export default connect(mapStateToProps)(Nav);
