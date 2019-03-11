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
  const { suoshuJt, detaiData } = group;

  const modalOpts = {
    ...modalProps,
  };

  const text = () => {
    return (<div style={{fontSize: '15px'}}>所属集团: {
      detaiData.suoshuJt && detaiData.suoshuJt.length > 0 ? detaiData.suoshuJt.map((items, itemIndex) => {
        return (
          <span key={items.id} value={Number(items.id)}>{
            (detaiData.suoshuJt.length - 1) === itemIndex ? items.mingcheng : `${items.mingcheng}，`}</span>
        );
      }) : '所属集团为空'
    }</div>);
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
