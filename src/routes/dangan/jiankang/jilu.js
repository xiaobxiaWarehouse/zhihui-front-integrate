import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Row, Col, Table } from 'antd';
import {config} from 'utils';
import Menu from './menuJl';

const FormItem = Form.Item;
const {PROJECT} = config;

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
    list = children
      .filter((item) => {
        return value.indexOf(item.value) > -1;
      })
      .map((item) => {
        return item.content;
      });
  } else if (children.constructor === Object) {
    list = [children]
      .filter((item) => {
        return value.constructor === Array
          ? value.indexOf(item.value) > -1
          : [value].indexOf(item.value) > -1;
      })
      .map((item) => {
        return item.content;
      });
  } else {
    list = children
      .filter((item) => {
        return value === item.value;
      })
      .map((item) => {
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
  const { jiluXml, ruzhuData } = dangan;

  const columnsJL = [
    {
      title: jiluXml && jiluXml['02.01.01'].cap,
      dataIndex: '01',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: jiluXml && jiluXml['02.01.02'].cap,
      dataIndex: '02',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: jiluXml && jiluXml['02.01.03'].cap,
      dataIndex: '03',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: jiluXml && jiluXml['02.01.04'].cap,
      dataIndex: '04',
      render: (record, row, index) => {
        return record || '-';
      },
    },
  ];

  const columnsJT = [
    {
      title: jiluXml && jiluXml['04.01.01'].cap,
      dataIndex: '01',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: jiluXml && jiluXml['04.01.02'].cap,
      dataIndex: '02',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: jiluXml && jiluXml['04.01.03'].cap,
      dataIndex: '03',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: jiluXml && jiluXml['04.01.04'].cap,
      dataIndex: '04',
      render: (record) => {
        return record || '-';
      },
    },
  ];

  return (
    <Form className="ruzhu-pinggu-form">
      <Row>
        <Col span={21}>
          <div className="ant-form-item-borderLeft" id="jili1">
            <span className="ant-form-item-borderLefthight">入住信息</span>
          </div>
          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['pre01.01'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['01'] ? ruzhuData.pre01['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['pre01.02'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['02']
                  ? getTime(ruzhuData.pre01['02'])
                  : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['pre01.03'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['03']
                  ? getTime(ruzhuData.pre01['03'])
                  : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['pre01.04'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['04'] ? ruzhuData.pre01['04'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['pre01.05'].cap}
              >
                {jiluXml && ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['05']
                  ? getChildren(jiluXml['pre01.05'].children, ruzhuData.pre01['05'])
                  : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['pre01.06'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['06'] ? ruzhuData.pre01['06'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['pre01.07'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['07']
                  ? getTime(ruzhuData.pre01['07'])
                  : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['pre01.08'].cap}
              >
                {jiluXml && ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['08']
                  ? getChildren(jiluXml['pre01.08'].children, ruzhuData.pre01['08'])
                  : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['pre01.09'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['09'] ? ruzhuData.pre01['09'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['pre01.10'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['10'] ? ruzhuData.pre01['10'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['pre01.11'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['11'] ? ruzhuData.pre01['11'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['pre01.12'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['12'] ? ruzhuData.pre01['12'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['pre01.13'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['13'] ? ruzhuData.pre01['13'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['pre01.14'].cap}
              >
                {ruzhuData && ruzhuData.pre01 && ruzhuData.pre01['14'] ? getTime(ruzhuData.pre01['14']) : '-'}
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
          <div className="ant-form-item-borderLeft" id="jili2">
            <span className="ant-form-item-borderLefthight">基本信息</span>
          </div>

          <Row>
            <Col span={16}>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label={jiluXml && jiluXml['01.01'].cap}
                  >
                    {ruzhuData && ruzhuData['01'] && ruzhuData['01']['01'] ? ruzhuData['01']['01'] : '-'}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label={jiluXml && jiluXml['01.02'].cap}
                  >
                    {ruzhuData && ruzhuData['01'] && ruzhuData['01']['02'] ? getTime(ruzhuData['01']['02']) : '-'}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label={jiluXml && jiluXml['01.03'].cap}
                  >
                    {ruzhuData && ruzhuData['01'] && ruzhuData['01']['03'] ? ruzhuData['01']['03'] : '-'}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label={jiluXml && jiluXml['01.04'].cap}
                  >
                    {ruzhuData && ruzhuData['01'] && ruzhuData['01']['04'] ? getChildren(jiluXml['01.04'].children, ruzhuData['01']['04']) : '-'}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label={jiluXml && jiluXml['01.05.01'].cap}
                  >
                    {ruzhuData && ruzhuData['01'] && ruzhuData['01']['05'] && ruzhuData['01']['05']['01'] ? getChildren(jiluXml['01.05.01'].children, ruzhuData['01']['05']['01']) : '-'}
                    {ruzhuData && ruzhuData['01'] && ruzhuData['01']['05'] && ruzhuData['01']['05']['02'] ? ruzhuData['01']['05']['02'] : ''}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label={jiluXml && jiluXml['01.06'].cap}
                  >
                    {ruzhuData && ruzhuData['01'] && ruzhuData['01']['06'] ? ruzhuData['01']['06'] : '-'}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label={jiluXml && jiluXml['01.07'].cap}
                  >
                    {jiluXml && ruzhuData && ruzhuData['01'] && ruzhuData['01']['07'] ? getChildren(jiluXml['01.07'].children, ruzhuData['01']['07']) : '-'}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label={jiluXml && jiluXml['01.08'].cap}
                  >
                    {jiluXml && ruzhuData && ruzhuData['01'] && ruzhuData['01']['08'] ? getChildren(jiluXml['01.08'].children, ruzhuData['01']['08']) : '-'}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label={jiluXml && jiluXml['01.09'].cap}
                  >
                    {ruzhuData && ruzhuData['01'] && ruzhuData['01']['09'] ? ruzhuData['01']['09'] : '-'}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label={jiluXml && jiluXml['01.10'].cap}
                  >
                    {ruzhuData && ruzhuData['01'] && ruzhuData['01']['10'] ? ruzhuData['01']['10'] : '-'}
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['01.18'].cap}
              >
                <div
                  style={{
                    width: 162,
                    height: 188,
                    border: '1px solid #d9d9d9',
                    overflow: 'hidden',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img src={(ruzhuData && ruzhuData['01'] && ruzhuData['01']['18'] && `${PROJECT}/oss/${ruzhuData['01']['18']}?x-oss-process=image/resize,m_lfit,w_162,h_188/auto-orient,1`) || undefined} alt="" />
                </div>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['01.11'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['11'] ? ruzhuData['01']['11'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['01.12'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['12'] ? ruzhuData['01']['12'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['01.13'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['13'] ? ruzhuData['01']['13'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['01.14'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['14'] ? ruzhuData['01']['14'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['01.15'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['15'] ? ruzhuData['01']['15'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['01.16'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['16'] ? ruzhuData['01']['16'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['01.17'].cap}
              >
                {ruzhuData && ruzhuData['01'] && ruzhuData['01']['17'] ? ruzhuData['01']['17'] : '-'}
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
          <div className="ant-form-item-borderLeft" id="jili3">
            <span className="ant-form-item-borderLefthight">个人简历</span>
          </div>

          <Row>
            <Col>
              <Table
                bordered
                columns={columnsJL}
                dataSource={ruzhuData && ruzhuData['02'] && ruzhuData['02']['01'] ? ruzhuData['02']['01'] : []}
                pagination={false}
                rowKey={(record, index) => index}
              />
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="jili4">
            <span className="ant-form-item-borderLefthight">特长性格兴趣</span>
          </div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['03.01'].cap}
              >
                {ruzhuData && ruzhuData['03'] && ruzhuData['03']['01'] ? ruzhuData['03']['01'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['03.02'].cap}
              >
                {ruzhuData && ruzhuData['03'] && ruzhuData['03']['02'] ? ruzhuData['03']['02'] : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['03.03'].cap}
              >
                {ruzhuData && ruzhuData['03'] && ruzhuData['03']['03'] ? ruzhuData['03']['03'] : '-'}
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
          <div className="ant-form-item-borderLeft" id="jili5">
            <span className="ant-form-item-borderLefthight">家庭成员</span>
          </div>

          <Row>
            <Col>
              <Table
                bordered
                columns={columnsJT}
                dataSource={ruzhuData && ruzhuData['04'] && ruzhuData['04']['01'] ? ruzhuData['04']['01'] : []}
                pagination={false}
                rowKey={(record, index) => index}
              />
            </Col>
          </Row>

          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #D8D8D8',
              marginTop: 10,
            }}
          />
          <div className="ant-form-item-borderLeft" id="jili6">
            <span className="ant-form-item-borderLefthight">既往病史</span>
          </div>

          <Row>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && jiluXml['05.01.01'].cap}
              >
                {jiluXml && ruzhuData && ruzhuData['05'] && ruzhuData['05']['01'] && ruzhuData['05']['01']['01'] ? getChildren(jiluXml['05.01.01'].children, ruzhuData['05']['01']['01']) : '-'}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                {...formItemLayout}
                label={jiluXml && `${jiluXml['05.01.02'].cap}说明`}
              >
                {ruzhuData && ruzhuData['05'] && ruzhuData['05']['01'] && ruzhuData['05']['01']['02'] ? ruzhuData['05']['01']['02'] : '-'}
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
