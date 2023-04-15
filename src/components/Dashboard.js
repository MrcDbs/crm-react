import React, { useEffect,useState }  from "react";

import AddLeadForm from "./AddLeadForm";
import LeadList from "./LeadList";
import { Grid, Paper,Box,Divider } from "@mui/material";
import '../App.css';
import  { deleteLead, findAll,updateLead } from "../api/LeadApi";
import { alignProperty } from "@mui/material/styles/cssUtils";

const emptyLead = {
    leadId:0,
    groupId:0,
    name:"",
    ownerName:"",
    type:""
}
const Dashboard = (props) => {

    const [leads,setLeads] = useState([]);
    const [currentLead,setCurrentLead] = useState(emptyLead);
    const [formDialogOpen,setFormDialogOpen] = useState(false);
    

      useEffect(() =>{
         getLeadList();
      },[]);

    //   useEffect(() => {
    //     console.log("MONITORING CURRENT LEAD");
    //   },[currentLead])

    const getLeadList = () =>{
         findAll({}).
         then(result => {
            Array.isArray(result)?setLeads(result):console.log("ERROR");
            console.log("lista",result);
        });
        //setLeads(lead);
    }

    // [{
    //     name:"Idraulica SRL",
    //     ownerName:"Mario Rossi",
    //     type:"Servizi"
    //  },
    // {
    //     name:"Consegne veloci",
    //    ownerName:"Giorgio Bianchi",
    //    type:"Logistica"
    //  },
    //  {
    //     name:"Amazon Italia",
    //     ownerName:"Jeff Bezos",
    //     type:"Logistica"
    //  }]

    const addLead = (params) => {
        updateLead(params)
        .then(result => {
            console.log("Result from insert",result);
            getLeadList();
    })
    }

    /* 
        funzione che ricarica il form con il lead valorizzato 
    */

    const retrieveLead = (lead) => {
        setCurrentLead(lead);
    }

    const handleDeleteLead = (id) => {
        console.log(id);
        deleteLead({
            leadId: id
        })
        .then(result => {
            console.log(result);
            getLeadList();
        })
    }


    const handleDialogClose = () => {
        setFormDialogOpen(false);
    }

    const openFormDialog = () => {
        setFormDialogOpen(true);
    }

    return (
    //  | DIV FITTIZIO
        <> 
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} className="dashText">
                    <h1 style={{color:"white",fontSize:"60px",fontFamily:"Helvetica"}}>
                        DASHBOARD
                    </h1>
                </Grid>        
                <Grid container spacing={12} >
                    <Grid item xs={1} ></Grid>
                    <Grid item xs={5} >
                        <Paper elevation={4} style={{minHeight:"300px",padding:"30px"}}>
                            <LeadList 
                                leads={leads} 
                                getLeadList = {getLeadList} 
                                deleteLead = {handleDeleteLead} 
                                retrieveLead = {retrieveLead}
                                openFormDialog = {openFormDialog}
                                handleDialogClose = {handleDialogClose}
                                
                            />
                        </Paper>
                        
                    </Grid>
                    <Grid item xs={1} ></Grid>
                
                
                   
                        <Grid item xs={4}>
                        <Divider orientation="vertical" flexItem />
                            <Paper elevation={4} style={{minHeight:"300px",padding:"30px",borderRadius:"15px"}}>
                            <h1 style={{color:"darkblue",textAlign:"center"}}>Form Component</h1>
                            <Divider/>
                            <AddLeadForm 
                                addLead={addLead} 
                                viewModal = {"form"}
                                lead={emptyLead}
                                formDialogOpen = {formDialogOpen}
                                handleFormDialogClose = {handleDialogClose}
                            /> 
                            <AddLeadForm 
                                addLead={addLead} 
                                viewMode = {"modal"}
                                lead={currentLead}
                                formDialogOpen = {formDialogOpen}
                                handleFormDialogClose = {handleDialogClose}
                            /> 
                            </Paper>
                        </Grid>
                        <Grid item xs={1} ></Grid>
                    
                </Grid>
            </Grid>
        </Box>
        </>
        
    )
}



export default Dashboard;