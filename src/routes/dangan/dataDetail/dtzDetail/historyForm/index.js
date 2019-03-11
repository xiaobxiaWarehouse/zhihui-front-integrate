import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import queryString from 'query-string';
import { routerRedux } from 'dva/router';
import Filter from './Filter';
import Chart from './chart';

const Index = (props) => {
  const { dispatch, location, dangan } = props;
  const { lishibiaodanDtz: { list, next }, lishitubiaoValue, prev } = dangan;
  const { search } = location;
  const query = queryString.parse(search);

  const listProps = {
    pagination: false,
    location,
    dataSource: list,
    next,
    prev,
    onchangePage(type) {
      if (type === 'next') {
        prev.push(next);
      } else {
        prev.pop(next);
      }
      dispatch({
        type: 'dangan/updatePrev',
        payload: prev,
      });
      dispatch({
        type: 'dangan/getLishibiaodanDtz',
        payload: {
          ...lishitubiaoValue,
          id: Number(query.id),
          jigou: Number(query.jigou),
          nextBh: type === 'prev'
            ? prev[prev.length - 1]
              ? prev[prev.length - 1].bianhao
              : undefined
            : next.bianhao,
          nextSj:
            type === 'prev'
              ? prev[prev.length - 1]
                ? prev[prev.length - 1].shijian
                : undefined
              : next.shijian,
        },
      });
    },
  };

  const filterProps = {
    onFilterChange(value) {
      dispatch({
        type: 'dangan/updatePrev',
        payload: [],
      });
      dispatch({
        type: 'dangan/changeLishitubiaoValue',
        payload: {
          ...value,
        },
      });
      dispatch({
        type: 'dangan/getLishibiaodanDtz',
        payload: {
          ...value,
          id: Number(query.id),
          jigou: Number(query.jigou),
        },
      });
    },
  };

  return (
    <div>
      <Filter {...filterProps} />
      <Chart {...listProps} />
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
