import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Table, Form } from 'antd';

const List = (props) => {
  const {
    query, goDetail, jumpLink, ...tableProps
  } = props;

  const columns = [
    {
      title: '报送时间',
      dataIndex: 'shijian',
      render: (record) => {
        return record ? moment(record).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
    },
    {
      title: '设备类型',
      dataIndex: 'leixing',
      render: (record) => {
        switch (query && query.leixing) {
          case '1':
            return <span>智能床</span>;
          case '2':
            return <span>智能床垫</span>;
          case '3':
            return <span>多体征设备</span>;
          case '4':
            return <span>智汇鞋</span>;
          default:
            return <span>智能床</span>;
        }
      },
    },
    {
      title: '报送总数量',
      dataIndex: 'msgTotal',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '报送有效总数量',
      dataIndex: 'baosongliangYx',
      render: (record, item) => {
        switch (query && query.leixing) {
          case '1':
            return <span>{item.msgTotal - item.msgUnreliable}</span>;
          case '2':
            return <span>{item.msgTotal - item.msgUnreliable}</span>;
          case '3':
            return <span>{item.msgValid}</span>;
          default:
            return <span>{item.msgTotal - item.msgUnreliable}</span>;
        }
      },
    },
    {
      title: '报送无效总数量',
      dataIndex: 'msgUnreliable',
      render: (record, item) => {
        switch (query && query.leixing) {
          case '1':
            return <span>{item.msgUnreliable}</span>;
          case '2':
            return <span>{item.msgUnreliable}</span>;
          case '3':
            return <span>{item.msgInvalid}</span>;
          default:
            return <span>{item.msgUnreliable}</span>;
        }
      },
    },
    {
      title: '在用设备数量',
      dataIndex: 'devTotal',
      render: (record) => {
        return record;
      },
    },
    {
      title: '有效设备数量',
      dataIndex: 'devValid',
      render: (record) => {
        return record;
      },
    },
  ];

  return (
    <div>
      <Table
        {...tableProps}
        scroll={{ x: 1000 }}
        columns={columns}
        rowKey={(record, index) => index}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    caijiSb: state.caijiSb,
  };
}

export default connect(mapStateToProps)(Form.create()(List));
