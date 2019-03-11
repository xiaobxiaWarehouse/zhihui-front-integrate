import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Row, Col, Table } from 'antd';
import Nav from '../nav';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
  style: {},
};

const navList = [
  { id: 1, name: '基本信息' },
  { id: 2, name: '定位信息' },
  { id: 3, name: '提示列表' },
];

class Content extends Component {
  componentDidMount() {
    if (window.BMap) {
      setTimeout(() => {
        const { dangan} = this.props;
        const { jibenZhx } = dangan;
        const latitude = jibenZhx.latitude || 39.897445;
        const longitude = jibenZhx.longitude || 116.331398;
        console.log(jibenZhx);
        console.log(latitude);
        console.log(longitude);
        const map = new window.BMap.Map('jiben-map');
        map.centerAndZoom(new BMap.Point(longitude, latitude), 11);
        map.enableScrollWheelZoom(true);
      }, 1000);
    }
  }
  render () {
    const { location, dangan } = this.props;
    const { jibenZhx } = dangan;

    const navProps = {
      navList,
      location,
    };

    return (
      <div>
        <div className="ant-form-item-borderLeft">
          <span className="ant-form-item-borderLefthight">基本信息</span>
        </div>
        <div className="chartW">
          <Form className="role-detail-formitem">
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label="主联系人：">
                  {(jibenZhx && jibenZhx.shenfenzheng) || '-'}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="主联系人手机：">
                  {(jibenZhx && jibenZhx.shenfenzheng) || '-'}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="跌倒状态：">
                  {(jibenZhx && jibenZhx.fallState) || '-'}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label="围栏状态：">
                  {jibenZhx && jibenZhx.fenceState}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label="电量状态：">
                  {(jibenZhx && jibenZhx.powerState) || '-'}
                </FormItem>
              </Col>
            </Row>
            <div
              style={{
                width: '100%',
                borderBottom: '1px solid #D8D8D8',
                margin: '20px 0',
              }}
            />
          </Form>
          <div className="ant-form-item-borderLeft">
            <span className="ant-form-item-borderLefthight">定位信息</span>
          </div>
          <div id="jiben-map" style={{width: '100%', height: '500px', marginBottom: 20}}/>
        </div>
        <div style={{ width: 123, float: 'right' }}>
          <Nav {...navProps} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.dangan,
  };
}

export default connect(mapStateToProps)(Form.create()(Content));
