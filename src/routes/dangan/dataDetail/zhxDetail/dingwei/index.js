import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import queryString from 'query-string';
import { routerRedux } from 'dva/router';
import Filter from './Filter';
import List from './List';

const Index = (props) => {
  const { dispatch, location, dangan } = props;
  const { dingweiZhx } = dangan;
  const { search } = location;
  const query = queryString.parse(search);

  const listProps = {
    pagination: false,
    location,
    dataSource: dingweiZhx,
  };

  const filterProps = {
    onFilterChange(value) {
      dispatch({
        type: 'dangan/getDingweiZhx',
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
      <List {...listProps} />
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
