import React from 'react';
import { connect } from 'dva';
import { Table, Form } from 'antd';

const List = (props) => {
  const { goDetail, jumpLink, ...tableProps } = props;

  const columns = [
    {
      title: '集团/机构名称',
      dataIndex: 'mingcheng',
      render: (record) => {
        return record || '未绑定设备';
      },
    },
    {
      title: '人员总数',
      dataIndex: 'suoyin',
      render: (record, item) => {
        return item.id === -1 ? '-' : record;
      },
    },
    {
      title: '智能床设备数量',
      dataIndex: 'chuangZs',
      render: (record) => {
        return record;
      },
    },
    {
      title: '智能床在用数量',
      dataIndex: 'chuangZyZs',
      render: (record) => {
        return record;
      },
    },
    {
      title: '智能床垫设备数量',
      dataIndex: 'chuangdianZs',
      render: (record) => {
        return record;
      },
    },
    {
      title: '智能床垫在用数量',
      dataIndex: 'chuangdianZyZs',
      render: (record) => {
        return record;
      },
    },
    {
      title: '多体征设备设备数量',
      dataIndex: 'duotizhengZs',
      render: (record) => {
        return record;
      },
    },
    {
      title: '多体征设备在用数量',
      dataIndex: 'duotizhengZyZs',
      render: (record) => {
        return record;
      },
    },
    {
      title: '智汇鞋设备数量',
      dataIndex: 'xieZs',
      render: (record) => {
        return record;
      },
    },
    {
      title: '智汇鞋在用数量',
      dataIndex: 'xieZyZs',
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
    caijiJg: state.caijiJg,
  };
}

export default connect(mapStateToProps)(Form.create()(List));
