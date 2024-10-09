import React from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";


export default function Example(props) {
    const  {value, setValue,id} = props
    const handleTime = (newDateTime) => {
        const {hour,minute,second} = newDateTime
        setValue({
            ...value,
            hour:hour,
            minute:minute,
            second:second
        });
    };

    return (
    <>
        <DatePicker
        style={{width:"90px",textAlign:"center",padding:"0"}}
        id={id}
        name={id}
        disableDayPicker
        required
        onChange={handleTime}
        format="HH:mm:ss"
        plugins={[<TimePicker position="bottom" />]}
        />
    </>
  )
}


