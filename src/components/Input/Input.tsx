import { useState, BaseSyntheticEvent, useEffect } from "react";
import DateChooser from "../DateChooser/DateChooser";
import classes from "./Input.module.css";
type timeSeriesData = {
  value: number;
  time: Date;
};

const Input = () => {
  const [subject, setSubject] = useState("");
  const [timeSeriesData, setTimeSeriesData] = useState<timeSeriesData[]>([]);

  // useEffect(() => {
  //   changeSubject()
  // },[subject])

  const changeSubject = async () => {
    const URL = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${subject}/daily/2015100100/2015103100`;
    const res = await fetch(URL);
    if (!res.ok) return;
    const data = await res.json();
    for (let index = 0; index < data.items.length; index++) {
      const element = data.items[index];
      getItemInfo(element);
    }
    // data.items.map((item:Object) => getItemInfo(item))
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubject((prevSubject) =>
      (prevSubject.charAt(0).toUpperCase() + prevSubject.slice(1).toLowerCase())
        .trim()
        .replace(" ", "_")
    );
    changeSubject();
    setTimeSeriesData([]);
  };

  const handleChange = (e: BaseSyntheticEvent) => {
    setSubject(e.target.value);
  };

  const getItemInfo = (item: any) => {
    const newData: timeSeriesData = { value: item.views, time: item.timestamp };
    setTimeSeriesData((prevData) => [...prevData, newData]);
  };

  const dateHandler = (date:Date) => {
    console.log(date)
  }

  return (
    <div>
      <h1>Wikipedia Popularity Search</h1>
      <form className={classes.search} onSubmit={handleSubmit}>
        <div>
          <input onChange={handleChange}></input>
        </div>
        <div>
          <DateChooser dateType="Start" onDateEntered={dateHandler}/>
          <DateChooser dateType="End" onDateEntered={dateHandler}/>
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Input;
