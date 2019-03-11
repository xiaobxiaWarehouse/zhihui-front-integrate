import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import queryString from 'query-string';
import {Form} from 'antd';
import List from './List';
import Filter from './Filter';


const Index = (props) => {
  const {
    dispatch,
    location,
    role,
  } = props;

  const {
    list,
    pagination,
  } = role;

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

    onEditItem (path, params) {
      dispatch({
        type: 'role/updateRolepriv',
        payload: [],
      });
      dispatch(routerRedux.push({
        pathname: path,
        search: queryString.stringify({
          ...params,
        }),
      }));
    },
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

    addRole() {
      dispatch(routerRedux.push({pathname: '/role/add'}));
    },
  };

  return (
    <div className="content-inner">
      <Filter {...filterProps}/>
      <List {...listProps}/>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    role: state.role,
  };
}

export default (connect(mapStateToProps)(Form.create()(Index)));
