
import React from 'react';
import { connect } from 'dva';
import {Form, Row, Col, Button, Modal, Radio, Divider} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
  style: {},
};
const formItemLayout1 = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 16,
  },
  style: {
  },
};
const modal = (props) => {
  const {
    yuzhi,
    list,
    modalType,
    tixing,
    ...modalProps
  } = props;

  let obj = null;
  if (yuzhi) {
    try {
      obj = JSON.parse(yuzhi);
    } catch (err) {
      // console.log(err);
    }
  }
  const chuangHtml = () => {
    return (
      <Form>
        <div className="ant-form-item-borderLeft"><span className="ant-form-item-borderLefthight">设备信息</span></div>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="设备号">
              {list && list[0].bianhao}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem {...formItemLayout1} label="提醒设置">
              <RadioGroup disabled value={tixing && tixing}>
                <Radio value={0}>不提醒</Radio>
                <Radio value={1} style={{marginLeft: 20}}>缺省阈值</Radio>
                <Radio value={2} style={{marginLeft: 20}}>自定义阈值</Radio>
                <Radio value={3} style={{marginLeft: 20}}>自适应阈值</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Divider />
        <div className="ant-form-item-borderLeft"><span className="ant-form-item-borderLefthight">心率阈值设置</span></div>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="心率范围">
              {
                obj && obj.hr ? `${obj.hr.min}次/分 - ${obj.hr.max}次/分` : '-'
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="持续时间">
              {
                obj && obj.hr ? `${obj.hr.duration}分钟` : '-'
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="异常时间段">
              {
                obj && obj.hr && obj.hr.start && obj.hr.end ? `${obj.hr.start.split(':')[0]}时${obj.hr.start.split(':')[1]}分${obj.hr.start.split(':')[2]}秒 - ${obj.hr.end.split(':')[0]}时${obj.hr.end.split(':')[1]}分${obj.hr.end.split(':')[2]}秒` : '-'
              }
            </FormItem>
          </Col>
        </Row>
        <Divider />
        <div className="ant-form-item-borderLeft"><span className="ant-form-item-borderLefthight">呼吸阈值设置</span></div>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="呼吸范围">
              {
                obj && obj.rr ? `${obj.rr.min}次/分 - ${obj.rr.max}次/分` : '-'
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="持续时间">
              {
                obj && obj.rr ? `${obj.rr.duration}分钟` : '-'
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="异常时间段">
              {
                obj && obj.rr && obj.rr.start && obj.rr.end ? `${obj.rr.start.split(':')[0]}时${obj.rr.start.split(':')[1]}分${obj.rr.start.split(':')[2]}秒 - ${obj.rr.end.split(':')[0]}时${obj.rr.end.split(':')[1]}分${obj.rr.end.split(':')[2]}秒` : '-'
              }
            </FormItem>
          </Col>
        </Row>
        <Divider />
        <div className="ant-form-item-borderLeft"><span className="ant-form-item-borderLefthight">在/离床阈值设置</span></div>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="离床时间">
              {
                obj && obj.bed ? `${obj.bed.offbed}小时` : '-'
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="异常时间段">
              {
                obj && obj.bed && obj.bed.start && obj.bed.end ? `${obj.bed.start.split(':')[0]}时${obj.bed.start.split(':')[1]}分${obj.bed.start.split(':')[2]}秒 - ${obj.bed.end.split(':')[0]}时${obj.bed.end.split(':')[1]}分${obj.bed.end.split(':')[2]}秒` : '-'
              }
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  };

  const duotizhengHtml = () => {
    return (
      <Form>
        <div className="ant-form-item-borderLeft"><span className="ant-form-item-borderLefthight">设备信息</span></div>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="设备号">
              {list && list[0].bianhao}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout1} label="提醒设置">
              <RadioGroup disabled value={list ? list[0].tixing : undefined}>
                <Radio value={0}>不提醒</Radio>
                <Radio value={1} style={{marginLeft: 20}}>缺省阈值</Radio>
                <Radio value={2} style={{marginLeft: 20}}>自定义阈值</Radio>
                <Radio value={3} style={{marginLeft: 20}}>自适应阈值</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="心率范围">
              {
                obj && obj.hr ? `${obj.hr.min}mmHg - ${obj.hr.max}mmHg` : '-'
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="收缩压范围">
              {
                obj && obj.sbp ? `${obj.sbp.min}mmHg - ${obj.sbp.max}mmHg` : '-'
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="舒张压范围">
              {
                obj && obj.dbp ? `${obj.dbp.min}mmHg - ${obj.dbp.max}mmHg` : '-'
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="体温范围">
              {
                obj && obj.temp ? `${obj.temp.min}mmHg - ${obj.temp.max}mmHg` : '-'
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="血糖范围">
              {
                obj && obj.bg ? `${obj.bg.min}mmol - ${obj.bg.max}mmol` : '-'
              }
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="血氧范围">
              {
                obj && obj.spo2 ? `${obj.spo2.min}％ - ${obj.spo2.max}％` : '-'
              }
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  };


  const text = () => {
    switch (modalType) {
      case 1:
      case 2:
        return chuangHtml();
      case 3:
        return duotizhengHtml();
      default:
        break;
    }
  };

  return (
    <Modal {...modalProps} footer={null}>
      {text()}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button
          style={{ marginRight: '10px' }}
          onClick={() => { modalProps.onCancel(); }}
          type="primary"
        >
          确认
        </Button>
        <Button style={{ marginRight: '10px' }} type="primary" onClick={() => { modalProps.onCancel(); }}>
          取消
        </Button>
      </div>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    monitorZnc: state.monitorZnc,
  };
}

export default connect(mapStateToProps)(modal);
