import React from 'react';
import { connect } from 'dva';
// import queryString from 'query-string';
import { Form, Row, Col } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
  style: {},
};

const RuzhuXx = (props) => {
  const { dangan } = props;
  const { ruzhuDetail } = dangan;

  return (
    <Form className="role-detail-formitem">
      <div className="ant-form-item-borderLeft"><span className="ant-form-item-borderLefthight">入住信息</span></div>
      <Row>
        <Col span={8}>
          <FormItem {...formItemLayout} label="休养员姓名">
            {ruzhuDetail && ruzhuDetail.xingming}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="性别">
            {ruzhuDetail && ruzhuDetail.xingbie ? ruzhuDetail.xingbie === 'M' ? '男' : '女' : '-'}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="身份证">
            {ruzhuDetail && ruzhuDetail.shenfenzheng}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <FormItem {...formItemLayout} label="入院日期">
            {ruzhuDetail && ruzhuDetail.kaishiSj}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="床位">
            {ruzhuDetail && ruzhuDetail.chuangwei}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="医保情况">
            {ruzhuDetail && ruzhuDetail.yibaoQk}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <FormItem {...formItemLayout} label="监护人姓名">
            {ruzhuDetail && ruzhuDetail.jianhurenXm}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem {...formItemLayout} label="监护人电话">
            {ruzhuDetail && ruzhuDetail.jianhurenDh}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.dangan,
  };
}

export default connect(mapStateToProps)(Form.create()(RuzhuXx));
