import React from 'react';
import { connect } from 'dva';
import { Table, Form } from 'antd';
import styles from './index.less';

const List = (props) => {
  const {
    onEditItem, jumpLink, showModalProps, onDelete, ...tableProps
  } = props;

  const showModals = (record, params) => {
    showModalProps(record, params);
  };
  const onDetail = (path, params) => {
    onEditItem(path, params);
  };

  const columns = [
    {
      title: '机构名称',
      dataIndex: 'mingcheng',
      width: 120,
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '地址',
      dataIndex: 'dizhi',
      width: 250,
      render: (record, item) => {
        return <span className={styles.dizhi}>{item.sheng}{item.shi}{item.qu}{item.dizhi}</span> || '-';
      },
    },
    {
      title: '联系人',
      dataIndex: 'lianxirenXm',
      width: 100,
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '联系电话',
      dataIndex: 'lianxirenDh',
      width: 150,
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '是否为集团',
      dataIndex: 'leixing',
      width: 100,
      render: (record) => {
        switch (record) {
          case 1:
            return <span>否</span>;
          case 2:
            return <span>是</span>;
          default:
            return <span>-</span>;
        }
      },
    },
    {
      title: '所属集团',
      dataIndex: 'suoshuJt',
      width: 100,
      render: (record, item) => {
        if (item.leixing === 1) {
          return (
            <a
              style={{ color: '#009EFF' }}
              onClick={() => {
                showModals(record, { id: item.id });
              }}
            >
              详情
            </a>
          );
        } else {
          return <span>-</span>;
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 100,
      render: (record, item) => {
        return (
          <div>
            <a
              style={{ color: '#009EFF', marginRight: 10 }}
              onClick={() => {
                onDetail('/group/details', { id: item.id });
              }}
            >
              详情
            </a>
            <a
              style={{ color: '#009EFF' }}
              onClick={() => {
                onDelete(item);
              }}
            >
              删除
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <div className="group_List">
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
    group: state.group,
  };
}

export default connect(mapStateToProps)(Form.create()(List));
