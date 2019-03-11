import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button, Col, Form, Row, Select, Input } from 'antd';
import { Layout } from 'components';
import {getBeforeDay} from 'utils';

const CSS = Layout.styles;
const FormItem = Form.Item;
const {Search} = Input;
const {Option} = Select;

const Filter = (props) => {
  const {
    Back,
  } = props;

  return (
    <Form layout="inline" className="abnormal-filter-formitem">
      <Row>
        <Col span={3} style={{textAlign: 'left'}}>
          <FormItem>
            <Button onClick={() => { Back(); }}>返回</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    shebei: state.shebei,
  };
}

export default (connect(mapStateToProps)(Form.create()(Filter)));
