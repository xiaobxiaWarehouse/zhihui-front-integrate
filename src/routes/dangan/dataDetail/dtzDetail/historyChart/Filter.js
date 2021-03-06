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

const Filter = (props) => {
  const {
    form: { getFieldDecorator, getFieldsValue, setFieldsValue },
    onFilterChange,
  } = props;

  const onChangeZuijin = (val) => {
    let params = {
      kaishiSj: undefined,
      jieshuSj: undefined,
    };
    if (val) {
      params.zuijin = val;
    }
    onFilterChange(params);
    setFieldsValue({
      kaishiSj: undefined,
      jieshuSj: undefined,
    });
  };

  const onChangeShijian = (val, type) => {
    let fields = getFieldsValue();
    let params = {
      zuijin: undefined,
    };
    let state =
      (type === 1 && fields.jieshuSj) || (type === 2 && fields.kaishiSj);

    if (state) {
      if (val) {
        params.kaishiSj = moment(type === 1 ? val : fields.kaishiSj).format('YYYYMMDD');
        params.jieshuSj = moment(type === 2 ? val : fields.jieshuSj).format('YYYYMMDD');
      }
      onFilterChange(params);
      setFieldsValue({
        zuijin: undefined,
      });
    }
  };

  return (
    // <Form className="historyForm-row">
    <div className={styles.filterBox}>
      <div className="chartW">
        <Row className={CSS.monitorRow}>
          <Col span={6}>
            <div className="detaiTitle">历史图表数据</div>
          </Col>
          <Col style={{ textAlign: 'right' }} span={18}>
            <div className={CSS.monitorCol}>
              <Row type="flex" justify="end">
                <Col span={5}>
                  <FormItem style={{ marginRight: 20 }}>
                    {getFieldDecorator('zuijin', {
                      initialValue: '1',
                      rules: [],
                    })(<Select
                      placeholder="请选择最近周期"
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
                <Col span={5}>
                  <FormItem className="abnormal-width-formitem">
                    {getFieldDecorator('kaishiSj', {
                      rules: [],
                    })(<DatePicker
                      allowClear={false}
                      getCalendarContainer={triggerNode =>
                          triggerNode.parentNode
                        }
                      style={{ width: '100%' }}
                      className={CSS.datePicker}
                      format="YYYY-MM-DD"
                      placeholder="请选择开始时间"
                      onChange={(val) => {
                          onChangeShijian(val, 1);
                        }}
                    />)}
                  </FormItem>
                </Col>
                <Col span={1} className={styles.spanName}>
                  至
                </Col>
                <Col span={5}>
                  <FormItem className="abnormal-width-formitem">
                    {getFieldDecorator('jieshuSj', {
                      rules: [],
                    })(<DatePicker
                      allowClear={false}
                      getCalendarContainer={triggerNode =>
                          triggerNode.parentNode
                        }
                      style={{ width: '100%' }}
                      className={CSS.datePicker}
                      format="YYYY-MM-DD"
                      placeholder="请选择结束时间"
                      onChange={(val) => {
                          onChangeShijian(val, 2);
                        }}
                    />)}
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    // </Form>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.dangan,
  };
}

export default connect(mapStateToProps)(Form.create()(Filter));
