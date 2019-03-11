import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import Content from './content';

const Index = (props) => {
  const { location } = props;

  const contentProps = {
    location,
  };
  return (
    <div>
      <Content {...contentProps} />
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
