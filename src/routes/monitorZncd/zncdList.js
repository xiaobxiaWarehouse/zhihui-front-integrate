import React from 'react';
import { connect } from 'dva';
import { Table, Form } from 'antd';
import moment from 'moment';

const zncdList = (props) => {
  const {
    modalshitu,
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
      width: 400,
      render: (record, item) => {
        switch (modalshitu) {
          case 1:
            return <span>hr: {item.hr}, mv: {item.mv}, rr: {item.rr}</span>;
          case 2:
            return <span>avg_hr: {item.avgHr}, avg_rr: {item.avgRr}, light_sleep: {item.lightSleep}, deep_sleep: {item.deepSleep}, sleep_status: {item.sleepStatus}</span>;
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
    monitorZncd: state.monitorZncd,
  };
}

export default connect(mapStateToProps)(Form.create()(zncdList));
