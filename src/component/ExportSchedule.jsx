import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText"
import { TextField } from "@material-ui/core";

export default function ExportSchedule(props) {
    return (
        <Dialog open={true}>
            <DialogTitle>Setup Schedule</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Others can copy your schedule with the below text:
                        <TextField multiline fullWidth value={btoa(props.schedule)}/>
                    </DialogContentText>
            </DialogContent>
        </Dialog>
        )
    }