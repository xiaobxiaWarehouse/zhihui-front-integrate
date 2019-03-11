import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button, Col, Form, Row, Select, DatePicker, Input, message } from 'antd';
import { Layout } from 'components';
import { getBeforeDay } from 'utils';

const CSS = Layout.styles;
const FormItem = Form.Item;
const { Search } = Input;
const { Option } = Select;

const formItemLayout = {
  wrapperCol: {
    span: 18,
  },
  style: {
  },
};
const formItemLayout2 = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 17,
  },
  style: {
  },
};

const shebeiList = [
  { id: 1, name: '智能床' },
  { id: 2, name: '智能床垫' },
  { id: 3, name: '多体征设备' },
  { id: 3, name: '智汇鞋' },
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
        leixing: newProps.filter.leixing ? newProps.filter.leixing : '1',
        kaishiSj: newProps.filter.kaishiSj ? moment(newProps.filter.kaishiSj) : moment(getBeforeDay()),
        jieshuSj: newProps.filter.jieshuSj ? moment(newProps.filter.jieshuSj) : moment(),
      });
    }
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldsValue, setFieldsValue },
      filter,
      onFilterChange,
    } = this.props;

    const onQuery = () => {
      let fields = getFieldsValue();
      const {
        leixing,
        kaishiSj,
        jieshuSj,
      } = fields;
      if (!kaishiSj || !jieshuSj) {
        message.error('必须选择开始时间和结束时间');
        return;
      }
      let paramt = {
        kaishiSj: moment(kaishiSj).format('YYYYMMDD'),
        jieshuSj: moment(jieshuSj).format('YYYYMMDD'),
      };
      if (leixing) {
        paramt.leixing = Number(leixing);
      }
      onFilterChange(paramt);
    };

    const reset = () => {
      setFieldsValue({
        leixing: '1',
        kaishiSj: moment(getBeforeDay()),
        jieshuSj: moment(),
      });
      onFilterChange({});
    };

    let initKaishiSj;
    let initJieshuSj;
    if (filter.kaishiSj) {
      initKaishiSj = moment(filter.kaishiSj, 'YYYYMMDD');
    }
    if (filter.jieshuSj) {
      initJieshuSj = moment(filter.jieshuSj, 'YYYYMMDD');
    }

    return (
      <div>
        <Form layout="inline" className="abnormal-filter-formitem">
          <Row>
            <Col className={CSS.col} span={6}>
              <FormItem {...formItemLayout} label="设备类型">
                {getFieldDecorator('leixing', {
                  initialValue: (filter && filter.leixing) || '1',
                  rules: [],
                })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择设备类型">
                  {
                    shebeiList.map((item) => {
                      return (
                        <Option key={item.id} value={String(item.id)}>{item.name}</Option>
                      );
                    })
                  }
                </Select>)}
              </FormItem>
            </Col>
            <Col className="col2" span={9}>
              <FormItem {...formItemLayout2} label="选择时间:">
                <Col span={11}>
                  <FormItem className="abnormal-width-formitem">
                    {getFieldDecorator('kaishiSj', {
                      initialValue: initKaishiSj || moment(getBeforeDay()),
                      rules: [],
                    })(<DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode} style={{ width: '100%' }} className={CSS.datePicker} format="YYYY-MM-DD" placeholder="开始时间" />)}
                  </FormItem>
                </Col>
                <Col span={2}>
                  <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>至</span>
                </Col>
                <Col span={11}>
                  <FormItem className="abnormal-width-formitem">
                    {getFieldDecorator('jieshuSj', {
                      initialValue: initJieshuSj || moment(),
                      rules: [],
                    })(<DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode} style={{ width: '100%' }} className={CSS.datePicker} format="YYYY-MM-DD" placeholder="结束时间" />)}
                  </FormItem>
                </Col>
              </FormItem>
            </Col>
            <Col className={CSS.col} span={3} style={{ textAlign: 'left' }}>
              <FormItem>
                <Button onClick={() => { onQuery(); }} type="primary" style={{ marginRight: 10 }}>查询</Button>
                <Button onClick={() => { reset(); }}>重置</Button>
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
    caijiSb: state.caijiSb,
  };
}

export default (connect(mapStateToProps)(Form.create()(Filter)));
