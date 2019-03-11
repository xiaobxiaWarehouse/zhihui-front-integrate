import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { Modal, Form } from 'antd';
import { Layout } from 'components';
import {config} from 'utils';
import Image from './Image';

const CSS = Layout.styles;
const {PROJECT} = config;

const modal = (props) => {
  const { currentImg, ...modalProps } = props;

  const text = () => {
    return (
      <div
        style={{
          minHeight: 700,
          display: 'flex',
          margin: '0 auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image imageUrl={`${PROJECT}/oss/${currentImg}?x-oss-process=image/resize,m_mfit,w_${parseInt(document.body.offsetWidth * 0.7, 10)},h_700/auto-orient,1`} />
      </div>
    );
  };

  return (
    <Modal {...modalProps} footer={null}>
      {text()}
    </Modal>
  );
};

modal.propTypes = {
  item: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    ruyuan: state.ruyuan,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(modal)));
