import { useState, BaseSyntheticEvent, useRef, useContext } from "react";
import DateChooser from "../DateChooser/DateChooser";
import classes from "./SearchForm.module.css";
import { timeSeriesData } from "../../App";
import { TimeSeriesStore } from "../../store/TimeSeriesStore";

const currentDate = new Date();
const yesterDate = new Date(currentDate);
const monthEarly = new Date(currentDate);

yesterDate.setDate(yesterDate.getDate() - 1);
monthEarly.setDate(monthEarly.getDate() - 31);

const SearchForm = (props: any) => {
  //   const formatDate = (date:Date) => {
  //     return date.toISOString().split('T')[0]
  //   }

  const ctx = useContext(TimeSeriesStore);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = useState<string>(
    monthEarly.toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>(
    yesterDate.toISOString().split("T")[0]
  );
  const [timeSeriesData, setTimeSeriesData] = useState<timeSeriesData[]>([]);

  const formatDateForUrl = (date: string) => {
    return date.replaceAll("-", "").concat("00");
  };

  const formatStringToDate = (date: string) => {
    return new Date(date.slice(0,4) + '-' + date.slice(4,6) + '-' + date.slice(6,8))
  }

  const capitalize = (sentence: string) => {
    return sentence
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join("_");
  };

  const changeSubject = async (searchSubject: string) => {
    const URL = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${searchSubject}/daily/${formatDateForUrl(
      startDate
    )}/${formatDateForUrl(endDate)}`;

    const res = await fetch(URL);
    if (!res.ok) return;
    const data = await res.json();
    for (let index = 0; index < data.items.length; index++) {
      const element = data.items[index];
      getItemInfo(element);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchSubject = searchInputRef.current?.value;
    if (searchSubject === undefined) return; //handle later with error modal
    setTimeSeriesData([]);

    changeSubject(capitalize(searchSubject));

    ctx?.updateData(timeSeriesData)
  };

  const getItemInfo = (item: any) => {
    const newData: timeSeriesData = { time: formatStringToDate(item.timestamp), value: item.views };
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
          <input ref={searchInputRef} placeholder="Search"></input>
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
