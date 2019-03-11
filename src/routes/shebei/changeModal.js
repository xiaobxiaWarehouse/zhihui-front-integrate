import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {injectIntl} from 'react-intl';
import intl from 'react-intl-universal';
import {Button, Modal, Col, Row, Input, Form} from 'antd';
import {Layout} from 'components';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
  style: {
  },
};

const bindleixing = [
  {id: 1, name: '智能床'},
  {id: 2, name: '智能床垫'},
  {id: 3, name: '多体征'},
];

const changeModal = (props) => {
  const {
    onOk,
    currItem,
    form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue,
    },
    shebei,
    ...changeModalProps
  } = props;

  const { dataSource } = shebei;

  const modalOpts = {
    ...changeModalProps,
  };

  const onOkHandler = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const fields = getFieldsValue();
      onOk(fields);
    });
  };

  const shebeileixing = () => {
    if (currItem.leixing === 1) {
      return <span>智能床</span>;
    } else if (currItem.leixing === 2) {
      return <span>智能床垫</span>;
    } else if (currItem.leixing === 3) {
      return <span>多体征设备</span>;
    }
  };

  const text = () => {
    return (
      <div>
        <Row align="middle">
          <Col span={24}>
            <Form layout="inline">
              <FormItem label="设备类型">
                { shebeileixing(currItem.leixing) }
              </FormItem>
            </Form>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={24}>
            <Form layout="inline">
              <FormItem label="设备编号">
                {getFieldDecorator('bianhao', {
                  initialValue: currItem && currItem.bianhao,
                  rules: [],
                })(<Input style={{width: 350}} placeholder="请输入编号" />)}
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <Modal {...modalOpts} footer={null}>
      {text()}
      <div style={{textAlign: 'center', marginTop: '30px'}}>
        <Button style={{marginRight: '10px'}} onClick={() => { onOkHandler(); }} type="primary">保存</Button>
        <Button onClick={() => { modalOpts.onCancel(); }}>取消</Button>
      </div>
    </Modal>
  );
};

changeModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    app: state.app,
    shebei: state.shebei,
  };
}

export default (connect(mapStateToProps)(Form.create()(changeModal)));
