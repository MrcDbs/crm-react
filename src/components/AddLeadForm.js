import React,{ useEffect,useState } from "react";
import { FormControl, TextField,Button, Dialog,DialogContentText,DialogTitle, DialogContent, DialogActions,Divider} from "@mui/material";


const AddLeadForm = (props) => {
    console.log("INITIALIZING FORM");

    
    const [hasNameValidationError,setHasNameValidationError] = useState(false);
    const [hasOwnerNameValidationError,setHasOwnerNameValidationError] = useState(false);
    const [hasTypeValidationError,setHasTypeValidationError] = useState(false);
    const [validationErrorMessage,setValidationErrorMessage] = useState(null);
   // const [lead,setLead] = useState(props.lead);
     const [lead,setLead] = useState({
         leadId:0,
         groupId:0,
         name:"",
         ownerName:"",
         type:""
     });
     
   

     useEffect(() =>{
        setLead(props.lead);
         console.log(lead);
     },[props.lead])

    
    
    const handleChangeLead = (event) => {
        let regex = (/^[A-Z a-z]+$/);
        let name = event.target.id;
        // if(event.target.value.length > 0){
        //     setValidationErrorMessage(null);
        // }
        // else{
        //     setValidationErrorMessage("Required field");
        // }
        if(event.target.value.length > 0){
            switch(name){
                case "name":
                    setHasNameValidationError(!regex.test(event.target.value));
                    setValidationErrorMessage("Formato non corretto");
                    break;
                case "ownerName":
                    setHasOwnerNameValidationError(!regex.test(event.target.value));
                    setValidationErrorMessage("Formato non corretto");
                    break;
                case "type":
                    setHasTypeValidationError(!regex.test(event.target.value));
                    setValidationErrorMessage("Formato non corretto");
                    break;
                default:
                    break;            
            }
        }
        

    // res === null?console.log("VALUE IS NOT COHERENT"):console.log("VALUE IS COHERENT");
        setLead((lead) => ({...lead,[event.target.id]:event.target.value}));
    }

    const handleSubmitForm = (event) =>{
        event.preventDefault();  //evita di caricare il form come un submit
        console.log("INSIDE HANDLESUBMITFORM",lead);
        props.addLead(lead);
        setLead({
            leadId:0,
            groupId:0,
            name:"",
            ownerName:"",
            type:""
        });
        //chiamata verso il db
        //gestione eventuali errori
    }
    const getModalView = () => {
        return (
            <Dialog
                        open={props.formDialogOpen}
                        onClose={props.handleFormDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"MODIFICA LEAD"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {getFormView()}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        { <Button onClick={props.handleClose}>Modifica</Button> }
                        </DialogActions>
                    </Dialog>
        )
    }
    const getFormView = () => {
        return (
            <div>
                    
                    <FormControl fullWidth margin="normal" style={{marginBottom:"25px",marginTop:"25px"}}>
                        <TextField 
                            // inputProps={{ inputMode: 'text', pattern: '[a-zA-Z]*' }}
                            // value={this.text}
                            error={hasNameValidationError}
                            helperText={hasNameValidationError?"Formato non corretto":""}
                            id="name" 
                            value={lead.name}
                            label="Ragione sociale" 
                            variant="standard" 
                            required={true}
                            onChange = {(event) => handleChangeLead(event)}
                        />
                    </FormControl>
                    
                    <FormControl fullWidth margin="normal" style={{marginBottom:"25px"}}>
                        <TextField 
                            error={hasOwnerNameValidationError}
                            helperText={hasOwnerNameValidationError?"Formato non corretto":""}
                            id="ownerName" 
                            value={lead.ownerName}
                            label="Nominativo di riferimento" 
                            variant="standard" 
                            required={true}
                            onChange = {(event) => handleChangeLead(event)}
                            />
                    </FormControl>
    
                    <FormControl fullWidth margin="normal" style={{marginBottom:"25px"}}>
                        <TextField 
                            error={hasTypeValidationError}
                            helperText={hasTypeValidationError?"Formato non corretto":""}
                            id="type" 
                            value={lead.type}
                            label="Tipo" 
                            variant="standard" 
                            required={true}
                            onChange = {(event) => handleChangeLead(event)}
                            />
                    </FormControl>
                    
                    <FormControl fullWidth sx={{mx:"auto"}}>
                        <Button variant="contained" type="submit" onClick={(event) => handleSubmitForm(event)}>Salva</Button>
                    </FormControl>
                
            </div>
        )
    }
    return (
        <>
            {
                props?.viewMode === "modal" ? getModalView():getFormView()
            }    
        </>
    )
    
}

export default AddLeadForm;