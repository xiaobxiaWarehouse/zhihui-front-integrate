import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import { Button, Col, Form, Input, Row, Cascader, Select, message, Checkbox} from 'antd';
import {cityList, getCityName} from 'utils';
import GroupModal from './groupModal';

const FormItem = Form.Item;
// const InputGroup = Input.Group;
const { Option } = Select;
const Addjigou = (props) => {
  const {
    dispatch,
    group,
    form: {
      getFieldDecorator,
      getFieldsValue,
      validateFields,
    },
    app: {
      isFormChange,
    },
  } = props;
  const {
    selectedRowKeys,
    jigouList,
    jituanModalVisible,
    confirmRowKeys,
  } = group;

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
  const formItemLayout1 = {
    labelCol: {
      span: 0,
    },
    wrapperCol: {
      span: 24,
    },
    style: {
    },
  };
  const bindLeixin = [
    {id: 1, name: '机构'},
    {id: 2, name: '集团'},
  ];

  const bindSys = [
    {id: 1, name: '智汇设备监测系统'},
    {id: 2, name: '智汇养老照护系统'},
  ];

  let selectGroupList = jigouList.filter((item, index) => {
    return confirmRowKeys.indexOf(index) > -1;
  });

  const save = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      let fields = getFieldsValue();
      const {
        sheng,
        sys,
      } = fields;
      let sysValue;
      sysValue = sys.map((k) => {
        return k;
      });
      dispatch({
        type: 'group/addJigou',
        payload: {
          ...fields,
          shengBm: sheng[0],
          shiBm: sheng[1],
          quBm: sheng[2],
          sheng: getCityName(sheng[0]),
          shi: getCityName(sheng[1]),
          qu: getCityName(sheng[2]),
          suoshuJt: selectGroupList.map((item) => {
            return item.id;
          }),
          sys: sysValue.map((item) => {
            return `${item}`;
          }).join(';'),
        },
        callback: () => {
          message.success('新增成功');
          dispatch(routerRedux.push({pathname: '/group/list'}));
        },
      });
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
      dispatch(routerRedux.push({pathname: type}));
    }
  };

  const modalProps = {
    selectedRowKeys,
    jigouList,
    width: 600,
    visible: jituanModalVisible,
    wrapClassName: 'vertical-center-modal',
    title: '操作提示',
    onOk() {
      dispatch({
        type: 'group/hidejituanModal',
      });
      dispatch({
        type: 'group/updateConfirmRowKeys',
        payload: selectedRowKeys,
      });
    },
    onCancel() {
      dispatch({
        type: 'group/hidejituanModal',
      });
      dispatch({
        type: 'group/updateSelectedRowKeys',
        payload: confirmRowKeys,
      });
    },
  };

  const showGroupModal = () => {
    dispatch({
      type: 'group/showjituanModal',
    });
  };

  return (
    <div className="content-inner">
      <div className="ant-form-item-add-borderLeft"><span className="ant-form-item-borderLefthight">{Number(getFieldsValue().leixing) === 1 ? '机构信息' : '集团信息'}</span></div>
      <Form>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="新建类型">
              {getFieldDecorator('leixing', {
                initialValue: 1,
                rules: [
                  {required: true, message: '请选择新建类型'},
                ],
              })(<Select getPopupContainer={triggerNode => triggerNode.parentNode} allowClear placeholder="请输入新建类型">
                {
                  bindLeixin.map((item) => {
                    return (
                      <Option key={item.id} value={Number(item.id)}>{item.name}</Option>
                    );
                  })
                }
              </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label={Number(getFieldsValue().leixing) === 1 ? '机构名称' : '集团名称'}>
              {getFieldDecorator('mingcheng', {
                rules: [
                  {required: true, message: '请输入名称'},
                ],
              })(<Input placeholder={Number(getFieldsValue().leixing) === 1 ? '请输入机构名称' : '请输入集团名称'}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label={Number(getFieldsValue().leixing) === 1 ? '机构地址' : '集团地址'}>
              {getFieldDecorator('sheng', {
                rules: [
                  {required: true, message: '请选择省市区'},
                ],
              })(<Cascader placeholder="请选择省市区" options={cityList}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <Col span={9} />
            <Col span={8}>
              <FormItem {...formItemLayout1}>
                {getFieldDecorator('dizhi', {
                  rules: [],
                })(<Input placeholder="请输入街道"/>)}
              </FormItem>
            </Col>
          </Col>
        </Row>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="联系人">
              {getFieldDecorator('lianxirenXm', {
                rules: [
                  {required: true, message: '请输入联系人'},
                ],
              })(<Input placeholder="请输入联系人"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="联系人电话">
              {getFieldDecorator('lianxirenDh', {
                rules: [
                  {required: true, message: '请输入联系人电话'},
                  {pattern: new RegExp(/^[1][3,4,5,7,8][0-9]{9}$/, 'g'), message: '请输入正确的手机号码'},
                ],
              })(<Input placeholder="请输入联系人电话"/>)}
            </FormItem>
          </Col>
        </Row>
        {
          Number(getFieldsValue().leixing) === 1 && <Row style={{padding: '0 20px'}}>
            <Col span={24}>
              <FormItem {...formItemLayout} label="所属集团">
                <Button onClick={() => { showGroupModal(); }}>增加所属集团</Button>
                {
                  selectGroupList.map((item) => {
                    return <div style={{fontSize: 15, color: '#323232'}} key={item.id}>{item.mingcheng}</div>;
                  })
                }
              </FormItem>
            </Col>
          </Row>
        }
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label="软件版本">
              {getFieldDecorator('sys', {
                 rules: [
                  {required: true, message: '请选择软件版本'},
                ],
              })(<Checkbox.Group mode="multiple" getPopupContainer={triggerNode => triggerNode.parentNode} allowClear placeholder="请选择软件版本">
                {
                  bindSys.map((item, index) => {
                    let sysIndex = index;
                    return (
                      <Checkbox value={String(item.id)} key={sysIndex} >{item.name}</Checkbox>
                    );
                  })
                }
              </Checkbox.Group>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem style={{textAlign: 'center', marginTop: 30}}>
              <Button type="primary" htmlType="submit" onClick={save}>保存</Button>
              <Button htmlType="submit" style={{marginLeft: 10}} onClick={() => { onBack(1); }}>返回</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      {
        jituanModalVisible && <GroupModal {...modalProps} />
      }
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    group: state.group,
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
})(Addjigou)));
