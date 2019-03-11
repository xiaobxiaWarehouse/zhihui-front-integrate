import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Button,
  Col,
  Form,
  Row,
  Select,
  DatePicker,
  Input,
  message,
} from 'antd';
import { Layout } from 'components';
import { getBeforeDay } from 'utils';

const CSS = Layout.styles;
const FormItem = Form.Item;
const { Search } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
  style: {},
};
const formItemLayout1 = {
  wrapperCol: {
    span: 23,
  },
  style: {},
};

const bindleixing = [
  { id: 1, name: '智能床' },
  { id: 2, name: '智能床垫' },
  { id: 3, name: '多体征设备' },
  { id: 4, name: '智汇鞋' },
  { id: -1, name: '全部' },
];

const bangding = [
  { id: 1, name: '已绑定' },
  { id: 2, name: '未绑定' },
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
        zhuangtai: newProps.filter.zhuangtai,
        keyword: newProps.filter.keyword,
        leixing: newProps.filter.leixing,
        jigou: newProps.filter.jigou,
      });
    }
  }

  render() {
    const {
      daoru,
      filter,
      onFilterChange,
      form: { getFieldDecorator, getFieldsValue, setFieldsValue },
      jigouList,
      downLoad,
      recall,
    } = this.props;

    const onQuery = () => {
      let fields = getFieldsValue();
      const {
        leixing,
        jigou,
        zhuangtai,
        keyword,
      } = fields;
      let paramt = {};
      if (leixing) {
        paramt.leixing = leixing;
      }
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
        leixing: undefined,
        zhuangtai: undefined,
        jigou: undefined,
        keyword: undefined,
      });
      onFilterChange({});
    };

    return (
      <div>
        <Row>
          <Col span={24}>
            <Form layout="inline">
              <FormItem>
                <Button
                  onClick={() => {
                    daoru();
                  }}
                  type="primary"
                >
                  批量导入设备
                </Button>
              </FormItem>
              <FormItem>
                <Button
                  onClick={() => {
                    downLoad();
                  }}
                  type="primary"
                >
                  下载模板
                </Button>
              </FormItem>
              <FormItem>
                <Button
                  onClick={() => {
                    recall();
                  }}
                  type="primary"
                >
                  撤销导入
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form layout="inline" className="abnormal-filter-formitem">
              <Row>
                <Col span={5} className={CSS.col} style={{ textAlign: 'right' }}>
                  <FormItem {...formItemLayout1}>
                    {getFieldDecorator('keyword', {
                      initialValue: filter && filter.keyword,
                      rules: [],
                    })(<Search placeholder="请输入设备编号/姓名搜索" />)}
                  </FormItem>
                </Col>
                <Col className={CSS.col} span={5}>
                  <FormItem {...formItemLayout} label="设备类型:">
                    {getFieldDecorator('leixing', {
                      initialValue: filter && filter.leixing,
                      rules: [],
                    })(<Select
                      allowClear
                      getPopupContainer={triggerNode => triggerNode.parentNode}
                      placeholder="请选择设备类型"
                    >
                      {bindleixing.map((item) => {
                        return (
                          <Option key={item.id} value={String(item.id)}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
                <Col className={CSS.col} span={5}>
                  <FormItem {...formItemLayout} label="绑定状态:">
                    {getFieldDecorator('zhuangtai', {
                      initialValue: filter && filter.zhuangtai,
                      rules: [],
                    })(<Select
                      allowClear
                      getPopupContainer={triggerNode => triggerNode.parentNode}
                      placeholder="请选择绑定状态"
                      onChange={(val) => {
                        if (val === '2') {
                          setFieldsValue({
                            jigou: undefined,
                          });
                        }
                      }}
                    >
                      {bangding.map((item) => {
                        return (
                          <Option key={item.id} value={String(item.id)}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
                <Col className={CSS.col} span={5}>
                  <FormItem {...formItemLayout} label="集团机构">
                    {getFieldDecorator('jigou', {
                      initialValue: filter && filter.jigou,
                      rules: [],
                    })(<Select
                      disabled={Number(getFieldsValue().zhuangtai) === 2 && true}
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
                <Col span={3} style={{ marginLeft: 20 }}>
                  <FormItem>
                    <Button
                      onClick={() => {
                        onQuery();
                      }}
                      type="primary"
                      style={{ marginRight: 10 }}
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
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    shebei: state.shebei,
  };
}

export default connect(mapStateToProps)(Form.create()(Filter));
