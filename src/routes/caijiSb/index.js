import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import { Form, Button } from 'antd';
import List from './List';
import Filter from './Filter';

const Index = (props) => {
  const { caijiSb, dispatch, location } = props;

  const { shebeiList, next, prev } = caijiSb;
  const { pathname, search } = location;
  const query = queryString.parse(search);

  const listProps = {
    query,
    pagination: false,
    dataSource: shebeiList,
  };

  const filterProps = {
    filter: query,
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...value,
          page: 1,
        }),
      }));
    },
  };

  const onChange = (type) => {
    if (type === 'next') {
      prev.push(next);
    } else {
      prev.pop(next);
    }
    dispatch({
      type: 'caijiSb/updatePrev',
      payload: prev,
    });
    dispatch({
      type: 'caijiSb/query',
      payload: {
        ...query,
        nextSj:
          type === 'prev'
            ? prev[prev.length - 1] ? prev[prev.length - 1].shijian : undefined
            : next.shijian,
      },
    });
  };

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      <div style={{ textAlign: 'right', marginTop: 10 }}>
        <Button
          disabled={!prev.length > 0}
          type="primary"
          onClick={() => {
            onChange('prev');
          }}
        >
          上一页
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          disabled={!next}
          type="primary"
          onClick={() => {
            onChange('next');
          }}
        >
          下一页
        </Button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    caijiSb: state.caijiSb,
  };
}

export default connect(mapStateToProps)(Form.create()(Index));
