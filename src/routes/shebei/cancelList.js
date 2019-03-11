import React from 'react';
import { connect } from 'dva';
import { Table, Form } from 'antd';
import moment from 'moment';
import styles from './index.less';

const CancelList = (props) => {
  const {
    onCancel,
    ...tableProps
  } = props;
  const columns = [
    {
      title: '文件名',
      dataIndex: 'wenjian',
      width: 600,
      render: (record, item) => {
        return (
          <div>{record || '-'}</div>
        );
      },
    },
    {
      title: '导入时间',
      dataIndex: 'daoruSj',
      width: 400,
      render: (record, item) => {
        return record || '-';
      },
    },
    {
      title: '设备类型',
      dataIndex: 'leixing',
      width: 400,
      render: (record, item) => {
        switch (record) {
          case 1:
            return <span>智能床</span>;
          case 2:
            return <span>智能床垫</span>;
          case 3:
            return <span>多体征设备</span>;
          default:
            return <span>-</span>;
        }
      },
    },
    {
      title: '操作',
      width: 200,
      render: (record, item) => {
        return (
          <a
            onClick={() => { onCancel(item); }}
            style={{ color: '#009EFF' }}
          >
            撤销
          </a>
        );
      },
    },
  ];

  return (
    <div>
      <Table
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
    shebei: state.shebei,
  };
}

export default connect(mapStateToProps)(Form.create()(CancelList));
