import React from 'react';
import { connect } from 'dva';
import { Table, Form } from 'antd';

const List = (props) => {
  const {
    edit, onDelete, onEditItem, shujutiaozhuan, shishitiaozhuan, ...tableProps
  } = props;

  const onDetail = (path, params) => {
    onEditItem(path, params);
  };

  const Change = (item) => {
    edit(item);
  };

  const Delete = (item) => {
    onDelete(item);
  };

  const shujuDetail = (item) => {
    shujutiaozhuan(item);
  };

  const shishishujuDetail = (item) => {
    shishitiaozhuan(item);
  };

  const columns = [
    {
      title: '设备编号',
      dataIndex: 'bianhao',
      width: 300,
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '绑定状态',
      dataIndex: 'zhuangtai',
      width: 300,
      render: (record) => {
        switch (record) {
          case 1:
            return <span>已绑定</span>;
          case 2:
            return <span>未绑定</span>;
          default:
            return <span>-</span>;
        }
      },
    },
    {
      title: '设备类型',
      dataIndex: 'leixing',
      width: 300,
      render: (record) => {
        switch (record) {
          case 1:
            return <span>智能床</span>;
          case 2:
            return <span>智能床垫</span>;
          case 3:
            return <span>多体征设备</span>;
          case 4:
            return <span>智汇鞋</span>;
          default:
            return <span>-</span>;
        }
      },
    },
    {
      title: '绑定人员姓名',
      dataIndex: 'xingming',
      width: 300,
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '所属机构',
      width: 300,
      dataIndex: 'jigouMc',
      render: (record) => {
        return record || '-';
      },
    },
    {
      title: '操作',
      width: 500,
      render: (record, item) => {
        return (
          item.zhuangtai === 1 ? <div>
            <a
              onClick={() => {
                onDetail('/shebei/bangding', {
                  bianhao: item.bianhao,
                  leixing: item.leixing,
                });
              }}
              style={{ color: '#009EFF' }}
            >
              绑定记录
            </a>
            <a
              onClick={() => {
                shujuDetail(item, record);
              }}
              style={{ marginLeft: 10, color: '#009EFF' }}
            >
              数据记录
            </a>
            {
              // item.leixing === 1 || item.leixing === 2 ?  <a
              //   onClick={() => {
              //     onDetail('/shebei/realtime', {
              //       leixing: item.leixing,
              //       bianhao: item.bianhao,
              //     });
              //   }}
              //   style={{ marginLeft: 10, color: '#009EFF' }}
              // >
              //   实时数据
              // </a> : ''
            }
          </div> : <div>
            <a
              onClick={() => {
                onDetail('/shebei/bangding', {
                  bianhao: item.bianhao,
                  leixing: item.leixing,
                });
              }}
              style={{ color: '#009EFF' }}
            >
              绑定记录
            </a>
            <a
              onClick={() => {
                shujuDetail(item, record);
              }}
              style={{ marginLeft: 10, color: '#009EFF' }}
            >
              数据记录
            </a>
            {
              // item.leixing === 1 || item.leixing === 2 ?  <a
              //   onClick={() => {
              //     onDetail('/shebei/realtime', {
              //       leixing: item.leixing,
              //       bianhao: item.bianhao,
              //     });
              //   }}
              //   style={{ marginLeft: 10, color: '#009EFF' }}
              // >
              //   实时数据
              // </a> : ''
            }
            <a
              onClick={() => {
                Change(item, record);
              }}
              style={{ marginLeft: 10, color: '#009EFF' }}
            >
              修改
            </a>
            <a
              onClick={() => {
                Delete(item, record);
              }}
              style={{ marginLeft: 10, color: '#009EFF' }}
            >
              删除
            </a>
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
