import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
import styles from './index.less';

// @autoHeight()
export default class Doubleaxes extends React.Component {
  render() {
    const {
      title,
      height = 400,
      padding = [20, 'auto', 40, 'auto'],
      titleMap = {},
      borderWidth = 2,
      data = [
        {
          x: 0,
        },
      ],
      timeScale = {
        range: [0, 1],
      },
      selectHtml,
      jump,
    } = this.props;

    const ds = new DataSet({
      state: {
        start: data[0] ? data[0].x : 0,
        end: data[data.length - 1] ? data[data.length - 1].x : 0,
      },
    });

    const dv = ds.createView();
    dv
      .source(data)
      .transform({
        type: 'filter',
        callback: (obj) => {
          const date = obj.x;
          return date <= ds.state.end && date >= ds.state.start;
        },
      })
      .transform({
        type: 'map',
        callback(row) {
          const newRow = { ...row };
          for (let [key, value] of Object.entries(titleMap)) {
            newRow[value] = row[key];
          }
          return newRow;
        },
      })
      .transform({
        type: 'fold',
        fields: Object.values(titleMap), // 展开字段集
        key: 'key', // key字段
        value: 'value', // value字段
      });

    const cols = {
      x: timeScale,
      value: {
        range: [0, 1],
      },
    };

    const label = {
      textStyle: {
        fontSize: '14',
      },
    };

    return (
      <div className={styles.lineChart} style={{ height: height + 30 }}>
        <div>
          <div style={{ height: 36, lineHeight: '36px'}}>
            {title && (
              <div style={{display: 'inline-block'}}>
                <h4 style={{ display: 'inline-block', marginRight: 5 }}>{title}</h4>
                {
                  jump && <a onClick={() => { jump(); }}>更多</a>
                }
              </div>
            )}
            {
              <div style={{float: 'right'}}>{selectHtml}</div>
            }
          </div>

          <Chart
            height={height}
            padding={padding}
            data={dv}
            scale={cols}
            forceFit
          >
            <Axis name="x" label={label}/>
            <Axis name="设备数量" label={label}/>
            <Axis name="value" label={label}/>
            <Tooltip />
            <Geom
              size={10}
              type="interval"
              position="x*设备数量"
              color="#3182bd"
            />
            <Geom
              type="line"
              position="x*value"
              size={borderWidth}
              color={['key', ['#8C6741', '#FCCE30', '#FB7C7C']]}
            />
            <Geom
              type="point"
              position="x*value"
              size={4}
              color={['key', ['#8C6741', '#FCCE30', '#FB7C7C']]}
              shape="circle"
            />
          </Chart>
        </div>
      </div>
    );
  }
}
