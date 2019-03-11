import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col } from 'antd';
import { Charts } from 'components';
import Nav from '../nav';
import styles from './index.less';

const { LadderChart } = Charts;

const navList = [
  { id: 1, name: '实时数据' },
  { id: 2, name: '睡眠分析' },
  { id: 3, name: '在离床分析' },
  { id: 4, name: '历史数据' },
];

const Chart = (props) => {
  const { dangan, location } = props;
  const { offbedZnc } = dangan;

  const navProps = {
    location,
    navList,
  };

  return (
    <div>
      <div>
        <div className="chartW">
          <Row gutter={10}>
            {offbedZnc.length === 0 && (
              <Col span={24}>
                <div className="empty-tip">暂无数据</div>
              </Col>
            )}
            {offbedZnc.length > 0 && (
              <Col span={24}>
                <div className={styles.chartBox} style={{ height: 436 }}>
                  <LadderChart
                    tickCount={12}
                    height={376}
                    title="在离床分析"
                    data={offbedZnc}
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
