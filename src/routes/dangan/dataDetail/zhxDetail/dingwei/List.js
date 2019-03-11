import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Row, Col, Table, Button } from 'antd';
import Nav from '../nav';
import styles from './index.less';

const navList = [
  { id: 1, name: '基本信息' },
  { id: 2, name: '定位信息' },
  { id: 3, name: '提示列表' },
];

const List = (props) => {
  const {
    location, ...tableProps
  } = props;

  const columns = [
    {
      title: '时间',
      dataIndex: 'shijian',
      render: (record) => {
        return record ? moment(record).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
    },
    {
      title: '经纬度',
      dataIndex: 'signType',
      render: (record) => {
        return record;
      },
    },
  ];
  const navProps = {
    navList,
    location,
  };

  return (
    <div>
      <div className="chartW">
        <Row gutter={10}>
          <Col span={24}>
            <div className={styles.chartBox}>
              <Table
                {...tableProps}
                scroll={{ x: 900 }}
                columns={columns}
                simple
                rowKey={record => record.id}
              />
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ width: 123, float: 'right' }}>
        <Nav {...navProps} />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.dangan,
  };
}

export default connect(mapStateToProps)(Form.create()(List));
