import { BaseSyntheticEvent, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SearchForm from './components/SearchForm/SearchForm'
import LineChart from './components/TimeSeries/TimeSeries'
export type timeSeriesData = {
  value: number;
  time: Date;
}

function App() {
  



  return (
    <div className="App">
      <SearchForm/>
      <LineChart/>

    </div>
  )
}

export default App
