import { useState } from "react";

const DateChooser = (props: any) => {
  const handleChange = (e: any) => {
    props.onDateEntered(e.target.value);
  };

  return (
    <div>
      <h3>Select Your {props.dateType} Date</h3>
      <input
        type="date"
        onChange={handleChange}
        min="2019-01-01"
        step="2022-21-31"
        value={props.value}
      ></input>
    </div>
  );
};

export default DateChooser;
