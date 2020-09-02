import React, { useState, useEffect } from "react";

import MenuItem from "@material-ui/core/MenuItem";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "date-fns";
import ListItem from "@material-ui/core/ListItem";
import DateFnsUtils from "@date-io/date-fns";
import { endOfDay, endOfDecade } from "date-fns";

function getDateFromSeconds(seconds) {
  let date = new Date();
  let hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  date.setHours(hours, Math.floor(seconds / 60), seconds % 60, 0)
  return date;
}

function dateToSeconds(date) {
  return date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 3600;
}

export default function SetupSchedulePeriodItem(props) {
  const [name, setName] = useState("Period " + (props.index + 1));
  const [start, setStart] = useState(props.start ? getDateFromSeconds(props.start) : new Date());
  const [end, setEnd] = useState(props.start ? getDateFromSeconds(props.start) : new Date());
  const [endError, setEndError] = useState();
  const [isBreak, setIsBreak] = useState(false);

  function update() {
    let startSeconds = dateToSeconds(start);
      
    let endSeconds = dateToSeconds(end);

    return {
      id: props.index,
      name: name,
      start: startSeconds,
      end: endSeconds,
      isBreak: isBreak
    };
  }

  useEffect(() => {
    props.doUpdate(update());
  });

  return (
    <ListItem>
      <TextField
        label="Period Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <TimePicker
          label="Start Time"
          onChange={(e) => {
            setStart(e);
          }}
          value={start}
        />
        <TimePicker
          error={endError}
          label="End Time"
          onChange={(e) => {
            if(dateToSeconds(e) >= dateToSeconds(start)) {
              setEndError(false);
              setEnd(e);
            } else 
                setEndError(true);
          }}
          value={end}
        />
      </MuiPickersUtilsProvider>
      <FormControl style={{ minWidth: 70 }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={isBreak}
          onChange={(e) => {
            setIsBreak(e.target.value);
          }}
        >
          <MenuItem value={false}>Class</MenuItem>
          <MenuItem value={true}>Break</MenuItem>
        </Select>
      </FormControl>
    </ListItem>
  );
}
