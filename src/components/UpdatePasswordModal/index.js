import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button } from 'antd';
import { injectIntl } from 'react-intl';
import intl from 'react-intl-universal';
import styles from './index.less';

const FormItem = Form.Item;

const UpdatePasswordModal = (props) => {
  let {
    form: { getFieldDecorator, getFieldValue, validateFields },
    onOk,
    onCancel,
    visible,
  } = props;
  let confirmDirty = false;
  let handleCancel = () => {
    onCancel();
  };
  let handleOk = () => {
    validateFields((err, values) => {
      if (!err) {
        let payload = {
          oldPwd: values.oldPassword,
          newPwd: values.password,
        };
        onOk(payload);
      }
    });
  };
  let handleConfirmBlur = (e) => {
    const { value } = e.target;
    confirmDirty = confirmDirty || !!value;
  };
  let checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  };
  let checkConfirm = (rule, value, callback) => {
    if (value && confirmDirty) {
      validateFields(['confirm'], { force: true });
    }
    callback();
  };

  return (
    <Modal
      footer={null}
      visible={visible}
      title={intl.get('Login.resetPassword')}
      onCancel={handleCancel}
    >
      <Form>
        <FormItem hasFeedback label="请输入旧密码">
          {getFieldDecorator('oldPassword', {
            rules: [{ required: true, message: '请输入旧密码' }],
          })(<Input size="large" type="password" placeholder="请输入旧密码" />)}
        </FormItem>
        <FormItem hasFeedback label="请输入密码">
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码' },
              { pattern: /^[A-Za-z0-9]{6,20}$/, message: '密码应为6-20个字符' },
              { validator: checkConfirm },
            ],
          })(<Input size="large" type="password" placeholder="请输入密码" />)}
        </FormItem>
        <FormItem hasFeedback label="请再次输入新密码">
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: '请再次输入新密码' },
              { validator: checkPassword },
            ],
          })(<Input
            size="large"
            type="password"
            onBlur={handleConfirmBlur}
            placeholder="请再次输入新密码"
          />)}
        </FormItem>
      </Form>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button
          style={{ marginRight: '10px' }}
          onClick={() => {
            handleOk();
          }}
          type="primary"
        >
          保存
        </Button>
        <Button
          onClick={() => {
            handleCancel();
          }}
        >
          返回
        </Button>
      </div>
    </Modal>
  );
};

UpdatePasswordModal.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  updatePassword: PropTypes.func,
};

export default injectIntl(Form.create()(UpdatePasswordModal));
