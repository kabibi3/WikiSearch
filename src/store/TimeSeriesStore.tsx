import { createContext, useState } from "react";

export type timeSeriesData = {
  value: number;
  time: Date;
};

export type overallDataType = {
  data: timeSeriesData[] | any[];
  updateData: (newData: timeSeriesData[]) => void;
};

export const TimeSeriesStore = createContext<overallDataType | null>(null);

const TimeSeriesStoreProvider = (props: any) => {
  const [data, setData] = useState<timeSeriesData[]>([]);

  const updateStateData = (newData:timeSeriesData[]) => {
    setData(newData)
  }

  const context = {
    data: data,
    updateData: updateStateData
  }

  return (
    <TimeSeriesStore.Provider value={context}>
      {props.children}
    </TimeSeriesStore.Provider>
  );
};

export default TimeSeriesStoreProvider;
