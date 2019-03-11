import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Row, Col, Button } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

const Filter = (props) => {
  const { dispatch } = props;

  return (
    <Form className="role-detail-formitem">
      <Row>
        <Col span={12}>
          <FormItem>
            <Button
              onClick={() => {
                dispatch(routerRedux.goBack());
              }}
            >
              返回
            </Button>
          </FormItem>
        </Col>
      </Row>
      <div className={styles.filterBox}>
        <div className={styles.title}>实时数据</div>
      </div>
    </Form>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    shebei: state.shebei,
  };
}

export default connect(mapStateToProps)(Form.create()(Filter));
