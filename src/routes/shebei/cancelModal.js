
import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Button, Modal, DatePicker, Row, Col, Select, message } from 'antd';
import { getBeforeDay } from 'utils';
import CancelList from './cancelList';
import CanceldeleteModal from './canceldeleteModal';

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
  style: {},
};

const shebeiLeixing = [
  { id: 1, name: '智能床'},
  { id: 2, name: '智能床垫'},
  { id: 3, name: '多体征设备'},
  { id: -1, name: '全部' },
];

const modal = (props) => {
  const {
    dispatch,
    daoruList,
    pagination,
    canceldeleteModalVisible,
    currItem,
    currentPage,
    item = {},
    form: {
      getFieldDecorator,
      getFieldsValue,
      validateFields,
      setFieldsValue,
    },
    onOk,
    prev,
    onChange,
    ...zncModalProps
  } = props;
  const modalOpts = {
    ...zncModalProps,
  };
  const listProps = {
    dataSource: daoruList,
    pagination: {
      currentPage,
    },
    onCancel(datalist) {
      dispatch({
        type: 'shebei/showcanceldeleteModal',
        payload: {
          currItem: datalist,
        },
      });
    },
    onChange(page) {
      dispatch({
        type: 'shebei/updatecurrentPage',
        payload: page.current,
      });
    },
  };
  const onQuery = () => {
    let fields = getFieldsValue();
    const {
      leixing,
    } = fields;
    if (!leixing) {
      message.error('请选择设备类型');
      return;
    }
    dispatch({
      type: 'shebei/getdaoruShebei',
      payload: {
        leixing,
        zhuangtai: 1,
      },
    });
  };
  // const onRest = () => {
  //   dispatch({
  //     type: 'shebei/getdaoruShebei',
  //     payload: {
  //       leixing: -1,
  //       zhuangtai: 1,
  //     },
  //   });
  //   setFieldsValue({
  //     leixing: undefined,
  //   });
  // };
  const canceldeleteModalProps = {
    width: 350,
    visible: canceldeleteModalVisible,
    wrapClassName: 'vertical-center-modal',
    title: '操作提示',
    onOk() {
      dispatch({
        type: 'shebei/deleteDaoruList',
        payload: {
          daoruId: currItem.id,
        },
        callback: () => {
          message.success('撤销成功');
          dispatch({
            type: 'shebei/getdaoruShebei',
            payload: {
              leixing: -1,
              zhuangtai: 1,
            },
          });
        },
      });
      dispatch({
        type: 'shebei/hidecanceldeleteModal',
      });
    },
    onCancel() {
      dispatch({
        type: 'shebei/hidecanceldeleteModal',
      });
    },
  };
  const text = () => {
    return (
      <Form>
        <Row>
          <Col className={CSS.col} span={16}>
            <FormItem {...formItemLayout} label="设备类型">
              {getFieldDecorator('leixing', {
                rules: [
                  {required: true, message: '请选择设备类型'},
                ],
              })(<Select
                allowClear
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder="请选择设备类型"
              >
                {shebeiLeixing.map((data) => {
                    return (
                      <Option key={data.id} value={String(data.id)}>
                        {data.name}
                      </Option>
                    );
                  })}
              </Select>)}
            </FormItem>
          </Col>
          <Col span={6} style={{ textAlign: 'left' }}>
            <FormItem>
              <Button
                onClick={() => {
                  onQuery();
                }}
                type="primary"
                style={{ marginRight: 10 }}
              >
                查询
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <Modal {...modalOpts} footer={null}>
      {text()}
      <CancelList {...listProps}/>
      {canceldeleteModalVisible && <CanceldeleteModal {...canceldeleteModalProps} />}
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    shebei: state.shebei,
  };
}

export default connect(mapStateToProps)(Form.create()(modal));
