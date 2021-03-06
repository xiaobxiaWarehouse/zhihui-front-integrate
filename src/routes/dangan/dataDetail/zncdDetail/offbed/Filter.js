import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Row, Col, DatePicker, Select } from 'antd';
import { Layout } from 'components';
import styles from './index.less';

const CSS = Layout.styles;
const FormItem = Form.Item;
const { Option } = Select;

const Filter = (props) => {
  const { form: { getFieldDecorator, getFieldsValue }, onFilterChange } = props;

  const onChangeTime = (val) => {
    let params = {};
    if (val) {
      params.shijian = moment(val).format('YYYYMMDD');
    }
    onFilterChange(params);
  };

  return (
    <div className={styles.filterBox}>
      <div className="chartW">
        <Row className={CSS.monitorRow}>
          <Col span={6}>
            <div className="detaiTitle">在离床分析</div>
          </Col>
          <Col style={{ textAlign: 'right' }} span={18}>
            <div className={CSS.monitorCol}>
              <Row type="flex" justify="end">
                <Col span={5}>
                  <FormItem>
                    {getFieldDecorator('shijian', {
                      initialValue: moment(),
                      rules: [],
                    })(<DatePicker
                      onChange={(val) => {
                          onChangeTime(val);
                        }}
                      style={{ width: '100%' }}
                      getCalendarContainer={triggerNode =>
                          triggerNode.parentNode
                        }
                      format="YYYY-MM-DD"
                      placeholder="请选择开始时间"
                    />)}
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
