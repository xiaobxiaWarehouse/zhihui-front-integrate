import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import queryString from 'query-string';
import { Button, Col, Form, Input, Row, Checkbox, Select, message} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

const edit = (props) => {
  const {
    dispatch,
    form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue,
    },
    user,
    location,
    app: {
      isFormChange,
    },
  } = props;

  const { detaiData, roleList } = user;
  const { search } = location;
  const query = queryString.parse(search);

  const formItemLayout = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 8,
    },
    style: {
    },
  };
  const formItemLayout2 = {
    labelCol: {
      span: 9,
    },
    wrapperCol: {
      span: 10,
    },
    style: {
    },
  };

  const bindzhuangtai = [
    {id: 1, name: '启用'},
    {id: 2, name: '禁用'},
  ];

  const save = (value) => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      let fields = getFieldsValue();
      const {
        roles,
        bianhao,
      } = fields;
      dispatch({
        type: 'user/bianjiUser',
        payload: {
          ...fields,
          roles,
          bianhao,
          id: Number(queryString.parse(search).id),
        },
        callback: () => {
          message.success('修改成功');
          dispatch(routerRedux.push({pathname: '/user/list'}));
        },
      });
    });
  };

  let rolesArray = [];
  rolesArray = detaiData.roles.map((k) => {
    return k.id;
  });

  const onBack = (type) => {
    if (isFormChange) {
      dispatch({
        type: 'app/changeModalVisible',
        payload: {
          modalVisible: true,
          type,
        },
      });
    } else if (type === 1) {
      dispatch(routerRedux.goBack());
    } else {
      dispatch(routerRedux.push({pathname: type}));
    }
  };

  return (
    <div className="content-inner">
      <div className="ant-form-item-add-borderLeft"><span className="ant-form-item-borderLefthight">用户信息</span></div>
      <Form>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="工号">
              {getFieldDecorator('gonghao', {
                initialValue: detaiData && detaiData.gonghao,
                rules: [
                  {required: true, message: '请输入工号'},
                ],
              })(<Input placeholder="请输入工号"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('xingming', {
                initialValue: detaiData && detaiData.xingming,
                rules: [
                  {required: true, message: '请输入姓名'},
                ],
              })(<Input placeholder="请输入姓名"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="手机号码">
              {getFieldDecorator('shouji', {
                initialValue: detaiData && detaiData.shouji,
                rules: [
                  {required: true, message: '请输入手机号码'},
                  {pattern: new RegExp(/^[1][3,4,5,7,8][0-9]{9}$/, 'g'), message: '请输入正确的手机号码'},
                ],
              })(<Input placeholder="请输入手机号码"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="岗位">
              {getFieldDecorator('gangwei', {
                initialValue: detaiData && detaiData.gangwei,
                rules: [
                  {required: true, message: '请输入岗位'},
                ],
              })(<Input placeholder="请输入岗位"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="用户状态">
              {getFieldDecorator('zhuangtai', {
                initialValue: detaiData && detaiData.zhuangtai,
                rules: [
                  {required: true, message: '请输入用户状态'},
                ],
              })(<Select placeholder="请输入用户状态">
                {
                  bindzhuangtai.map((item, index) => {
                    let zhuangtaiIndex = index;
                    return (
                      <Option key={zhuangtaiIndex} value={Number(item.id)}>{item.name}</Option>
                    );
                  })
                }
              </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 20px'}} >
          <Col span={24}>
            <FormItem {...formItemLayout2} label="角色">
              {getFieldDecorator('roles', {
                rules: [
                  { required: true, message: '请选择角色'},
                ],
                initialValue: rolesArray,
              })(<Checkbox.Group>
                {
                  roleList.map((item) => {
                    return <Checkbox style={{fontSize: 15}} key={item.id} value={Number(item.id)}>{item.name}</Checkbox>;
                  })
                }
              </Checkbox.Group>)}

            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem style={{textAlign: 'center', marginTop: 40}}>
              <Button type="primary" htmlType="submit" onClick={save}>保存</Button>
              <Button htmlType="submit" style={{marginLeft: 10}} onClick={() => { onBack(1); }}>返回</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    user: state.user,
  };
}

export default (connect(mapStateToProps)(Form.create({
  onValuesChange(props) {
    const {
      dispatch,
    } = props;
    dispatch({
      type: 'app/updataFormChange',
      payload: true,
    });
  },
})(edit)));
