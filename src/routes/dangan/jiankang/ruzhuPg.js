import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Row, Col } from 'antd';
import Menu from './menuPg';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
  style: {},
};

const getChildren = (children, value) => {
  let list;
  if (children.constructor === Array && value.constructor === Array) {
    list = children.filter((item) => {
      return value.indexOf(item.value) > -1;
    }).map((item) => {
      return item.content;
    });
  } else if (children.constructor === Object) {
    list = [children].filter((item) => {
      return value.constructor === Array ? value.indexOf(item.value) > -1 : [value].indexOf(item.value) > -1;
    }).map((item) => {
      return item.content;
    });
  } else {
    list = children.filter((item) => {
      return value === item.value;
    }).map((item) => {
      return item.content;
    });
  }
  return list.length > 0 ? list.join('、') : '-';
};

const getTime = (time) => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss');
};


const RuzhuPg = (props) => {
  const { dangan } = props;
  const {ruzhuPgxml, ruzhuData } = dangan;

  return (
    <Form className="ruzhu-pinggu-form">
      <Row>
        <Col span={21}>
          <div className="ant-form-item-borderLeft" id="1"><span className="ant-form-item-borderLefthight">入住信息</span></div>
          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['pre01.01'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['01'] ? ruzhuData.pre01['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['pre01.02'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['02'] ? ruzhuData.pre01['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['pre01.03'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['03'] ? ruzhuData.pre01['03'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['pre01.04'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['04'] ? ruzhuData.pre01['04'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['pre01.05'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['05'] ? getTime(ruzhuData.pre01['05']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['pre01.06'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['06'] ? getTime(ruzhuData.pre01['06']) : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="2"><span className="ant-form-item-borderLefthight">基本信息</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.01'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['01'] ? ruzhuData['01']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.02'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['02'] ? getChildren(ruzhuPgxml['01.02'].children, ruzhuData['01']['02']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.03'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['03'] ? getTime(ruzhuData['01']['03']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.04'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['04'] ? ruzhuData['01']['04'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.05'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['05'] ? ruzhuData['01']['05'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.06'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['06'] ? ruzhuData['01']['06'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.07.01'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['07'] && ruzhuData['01']['07']['01'] ? getChildren(ruzhuPgxml['01.07.01'].children, ruzhuData['01']['07']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.07.01'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['07'] && ruzhuData['01']['07']['02'] ? ruzhuData['01']['07']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.08'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['08'] ? ruzhuData['01']['08'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.09'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['09'] ? getChildren(ruzhuPgxml['01.09'].children, ruzhuData['01']['09']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.10.01'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['10'] && ruzhuData['01']['10']['01'] ? getChildren(ruzhuPgxml['01.10.01'].children, ruzhuData['01']['10']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.10.01'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['10'] && ruzhuData['01']['10']['02'] ? ruzhuData['01']['10']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.11'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['11'] ? getChildren(ruzhuPgxml['01.11'].children, ruzhuData['01']['11']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.12'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['12'] ? getChildren(ruzhuPgxml['01.12'].children, ruzhuData['01']['12']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.13.01'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['13'] && ruzhuData['01']['13']['01'] ? getChildren(ruzhuPgxml['01.13.01'].children, ruzhuData['01']['13']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.13.01'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['13'] && ruzhuData['01']['13']['02'] ? ruzhuData['01']['13']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.14.01'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['14'] && ruzhuData['01']['14']['01'] ? getChildren(ruzhuPgxml['01.14.01'].children, ruzhuData['01']['14']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.14.01'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['14'] && ruzhuData['01']['14']['02'] ? ruzhuData['01']['14']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.15.01'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['15'] && ruzhuData['01']['15']['01'] ? getChildren(ruzhuPgxml['01.15.01'].children, ruzhuData['01']['15']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.15.01'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['15'] && ruzhuData['01']['15']['02'] ? ruzhuData['01']['15']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['01.16'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['16'] ? getChildren(ruzhuPgxml['01.16'].children, ruzhuData['01']['16']) : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="3"><span className="ant-form-item-borderLefthight">既往健康史</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['02.01'].cap}
              >
                {ruzhuData && ruzhuData['02'] && ruzhuData['02']['01'] ? getChildren(ruzhuPgxml['02.01'].children, ruzhuData['02']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['02.02.01'].cap}
              >
                {ruzhuData && ruzhuData['02'] && ruzhuData['02']['02'] && ruzhuData['02']['02']['01'] ? getChildren(ruzhuPgxml['02.02.01'].children, ruzhuData['02']['02']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['02.02.01'].cap}
              >
                {ruzhuData && ruzhuData['02'] && ruzhuData['02']['02'] && ruzhuData['02']['02']['02'] ? ruzhuData['02']['02']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['02.03.01'].cap}
              >
                {ruzhuData && ruzhuData['02'] && ruzhuData['02']['03'] && ruzhuData['02']['03']['01'] ? getChildren(ruzhuPgxml['02.03.01'].children, ruzhuData['02']['03']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['02.03.01'].cap}
              >
                {ruzhuData && ruzhuData['02'] && ruzhuData['02']['03'] && ruzhuData['02']['03']['02'] ? getChildren(ruzhuPgxml['02.03.02'].children, ruzhuData['02']['03']['02']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['02.04.01'].cap}
              >
                {ruzhuData && ruzhuData['02'] && ruzhuData['02']['04'] && ruzhuData['02']['04']['01'] ? getChildren(ruzhuPgxml['02.04.01'].children, ruzhuData['02']['04']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['02.04.01'].cap}
              >
                {ruzhuData && ruzhuData['02'] && ruzhuData['02']['04'] && ruzhuData['02']['04']['02'] ? ruzhuData['02']['04']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['02.05.01'].cap}
              >
                {ruzhuData && ruzhuData['02'] && ruzhuData['02']['05'] && ruzhuData['02']['05']['01'] ? getChildren(ruzhuPgxml['02.05.01'].children, ruzhuData['02']['05']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['02.05.01'].cap}
              >
                {ruzhuData && ruzhuData['02'] && ruzhuData['02']['05'] && ruzhuData['02']['05']['02'] ? ruzhuData['02']['05']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['02.06.01'].cap}
              >
                {ruzhuData && ruzhuData['02'] && ruzhuData['02']['06'] && ruzhuData['02']['06']['01'] ? getChildren(ruzhuPgxml['02.06.01'].children, ruzhuData['02']['06']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['02.06.01'].cap}
              >
                {ruzhuData && ruzhuData['02'] && ruzhuData['02']['06'] && ruzhuData['02']['06']['02'] ? ruzhuData['02']['06']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['02.07.01'].cap}
              >
                {ruzhuData && ruzhuData['02'] && ruzhuData['02']['07'] && ruzhuData['02']['07']['01'] ? getChildren(ruzhuPgxml['02.07.01'].children, ruzhuData['02']['07']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['02.07.01'].cap}
              >
                {ruzhuData && ruzhuData['02'] && ruzhuData['02']['07'] && ruzhuData['02']['07']['02'] ? ruzhuData['02']['07']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['02.08'].cap}
              >
                {ruzhuData && ruzhuData['02'] && ruzhuData['02']['08'] ? ruzhuData['02']['08'] : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="4"><span className="ant-form-item-borderLefthight">目前用药史</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['03.01'].cap}
              >
                {ruzhuData && ruzhuData['03'] && ruzhuData['03']['01'] ? getChildren(ruzhuPgxml['03.01'].children, ruzhuData['03']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['03.02.01'].cap}
              >
                {ruzhuData && ruzhuData['03'] && ruzhuData['03']['02'] && ruzhuData['03']['02']['01'] ? ruzhuData['03']['02']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['03.02.02'].cap}
              >
                {ruzhuData && ruzhuData['03'] && ruzhuData['03']['02'] && ruzhuData['03']['02']['02'] ? ruzhuData['03']['02']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['03.02.03'].cap}
              >
                {ruzhuData && ruzhuData['03'] && ruzhuData['03']['02'] && ruzhuData['03']['02']['03'] ? getTime(ruzhuData['03']['02']['03']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['03.02.04'].cap}
              >
                {ruzhuData && ruzhuData['03'] && ruzhuData['03']['02'] && ruzhuData['03']['02']['04'] ? ruzhuData['03']['02']['04'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['03.02.05'].cap}
              >
                {ruzhuData && ruzhuData['03'] && ruzhuData['03']['02'] && ruzhuData['03']['02']['05'] ? ruzhuData['03']['02']['05'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['03.03'].cap}
              >
                {ruzhuData && ruzhuData['03'] && ruzhuData['03']['03'] ? getChildren(ruzhuPgxml['03.03'].children, ruzhuData['03']['03']) : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="5"><span className="ant-form-item-borderLefthight">呼吸与循环</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['04.01.01'].cap}
              >
                {ruzhuData && ruzhuData['04'] && ruzhuData['04']['01'] && ruzhuData['04']['01']['01'] ? getChildren(ruzhuPgxml['04.01.01'].children, ruzhuData['04']['01']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['04.01.01'].cap}
              >
                {ruzhuData && ruzhuData['04'] && ruzhuData['04']['01'] && ruzhuData['04']['01']['02'] ? ruzhuData['04']['01']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['04.02'].cap}
              >
                {ruzhuData && ruzhuData['04'] && ruzhuData['04']['02'] ? getChildren(ruzhuPgxml['04.02'].children, ruzhuData['04']['02']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['04.03'].cap}
              >
                {ruzhuData && ruzhuData['04'] && ruzhuData['04']['03'] ? getChildren(ruzhuPgxml['04.03'].children, ruzhuData['04']['03']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['04.04.01'].cap}
              >
                {ruzhuData && ruzhuData['04'] && ruzhuData['04']['04'] && ruzhuData['04']['04']['01'] ? ruzhuData['04']['04']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['04.04.02'].cap}
              >
                {ruzhuData && ruzhuData['04'] && ruzhuData['04']['04'] && ruzhuData['04']['04']['02'] ? getChildren(ruzhuPgxml['04.04.02'].children, ruzhuData['04']['04']['02']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['04.04.03'].cap}
              >
                {ruzhuData && ruzhuData['04'] && ruzhuData['04']['04'] && ruzhuData['04']['04']['03'] ? ruzhuData['04']['04']['03'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['04.04.04'].cap}
              >
                {ruzhuData && ruzhuData['04'] && ruzhuData['04']['04'] && ruzhuData['04']['04']['04'] ? getChildren(ruzhuPgxml['04.04.04'].children, ruzhuData['04']['04']['04']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['04.05'].cap}
              >
                {ruzhuData && ruzhuData['04'] && ruzhuData['04']['05'] ? getChildren(ruzhuPgxml['04.05'].children, ruzhuData['04']['05']) : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="6"><span className="ant-form-item-borderLefthight">饮食与营养</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.01'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['01'] ? ruzhuData['05']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.02'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['02'] ? getChildren(ruzhuPgxml['05.02'].children, ruzhuData['05']['02']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.03.01'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['03'] && ruzhuData['05']['03']['01'] ? getChildren(ruzhuPgxml['05.03.01'].children, ruzhuData['05']['03']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.03.01'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['03'] && ruzhuData['05']['03']['02'] ? ruzhuData['05']['03']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.04'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['04'] ? getChildren(ruzhuPgxml['05.04'].children, ruzhuData['05']['04']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.05.01'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['05'] && ruzhuData['05']['05']['01'] ? getChildren(ruzhuPgxml['05.05.01'].children, ruzhuData['05']['05']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.05.01'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['05'] && ruzhuData['05']['05']['02'] ? ruzhuData['05']['05']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.06'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['06'] ? getChildren(ruzhuPgxml['05.06'].children, ruzhuData['05']['06']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.07'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['07'] ? getChildren(ruzhuPgxml['05.07'].children, ruzhuData['05']['07']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.08.01'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['08'] && ruzhuData['05']['08']['01'] ? ruzhuData['05']['08']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.08.01'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['08'] && ruzhuData['05']['08']['02'] ? ruzhuData['05']['08']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.09.01'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['09'] && ruzhuData['05']['09']['01'] ? ruzhuData['05']['09']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="分级"
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['09'] && ruzhuData['05']['09']['02'] ? ruzhuData['05']['09']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.10.01'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['10'] && ruzhuData['05']['10']['01'] ? ruzhuData['05']['10']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="分级"
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['10'] && ruzhuData['05']['10']['02'] ? ruzhuData['05']['10']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.11.01'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['11'] && ruzhuData['05']['11']['01'] ? ruzhuData['05']['11']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="分级"
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['11'] && ruzhuData['05']['11']['02'] ? ruzhuData['05']['11']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['05.12'].cap}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['12'] ? getChildren(ruzhuPgxml['05.12'].children, ruzhuData['05']['12']) : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="7"><span className="ant-form-item-borderLefthight">排便排尿</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['06.01.01'].cap}
              >
                {ruzhuData && ruzhuData['06'] && ruzhuData['06']['01'] && ruzhuData['06']['01']['01'] ? getChildren(ruzhuPgxml['06.01.01'].children, ruzhuData['06']['01']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['06.01.01'].cap}
              >
                {ruzhuData && ruzhuData['06'] && ruzhuData['06']['01'] && ruzhuData['06']['01']['02'] ? `${ruzhuData['06']['01']['02']}次/夜` : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['06.02.01'].cap}
              >
                {ruzhuData && ruzhuData['06'] && ruzhuData['06']['02'] && ruzhuData['06']['02']['01'] ? getChildren(ruzhuPgxml['06.02.01'].children, ruzhuData['06']['02']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['06.02.02'].cap}
              >
                {ruzhuData && ruzhuData['06'] && ruzhuData['06']['02'] && ruzhuData['06']['02']['02'] ? ruzhuData['06']['02']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['06.02.03'].cap}
              >
                {ruzhuData && ruzhuData['06'] && ruzhuData['06']['02'] && ruzhuData['06']['02']['03'] ? getTime(ruzhuData['06']['02']['03']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['06.03'].cap}
              >
                {ruzhuData && ruzhuData['06'] && ruzhuData['06']['03'] ? ruzhuData['06']['03'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['06.04'].cap}
              >
                {ruzhuData && ruzhuData['06'] && ruzhuData['06']['04'] ? getTime(ruzhuData['06']['04']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['06.05'].cap}
              >
                {ruzhuData && ruzhuData['06'] && ruzhuData['06']['05'] ? getChildren(ruzhuPgxml['06.05'].children, ruzhuData['06']['05']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['06.06'].cap}
              >
                {ruzhuData && ruzhuData['06'] && ruzhuData['06']['06'] ? getChildren(ruzhuPgxml['06.06'].children, ruzhuData['06']['06']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['06.07'].cap}
              >
                {ruzhuData && ruzhuData['06'] && ruzhuData['06']['07'] ? getChildren(ruzhuPgxml['06.07'].children, ruzhuData['06']['07']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['06.08.01'].cap}
              >
                {ruzhuData && ruzhuData['06'] && ruzhuData['06']['08'] && ruzhuData['06']['08']['01'] ? getChildren(ruzhuPgxml['06.08.01'].children, ruzhuData['06']['08']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['06.08.02'].cap}
              >
                {ruzhuData && ruzhuData['06'] && ruzhuData['06']['08'] && ruzhuData['06']['08']['02'] ? getChildren(ruzhuPgxml['06.08.02'].children, ruzhuData['06']['08']['02']) : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="8"><span className="ant-form-item-borderLefthight">感知</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['07.01.01'].cap}
              >
                {ruzhuData && ruzhuData['07'] && ruzhuData['07']['01'] && ruzhuData['07']['01']['01'] ? getChildren(ruzhuPgxml['07.01.01'].children, ruzhuData['07']['01']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="左右眼"
              >
                {ruzhuData && ruzhuData['07'] && ruzhuData['07']['01'] && ruzhuData['07']['01']['02'] ? getChildren(ruzhuPgxml['07.01.02'].children, ruzhuData['07']['01']['02']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['07.02.01'].cap}
              >
                {ruzhuData && ruzhuData['07'] && ruzhuData['07']['02'] && ruzhuData['07']['02']['01'] ? getChildren(ruzhuPgxml['07.02.01'].children, ruzhuData['07']['02']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="左右耳"
              >
                {ruzhuData && ruzhuData['07'] && ruzhuData['07']['02'] && ruzhuData['07']['02']['02'] ? getChildren(ruzhuPgxml['07.02.02'].children, ruzhuData['07']['02']['02']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['07.03'].cap}
              >
                {ruzhuData && ruzhuData['07'] && ruzhuData['07']['03'] ? getChildren(ruzhuPgxml['07.03'].children, ruzhuData['07']['03']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['07.04'].cap}
              >
                {ruzhuData && ruzhuData['07'] && ruzhuData['07']['04'] ? getChildren(ruzhuPgxml['07.04'].children, ruzhuData['07']['04']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['07.05'].cap}
              >
                {ruzhuData && ruzhuData['07'] && ruzhuData['07']['05'] ? getChildren(ruzhuPgxml['07.05'].children, ruzhuData['07']['05']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['07.06.01'].cap}
              >
                {ruzhuData && ruzhuData['07'] && ruzhuData['07']['06'] && ruzhuData['07']['06']['01'] ? ruzhuData['07']['06']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="分级"
              >
                {ruzhuData && ruzhuData['07'] && ruzhuData['07']['06'] && ruzhuData['07']['06']['02'] ? ruzhuData['07']['06']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['07.07.01'].cap}
              >
                {ruzhuData && ruzhuData['07'] && ruzhuData['07']['07'] && ruzhuData['07']['07']['01'] ? ruzhuData['07']['07']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="分级"
              >
                {ruzhuData && ruzhuData['07'] && ruzhuData['07']['07'] && ruzhuData['07']['07']['02'] ? ruzhuData['07']['07']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['07.08'].cap}
              >
                {ruzhuData && ruzhuData['07'] && ruzhuData['07']['08'] ? getChildren(ruzhuPgxml['07.08'].children, ruzhuData['07']['08']) : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="9"><span className="ant-form-item-borderLefthight">认知与沟通</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['08.01'].cap}
              >
                {ruzhuData && ruzhuData['08'] && ruzhuData['08']['01'] ? getChildren(ruzhuPgxml['08.01'].children, ruzhuData['08']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['08.02'].cap}
              >
                {ruzhuData && ruzhuData['08'] && ruzhuData['08']['02'] ? getChildren(ruzhuPgxml['08.02'].children, ruzhuData['08']['02']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['08.03'].cap}
              >
                {ruzhuData && ruzhuData['08'] && ruzhuData['08']['03'] ? getChildren(ruzhuPgxml['08.03'].children, ruzhuData['08']['03']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['08.04.01'].cap}
              >
                {ruzhuData && ruzhuData['08'] && ruzhuData['08']['04'] && ruzhuData['08']['04']['01'] ? ruzhuData['08']['04']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="分级"
              >
                {ruzhuData && ruzhuData['08'] && ruzhuData['08']['04'] && ruzhuData['08']['04']['02'] ? ruzhuData['08']['04']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['08.05'].cap}
              >
                {ruzhuData && ruzhuData['08'] && ruzhuData['08']['05'] ? getChildren(ruzhuPgxml['08.05'].children, ruzhuData['08']['05']) : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="10"><span className="ant-form-item-borderLefthight">活动</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['09.01'].cap}
              >
                {ruzhuData && ruzhuData['09'] && ruzhuData['09']['01'] ? getChildren(ruzhuPgxml['09.01'].children, ruzhuData['09']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['09.02'].cap}
              >
                {ruzhuData && ruzhuData['09'] && ruzhuData['09']['02'] ? getChildren(ruzhuPgxml['09.02'].children, ruzhuData['09']['02']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['09.03.01'].cap}
              >
                {ruzhuData && ruzhuData['09'] && ruzhuData['09']['03'] && ruzhuData['09']['03']['01'] ? ruzhuData['09']['03']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="分级"
              >
                {ruzhuData && ruzhuData['09'] && ruzhuData['09']['03'] && ruzhuData['09']['03']['02'] ? ruzhuData['09']['03']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['09.04.01'].cap}
              >
                {ruzhuData && ruzhuData['09'] && ruzhuData['09']['04'] && ruzhuData['09']['04']['01'] ? ruzhuData['09']['04']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="分级"
              >
                {ruzhuData && ruzhuData['09'] && ruzhuData['09']['04'] && ruzhuData['09']['04']['02'] ? ruzhuData['09']['04']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['09.05'].cap}
              >
                {ruzhuData && ruzhuData['09'] && ruzhuData['09']['05'] ? getChildren(ruzhuPgxml['09.05'].children, ruzhuData['09']['05']) : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="11"><span className="ant-form-item-borderLefthight">卫生与皮肤</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['10.01.01'].cap}
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['01'] && ruzhuData['10']['01']['01'] ? getChildren(ruzhuPgxml['10.01.01'].children, ruzhuData['10']['01']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['10.01.01'].cap}
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['01'] && ruzhuData['10']['01']['02'] ? ruzhuData['10']['01']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['10.02'].cap}
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['02'] ? getChildren(ruzhuPgxml['10.02'].children, ruzhuData['10']['02']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['10.03'].cap}
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['03'] ? getChildren(ruzhuPgxml['10.03'].children, ruzhuData['10']['03']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['10.04'].cap}
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['04'] ? getChildren(ruzhuPgxml['10.04'].children, ruzhuData['10']['04']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['10.05.01'].cap}
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['05'] && ruzhuData['10']['05']['01'] ? getChildren(ruzhuPgxml['10.05.01'].children, ruzhuData['10']['05']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['10.05.01'].cap}
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['05'] && ruzhuData['10']['05']['02'] ? ruzhuData['10']['05']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['10.05.01'].cap}
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['05'] && ruzhuData['10']['05']['03'] ? ruzhuData['10']['05']['03'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['10.06.01'].cap}
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['06'] && ruzhuData['10']['06']['01'] ? getChildren(ruzhuPgxml['10.06.01'].children, ruzhuData['10']['06']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['10.06.01'].cap}
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['06'] && ruzhuData['10']['06']['02'] ? getChildren(ruzhuPgxml['10.06.02'].children, ruzhuData['10']['06']['02']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="引流管说明"
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['06'] && ruzhuData['10']['06']['03'] ? ruzhuData['10']['06']['03'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="其他说明"
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['06'] && ruzhuData['10']['06']['04'] ? ruzhuData['10']['06']['04'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['10.07.01'].cap}
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['07'] && ruzhuData['10']['07']['01'] ? ruzhuData['10']['07']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="分级"
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['07'] && ruzhuData['10']['07']['02'] ? ruzhuData['10']['07']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['10.08.01'].cap}
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['08'] && ruzhuData['10']['08']['01'] ? ruzhuData['10']['08']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="分级"
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['08'] && ruzhuData['10']['08']['02'] ? ruzhuData['10']['08']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['10.09'].cap}
              >
                {ruzhuData && ruzhuData['10'] && ruzhuData['10']['09'] ? getChildren(ruzhuPgxml['10.09'].children, ruzhuData['10']['09']) : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="12"><span className="ant-form-item-borderLefthight">舒适</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['11.01.01'].cap}
              >
                {ruzhuData && ruzhuData['11'] && ruzhuData['11']['01'] && ruzhuData['11']['01']['01'] ? getChildren(ruzhuPgxml['11.01.01'].children, ruzhuData['11']['01']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['11.01.01'].cap}
              >
                {ruzhuData && ruzhuData['11'] && ruzhuData['11']['01'] && ruzhuData['11']['01']['02'] ? ruzhuData['11']['01']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['11.02.01'].cap}
              >
                {ruzhuData && ruzhuData['11'] && ruzhuData['11']['02'] && ruzhuData['11']['02']['01'] ? getChildren(ruzhuPgxml['11.02.01'].children, ruzhuData['11']['02']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['11.02.02'].cap}
              >
                {ruzhuData && ruzhuData['11'] && ruzhuData['11']['02'] && ruzhuData['11']['02']['02'] ? ruzhuData['11']['02']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['11.03'].cap}
              >
                {ruzhuData && ruzhuData['11'] && ruzhuData['11']['03'] ? getChildren(ruzhuPgxml['11.03'].children, ruzhuData['11']['03']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['11.04'].cap}
              >
                {ruzhuData && ruzhuData['11'] && ruzhuData['11']['04'] ? ruzhuData['11']['04'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['11.05'].cap}
              >
                {ruzhuData && ruzhuData['11'] && ruzhuData['11']['05'] ? ruzhuData['11']['05'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['11.06'].cap}
              >
                {ruzhuData && ruzhuData['11'] && ruzhuData['11']['06'] ? getChildren(ruzhuPgxml['11.06'].children, ruzhuData['11']['06']) : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="13"><span className="ant-form-item-borderLefthight">休息与休眠</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['12.01'].cap}
              >
                {ruzhuData && ruzhuData['12'] && ruzhuData['12']['01'] ? ruzhuData['12']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['12.02'].cap}
              >
                {ruzhuData && ruzhuData['12'] && ruzhuData['12']['02'] ? getChildren(ruzhuPgxml['12.02'].children, ruzhuData['12']['02']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['12.03.01'].cap}
              >
                {ruzhuData && ruzhuData['12'] && ruzhuData['12']['03'] && ruzhuData['12']['03']['01'] ? ruzhuData['12']['03']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="分级"
              >
                {ruzhuData && ruzhuData['12'] && ruzhuData['12']['03'] && ruzhuData['12']['03']['02'] ? ruzhuData['12']['03']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['12.04'].cap}
              >
                {ruzhuData && ruzhuData['12'] && ruzhuData['12']['04'] ? getChildren(ruzhuPgxml['12.04'].children, ruzhuData['12']['04']) : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="14"><span className="ant-form-item-borderLefthight">精神与信仰</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['13.01.01'].cap}
              >
                {ruzhuData && ruzhuData['13'] && ruzhuData['13']['01'] && ruzhuData['13']['01']['01'] ? getChildren(ruzhuPgxml['13.01.01'].children, ruzhuData['13']['01']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['13.01.02'].cap}
              >
                {ruzhuData && ruzhuData['13'] && ruzhuData['13']['01'] && ruzhuData['13']['01']['02'] ? ruzhuData['13']['01']['02'] : '-'}
              </FormItem>
            </Col>
            {/* <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['13.01.03'].cap}
              >
                {ruzhuData && ruzhuData['13'] && ruzhuData['13']['01'] && ruzhuData['13']['01']['03'] ? ruzhuData['13']['01']['03'] : '-'}
              </FormItem>
            </Col> */}
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['13.02.01'].cap}
              >
                {ruzhuData && ruzhuData['13'] && ruzhuData['13']['02'] && ruzhuData['13']['02']['01'] ? ruzhuData['13']['02']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label="分级"
              >
                {ruzhuData && ruzhuData['13'] && ruzhuData['13']['02'] && ruzhuData['13']['02']['02'] ? ruzhuData['13']['02']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['13.03'].cap}
              >
                {ruzhuData && ruzhuData['13'] && ruzhuData['13']['03'] ? getChildren(ruzhuPgxml['13.03'].children, ruzhuData['13']['03']) : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="15"><span className="ant-form-item-borderLefthight">体格检查</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['14.01.01'].cap}
              >
                {ruzhuData && ruzhuData['14'] && ruzhuData['14']['01'] && ruzhuData['14']['01']['01'] ? ruzhuData['14']['01']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['14.01.02'].cap}
              >
                {ruzhuData && ruzhuData['14'] && ruzhuData['14']['01'] && ruzhuData['14']['01']['02'] ? ruzhuData['14']['01']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['14.01.03'].cap}
              >
                {ruzhuData && ruzhuData['14'] && ruzhuData['14']['01'] && ruzhuData['14']['01']['03'] ? ruzhuData['14']['01']['03'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['14.01.04'].cap}
              >
                {ruzhuData && ruzhuData['14'] && ruzhuData['14']['01'] && ruzhuData['14']['01']['04'] ? ruzhuData['14']['01']['04'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['14.01.05'].cap}
              >
                {ruzhuData && ruzhuData['14'] && ruzhuData['14']['01'] && ruzhuData['14']['01']['05'] ? ruzhuData['14']['01']['05'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['14.01.06'].cap}
              >
                {ruzhuData && ruzhuData['14'] && ruzhuData['14']['01'] && ruzhuData['14']['01']['06'] ? ruzhuData['14']['01']['06'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['14.01.07'].cap}
              >
                {ruzhuData && ruzhuData['14'] && ruzhuData['14']['01'] && ruzhuData['14']['01']['07'] ? ruzhuData['14']['01']['07'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['14.02'].cap}
              >
                {ruzhuData && ruzhuData['14'] && ruzhuData['14']['02'] ? ruzhuData['14']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['14.03'].cap}
              >
                {ruzhuData && ruzhuData['14'] && ruzhuData['14']['03'] ? ruzhuData['14']['03'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['14.04'].cap}
              >
                {ruzhuData && ruzhuData['14'] && ruzhuData['14']['04'] ? getChildren(ruzhuPgxml['14.04'].children, ruzhuData['14']['04']) : '-'}
              </FormItem>
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="16"><span className="ant-form-item-borderLefthight">评估信息</span></div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['sup01.01'].cap}
              >
                {ruzhuData && ruzhuData.sup01 && ruzhuData.sup01['01'] ? ruzhuData.sup01['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['sup01.02'].cap}
              >
                {ruzhuData && ruzhuData.sup01 && ruzhuData.sup01['02'] ? ruzhuData.sup01['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['sup01.03'].cap}
              >
                {ruzhuData && ruzhuData.sup01 && ruzhuData.sup01['03'] ? ruzhuData.sup01['03'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['sup01.04'].cap}
              >
                {ruzhuData && ruzhuData.sup01 && ruzhuData.sup01['04'] ? ruzhuData.sup01['04'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['sup01.05'].cap}
              >
                {ruzhuData && ruzhuData.sup01 && ruzhuData.sup01['05'] ? ruzhuData.sup01['05'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['sup01.06'].cap}
              >
                {ruzhuData && ruzhuData.sup01 && ruzhuData.sup01['06'] ? ruzhuData.sup01['06'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['sup01.07'].cap}
              >
                {ruzhuData && ruzhuData.sup01 && ruzhuData.sup01['07'] ? ruzhuData.sup01['07'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['sup01.08'].cap}
              >
                {ruzhuData && ruzhuData.sup01 && ruzhuData.sup01['08'] ? getTime(ruzhuData.sup01['08']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={ruzhuPgxml && ruzhuPgxml['sup01.09'].cap}
              >
                {ruzhuData && ruzhuData.sup01 && ruzhuData.sup01['09'] ? ruzhuData.sup01['09'] : '-'}
              </FormItem>
            </Col>
          </Row>

        </Col>
        <Col span={3}>
          <Menu />
        </Col>
      </Row>
    </Form>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.dangan,
  };
}

export default connect(mapStateToProps)(Form.create()(RuzhuPg));
