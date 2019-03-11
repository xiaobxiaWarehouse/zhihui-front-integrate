import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import { Button, Col, Form, Input, Row, Checkbox, message } from 'antd';
import Modal from './Modal';
import styles from './index.less';

const FormItem = Form.Item;
const detail = (props) => {
  const {
    dispatch, user, location, form: { getFieldDecorator },
  } = props;
  const { detaiData, modalVisible, roleList } = user;
  const { search } = location;
  const query = queryString.parse(search);

  const formItemLayout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 8,
    },
    style: {},
  };
  const formItemLayout2 = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 10,
    },
    style: {},
  };

  const bindzhuangtai = (type) => {
    if (type === 1) {
      return '启用';
    } else if (type === 2) {
      return '禁用';
    }
  };

  const bianji = () => {
    dispatch(routerRedux.push({
      pathname: '/user/edit',
      search: queryString.stringify({
        ...query,
      }),
    }));
  };

  const showModal = () => {
    dispatch({
      type: 'user/showModal',
    });
  };

  const modalProps = {
    width: 350,
    visible: modalVisible,
    wrapClassName: 'vertical-center-modal',
    title: '操作提示',
    onOk() {
      dispatch({
        type: 'user/hideModal',
      });
      dispatch({
        type: 'user/chongzhimima',
        payload: {
          id: Number(queryString.parse(search).id),
        },
        callback: () => {
          message.success('重置成功');
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'user/hideModal',
      });
    },
  };

  let rolesArray = detaiData
    ? detaiData.roles.map((k) => {
      return k.id;
    })
    : [];

  return (
    <div className="content-inner">
      <Row>
        <Col span={12}>
          <Button
            onClick={() => {
              dispatch(routerRedux.goBack());
            }}
          >
            返回
          </Button>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            onClick={() => {
              showModal();
            }}
            style={{ marginRight: 10 }}
          >
            重置密码
          </Button>
          <Button
            type="primary"
            onClick={() => {
              bianji();
            }}
          >
            编辑
          </Button>
        </Col>
      </Row>
      <div className="ant-form-item-borderLeft"><span className="ant-form-item-borderLefthight">用户信息</span></div>
      <Form>
        <Row style={{ padding: '0 20px' }}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="工号" style={{ fontSize: 15 }}>
              {detaiData && detaiData.gonghao}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ padding: '0 20px' }}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="姓名" style={{ fontSize: 15 }}>
              {detaiData && detaiData.xingming}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ padding: '0 20px' }}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="手机号码"
              style={{ fontSize: 15 }}
            >
              {detaiData && detaiData.shouji}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ padding: '0 20px' }}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="岗位" style={{ fontSize: 15 }}>
              {detaiData && detaiData.gangwei}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ padding: '0 20px' }}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="用户状态"
              style={{ fontSize: 15 }}
            >
              {detaiData &&
                detaiData.zhuangtai &&
                bindzhuangtai(detaiData.zhuangtai)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ padding: '0 20px' }}>
          <Col span={24}>
            <FormItem
              {...formItemLayout2}
              label="角色"
              style={{ fontSize: 15 }}
            >
              {getFieldDecorator('roles', {
                initialValue: rolesArray,
                rules: [],
              })(<Checkbox.Group className={styles.disabled}>
                {roleList.map((item) => {
                    return (
                      <Checkbox
                        style={{ fontSize: 15 }}
                        key={item.id}
                        value={Number(item.id)}
                      >
                        {item.name}
                      </Checkbox>
                    );
                  })}
              </Checkbox.Group>)}
            </FormItem>
          </Col>
        </Row>
      </Form>
      {modalVisible && <Modal {...modalProps} />}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
  };
}

export default connect(mapStateToProps)(Form.create()(detail));
