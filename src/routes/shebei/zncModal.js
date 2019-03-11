
import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Button, Modal, DatePicker, Row, Col, Select, message } from 'antd';
import { getBeforeDay } from 'utils';
import ZncList from './zncList';

const FormItem = Form.Item;
const { Option } = Select;

const shituOption = [
  { id: 1, name: '时序数据' },
  { id: 2, name: '睡眠分析数据' },
];

const zuijinOption = [
  {id: 2, name: '两小时'},
  {id: 6, name: '六小时'},
  {id: 1, name: '当天'},
  {id: 7, name: '七天'},
];

const formItemLayout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 19,
  },
  style: {},
};

const modal = (props) => {
  const {
    modalshitu,
    dispatch,
    detaiData,
    item = {},
    form: {
      getFieldDecorator,
      getFieldsValue,
      validateFields,
      setFieldsValue,
    },
    onOk,
    prev,
    onChange,
    ...zncModalProps
  } = props;

  const {list, next} = detaiData;

  const modalOpts = {
    ...zncModalProps,
  };

  const listProps = {
    modalshitu,
    dataSource: list,
  };

  const search = () => {
    dispatch({
      type: 'shebei/changePrev',
      payload: [],
    });
    validateFields((errors) => {
      if (errors) {
        return;
      }
      let fields = getFieldsValue();
      const {
        shitu,
        kaishiSj,
        jieshuSj,
        zuijin,
      } = fields;
      if (!kaishiSj && !jieshuSj && !zuijin) {
        message.error('必须选择开始时间与结束时间或者最近时间段');
        return;
      }
      if (kaishiSj || jieshuSj) {
        if (!kaishiSj || !jieshuSj) {
          message.error('必须选择开始时间与结束时间');
          return;
        }
      }
      let params = {};
      if (kaishiSj && jieshuSj) {
        params.kaishiSj = moment(kaishiSj).format('YYYYMMDDHHmmss');
        params.jieshuSj = moment(jieshuSj).format('YYYYMMDDHHmmss');
      }
      if (zuijin) {
        params.zuijin = Number(zuijin);
        params.zuijinType = Number(zuijin) === 2 || Number(zuijin) === 6 ? 1 : 2;
      }
      params.shitu = Number(shitu);
      onChange({
        ...params,
        bianhao: item.bianhao,
      });
    });
  };

  let initKaishiSj;
  let initJieshuSj;
  if (detaiData.kaishiSj) {
    initKaishiSj = moment(detaiData.kaishiSj, 'YYYYMMDDHHmmss');
  }
  if (detaiData.jieshuSj) {
    initJieshuSj = moment(detaiData.jieshuSj, 'YYYYMMDDHHmmss');
  }

  const onPage = (type) => {
    let fields = getFieldsValue();
    const {
      kaishiSj,
      jieshuSj,
      shitu,
      zuijin,
    } = fields;
    if (kaishiSj || jieshuSj) {
      if (!kaishiSj || !jieshuSj) {
        message.error('必须选择开始时间与结束时间');
        return;
      }
    }
    let params = {};
    if (kaishiSj && jieshuSj) {
      params.kaishiSj = moment(kaishiSj).format('YYYYMMDDHHmmss');
      params.jieshuSj = moment(jieshuSj).format('YYYYMMDDHHmmss');
    }
    if (zuijin) {
      params.zuijin = Number(zuijin);
      params.zuijinType = Number(zuijin) === 2 || Number(zuijin) === 6 ? 1 : 2;
    }
    params.shitu = Number(shitu);
    if (type === 'next') {
      prev.push(next);
    } else {
      prev.pop(next);
    }
    dispatch({
      type: 'caijiSb/updatePrev',
      payload: prev,
    });
    onChange({
      ...params,
      bianhao: item.bianhao,
      nextSj:
          type === 'prev'
            ? prev[prev.length - 1] ? prev[prev.length - 1].shijian : undefined
            : next.shijian,
    });
  };

  const onChangeZuijin = (val) => {
    if (val) {
      setFieldsValue({
        kaishiSj: undefined,
        jieshuSj: undefined,
      });
    }
    dispatch({
      type: 'monitorZnc/changePrev',
      payload: [],
    });
  };

  const onChangeTime = (val) => {
    if (val) {
      setFieldsValue({
        zuijin: undefined,
      });
    }
    dispatch({
      type: 'monitorZnc/changePrev',
      payload: [],
    });
  };

  const onChangeShitu = () => {
    dispatch({
      type: 'monitorZnc/changePrev',
      payload: [],
    });
  };

  const text = () => {
    return (
      <Form>
        <div style={{ textAlign: 'center' }}>
          <Row>
            <Col span={6}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('shitu', {
                  initialValue: '1',
                })(<Select
                  onChange={() => { onChangeShitu(); }}
                  placeholder="请选择数据视图"
                >
                  {shituOption.map((k) => {
                      return (
                        <Option key={k.id} value={String(k.id)}>
                          {k.name}
                        </Option>
                      );
                    })}
                </Select>)}
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('kaishiSj', {
                  initialValue: initKaishiSj || moment(getBeforeDay()),
                })(<DatePicker
                  style={{ width: '100%' }}
                  showTime
                  className={CSS.datePicker}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="开始时间"
                  onChange={(val) => { onChangeTime(val); }}
                />)}
              </FormItem>
            </Col>
            <Col span={1}>
              <span
                style={{
                  display: 'inline-block',
                  height: 36,
                  lineHeight: '40px',
                  fontSize: 15,
                }}
              >
                至
              </span>
            </Col>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('jieshuSj', {
                  initialValue: initJieshuSj || moment(),
                })(<DatePicker
                  style={{ width: '100%' }}
                  showTime
                  className={CSS.datePicker}
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="结束时间"
                  onChange={(val) => { onChangeTime(val); }}
                />)}
              </FormItem>
            </Col>
            <Col span={3} >
              <FormItem style={{ textAlign: 'right' }}>
                <Button type="primary" onClick={(val) => { search(val); }}>查询</Button>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('zuijin', {
                })(<Select
                  onChange={(val) => { onChangeZuijin(val); }}
                  allowClear
                  placeholder="请选择时间段"
                >
                  {zuijinOption.map((k) => {
                      return (
                        <Option key={k.id} value={String(k.id)}>
                          {k.name}
                        </Option>
                      );
                    })}
                </Select>)}
              </FormItem>
            </Col>
          </Row>
        </div>
      </Form>
    );
  };

  return (
    <Modal {...modalOpts} footer={null}>
      {text()}
      <ZncList {...listProps}/>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button
          disabled={prev.length < 1}
          style={{ marginRight: '10px' }}
          onClick={() => { onPage('prev'); }}
          type="primary"
        >
          上一页
        </Button>
        <span>{prev.length + 1}</span>
        <Button style={{ marginLeft: '10px' }} type="primary" onClick={() => { onPage('next'); }} disabled={!next}>
          下一页
        </Button>
      </div>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    shebei: state.shebei,
  };
}

export default connect(mapStateToProps)(Form.create()(modal));
