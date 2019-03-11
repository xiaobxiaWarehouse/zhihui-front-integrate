import React from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Row, Input, message } from 'antd';
import { Layout } from 'components';

const { Search } = Input;
const CSS = Layout.styles;
const FormItem = Form.Item;

const formItemLayout = {
  wrapperCol: {
    span: 14,
  },
  style: {
  },
};


class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    let pf = this.props.filter;
    let newpf = newProps.filter;
    if (JSON.stringify(pf) !== JSON.stringify(newpf)) { // 路由参数发生变化时 根据路由参数重置表单默认数据
      this.props.form.setFieldsValue({
        keyword: newProps.filter.keyword,
      });
    }
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldsValue },
      filter,
      addUser,
      onFilterChange,
    } = this.props;

    const onQuery = () => {
      let fields = getFieldsValue();
      const { keyword } = fields;
      onFilterChange({
        keyword,
      });
    };


    return (
      <div>
        <Row align="middle">
          <Col span={3}>
            <Form layout="inline">
              <FormItem>
                <Button className="ant-btn-warning" type="primary" onClick={() => { addUser(); }}>新建用户</Button>
              </FormItem>
            </Form>
          </Col>
          <Col span={21}>
            <Form layout="inline" style={{ float: 'right' }}>
              <FormItem>
                {getFieldDecorator('keyword', {
                  initialValue: filter && filter.keyword,
                  rules: [
                  ],
                })(<Search style={{ width: 350 }} placeholder="请输入手机号/姓名搜索" />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
              >
                <Button
                  onClick={() => {
                    onQuery();
                  }}
                  type="primary"
                >
                  查询
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
  };
}

export default (connect(mapStateToProps)(Form.create()(Filter)));
