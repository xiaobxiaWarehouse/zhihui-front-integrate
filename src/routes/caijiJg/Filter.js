import React from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Row, Select } from 'antd';
import { config } from 'utils';
import { Layout } from 'components';
import { createImportSpecifier } from 'typescript';

const CSS = Layout.styles;
const FormItem = Form.Item;
const { Option } = Select;
const { api: { DAOCHU_JIGOU_CAIJISHUJU } } = config;

const formItemLayout = {
  wrapperCol: {
    span: 18,
  },
  style: {},
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
      list,
    } = this.props;

    const onQuery = () => {
      let fields = getFieldsValue();
      const { jigou } = fields;

      let paramt = {};
      if (jigou) {
        paramt.jigou = Number(jigou);
      }
      onFilterChange(paramt);
    };

    const reset = () => {
      setFieldsValue({
        jigou: undefined,
      });
      onFilterChange({});
    };

    const exportCaijishuju = () => {
      if (filter && filter.jigou) {
        window.open(`${DAOCHU_JIGOU_CAIJISHUJU}?jigou=${filter.jigou}`);
      } else {
        window.open(DAOCHU_JIGOU_CAIJISHUJU);
      }
    };

    return (
      <div>
        <Form layout="inline" className="abnormal-filter-formitem">
          <Row>
            <Col className={CSS.col} span={6}>
              <FormItem {...formItemLayout} label="集团机构">
                {getFieldDecorator('jigou', {
                  initialValue: filter && filter.jigou,
                  rules: [],
                })(<Select
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  allowClear
                  placeholder="请选择集团机构"
                >
                  {jigouList.map((k) => {
                    return (
                      <Option key={k.id} value={String(k.id)}>
                        {k.mingcheng}
                      </Option>
                    );
                  })}
                </Select>)}
              </FormItem>
            </Col>
            <Col className={CSS.col} span={6} style={{ textAlign: 'left' }}>
              <FormItem>
                <Button
                  onClick={() => {
                    onQuery();
                  }}
                  type="primary"
                  style={{ marginRight: 10, marginLeft: 30 }}
                >
                  查询
                </Button>
                <Button
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    reset();
                  }}
                >
                  重置
                </Button>
                <Button
                  disabled={list.length === 0}
                  onClick={() => {
                    exportCaijishuju();
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
    caijiJg: state.caijiJg,
  };
}

export default connect(mapStateToProps)(Form.create()(Filter));
