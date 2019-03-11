import React from 'react';
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import queryString from 'query-string';
import { Button, Col, Form, Row, Checkbox} from 'antd';
import { Layout } from 'components';
import styles from './index.less';

const CSS = Layout.styles;

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
  style: {
  },
};

const Add = (props) => {
  const {
    dispatch,
    role,
    location,
    form: {
      getFieldDecorator,
      getFieldsValue,
    },
  } = props;

  const { detaiData, rolePriv } = role;
  const { search } = location;
  const query = queryString.parse(search);

  const bianji = () => {
    dispatch(routerRedux.push({
      pathname: '/role/edit',
      search: queryString.stringify({
        ...query,
      }),
    }));
  };
  let arr = detaiData.privs && detaiData.privs.map((item) => {
    return {
      label: item.name,
    };
  });

  return (
    <div className="content-inner">
      <Row>
        <Col span={12}>
          <Button onClick={() => { dispatch(routerRedux.goBack()); }}>返回</Button>
        </Col>
        <Col span={12} style={{textAlign: 'right'}}>
          <Button type="primary" onClick={() => { bianji(); }}>编辑</Button>
        </Col>
      </Row>
      <div className="ant-form-item-borderLeft"><span className="ant-form-item-borderLefthight">角色信息</span></div>
      <Form className="role-detail-formitem">
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="角色名称">
              {detaiData && detaiData.name}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="角色描述">
              {detaiData && detaiData.description}
            </FormItem>
          </Col>
        </Row>

        <div style={{width: '100%', borderBottom: '1px solid #D8D8D8', margin: '20px 0'}} />
        <div className="ant-form-item-borderLeft"><span className="ant-form-item-borderLefthight">权限设置</span></div>
        <Row>
          <Col span={24}>
            <FormItem>
              {
                rolePriv.map((item, index) => {
                  let dataIndex = index;
                  return (
                    <Row style={{fontSize: 16, margin: 10}} key={dataIndex}>
                      <Checkbox
                        value={item.label}
                        checked={item.checked}
                        className={styles.disabled}
                      >
                        {item.label}
                      </Checkbox>
                      {item.children.length > 0 && <Row>
                        <CheckboxGroup value={item.childrenValue} style={{paddingLeft: 20}} className={styles.disabled} options={item.children} />
                      </Row>}
                    </Row>
                  );
                })
              }
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

export default (connect(mapStateToProps)(Form.create()(Add)));
