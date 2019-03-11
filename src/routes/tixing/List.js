import React from 'react';
import { connect } from 'dva';
import { Table, Form } from 'antd';

const List = (props) => {
  const { goDetail, jumpLink, ...tableProps } = props;

  const columns = [
    {
      title: '人员姓名',
      dataIndex: 'xingming',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '性别',
      dataIndex: 'xingbie',
      render: (record) => {
        switch (record) {
          case 'M':
            return <span>男</span>;
          case 'F':
            return <span>女</span>;
          default:
            return <span>-</span>;
        }
      },
    },
    {
      title: '年龄',
      dataIndex: 'nianling',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '所属机构',
      dataIndex: 'jigouMc',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '设备编号',
      dataIndex: 'bianhao',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '设备类型',
      dataIndex: 'leixing',
      render: (record) => {
        switch (record) {
          case 1:
            return <span>智能床</span>;
          case 2:
            return <span>智能床垫</span>;
          case 3:
            return <span>多体征</span>;
          default:
            return <span>-</span>;
        }
      },
    },
    {
      title: '阈值',
      dataIndex: 'yuzhi',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '监测项目',
      dataIndex: 'jiancexiang',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '监测值',
      dataIndex: 'jiancezhi',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '异常发生时间',
      dataIndex: 'shijian',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '异常情况',
      dataIndex: 'yichangQk',
      render: (record) => {
        return record || '数值超过正常范围';
      },
    },
  ];

  return (
    <div>
      <Table
        {...tableProps}
        scroll={{ x: 1000 }}
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    tixing: state.tixing,
  };
}

export default connect(mapStateToProps)(Form.create()(List));
