import React from "react";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  largeTimer: {
    textAlign: "center",
    padding: 20
  },
  descText: {
    marginTop: 10
  }
});

export default function LargeTimer(props) {
  const classes = useStyles();
  let period;

  if (!props.schedule) {
    return null;
  }

  for (let i = 0; i < props.schedule.length; i++) {
    let periodObj = props.schedule[i];

    if (
      props.currentTime >= periodObj.start &&
      props.currentTime < periodObj.end
    ) {
      period = periodObj;
      break;
    }
  }

  if (period) {
    let timeLength = period.end - period.start;
    let timeLeft = period.end - props.currentTime;

    let percentage = 100 - (timeLeft / timeLength) * 100;
    return (
      <Container maxWidth="md">
        <Paper className={classes.largeTimer} elevation={2}>
          <Typography variant="h1" component="h2">
            {("00" + Math.floor(timeLeft / 60)).slice(-2) +
              ":" +
              ("00" + (timeLeft % 60)).slice(-2)}
          </Typography>
          <LinearProgress variant="determinate" value={percentage} mb={1} />
          <Chip
            className={classes.descText}
            label={<Typography>{period.name}</Typography>}
          />
        </Paper>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="md">
        <Paper className={classes.largeTimer} elevation={2}>
          <Chip
            className={classes.descText}
            label={<Typography>School is not in session</Typography>}
          />
        </Paper>
      </Container>
    );
  }
}
