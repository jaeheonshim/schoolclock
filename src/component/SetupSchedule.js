import React, { useState } from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import List from "@material-ui/core/List";
import SetupSchedulePeriodItem from "./SetupSchedulePeriodItem";
import { IconButton, TextField, Container, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";

export default function SetupSchedule(props) {
  const [schedulePeriodItems, setSchedulePeriodItems] = useState([]);
  const [scheduleData, setScheduleData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(true);
  const [importTextAreaDisplay, setImportTextAreaDisplay] = useState("none");
  const [scheduleImportData, setScheduleImportData] = useState();

  return (
    <Dialog open={dialogOpen} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Setup Schedule</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To begin using this app, first enter the starting and ending times for
          each period of your school schedule.
        </DialogContentText>
        <List>{schedulePeriodItems}</List>
        <IconButton
          color="primary"
          component="span"
          onClick={() => {
            let id = schedulePeriodItems.length;
            setSchedulePeriodItems([
              ...schedulePeriodItems,
              <SetupSchedulePeriodItem
                key={id}
                index={schedulePeriodItems.length}
                doUpdate={(data) => {
                  setScheduleData((present) => {
                    present[data.id] = data;
                    return present;
                  });
                }}
                start={Object.values(scheduleData).slice(-1)[0] ? Object.values(scheduleData).slice(-1)[0].end : null}
              />
            ]);
          }}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color="primary"
          component="span"
          onClick={() => {
            setSchedulePeriodItems(
              schedulePeriodItems.slice(0, schedulePeriodItems.length - 1)
            );
          }}
        >
          <RemoveIcon />
        </IconButton>
        <Button
          color="primary"
          onClick={() => {
            props.onScheduleSet(Object.values(scheduleData));
            setDialogOpen(false);
          }}
        >
          Save
        </Button>
        <Button
          color="primary"
          onClick={() => {
            setImportTextAreaDisplay("block");
          }}
        >
          Import Schedule
        </Button>
        <Box display={importTextAreaDisplay}>
          <TextField
            label="Paste schedule export here"
            multiline
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setScheduleImportData(e.target.value)
            }}
          />
          <Button color="primary" variant="contained" style={{marginTop: 10, float: "right"}} onClick={() => {
            localStorage.schedule = atob(scheduleImportData);
          }}>
            Import
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
