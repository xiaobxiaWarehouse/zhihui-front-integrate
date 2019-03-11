import React from 'react';
import PropTypes from 'prop-types';
import {routerRedux} from 'dva/router';
import queryString from 'query-string';
import { Row, Col, Button } from 'antd';
import { injectIntl } from 'react-intl';

import { connect } from 'dva';
import { Charts } from 'components';
import styles from './index.less';

const { Doubleaxes, ColumnGroupChart } = Charts;

const gaiyaoNameList = ['集团总数量', '机构总数量', '平台人数', '绑定设备总数', '设备总数'];
const dateTypeList = [
  { id: 1, name: '智能床' },
  { id: 2, name: '智能床垫' },
  { id: 3, name: '多体征设备' },
];

const Index = (props) => {
  const { dispatch, index } = props;
  const {
    gaiyaoList,
    shebeiList,
    jianceshujuList,
    leixing,
  } = index;

  const changeDateType = (val) => {
    dispatch({
      type: 'index/updateLeixing',
      payload: Number(val),
    });
    dispatch({
      type: 'index/getJianceshujuPlatform',
      payload: {
        shitu: 1,
        leixing: Number(val),
        pageSize: 24,
        pageNum: 1,
      },
    });
  };

  const jump = (pathname, params = {}) => {
    if (pathname) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...params,
        }),
      }));
    }
  };

  const lineChartJump = () => {
    let params = {
      leixing,
    };
    jump('/caijiSb/list', params);
  };

  const columnGroupChartJump = () => {
    jump('/caijiJg/list');
  };

  return (
    <div className="content-inner-gray">
      <div className={styles.xScroll}>
        <Row>
          <Col span={18}>
            <div
              style={{
                padding: 20,
                paddingTop: 10,
                backgroundColor: '#fff',
                height: 283,
                fontSize: 15,
                marginRight: 16,
                borderRadius: 8,
              }}
            >
              <Doubleaxes
                title="数据上报概要"
                height={220}
                data={jianceshujuList}
                timeScale={{
                  alias: '时间',
                  type: 'time',
                  mask: 'HH:mm',
                  tickCount: 12,
                }}
                titleMap={{ y1: '总次数', y2: '有效数据', y3: '无效数据'}}
                jump={lineChartJump}
                selectHtml={
                  <div className={styles.selectBox}>
                    <div className={styles.legend}>
                      <div className={styles.legendItem}>
                        <span
                          className={styles.legendColor}
                          style={{ backgroundColor: '#6F4111' }}
                        />
                        总次数
                      </div>
                      <div className={styles.legendItem}>
                        <span
                          className={styles.legendColor}
                          style={{ backgroundColor: '#FCC91A' }}
                        />
                        有效数据
                      </div>
                      <div className={styles.legendItem}>
                        <span
                          className={styles.legendColor}
                          style={{ backgroundColor: '#FB7C7C' }}
                        />
                        无效数据
                      </div>
                    </div>
                    {dateTypeList.map((item, typeIndex) => {
                      return (
                        <Button
                          className={item.id === leixing ? styles.shebeiAcitve : styles.shebei}
                          onClick={() => { changeDateType(item.id); }}
                          style={{ marginRight: typeIndex !== 2 ? 10 : 0 }}
                          key={item.id}
                        >
                          {item.name}
                        </Button>
                      );
                    })}
                  </div>
                }
              />
            </div>
          </Col>
          <Col span={6}>
            <div
              style={{
                padding: 20,
                backgroundColor: '#fff',
                height: 283,
                fontSize: 15,
                borderRadius: 8,
              }}
            >
              <div className={styles.title}>平台概要</div>
              <div>
                {gaiyaoNameList.map((item, gaiyaoIndex) => {
                  return (
                    <div key={item} className={styles.gaiyaoItem}>
                      <div className={styles.gaiyaoName}>{item}</div>
                      <div className={styles.gaiyaoCount}>
                        {gaiyaoList[gaiyaoIndex] ? gaiyaoList[gaiyaoIndex] : 0}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
        <div
          style={{
            padding: 20,
            backgroundColor: '#fff',
            marginTop: 20,
            height: 420,
            fontSize: 15,
            borderRadius: 8,
          }}
        >
          <ColumnGroupChart
            height={370}
            title="设备概要统计"
            data={shebeiList}
            coord
            jump={columnGroupChartJump}
            transformObj={{
              type: 'fold',
              fields: ['总数量', '已绑定设备', '在用设备'],
              key: 'type',
              value: 'number',
            }}
          />
        </div>
      </div>
    </div>
  );
};

Index.propTypes = {
  userListProps: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    app: state.app,
    index: state.index,
  };
}

export default injectIntl(connect(mapStateToProps)(Index));
