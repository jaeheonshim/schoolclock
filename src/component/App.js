import React, { useState } from "react";
import ReactDOM from "react-dom";

import LargeTimer from "./LargeTimer";
import Schedule from "./Schedule";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container, Button } from "@material-ui/core";
import SetupSchedule from "./SetupSchedule";
import ExportSchedule from "./ExportSchedule";

export default function App() {
  const [currentTime, setCurrentTime] = useState(getCurrentTimeSeconds());
  const [schedule, setSchedule] = useState(undefined);

  setInterval(() => {
    setCurrentTime(getCurrentTimeSeconds());
  }, 1000);

  if(localStorage.schedule) {
    let schedule = JSON.parse(localStorage.schedule);
    return (
      <Container style={{ paddingTop: 20 }}>
        {/* <ExportSchedule schedule={JSON.stringify(schedule)} /> */}
        <LargeTimer currentTime={currentTime} schedule={schedule} />
        <Schedule currentTime={currentTime} schedule={schedule} />
      </Container>
    );
  } 

  return (
    <Container style={{ paddingTop: 20 }}>
      <SetupSchedule
        onScheduleSet={(schedule) => {
          localStorage.schedule = JSON.stringify(schedule);
          setSchedule(schedule);
        }}
      />
      <LargeTimer currentTime={currentTime} schedule={schedule} />
      <Schedule currentTime={currentTime} schedule={schedule} />
    </Container>
  );
}

function getCurrentTimeSeconds() {
  let d = new Date();
  let time = d.getSeconds();
  time += d.getMinutes() * 60;
  time += d.getHours() * 3600;

  return time;
}
