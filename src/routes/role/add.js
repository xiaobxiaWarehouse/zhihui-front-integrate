import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Col, Form, Input, Row, Checkbox, message } from 'antd';
import { Layout } from 'components';

const CSS = Layout.styles;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
  style: {},
};

const Add = (props) => {
  const {
    dispatch,
    role,
    form: { getFieldDecorator, getFieldsValue, validateFields },
    app: { isFormChange },
  } = props;

  const { data, rolePriv, result } = role;

  const save = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      let fields = getFieldsValue();
      const children = rolePriv.map((item) => {
        return item.childrenValue;
      });
      let hebinchildren = [].concat(...children);

      dispatch({
        type: 'role/addRole',
        payload: {
          ...fields,
          privs: hebinchildren,
        },
        callback: () => {
          message.success('新增成功');
          dispatch(routerRedux.push({ pathname: '/role/list' }));
        },
      });
    });
  };

  const onCheckAllChange = (e, item) => {
    let checke = e.target.checked;
    let newDate;
    newDate = rolePriv.map((k) => {
      if (k.id === item.id) {
        k.childrenValue = checke
          ? item.children.map((j) => {
            return j.value;
          })
          : [];
        k.checked = checke;
      }
      return k;
    });
    dispatch({
      type: 'role/updateRolepriv',
      payload: newDate,
    });
    dispatch({
      type: 'app/updataFormChange',
      payload: true,
    });
  };

  const handleGroupChange = (value, item) => {
    let newData = rolePriv.map((k) => {
      if (k.id === item.id) {
        k.childrenValue = value;
        k.checked = value.length === item.children.length;
      }
      return k;
    });
    dispatch({
      type: 'role/updateRolepriv',
      payload: newData,
    });
    dispatch({
      type: 'app/updataFormChange',
      payload: true,
    });
  };

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
      dispatch(routerRedux.push({ pathname: type }));
    }
  };

  return (
    <div className="content-inner">
      <div className="ant-form-item-add-borderLeft"><span className="ant-form-item-borderLefthight">角色信息</span></div>
      <Form className="role-add-formitem">
        <Row style={{ padding: '0 20px' }}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="角色名称">
              {getFieldDecorator('name', {
                rules: [
                  {max: 20, message: '角色名称过长'},
                  {required: true, message: '请输入角色名称'},
                ],
              })(<Input placeholder="请输入角色名称"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ padding: '0 20px' }}>
          <Col span={12}>
            <FormItem {...formItemLayout} label="角色描述">
              {getFieldDecorator('description', {
                rules: [
                  {max: 20, message: '角色描述过长'},
                  {required: true, message: '请输入角色描述'},
                ],
              })(<Input placeholder="请输入角色描述"/>)}
            </FormItem>
          </Col>
        </Row>

        <div style={{ width: '100%', borderBottom: '1px solid #D8D8D8' }} />
        <div className="ant-form-item-borderLeft">
          <span className="ant-form-item-borderLefthight">权限设置</span>
        </div>
        <Row>
          <Col span={24}>
            <FormItem>
              {rolePriv &&
                rolePriv.map((item, index) => {
                  let dataIndex = index;
                  return (
                    <Row style={{ fontSize: 16, margin: 10 }} key={dataIndex}>
                      <Checkbox
                        onChange={(value) => {
                          onCheckAllChange(value, item);
                        }}
                        checked={item.checked}
                      >
                        {item.label}
                      </Checkbox>
                      {item.children.length > 0 && (
                        <Row>
                          <CheckboxGroup
                            style={{ paddingLeft: 20 }}
                            options={item.children}
                            value={item.childrenValue}
                            onChange={(value) => {
                              handleGroupChange(value, item);
                            }}
                          />
                        </Row>
                      )}
                    </Row>
                  );
                })}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ marginTop: 70 }}>
          <Col span={24}>
            <FormItem style={{ textAlign: 'center' }}>
              <Button type="primary" onClick={save}>
                保存
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  onBack(1);
                }}
              >
                返回
              </Button>
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
    role: state.role,
  };
}

export default connect(mapStateToProps)(Form.create({
  onValuesChange(props) {
    const { dispatch } = props;
    dispatch({
      type: 'app/updataFormChange',
      payload: true,
    });
  },
})(Add));
