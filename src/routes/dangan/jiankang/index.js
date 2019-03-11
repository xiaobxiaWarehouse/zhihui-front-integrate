import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import queryString from 'query-string';
import { Form, Row, Col, Button } from 'antd';
import Tabs from './tabs';
import RuzhuXx from './ruzhuXx';
import RuzhuPg from './ruzhuPg';
import Tijian from './tijian';
import Jilu from './jilu';

const FormItem = Form.Item;

const Index = (props) => {
  const { dangan, dispatch, location } = props;
  const { jiankangTabIndex } = dangan;
  const { search } = location;
  const query = queryString.parse(search);

  const getRuzhuDetail = () => {
    dispatch({
      type: 'dangan/getRuzhuDetail',
      payload: {
        id: Number(query.id),
        jigou: Number(query.jigou),
      },
    });
  };

  const getMubanData = (leixing) => {
    dispatch({
      type: 'dangan/changeRuzhuData',
      payload: null,
    });
    dispatch({
      type: 'dangan/getMubanData',
      payload: {
        jigou: Number(query.jigou),
        suoyin: Number(query.id),
        leixing,
      },
    });
  };

  const tabsProps = {
    jiankangTabIndex,
    onClickTab(id) {
      dispatch({
        type: 'dangan/changeJiankangTabIndex',
        payload: id,
      });
      switch (id) {
        case 1:
          getRuzhuDetail();
          break;
        case 2:
          getMubanData(1);
          break;
        case 3:
          getMubanData(2);
          break;
        case 4:
          getMubanData(3);
          break;
        default:
          break;
      }
    },
  };

  return (
    <div className="content-inner">
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
      {jiankangTabIndex === 1 && <RuzhuXx />}
      {jiankangTabIndex === 2 && <RuzhuPg />}
      {jiankangTabIndex === 3 && <Tijian query={query} />}
      {jiankangTabIndex === 4 && <Jilu />}
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
