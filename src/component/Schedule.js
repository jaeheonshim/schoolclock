import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  scheduleContainer: {
    padding: 10,
    marginTop: 15
  }
});

export default function Schedule(props) {
  const [showBreaks, setShowBreaks] = useState(false);
  const [hourFormat24, setHourFormat24] = useState(false);

  const classes = useStyles();

  if (!props.schedule) {
    return null;
  }

  const scheduleJsx = props.schedule
    .filter((e) => {
      if (!showBreaks) {
        return !e.isBreak;
      } else {
        return true;
      }
    })
    .map((e) => (
      <TableRow
        key={e.id}
        selected={props.currentTime >= e.start && props.currentTime < e.end}
      >
        <TableCell>{e.name}</TableCell>
        <TableCell align="right">{secsToTime24(e.end - e.start)}</TableCell>
        <TableCell align="right">
          {hourFormat24 ? secsToTime24(e.start) : secsToTime(e.start)}
        </TableCell>
        <TableCell align="right">
          {hourFormat24 ? secsToTime24(e.end) : secsToTime(e.end)}
        </TableCell>
      </TableRow>
    ));

  return (
    <Container maxWidth="md">
      <Paper className={classes.scheduleContainer} elevation={1}>
        <FormControlLabel
          control={
            <Switch
              checked={showBreaks}
              onChange={() => setShowBreaks(!showBreaks)}
            />
          }
          label="Show breaks"
        />
        <FormControlLabel
          control={
            <Switch
              checked={hourFormat24}
              onChange={() => setHourFormat24(!hourFormat24)}
            />
          }
          label="24 Hour Format"
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Duration</TableCell>
                <TableCell align="right">Start</TableCell>
                <TableCell align="right">End</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{scheduleJsx}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

function secsToTime(seconds) {
  let hrs = Math.floor(seconds / 3600);
  seconds %= 3600;
  let mins = ("00" + Math.floor(seconds / 60)).slice(-2);
  let am = true;

  if (hrs > 12) {
    am = false;
    hrs -= 12;
  }

  return hrs + ":" + mins + " " + (am ? "AM" : "PM");
}

function secsToTime24(seconds) {
  let hrs = Math.floor(seconds / 3600);
  seconds %= 3600;
  let mins = ("00" + Math.floor(seconds / 60)).slice(-2);

  return hrs + ":" + mins;
}
