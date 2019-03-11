import React from 'react';
import { connect } from 'dva';
import { Table, Form } from 'antd';
import moment from 'moment';

const dtzList = (props) => {
  const {
    modalsignType,
    ...tableProps
  } = props;
  const columns = [
    {
      title: '报送时间',
      dataIndex: 'shijian',
      width: 400,
      render: (record, item) => {
        return `${moment(item.shijian).format('YYYY-MM-DD HH:mm:ss')}` || '-';
      },
    },
    {
      title: '报送内容',
      dataIndex: 'neirong',
      width: 300,
      render: (record, item) => {
        switch (modalsignType) {
          case 'weight':
          case 'bg':
          case 'spo2':
          case 'hr':
          case 'temp':
          case 'bp':
          case '-1':
            return <span>map: {item.map}, dbp: {item.dbp}, bg: {item.bg}, hr: {item.hr}, spo2: {item.spo2}, sbp: {item.sbp}, temp: {item.temp}, weight: {item.weight}, sign_type: {item.signType}</span>;
          default:
            return <span>-</span>;
        }
      },
    },
  ];

  return (
    <div>
      <Table
        pagination={false}
        {...tableProps}
        columns={columns}
        simple
        rowKey={(record, index) => index}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    monitorDtz: state.monitorDtz,
  };
}

export default connect(mapStateToProps)(Form.create()(dtzList));
