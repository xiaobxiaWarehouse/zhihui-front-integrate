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

  const getShishiZncd = () => {};

  const getShumianZncd = () => {
    dispatch({
      type: 'dangan/getShumianZncd',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const getZailichuangZncd = () => {
    dispatch({
      type: 'dangan/getZailichuangZncd',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const getLishiZncd = () => {
    dispatch({
      type: 'dangan/getLishiZncd',
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
        getShishiZncd();
        break;
      case 2:
        getShumianZncd();
        break;
      case 3:
        getZailichuangZncd();
        break;
      case 4:
        getLishiZncd();
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
