import React, { useEffect,useState } from "react";

import { 
  ListItemText,
  ListItem,
  List,
  Button,
  Typography,
  ListItemIcon, ListItemButton,IconButton,Box,Divider,Card,CardActions,CardContent } from "@mui/material";
  import { FixedSizeList } from 'react-window';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {Link} from "react-router-dom";

import LeadDetailDialog from "./LeadDetailDialog";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ViewListIcon from '@mui/icons-material/ViewList';
import AppsIcon from '@mui/icons-material/Apps';
import  { findAll } from "../api/LeadApi";




const LeadList = (props) => {
  

    console.log("INSIDE LEADLIST",props);

    // leads.map(entry => manageSingleEntry(entry));
    //leads.map(entry =>{
      //  console.log(entry);
    //})

    //  useEffect(() =>{
    //      console.log("USING THE EFFECT INSIDE LEADLIST");
         
    //      findAll({}).
    //     then(result => props.getLeadList(result));
        
    //  },[])

    const [dialogOpen,setDialogOpen] = useState(false);
    const [currentLead,setCurrentLead] = useState(null);
    const [listViewMode,setListViewMode] = useState("list");
    

    const handleCurrentLead = (entry) => {
        setCurrentLead(entry);
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
      setDialogOpen(false);
    }
    

    const handleListItemEditClick = (lead) => {
      props.retrieveLead(lead);
      props.openFormDialog();
    }

    const showList = () => {
      return (
        
        <List>
         {props?.leads?.map((entry,index) =>(
          <ListItemButton>
              <ListItem key={"lead-"+index} style={{borderBottom:"1px solid #244a80"}}  >
                  <ListItemIcon>
                  <WorkOutlineIcon />
                </ListItemIcon>
                  <ListItemText onClick = {() => handleCurrentLead(entry)} style={{cursor:"pointer",color:"darkblue",fontWeight: "bold"}}>
                      <Typography variant="h5">{entry.name}</Typography>
                  </ListItemText>
                      <IconButton aria-label="details">
                          <Link to={'/lead-details/'+entry.leadId}><InfoOutlinedIcon /></Link>
                        </IconButton>
                        <IconButton aria-label="edit">
                          <EditIcon onClick = {()=>{handleListItemEditClick(entry)}}/>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon onClick = {() => props.deleteLead(entry.leadId)} />
                      </IconButton>
              </ListItem>
              </ListItemButton>
         ))}
        </List>
       
      )
    }

    const showCards = () => {
      console.log(listViewMode,props.leads);

      return (
        <>
          {
            props.leads.map((entry,index) => (
              <Card>
              <CardContent>
                <Typography variant={'h3'}>{entry.name}</Typography>
                <Typography variant={'h4'}>{entry.ownerName}</Typography>
                <Typography variant={'h4'}>{entry.type}</Typography>
              </CardContent>
              <CardActions>
                <IconButton aria-label="edit">
                          <EditIcon onClick = {()=>{handleListItemEditClick(entry)}}/>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon onClick = {() => props.deleteLead(entry.leadId)} />
                </IconButton>
              </CardActions>
            </Card>
            ))
           
          }
            
      </>
      )
    
    }

    return (
        <>
        {
            dialogOpen ? <LeadDetailDialog 
                            dialogOpen={dialogOpen} 
                            lead={currentLead} 
                            // handleClose={props.handleDialogClose} 
                            handleDialogClose = {handleDialogClose}
                          />:<></>
        }
        <Box>
          <h2 style={{color:"darkblue",fontSize:"30px"}}>Lista Dei Lead
          <Box style={{textAlign:"right"}}>
          <IconButton >
                  <ViewListIcon onClick = {() => setListViewMode('list')} />
          </IconButton>
          
          <IconButton edge="end" >
                  <AppsIcon onClick = {() => setListViewMode('cards')} />
          </IconButton>
          </Box>
          </h2>
          <Divider/>
        </Box>
        {
          listViewMode === 'list' ? showList():showCards()
        }
        
        
        </>
       
    )
}

export default LeadList;