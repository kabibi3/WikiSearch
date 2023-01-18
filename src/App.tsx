import { BaseSyntheticEvent, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SearchForm from './components/SearchForm/SearchForm'
import LineChart from './components/TimeSeries/TimeSeries'
import TimeSeriesStoreProvider, { TimeSeriesStore } from './store/TimeSeriesStore'
import TimeSeries from './components/TimeSeries/TimeSeries'

export type timeSeriesData = {
  value: number;
  time: Date;
}

const App = (props:any) => {
  



  return (
    <TimeSeriesStoreProvider>
      <SearchForm/>
      <TimeSeries/>

    </TimeSeriesStoreProvider>
  )
}

export default App
