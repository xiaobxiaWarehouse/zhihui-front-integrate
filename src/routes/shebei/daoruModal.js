import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import {
  Button,
  Modal,
  Col,
  Row,
  Upload,
  Form,
  Select,
  Icon,
  message,
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { Dragger } = Upload;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
  style: {},
};

const bindleixing = [
  { id: 1, name: '智能床' },
  { id: 2, name: '智能床垫' },
  { id: 3, name: '多体征设备' },
];

const daoruModal = (props) => {
  const {
    dispatch,
    item = {},
    onOk,
    form: { getFieldDecorator, validateFields, getFieldsValue },
    fileList: fileUrl,
    ...daoruModalProps
  } = props;

  const modalOpts = {
    ...daoruModalProps,
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

  const onChange = (info) => {
    const { fileList } = info;
    dispatch({
      type: 'shebei/updateFileList',
      payload: fileList,
    });
  };

  const beforeUpload = (file, filelist) => {
    return false;
  };

  const text = () => {
    return (
      <div>
        <Form>
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label="设备类型">
                {getFieldDecorator('leixing', {
                  rules: [{ required: true, message: '请输入设备类型' }],
                })(<Select
                  style={{ width: 374 }}
                  allowClear
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  placeholder="请选择设备类型"
                >
                  {bindleixing.map((k) => {
                      return (
                        <Option key={k.id} value={Number(k.id)}>
                          {k.name}
                        </Option>
                      );
                    })}
                </Select>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem {...formItemLayout} label="导入文件">
                {getFieldDecorator('wenjian', {
                  rules: [{ required: true, message: '请选择导入文件' }],
                })(<Upload
                  accept=".txt, .xls, .xlsx, .xlsm"
                  className="dropbox"
                  beforeUpload={beforeUpload}
                  onChange={onChange}
                  name="files"
                >
                  {
                    fileUrl.length < 1 && <Button style={{ width: 374 }}>
                      <Icon type="upload" /> 上传文件
                    </Button>
                  }
                </Upload>)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  };

  return (
    <Modal {...modalOpts} footer={null}>
      {text()}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button
          style={{ marginRight: '10px' }}
          onClick={() => {
            onOkHandler();
          }}
          type="primary"
        >
          保存
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

daoruModal.propTypes = {
  item: PropTypes.object,
  onOk: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    app: state.app,
    shebei: state.shebei,
  };
}

export default connect(mapStateToProps)(Form.create()(daoruModal));
