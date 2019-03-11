import React from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Row, Select, Input, message } from 'antd';
import { Layout } from 'components';

const CSS = Layout.styles;
const FormItem = Form.Item;
const { Search } = Input;
const { Option } = Select;

const formItemLayout = {
  wrapperCol: {
    span: 18,
  },
  style: {},
};
const formItemLayout2 = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 17,
  },
  style: {},
};
const formItemLayout3 = {
  wrapperCol: {
    span: 23,
  },
  style: {},
};

const renyuanZhuangtai = [
  { id: 4, name: '在院' },
  { id: 5, name: '离院' },
  { id: -1, name: '全部' },
];

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
        zhuangtai: newProps.filter.zhuangtai,
        jigou: newProps.filter.jigou,
      });
    }
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldsValue, setFieldsValue },
      filter,
      onFilterChange,
      jigouList,
    } = this.props;

    const onQuery = () => {
      let fields = getFieldsValue();
      const { keyword, zhuangtai, jigou } = fields;

      let paramt = {};
      if (keyword) {
        paramt.keyword = keyword;
      }
      if (zhuangtai) {
        paramt.zhuangtai = Number(zhuangtai);
      }
      if (jigou) {
        paramt.jigou = Number(jigou);
      }
      onFilterChange(paramt);
    };

    const reset = () => {
      setFieldsValue({
        keyword: undefined,
        zhuangtai: undefined,
        jigou: undefined,
      });
      onFilterChange({});
    };

    return (
      <div>
        <Form layout="inline" className="abnormal-filter-formitem">
          <Row>
            <Col className={CSS.col} span={6}>
              <FormItem {...formItemLayout3}>
                {getFieldDecorator('keyword', {
                  initialValue: filter && filter.keyword,
                  rules: [],
                })(<Search placeholder="请输入设备编号/姓名搜索" />)}
              </FormItem>
            </Col>
            <Col className={CSS.col} span={6}>
              <FormItem {...formItemLayout} label="人员状态">
                {getFieldDecorator('zhuangtai', {
                  initialValue: filter && filter.zhuangtai,
                  rules: [],
                })(<Select
                  allowClear
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  placeholder="请选择人员状态"
                >
                  {renyuanZhuangtai.map((item) => {
                    return (
                      <Option key={item.id} value={String(item.id)}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>)}
              </FormItem>
            </Col>
            <Col className={CSS.col} span={6}>
              <FormItem {...formItemLayout2} label="集团机构">
                {getFieldDecorator('jigou', {
                  initialValue: filter && filter.jigou,
                  rules: [],
                })(<Select
                  allowClear
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  placeholder="请选择集团机构"
                >
                  {jigouList.map((item) => {
                    return (
                      <Option key={item.id} value={String(item.id)}>
                        {item.mingcheng}
                      </Option>
                    );
                  })}
                </Select>)}
              </FormItem>
            </Col>
            <Col span={3} style={{ textAlign: 'left' }}>
              <FormItem>
                <Button
                  onClick={() => {
                    onQuery();
                  }}
                  type="primary"
                  style={{ marginRight: 10, marginLeft: 10 }}
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
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.danan,
  };
}

export default connect(mapStateToProps)(Form.create()(Filter));
