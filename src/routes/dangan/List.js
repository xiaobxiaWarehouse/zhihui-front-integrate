import React from 'react';
import { connect } from 'dva';
import { Table, Form } from 'antd';

const bainhaoColor = {color: '#009EFF'};

const List = (props) => {
  const {
    onDetail, goDetail, jumpLink, ...tableProps
  } = props;

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
      title: '入院时间',
      dataIndex: 'kaishiSj',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '智能床',
      dataIndex: 'chuang',
      render: (record) => {
        return <span style={bainhaoColor}>{record}</span> || '-';
      },
    },
    {
      title: '智能床垫',
      dataIndex: 'chuangdian',
      render: (record) => {
        return <span style={bainhaoColor}>{record}</span> || '-';
      },
    },
    {
      title: '多体征设备',
      dataIndex: 'duotizheng',
      render: (record) => {
        return <span style={bainhaoColor}>{record}</span> || '-';
      },
    },
    {
      title: '智汇鞋',
      dataIndex: 'xie',
      render: (record) => {
        return <span style={bainhaoColor}>{record}</span> || '-';
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
      title: '状态',
      dataIndex: 'zhuangtai',
      render: (record) => {
        switch (record) {
          case 4:
            return <span>在院</span>;
          case 5:
            return <span>离院</span>;
          default:
            return <span>-</span>;
        }
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
                  onDetail('/dangan/detail', {
                    id: item.suoyin,
                    jigou: item.jigou,
                  });
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
    dangan: state.dangan,
  };
}

export default connect(mapStateToProps)(Form.create()(List));
