import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col } from 'antd';
import { Charts } from 'components';
import Nav from '../nav';
import styles from './index.less';

const navList = [
  { id: 1, name: '最近监测数据' },
  { id: 2, name: '历史表单数据' },
  { id: 3, name: '历史图表数据' },
];

const Chart = (props) => {
  const { dangan, location } = props;

  const {
    lishitubiaoDtz: {
      weightList, tempList, bgList, spo2List, hrList, bpList,
    },
    zuijin,
  } = dangan;

  const navProps = {
    navList,
    location,
  };

  const { AreaChart, LineChart } = Charts;

  return (
    <div>
      <div>
        <div className="chartW">
          <Row gutter={10}>
            <Col span={12}>
              <div className={styles.chartBox} style={{ height: 379 }}>
                {weightList.length > 0 ? (
                  <AreaChart
                    height={320}
                    title="体重数据"
                    data={weightList}
                    mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                    max={(weightList && weightList.length > 0) ? Math.max.apply(null, weightList.map(item => item.number)) : 100}
                  />
                ) : (
                  <div className="empty-tip2">暂无数据</div>
                )}
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.chartBox} style={{ height: 379 }}>
                {tempList.length > 0 ? (
                  <AreaChart
                    height={320}
                    title="体温数据"
                    data={tempList}
                    mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                    max={(tempList && tempList.length > 0) ? Math.max.apply(null, tempList.map(item => item.number)) : 100}
                  />
                ) : (
                  <div className="empty-tip2">暂无数据</div>
                )}
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ width: 123, float: 'right' }}>
          <Nav {...navProps} />
        </div>
        <div className="chartW">
          <Row gutter={10} style={{ marginTop: 15 }}>
            <Col span={12}>
              <div className={styles.chartBox} style={{ height: 379 }}>
                {bgList.length > 0 ? (
                  <AreaChart
                    height={320}
                    title="血糖数据"
                    data={bgList}
                    mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                    max={(bgList && bgList.length > 0) ? Math.max.apply(null, bgList.map(item => item.number)) : 100}
                  />
                ) : (
                  <div className="empty-tip2">暂无数据</div>
                )}
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.chartBox} style={{ height: 379 }}>
                {spo2List.length > 0 ? (
                  <AreaChart
                    height={320}
                    title="血氧数据"
                    data={spo2List}
                    // mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                    mask="MM-DD"
                    max={(spo2List && spo2List.length > 0) ? Math.max.apply(null, spo2List.map(item => item.number)) : 100}
                  />
                ) : (
                  <div className="empty-tip2">暂无数据</div>
                )}
              </div>
            </Col>
          </Row>
          <Row gutter={10} style={{ marginTop: 20 }}>
            <Col span={12}>
              <div className={styles.chartBox} style={{ height: 379 }}>
                {hrList.length > 0 ? (
                  <AreaChart
                    height={320}
                    title="心率/脉搏数据"
                    data={hrList}
                    mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                    max={(hrList && hrList.length > 0) ? Math.max.apply(null, hrList.map(item => item.number)) : 100}
                  />
                ) : (
                  <div className="empty-tip2">暂无数据</div>
                )}
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.chartBox} style={{ height: 379 }}>
                {bpList.length > 0 ? (
                  <LineChart
                    height={320}
                    title="血压数据"
                    data={bpList}
                    titleMap={{ y1: '舒张压', y2: '收缩压' }}
                    timeScale={{
                      type: 'time',
                      mask: 'YYYY-MM-DD',
                      tickInterval:
                          (bpList.length > 5 ? 5 : 1) * 24 * 60 * 60 * 1000,
                    }}
                    selectHtml={
                      <div className={styles.legend}>
                        <div className={styles.legendItem}>
                          <span
                            className={styles.legendColor}
                            style={{ backgroundColor: '#6F4111' }}
                          />
                          舒张压
                        </div>
                        <div className={styles.legendItem}>
                          <span
                            className={styles.legendColor}
                            style={{ backgroundColor: '#FCC91A' }}
                          />
                          收缩压
                        </div>
                      </div>
                    }
                  />
                ) : (
                  <div className="empty-tip2">暂无数据</div>
                )}
              </div>
            </Col>
          </Row>
        </div>
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

export default connect(mapStateToProps)(Form.create()(Chart));
