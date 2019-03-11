import React from 'react';
import { connect } from 'dva';
import { Table, Form } from 'antd';

const List = (props) => {
  const {onView, ...tableProps } = props;

  const columns = [
    {
      title: '操作时间',
      dataIndex: 'shijian',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '操作内容',
      dataIndex: 'zhuangtai',
      render: (record) => {
        switch (record) {
          case 1:
            return <span>绑定</span>;
          case 2:
            return <span>解绑</span>;
          default:
            return <span>-</span>;
        }
      },
    },
    {
      title: '绑定人员姓名',
      dataIndex: 'xingming',
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
      title: '操作',
      dataIndex: 'operate',
      render: (record, item) => {
        return (
          <div>
            {item.leixing !== 4 && item.leixing !== 3 && item.tixing !== 0 && item.tixing !== 3 ? <a
              style={{ color: '#009EFF' }}
              onClick={() => {
                onView(item);
              }}
            >
              阈值详情
            </a> : '-'
            }
          </div>
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

export default connect(mapStateToProps)(Form.create()(List));
