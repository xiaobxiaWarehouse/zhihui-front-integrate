import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import queryString from 'query-string';
import Filter from './Filter';
import Chart from './chart';

const Index = (props) => {
  const { dispatch, location } = props;

  const { search } = location;

  const query = queryString.parse(search);

  const chartProps = {
    location,
  };

  const filterProps = {
    onFilterChange(value) {
      dispatch({
        type: 'dangan/getZailichuangZncd',
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
      <Chart {...chartProps} />
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
