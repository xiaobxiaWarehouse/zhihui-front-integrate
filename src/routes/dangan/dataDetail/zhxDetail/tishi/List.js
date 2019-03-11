import React from 'react';
import { connect } from 'dva';
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

  const navProps = {
    navList,
    location,
  };

  const columns = [
    {
      title: '时间',
      dataIndex: 'shijian',
      render: (record) => {
        return record;
      },
    },
    {
      title: '提示类型',
      dataIndex: 'jiancexiang',
      render: (record) => {
        return record;
      },
    },
    {
      title: '提示内容',
      dataIndex: 'memo',
      render: (record) => {
        return record;
      },
    },
  ];

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
