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

  const getJibenZhx = () => {
    dispatch({
      type: 'dangan/getJibenZhx',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const getDingweiZhx = () => {
    dispatch({
      type: 'dangan/updatePrev',
      payload: [],
    });
    dispatch({
      type: 'dangan/getDingweiZhx',
      payload: {
        signType: -1,
        id: Number(query.id),
        jigou: Number(query.jigou),
        zuijin: 1,
      },
    });
  };

  const getTishiZhx = () => {
    dispatch({
      type: 'dangan/getTishiZhx',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
        zuijin: 1,
        jiancexiang: -1,
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
        getJibenZhx();
        break;
      case 2:
        getDingweiZhx();
        break;
      case 3:
        getTishiZhx();
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
