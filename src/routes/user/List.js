import React from 'react';
import { connect } from 'dva';
import { Table, Form } from 'antd';

const List = (props) => {
  const { onEditItem, ...tableProps } = props;

  const onDetail = (path, params) => {
    onEditItem(path, params);
  };

  const columns = [
    {
      title: '工号',
      dataIndex: 'gonghao',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '姓名',
      dataIndex: 'xingming',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '岗位',
      dataIndex: 'gangwei',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '角色',
      dataIndex: 'roles',
      width: '300px',
      render: (record) => {
        return record.length > 0
          ? record
            .map((item) => {
              return item.name;
            })
            .join('、')
          : '-';
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
      title: '状态',
      dataIndex: 'zhuangtai',
      render: (record) => {
        switch (record) {
          case 1:
            return <span>启用</span>;
          case 2:
            return <span>禁用</span>;
          default:
            return <span>-</span>;
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (record, item) => {
        return (
          <a
            style={{ color: '#009EFF' }}
            onClick={() => {
              onDetail('/user/detail', { id: item.id });
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
    user: state.user,
  };
}

export default connect(mapStateToProps)(Form.create()(List));
