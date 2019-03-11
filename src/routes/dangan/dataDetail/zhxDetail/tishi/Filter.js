import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Select, DatePicker, Button } from 'antd';
import moment from 'moment';
import { Layout } from 'components';
import styles from './index.less';

const CSS = Layout.styles;
const FormItem = Form.Item;
const { Option } = Select;

const zuijinOption = [
  { id: 1, name: '最近1天' },
  { id: 7, name: '最近7天' },
  { id: 15, name: '最近15天' },
];

const leixingOption = [
  { id: 'diedao', name: '跌倒' },
  { id: 'weilan', name: '围栏' },
  { id: 'dianliang', name: '电量' },
  { id: -1, name: '全部' },
];

const Filter = (props) => {
  const {
    form: { getFieldDecorator, getFieldsValue },
    onFilterChange,
  } = props;

  const onChangeZuijin = (val) => {
    let fields = getFieldsValue();
    let params = {
      ...fields,
    };
    if (val) {
      params.zuijin = val;
    }
    onFilterChange(params);
  };

  const onChangeLeixing = (val) => {
    let fields = getFieldsValue();
    let params = {
      ...fields,
    };
    if (val) {
      params.jiancexiang = val;
    }
    onFilterChange(params);
  };

  return (
    <div className={styles.filterBox}>
      <div className="chartW">
        <Row className={CSS.monitorRow}>
          <Col span={6}>
            <div className="detaiTitle">提示列表</div>
          </Col>
          <Col style={{ textAlign: 'right' }} span={18}>
            <div className={CSS.monitorCol}>
              <Row type="flex" justify="end">
                <Col span={5}>
                  <FormItem style={{ marginRight: 20 }}>
                    {getFieldDecorator('jiancexiang', {
                      initialValue: '-1',
                      rules: [],
                    })(<Select
                      placeholder="请选择提示类型"
                      style={{ width: '100%' }}
                      onChange={(val) => {
                          onChangeLeixing(val);
                        }}
                    >
                      {leixingOption.map((item) => {
                          return (
                            <Option key={item.id} value={String(item.id)}>
                              {item.name}
                            </Option>
                          );
                        })}
                    </Select>)}
                  </FormItem>
                </Col>
                <Col span={4}>
                  <FormItem>
                    {getFieldDecorator('zuijin', {
                      initialValue: '1',
                      rules: [],
                    })(<Select
                      placeholder="请选择最近周期"
                      style={{ width: '100%' }}
                      onChange={(val) => {
                        onChangeZuijin(val);
                      }}
                    >
                      {zuijinOption.map((item) => {
                        return (
                          <Option key={item.id} value={String(item.id)}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.dangan,
  };
}

export default connect(mapStateToProps)(Form.create()(Filter));
