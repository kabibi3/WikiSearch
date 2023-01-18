import React, { useContext } from "react";
import Plot from "react-plotly.js";
import { overallDataType, TimeSeriesStore } from "../../store/TimeSeriesStore";


const TimeSeries = (props:any) => {
    const ctx = useContext(TimeSeriesStore) as overallDataType;
    const x = ctx?.data.map(({time}) => time)
    const y = ctx?.data.map(({value}) => value)

    const data = [
        {
          x: x,
          y: y,
          mode: "scatter",
        },
      ];
      const layout = { title: "Time Series" };

return <Plot data={data} layout={layout} />


}

export default TimeSeries