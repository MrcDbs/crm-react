import React from "react";
import { Dialog,DialogContentText,DialogTitle, DialogContent, DialogActions,Button} from "@mui/material";
import { useState } from "react";

const LeadDetailDialog = (props) => {

    const [open,setOpen] = useState(props.dialogOpen);
    const [lead,setLead] = useState(props.lead);

    
    
    return (
        <>
             <Dialog
                open={open}
                //open={props.formDialogOpen}
                onClose={props.handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"DETTAGLIO DEL SINGOLO LEAD"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <h3>{props.lead.name}</h3>
                    <h4>{props.lead.ownerName}</h4>
                    <h4>{props.lead.type}</h4>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                { <Button onClick={()=>props.handleDialogClose()}>Close</Button> }
                
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LeadDetailDialog;