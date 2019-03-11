import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import {Button, Modal, icon} from 'antd';
import {Layout} from 'components';

const CSS = Layout.styles;

const modal = (props) => {
  const {
    item = {},
    onOk,
    group,
    ...modalProps
  } = props;

  const modalOpts = {
    ...modalProps,
  };

  const text = () => {
    return (
      <div style={{fontSize: '14px', textAlign: 'center'}}>
        <div>您确认重置密码</div>
        <div>重置后密码为手机号后6位</div>
      </div>);
  };

  return (
    <Modal {...modalOpts} footer={null}>
      {text()}
      <div style={{textAlign: 'center', marginTop: '30px'}}>
        <Button style={{marginRight: '10px'}} onClick={() => { onOk(item); }} type="primary">确定</Button>
        <Button onClick={() => { modalOpts.onCancel(); }}>取消</Button>
      </div>
    </Modal>
  );
};

modal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
};

export default injectIntl(connect(({group}) => ({group}))(modal));
