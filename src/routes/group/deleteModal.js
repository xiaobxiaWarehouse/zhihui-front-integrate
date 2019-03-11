import React from 'react';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { Button, Modal } from 'antd';
import { Layout } from 'components';
import styles from './index.less';

const CSS = Layout.styles;

const deleteModal = (props) => {
  const {
    onOk, currItem, modalType, ...deleteModalProps
  } = props;

  const modalOpts = {
    ...deleteModalProps,
  };

  return (
    <Modal {...modalOpts} footer={null}>
      <div style={{ textAlign: 'center', fontSize: 14, fontWeight: '500' }}><div className={styles.delete}>!</div>你确认要删除吗?</div>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button
          onClick={() => {
            onOk();
          }}
          style={{ marginRight: '15px' }}
          type="primary"
        >
          确定
        </Button>
        <Button
          onClick={() => {
            modalOpts.onCancel();
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
    shebei: state.shebei,
    app: state.app,
  };
}

export default injectIntl(connect(mapStateToProps)(deleteModal));
