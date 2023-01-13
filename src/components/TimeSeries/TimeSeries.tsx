import React from "react";
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import Plot from "react-plotly.js";

export default function LineChart() {
  const data = [
    {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      mode: "lines",
    },
  ];
  const layout = { title: "Time Series" };

  return <Plot data={data} layout={layout} />;
}
// const TimeSeries = (props:any) => {
    
// }

// export default TimeSeries