import { useState, BaseSyntheticEvent, useRef } from "react";
import DateChooser from "../DateChooser/DateChooser";
import classes from "./SearchForm.module.css";
import { timeSeriesData } from "../../App";

const SearchForm = () => {
//   const formatDate = (date:Date) => {
//     return date.toISOString().split('T')[0]
//   }

  const currentDate = new Date()
  const yesterDate = (new Date(currentDate))
  const monthEarly = (new Date(currentDate))

  yesterDate.setDate(yesterDate.getDate() - 1)
  monthEarly.setDate(monthEarly.getDate() - 31)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [subject, setSubject] = useState("");
  const [startDate, setStartDate] = useState<string>(monthEarly.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(yesterDate.toISOString().split('T')[0]);
  const [timeSeriesData, setTimeSeriesData] = useState<timeSeriesData[]>([]);


  const formatDateForUrl = (date:string) => {
    return date.replaceAll('-','').concat('00')
  }

  const capitalize = (sentence:string) => {
    return sentence.split(" ").map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join("_");
  }
  

  const changeSubject = async (searchSubject:string) => {
    const URL = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${searchSubject}/daily/${formatDateForUrl(startDate)}/${formatDateForUrl(endDate)}`;

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
    const searchSubject = searchInputRef.current?.value
    if (searchSubject === undefined) return //handle later with error modal

    setTimeSeriesData([]);
    changeSubject(capitalize(searchSubject));
    
  };


  const getItemInfo = (item: any) => {
    const newData: timeSeriesData = { value: item.views, time: item.timestamp };
    setTimeSeriesData((prevData) => [...prevData, newData]);
  };

  const startDateHandler = (date: string) => {
    setStartDate(date);
  };
  const endDateHandler = (date: string) => {
    setEndDate(date);
  };

  return (
    <div>
      <h1>Wikipedia Popularity Search</h1>
      <form className={classes.search} onSubmit={handleSubmit}>
        <div>
          <input ref={searchInputRef}></input>
        </div>
        <div>
          <DateChooser
            dateType="Start"
            onDateEntered={startDateHandler}
            value={startDate}
            min="2015-01-01"
            
          />
          <DateChooser
            dateType="End"
            onDateEntered={endDateHandler}
            value={endDate}
            min="2015-01-01"
            
          />
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
