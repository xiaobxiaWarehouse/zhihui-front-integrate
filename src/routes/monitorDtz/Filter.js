import React from 'react';
import { connect } from 'dva';
import { config, splicingUrlParams } from 'utils';
import { Button, Col, Form, Row, Select, Input } from 'antd';
import { Layout } from 'components';

const { api: { DAOCHU_DUOTIZHENG_LIST } } = config;

const CSS = Layout.styles;
const FormItem = Form.Item;
const { Search } = Input;
const { Option } = Select;

const formItemLayout = {
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

const bindZhuangtai = [{ id: 1, name: '已绑定' }, { id: 2, name: '未绑定' }, { id: -1, name: '全部' }];

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
        zy: newProps.filter.zy ? Number(newProps.filter.zy) : undefined,
      });
    }
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldsValue, setFieldsValue },
      filter,
      onFilterChange,
      jigouList,
      list,
    } = this.props;

    const onQuery = () => {
      let fields = getFieldsValue();
      const { zhuangtai, jigou, zy } = fields;
      let paramt = {
        ...fields,
      };
      if (zhuangtai) {
        paramt.zhuangtai = Number(zhuangtai);
      }
      if (jigou) {
        paramt.jigou = Number(jigou);
      }
      if (zy) {
        paramt.zy = Number(zy);
      }
      onFilterChange(paramt);
    };

    const reset = () => {
      setFieldsValue({
        keyword: undefined,
        zhuangtai: undefined,
        jigou: undefined,
        zy: undefined,
      });
      onFilterChange({});
    };

    const daochu = () => {
      let fields = getFieldsValue();
      let { zhuangtai } = fields;
      if (!zhuangtai) {
        fields.zhuangtai = -1;
      }
      let params = splicingUrlParams({
        ...fields,
      });
      let moren = splicingUrlParams({
        zhuangtai: -1,
        zy: -1,
      });
      window.open(`${DAOCHU_DUOTIZHENG_LIST}${params ? `?${params}` : `?${moren}`}`);
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
                  {bindZhuangtai.map((item) => {
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
              <FormItem {...formItemLayout} label="集团机构">
                {getFieldDecorator('jigou', {
                  initialValue: filter && filter.jigou,
                  rules: [],
                })(<Select
                  allowClear
                  disabled={Number(getFieldsValue().zhuangtai) === 2 && true}
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
          </Row>
          <Row>
            <Col className={CSS.col} span={6}>
              <FormItem {...formItemLayout} label="在用状态">
                {getFieldDecorator('zy', {
                  initialValue: filter && filter.zy ? Number(filter.zy) : undefined,
                  rules: [],
                })(<Select
                  allowClear
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  placeholder="请选择在用状态"
                >
                  <Option value={-1}>
                    全部
                  </Option>
                  <Option value={1}>
                    是
                  </Option>
                  <Option value={2}>
                    否
                  </Option>
                </Select>)}
              </FormItem>
            </Col>
            <Col span={6} style={{ textAlign: 'left' }}>
              <FormItem>
                <Button
                  onClick={() => {
                    onQuery();
                  }}
                  type="primary"
                  style={{ marginLeft: 10, marginRight: 10 }}
                >
                  查询
                </Button>
                <Button
                  onClick={() => {
                    reset();
                  }}
                  style={{ marginRight: 10 }}
                >
                  重置
                </Button>
                <Button
                  disabled={list.length === 0}
                  onClick={() => {
                    daochu();
                  }}
                >
                  导出
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
    monitorDtz: state.monitorDtz,
  };
}

export default connect(mapStateToProps)(Form.create()(Filter));
