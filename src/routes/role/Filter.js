import React from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Row, Input } from 'antd';

const FormItem = Form.Item;
const {Search} = Input;

const formItemLayout = {
  wrapperCol: {
    span: 14,
  },
  style: {
  },
};


const Filter = (props) => {
  const {
    addRole,
  } = props;

  return (
    <div>
      <Row align="middle">
        <Col span={3}>
          <Form layout="inline">
            <FormItem>
              <Button className="ant-btn-warning" type="primary" onClick={() => { addRole(); }}>新建角色</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    role: state.role,
  };
}

export default (connect(mapStateToProps)(Form.create()(Filter)));
