import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import queryString from 'query-string';
import { Form, Row, Col, Button } from 'antd';
import Tabs from './tabs';
import ZncDetail from './zncDetail';
import ZncdDetail from './zncdDetail';
import DtzDetail from './dtzDetail';
import ZhxDetail from './zhxDetail';

const FormItem = Form.Item;

const Index = (props) => {
  const { dangan, dispatch, location } = props;
  const { detaiTabIndex } = dangan;

  const { search } = location;
  const query = queryString.parse(search);

  const getShishiZnc = () => {};

  const getShishiZncd = () => {};

  const getZuijinDtz = () => {
    dispatch({
      type: 'dangan/getZuijinDtz',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const getJibenZhx = () => {
    dispatch({
      type: 'dangan/getJibenZhx',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const tabsProps = {
    detaiTabIndex,
    onClickTab(id) {
      dispatch({
        type: 'dangan/initState',
      });
      dispatch({
        type: 'dangan/changeDetaiTabIndex',
        payload: id,
      });
      switch (id) {
        // case 1:
        //   getShishiZnc();
        //   break;
        // case 2:
        //   getShishiZncd();
        //   break;
        case 3:
          getZuijinDtz();
          break;
        case 4:
          getJibenZhx();
          break;
        default:
          break;
      }
    },
  };

  const zncDetailProps = {
    location,
  };

  const zncdDetailProps = {
    location,
  };

  const dtzDetaillProps = {
    location,
  };

  const zhxDetaillProps = {
    location,
  };


  return (
    <div className="content-inner">
      <Form>
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
        <Tabs {...tabsProps} />
      </Form>
      {detaiTabIndex === 1 && <ZncDetail {...zncDetailProps} />}
      {detaiTabIndex === 2 && <ZncdDetail {...zncdDetailProps} />}
      {detaiTabIndex === 3 && <DtzDetail {...dtzDetaillProps} />}
      {detaiTabIndex === 4 && <ZhxDetail {...zhxDetaillProps} />}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app,
    dangan: state.dangan,
  };
}

export default connect(mapStateToProps)(Form.create()(Index));
