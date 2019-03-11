import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis, Coord } from 'bizcharts';
import DataSet from '@antv/data-set';
import autoHeight from '../autoHeight';
import styles from './index.less';

// @autoHeight()
export default class ColumnGroupChart extends React.Component {
  render() {
    const {
      title,
      height = 400,
      padding = [40, 'auto', 60, 'auto'],
      data = [],
      transformObj,
      coord = false,
      jump,
    } = this.props;

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      ...transformObj,
    });

    const label = {
      textStyle: {
        fontSize: '14',
      },
    };

    return (
      <div className={styles.chart} style={{ height: height + 30 }}>
        <div>
          <div className={styles.titleBox}>
            <div style={{display: 'inline-block'}}>
              <h4 className={styles.title}>{title}</h4>
              {jump && <a onClick={() => { jump(); }}>更多</a>}
            </div>
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span
                  className={styles.legendColor}
                  style={{ backgroundColor: '#6F4111' }}
                />
                总数量
              </div>
              <div className={styles.legendItem}>
                <span
                  className={styles.legendColor}
                  style={{ backgroundColor: '#FCC91A' }}
                />
                已绑定设备
              </div>
              <div className={styles.legendItem}>
                <span
                  className={styles.legendColor}
                  style={{ backgroundColor: '#FB7C7C' }}
                />
                在用设备
              </div>
            </div>
          </div>
          <Chart height={height} padding={padding} data={dv} forceFit>
            {coord && <Coord transpose scale={[1, -1]} />}
            <Axis
              name="groupName"
              label={{
                ...label,
                offset: 12,
              }}
            />
            <Axis name="number" position="right" label={label}/>
            {/* <Legend /> */}
            <Tooltip />
            <Geom
              type="interval"
              position="groupName*number"
              adjust={[
                {
                  type: 'dodge',
                  marginRatio: 1 / 32,
                },
              ]}
              color={['type', ['#8C6741', '#FCCE30', '#FB7C7C']]}
            />
          </Chart>
        </div>
      </div>
    );
  }
}
