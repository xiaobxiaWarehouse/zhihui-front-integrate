import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col } from 'antd';
import { Charts } from 'components';
import Nav from '../nav';
import styles from './index.less';

const navList = [
  { id: 1, name: '实时数据' },
  { id: 2, name: '睡眠分析' },
  { id: 3, name: '在离床分析' },
  { id: 4, name: '历史数据' },
];

const { AreaChart, LadderChart } = Charts;

const Chart = (props) => {
  const { dangan, location } = props;
  const { shishiZnc, offbedZnc, zuijin } = dangan;
  const { hrList, rrList, mvList } = shishiZnc;

  const navProps = {
    location,
    navList,
  };

  return (
    <div>
      <div>
        <div className="chartW">
          <Row gutter={10}>
            {hrList.length === 0 && (
              <Col span={24}>
                <div className="empty-tip">暂无数据</div>
              </Col>
            )}
            {hrList.length > 0 && (
              <Col span={12}>
                <div className={styles.chartBox} style={{ height: 379 }}>
                  <AreaChart
                    mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                    max={120}
                    height={320}
                    title="心率数据"
                    data={hrList}
                  />
                </div>
              </Col>
            )}
            {rrList.length > 0 && (
              <Col span={12}>
                <div className={styles.chartBox} style={{ height: 379 }}>
                  <AreaChart
                    mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                    max={50}
                    height={320}
                    title="呼吸数据"
                    data={rrList}
                  />
                </div>
              </Col>
            )}
          </Row>
        </div>
        <div style={{ width: 123, float: 'right' }}>
          <Nav {...navProps} />
        </div>
      </div>
      <div className="chartW">
        <Row gutter={10} style={{ marginTop: 15 }}>
          {mvList.length > 0 && (
            <Col span={24}>
              <div className={styles.chartBox} style={{ height: 379 }}>
                <AreaChart
                  mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                  max={6000}
                  height={320}
                  title="体动数据"
                  data={mvList}
                />
              </div>
            </Col>
          )}
        </Row>
        <Row gutter={10} style={{ marginTop: 20 }}>
          {offbedZnc.length > 0 && (
            <Col span={24}>
              <div className={styles.chartBox} style={{ height: 379 }}>
                <LadderChart
                  mask={zuijin && zuijin !== 1 ? 'MM-DD' : 'HH:mm'}
                  height={320}
                  title="在/离床数据"
                  data={offbedZnc}
                  tickCount={12}
                />
              </div>
            </Col>
          )}
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

export default connect(mapStateToProps)(Form.create()(Chart));
