import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Row, Col, Table, Button } from 'antd';
import Nav from '../nav';
import styles from './index.less';

const navList = [
  { id: 1, name: '最近监测数据' },
  { id: 2, name: '历史表单数据' },
  { id: 3, name: '历史图表数据' },
];

const Chart = (props) => {
  const {
    onchangePage, next, prev, location, ...tableProps
  } = props;

  const columns = [
    {
      title: '测量时间',
      dataIndex: 'shijian',
      render: (record) => {
        return record ? moment(record).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
    },
    {
      title: '测量类目',
      dataIndex: 'signType',
      render: (record) => {
        switch (record) {
          case 'weight':
            return <span>体重</span>;
          case 'bg':
            return <span>血糖</span>;
          case 'spo2':
            return <span>血氧</span>;
          case 'hr':
            return <span>心率/脉搏</span>;
          case 'temp':
            return <span>体温</span>;
          case 'bp':
            return <span>血压</span>;
          default:
            return <span>-</span>;
        }
      },
    },
    {
      title: '测量数值',
      dataIndex: 'clNum',
      render: (record, item) => {
        switch (item.signType) {
          case 'weight':
            return <span>{`${item.weight}kg`}</span>;
          case 'bg':
            return <span>{`${item.bg} mmol/L`}</span>;
          case 'spo2':
            return <span>{`${item.spo2}%`}</span>;
          case 'hr':
            return <span>{`${item.hr}次/分`}</span>;
          case 'temp':
            return <span>{`${item.temp}℃`}</span>;
          case 'bp':
            return <span>{`${item.dbp}mmHg/${item.sbp}mmHg`}</span>;
          default:
            return <span>-</span>;
        }
      },
    },
    {
      title: '来源',
      dataIndex: 'source',
      render: (record) => {
        return record || '-';
      },
    },
  ];
  const navProps = {
    navList,
    location,
  };

  return (
    <div>
      <div>
        <div className="chartW">
          <Row gutter={10}>
            <Col span={24}>
              <Row>
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
              <Row style={{ marginTop: 10 }}>
                <Col span={24}>
                  <div
                    className={styles.chartBox}
                    style={{ textAlign: 'right', border: 'none' }}
                  >
                    <Button
                      disabled={!prev.length > 0}
                      type="primary"
                      onClick={() => {
                        onchangePage('prev');
                      }}
                    >
                      上一页
                    </Button>
                    <Button
                      disabled={!next}
                      type="primary"
                      style={{ marginLeft: 20 }}
                      onClick={() => {
                        onchangePage('next');
                      }}
                    >
                      下一页
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div style={{ width: 123, float: 'right' }}>
          <Nav {...navProps} />
        </div>
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

export default connect(mapStateToProps)(Form.create()(Chart));
