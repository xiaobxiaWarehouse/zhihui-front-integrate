import React from 'react';
import { connect } from 'dva';
import { Table, Form } from 'antd';

const List = (props) => {
  const { onView, ...tableProps } = props;

  const columns = [
    {
      title: '设备编号',
      dataIndex: 'bianhao',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '在用状态',
      dataIndex: 'zy',
      render: (record) => {
        switch (record) {
          case 1:
            return <span>是</span>;
          case 2:
            return <span>否</span>;
          default:
            return <span>-</span>;
        }
      },
    },
    {
      title: '数据更新时间',
      dataIndex: 'latest',
      render: (record) => {
        return record || '-';
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
      title: '操作',
      render: (record, item) => {
        return (
          <div className={CSS.action}>
            {/* <Permissions all="sys:user:resetPwd"> */}
            <div className="a-link-operation">
              <a
                onClick={() => {
                  onView(item);
                }}
                style={{ color: '#009EFF' }}
              >
                详情
              </a>
            </div>
            {/* </Permissions> */}
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
    monitorZncd: state.monitorZncd,
  };
}

export default connect(mapStateToProps)(Form.create()(List));
