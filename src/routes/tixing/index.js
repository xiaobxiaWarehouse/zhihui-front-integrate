import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import { Form } from 'antd';
import List from './List';
import Filter from './Filter';

const Index = (props) => {
  const { tixing, dispatch, location } = props;

  const { list, pagination, jigouList } = tixing;
  const { pathname, search } = location;
  const query = queryString.parse(search);

  const listProps = {
    pagination: {
      ...pagination,
    },
    dataSource: list,
    onChange(page) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        }),
      }));
    },
  };
  const filterProps = {
    jigouList,
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

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    tixing: state.tixing,
  };
}

export default connect(mapStateToProps)(Form.create()(Index));
