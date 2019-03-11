import React from 'react';
import {connect} from 'dva';
import {Table, Form} from 'antd';

const List = (props) => {
  const {
    onEditItem,
    ...tableProps
  } = props;

  const onDetail = (path, params) => {
    onEditItem(path, params);
  };

  const columns = [
    {
      title: '角色',
      dataIndex: 'name',
      width: '300px',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '操作',
      render: (record, item) => {
        return (
          <a
            style={{ color: '#009EFF'}}
            onClick={() => {
              onDetail('/role/detail', { id: item.id });
            }}
          >
            详情
          </a>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        {...tableProps}
        scroll={{x: 1000}}
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
    role: state.role,
  };
}

export default (connect(mapStateToProps)(Form.create()(List)));
