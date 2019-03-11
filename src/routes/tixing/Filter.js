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
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 17,
  },
  style: {
  },
};
const formItemLayout2 = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 17,
  },
  style: {
  },
};
const formItemLayout3 = {
  wrapperCol: {
    span: 22,
  },
  style: {
  },
};

const formItemLayoutTimeRang = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 19,
  },
  style: {
  },
};

const formItemLayoutDatePick = {
  wrapperCol: {
    span: 24,
  },
  style: {
  },
};

const bindleixing = [
  { id: 1, name: '智能床' },
  { id: 2, name: '智能床垫' },
  { id: 3, name: '多体征设备' },
  { id: 3, name: '智汇鞋' },
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
        kaishiSj: newProps.filter.kaishiSj ? moment(newProps.filter.kaishiSj) : moment(getBeforeDay()),
        jieshuSj: newProps.filter.jieshuSj ? moment(newProps.filter.jieshuSj) : moment(),
        keyword: newProps.filter.keyword,
        leixing: newProps.filter.leixing,
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
      const {
        keyword,
        leixing,
        kaishiSj,
        jieshuSj,
        jigou,
      } = fields;
      if (!kaishiSj || !jieshuSj) {
        message.error('必须选择开始时间和结束时间');
        return;
      }
      let paramt = {
        kaishiSj: moment(kaishiSj).format('YYYYMMDD'),
        jieshuSj: moment(jieshuSj).format('YYYYMMDD'),
      };
      if (keyword) {
        paramt.keyword = keyword;
      }
      if (leixing) {
        paramt.leixing = Number(leixing);
      }
      if (jigou) {
        paramt.jigou = Number(jigou);
      }
      onFilterChange(paramt);
    };

    const reset = () => {
      setFieldsValue({
        keyword: undefined,
        leixing: undefined,
        kaishiSj: moment(getBeforeDay()),
        jieshuSj: moment(),
        jigou: undefined,
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
        <Form layout="inline" labelalign="left" className="tixing-filter-formitem">
          <Row>
            <Col className={CSS.col} span={6}>
              <FormItem {...formItemLayout3}>
                {getFieldDecorator('keyword', {
                  initialValue: filter && filter.keyword,
                  rules: [],
                })(<Search placeholder="请输入所属机构/姓名搜索" />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col className={CSS.col} span={6}>
              <FormItem {...formItemLayout} label="设备类型:">
                {getFieldDecorator('leixing', {
                  initialValue: filter && filter.leixing,
                  rules: [],
                })(<Select allowClear getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择设备类型">
                  {
                    bindleixing.map((item) => {
                      return (
                        <Option key={item.id} value={String(item.id)}>{item.name}</Option>
                      );
                    })
                  }
                </Select>)}
              </FormItem>
            </Col>
            <Col className={CSS.col} span={6}>
              <FormItem {...formItemLayout2} label="集团机构">
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
            <Col className="col2" span={9}>
              <FormItem {...formItemLayoutTimeRang} label="选择时间:">
                <Col span={11}>
                  <FormItem {...formItemLayoutDatePick} className="tixing-width-formitem">
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
                  <FormItem {...formItemLayoutDatePick} className="tixing-width-formitem">
                    {getFieldDecorator('jieshuSj', {
                      initialValue: initJieshuSj || moment(),
                      rules: [],
                    })(<DatePicker getCalendarContainer={triggerNode => triggerNode.parentNode} style={{ width: '100%' }} className={CSS.datePicker} format="YYYY-MM-DD" placeholder="结束时间" />)}
                  </FormItem>
                </Col>
              </FormItem>
            </Col>
            <Col span={3} style={{ textAlign: 'left' }}>
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
    tixing: state.tixing,
  };
}

export default (connect(mapStateToProps)(Form.create()(Filter)));
