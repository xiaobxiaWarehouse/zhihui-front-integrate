import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col } from 'antd';
import { Charts } from 'components';
import Nav from '../nav';
import styles from './index.less';

const { AnnularChart, CakeChart } = Charts;

const navList = [
  { id: 1, name: '实时数据' },
  { id: 2, name: '睡眠分析' },
  { id: 3, name: '在离床分析' },
  { id: 4, name: '历史数据' },
];

const Chart = (props) => {
  const { dangan, location } = props;
  const { sleepZnc } = dangan;
  const {
    avgHrList, avgRRList, sleepQualityList, sleepList,
  } = sleepZnc;

  const navProps = {
    location,
    navList,
  };

  return (
    <div>
      <div>
        <div className="chartW">
          <Row gutter={10}>
            {avgHrList.length === 0 && (
              <Col span={24}>
                <div className="empty-tip">暂无数据</div>
              </Col>
            )}
            {avgHrList.length > 0 && (
              <Col span={24}>
                <div className={styles.chartBox} style={{ height: 818 }}>
                  <Row>
                    <Col span={8}>
                      <div style={{ height: 380 }}>
                        <AnnularChart
                          title="平均心率"
                          height={330}
                          data={avgHrList}
                          count={avgHrList[0] ? avgHrList[0].count : 0}
                        />
                      </div>
                    </Col>
                    <Col span={8}>
                      <AnnularChart
                        title="平均呼吸"
                        height={330}
                        data={avgRRList}
                        count={avgRRList[0] ? avgRRList[0].count : 0}
                      />
                    </Col>
                    <Col span={8}>
                      <AnnularChart
                        title="睡眠质量"
                        height={330}
                        data={sleepQualityList}
                        count={`${
                          sleepQualityList[0] ? sleepQualityList[0].count : 0
                        }%`}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div style={{ height: 384 }}>
                        <CakeChart height={334} data={sleepList} />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            )}
          </Row>
        </div>
        <div style={{ width: 123, float: 'right' }}>
          <Nav {...navProps} />
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
