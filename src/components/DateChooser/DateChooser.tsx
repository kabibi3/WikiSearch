import { useState } from "react"

const DateChooser = (props:any) => {

    const handleChange = (e:any) => {
        props.onDateEntered(e.target.value)
    }

    return <div>
        <h3>Select Your {props.dateType} Date</h3>
        <input type="date" onChange={handleChange}></input>
    </div>
}

export default DateChooser