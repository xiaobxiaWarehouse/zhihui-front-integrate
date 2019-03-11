import React from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Row, Select, Input, message, Cascader } from 'antd';
import { Layout } from 'components';
import { cityList } from 'utils';

const CSS = Layout.styles;
const FormItem = Form.Item;
const { Option } = Select;
const { Search } = Input;

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
      let shengArray = [];
      if (newProps.filter.shengBm !== undefined) {
        shengArray.push(newProps.filter.shengBm);
        if (newProps.filter.shiBm !== undefined) {
          shengArray.push(newProps.filter.shiBm);
          if (newProps.filter.quBm !== undefined) {
            shengArray.push(newProps.filter.quBm);
          }
        }
      }
      if (shengArray.length === 0) {
        shengArray = undefined;
      }
      this.props.form.setFieldsValue({
        sheng: shengArray,
      });
    }
  }

  render() {
    const {
      addjigou,
      form: { getFieldDecorator, getFieldsValue, setFieldsValue },
      filter,
      onFilterChange,
    } = this.props;

    const onQuery = () => {
      let fields = getFieldsValue();
      const { sheng, keyword } = fields;
      onFilterChange({
        keyword,
        shengBm: sheng && sheng.length > 0 ? sheng[0] : undefined,
        shiBm: sheng && sheng.length > 1 ? sheng[1] : undefined,
        quBm: sheng && sheng.length > 2 ? sheng[2] : undefined,
      });
    };


    const reset = () => {
      setFieldsValue({
        keyword: undefined,
        sheng: undefined,
      });
      onFilterChange({});
    };

    let shengArray = [];
    if (filter && filter.shengBm && filter.shiBm && filter.quBm) {
      shengArray = [filter.shengBm, filter.shiBm, filter.quBm];
    }

    return (
      <div>
        <Row>
          <Col span={3}>
            <Form layout="inline">
              <FormItem>
                <Button
                  className="ant-btn-warning"
                  type="primary"
                  onClick={() => {
                    addjigou();
                  }}
                >
                  新建集团/机构
                </Button>
              </FormItem>
            </Form>
          </Col>
          <Col span={21}>
            <Form layout="inline" style={{ float: 'right' }}>
              <FormItem>
                {getFieldDecorator('keyword', {
                  initialValue: filter && filter.keyword,
                })(<Search style={{ width: 250 }} placeholder="请输入集团/机构名称搜索" />)}
              </FormItem>
              <FormItem label="选择城市:">
                {getFieldDecorator('sheng', {
                  initialValue: shengArray,
                })(<Cascader
                  changeOnSelect
                  style={{ width: 250 }}
                  options={cityList}
                  placeholder="请选择省市区"
                />)}
              </FormItem>
              <FormItem>
                <Button
                  onClick={() => {
                    onQuery();
                  }}
                  type="primary"
                  style={{ marginRight: '10px' }}
                >
                  查询
                </Button>
                <Button
                  onClick={() => {
                    reset();
                  }}
                >
                  重置
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
    group: state.group,
  };
}

export default connect(mapStateToProps)(Form.create()(Filter));
