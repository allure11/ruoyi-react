import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coordinate,
  Edge,
  View,
  Label,
  Legend,
  Interval,
  Effects,
  Util
} from "bizcharts";

class Basic extends React.Component {
  render() {
    const data = [
      {
        module: "月结前业务准备0",
        range: ['2020-10-14 08:00', '2020-10-14 10:00']
      },
      {
        module: "月结前业务准备1",
        range: ['2020-10-14 11:00', '2020-10-14 14:00']
      },
      {
        module: "月结前业务准备2",
        range: ['2020-10-14 15:00', '2020-10-14 20:00']
      },
      {
        module: "资金模块0",
        range: ['2020-10-14 12:00', '2020-10-14 18:00']
      },
      {
        module: "资金模块1",
        range: ['2020-10-14 06:00', '2020-10-14 18:00']
      }
    ];

    return (
      <Chart height={400} data={data} autoFit scale={{
        range: {
          type: 'time',
          mask: 'YYYY-MM-DD HH:mm',
        },
      }}>
        {/*坐标*/}
        <Coordinate transpose/>
        <Geom
          type="interval"
          position="module*range"/>
      </Chart>
    );
  }
}

export default Basic;
