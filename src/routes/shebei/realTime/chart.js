import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Button } from 'antd';
import queryString from 'query-string';
import { Charts } from 'components';
import styles from './index.less';

const { ColumnChart, SliderChart } = Charts;

let timer = true;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { location, dispatch, shebei } = this.props;
    const { search } = location;
    const { shishiData: hrList } = shebei;
    const query = queryString.parse(search);
    const { leixing } = query;
    timer = true;
    if (Number(leixing) === 1) {
      this.getZncShishi({ ...query });
    } else {
      this.getZncdShishi({ ...query });
    }
  }

  componentWillUnmount() {
    if (timer) {
      timer = false;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'shebei/updateShishiData',
      payload: {
        shijian: undefined,
        hrList: [],
        rrList: [],
        mvList: [],
      },
    });
  }

  getZncShishi = (params) => {
    const { location, dispatch, shebei } = this.props;
    const { search } = location;
    const query = queryString.parse(search);
    if (timer) {
      dispatch({
        type: 'shebei/getZncShishi',
        payload: {
          ...params,
        },
        callback: (data) => {
          let _this = this;
          if (timer) {
            timer = setTimeout(() => {
              _this.getZncShishi({
                ...query,
                kaishiSj: data.shijian,
              });
            }, 1000);
          }
        },
      });
    }
  };

  getZncdShishi = (params) => {
    const { location, dispatch, shebei } = this.props;
    const { search } = location;
    const query = queryString.parse(search);
    if (timer) {
      dispatch({
        type: 'shebei/getZncdShishi',
        payload: {
          ...params,
        },
        callback: (data) => {
          let _this = this;
          if (timer) {
            timer = setTimeout(() => {
              _this.getZncdShishi({
                ...query,
                kaishiSj: data.shijian,
              });
            }, 1000);
          }
        },
      });
    }
  };

  render() {
    const { shebei } = this.props;
    const { shishiData } = shebei;
    const {
      hrList,
      rrList,
      mvList,
    } = shishiData;
    let preMinutes = 3 * (60 * 1000);
    let now = new Date();

    return (
      <div>
        <Row gutter={10}>
          {hrList.length === 0 && (
            <Col span={24}>
              <div className="empty-tip">暂无数据</div>
            </Col>
          )}
          {hrList.length > 0 && (
            <Col span={12}>
              <div className={styles.chartBox} style={{ height: 379 }}>
                <SliderChart
                  height={320}
                  title="心率数据"
                  data={hrList}
                  cols={{
                    name: {
                      alias: '时间',
                      type: 'time',
                      mask: 'mm:ss',
                      tickCount: 6,
                      nice: false,
                      max: (hrList && hrList.length > 0) ? Math.max.apply(null, hrList.map(item => item.name)) : now.getTime(),
                      min: ((hrList && hrList.length > 0) ? Math.max.apply(null, hrList.map(item => item.name)) : now.getTime()) - preMinutes,
                    },
                    number: {
                      alias: '心率',
                      min: 0,
                      max: (hrList && hrList.length > 0) ? Math.max.apply(null, hrList.map(item => item.number)) : 120,
                    },
                  }}
                />
              </div>
            </Col>
          )}
          {rrList.length > 0 && (
            <Col span={12}>
              <div className={styles.chartBox} style={{ height: 379 }}>
                <SliderChart
                  height={320}
                  title="呼吸数据"
                  data={rrList}
                  cols={{
                    name: {
                      alias: '时间',
                      type: 'time',
                      mask: 'mm:ss',
                      tickCount: 6,
                      nice: false,
                      max: (rrList && rrList.length > 0) ? Math.max.apply(null, rrList.map(item => item.name)) : now.getTime(),
                      min: ((rrList && rrList.length > 0) ? Math.max.apply(null, rrList.map(item => item.name)) : now.getTime()) - preMinutes,
                    },
                    number: {
                      alias: '呼吸',
                      min: 0,
                      max: (rrList && rrList.length > 0) ? Math.max.apply(null, rrList.map(item => item.number)) : 50,
                    },
                  }}
                />
              </div>
            </Col>
          )}
        </Row>
        <Row style={{ marginTop: 20 }}>
          {mvList.length > 0 && (
            <Col span={24}>
              <div className={styles.chartBox} style={{ height: 436 }}>
                <ColumnChart
                  height={376}
                  title="体动数据"
                  data={mvList}
                  cols={{
                    name: {
                      alias: '时间',
                      type: 'time',
                      mask: 'mm:ss',
                      tickCount: 12,
                      nice: false,
                      max: (mvList && mvList.length > 0) ? Math.max.apply(null, mvList.map(item => item.name)) : now.getTime(),
                      min: ((mvList && mvList.length > 0) ? Math.max.apply(null, mvList.map(item => item.name)) : now.getTime()) - preMinutes,
                    },
                    number: {
                      alias: 'x',
                      min: 0,
                      max: (mvList && mvList.length > 0) ? Math.max.apply(null, mvList.map(item => item.number)) : 500,
                    },
                  }}
                />
              </div>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    shebei: state.shebei,
  };
}

export default connect(mapStateToProps)(Form.create()(Chart));
