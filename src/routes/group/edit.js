import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import queryString from 'query-string';
import { Button, Col, Form, Input, Row, Cascader, Select, message, Checkbox} from 'antd';
import {cityList, getCityName} from 'utils';
import styles from './index.less';
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
      filter,
    },
    location,
    app: {
      isFormChange,
    },
  } = props;
  const { search } = location;
  const {
    selectedRowKeys,
    detaiData,
    jigouList,
    confirmRowKeys,
    jituanModalVisible,
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

  const bindSys = [
    {id: 1, name: '智汇设备监测系统'},
    {id: 2, name: '智汇养老照护系统'},
  ];

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
        suoshuJt,
        xiashuJg,
        sys,
        dizhi,
      } = fields;
      let sysValue;
      sysValue = sys.map((k) => {
        return k;
      });
      dispatch({
        type: 'group/bianjiJigou',
        payload: {
          ...fields,
          dizhi: (dizhi && dizhi.trim()) || undefined,
          leixing: detaiData.leixing,
          shengBm: sheng[0] || undefined,
          shiBm: sheng[1] || undefined,
          quBm: sheng[2] || undefined,
          sheng: getCityName(sheng[0]),
          shi: getCityName(sheng[1]),
          qu: getCityName(sheng[2]),
          suoshuJt: detaiData.leixing === 1 ? selectGroupList.map((item) => {
            return item.id;
          }) : [],
          xiashuJg: detaiData.leixing === 2 ? selectGroupList.map((item) => {
            return item.id;
          }) : [],
          id: Number(queryString.parse(search).id),
          sys: sysValue.map((item) => {
            return `${item}`;
          }).join(';'),
        },
        callback: () => {
          message.success('修改成功');
          dispatch(routerRedux.push({pathname: '/group/list'}));
        },
      });
    });
  };

  const modalProps = {
    selectedRowKeys,
    jigouList,
    detaiData,
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

  let shengArray = [];
  if (detaiData) {
    shengArray = [detaiData.shengBm, detaiData.shiBm, detaiData.quBm];
  }

  let suoshuJtArray = [];
  if (detaiData && detaiData.suoshuJt) {
    suoshuJtArray = detaiData.suoshuJt.map((k) => {
      return k.id;
    });
  }

  let xiashuJgArray = [];
  if (detaiData && detaiData.xiashuJg) {
    xiashuJgArray = detaiData.xiashuJg.map((k) => {
      return k.id;
    });
  }

  let sysArray = [];
  if (detaiData && detaiData.sys) {
    sysArray = detaiData.sys.split(';');
  }
  return (
    <div className="content-inner">
      <div className="ant-form-item-add-borderLeft"><span className="ant-form-item-borderLefthight">{Number(detaiData.leixing) === 1 ? '机构信息' : '集团信息'}</span></div>
      <Form>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label={Number(detaiData.leixing) === 1 ? '机构名称' : '集团名称'}>
              {getFieldDecorator('mingcheng', {
                initialValue: detaiData && detaiData.mingcheng,
                rules: [
                  {required: true, message: '请输入名称'},
                ],
              })(<Input placeholder={Number(detaiData.leixing) === 1 ? '请输入机构名称' : '请输入集团名称'}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row style={{padding: '0 20px'}}>
          <Col span={24}>
            <FormItem {...formItemLayout} label={Number(detaiData.leixing) === 1 ? '机构地址' : '集团地址'}>
              {getFieldDecorator('sheng', {
                initialValue: shengArray,
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
                  initialValue: detaiData && detaiData.dizhi,
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
                initialValue: detaiData && detaiData.lianxirenXm,
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
                initialValue: detaiData && detaiData.lianxirenDh,
                rules: [
                  {required: true, message: '请输入联系人电话'},
                  {pattern: new RegExp(/^[1][3,4,5,7,8][0-9]{9}$/, 'g'), message: '请输入正确的手机号码'},
                ],
              })(<Input placeholder="请输入联系人电话"/>)}
            </FormItem>
          </Col>
        </Row>
        {
          Number(detaiData.leixing) === 1 && <Row style={{padding: '0 20px'}}>
            <Col span={24}>
              <FormItem {...formItemLayout} label="所属集团">
                <Button onClick={() => { showGroupModal(); }}>修改所属集团</Button>
                {
                  selectGroupList.map((item) => {
                    return <div style={{fontSize: 15, color: '#323232'}} key={item.id}>{item.mingcheng}</div>;
                  })
                }
              </FormItem>
            </Col>
          </Row>
        }
        {
          Number(detaiData.leixing) === 2 && <Row style={{padding: '0 20px'}}>
            <Col span={24}>
              <FormItem {...formItemLayout} label="下属机构">
                <Button onClick={() => { showGroupModal(); }}>修改下属机构</Button>
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
                initialValue: sysArray,
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
