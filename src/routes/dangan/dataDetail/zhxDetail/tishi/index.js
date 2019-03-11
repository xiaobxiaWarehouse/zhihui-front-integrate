import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import queryString from 'query-string';
import Filter from './Filter';
import List from './List';

const Index = (props) => {
  const { dispatch, location, dangan } = props;
  const { search } = location;
  const query = queryString.parse(search);
  const { tishiZhx } = dangan;

  const listProps = {
    pagination: false,
    location,
    dataSource: tishiZhx,
  };

  const filterProps = {
    onFilterChange(value) {
      dispatch({
        type: 'dangan/getTishiZhx',
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
