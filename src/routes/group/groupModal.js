import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { Button, Modal, icon, Table } from 'antd';
import { Layout } from 'components';

const CSS = Layout.styles;

const modal = (props) => {
  const {
    dispatch,
    selectedRowKeys,
    jigouList,
    item = {},
    onOk,
    group,
    detaiData,
    ...modalProps
  } = props;

  const columns = [
    {
      title: detaiData && detaiData.leixing === 2 ? '机构名称' : '集团名称',
      dataIndex: 'mingcheng',
    },
  ];

  const rowSelection = {
    onChange: (key) => {
      dispatch({
        type: 'group/updateSelectedRowKeys',
        payload: key,
      });
    },
    selectedRowKeys,
  };

  return (
    <Modal className={CSS.groupModal} {...modalProps} footer={null}>
      <Table
        pagination={false}
        dataSource={jigouList}
        bordered
        scroll={{ x: 500 }}
        columns={columns}
        simple
        rowSelection={rowSelection}
        rowKey={(record, index) => index}
      />
      <div
        style={{
          textAlign: 'center',
          marginTop: 20,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
        }}
      >
        <Button
          style={{ marginRight: 10, marginBottom: 10 }}
          onClick={() => {
            onOk();
          }}
          type="primary"
        >
          确定
        </Button>
        <Button
          style={{ marginBottom: 10 }}
          onClick={() => {
            modalProps.onCancel();
          }}
        >
          取消
        </Button>
      </div>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    group: state.group,
  };
}
export default injectIntl(connect(mapStateToProps)(modal));
