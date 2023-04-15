import React, { useEffect,useState } from "react";

import {useParams} from "react-router-dom";

import { Typography,Box } from "@mui/material";

import { findByPrimaryKey } from "../api/LeadApi";

const LeadDetailsPage = () => {

    const {leadId} = useParams();
    const [lead,setLead] = useState(null);

    useEffect(()=>{
        findByPrimaryKey({
            id:leadId
        })
        .then(result => setLead(result))
    },[])

    return (
        <>
            <Box container style={{textAlign:"center"}}>
                <Typography variant component='h1'>{lead?.name}</Typography>
                <Typography component='h3'>{lead?.type}</Typography>
                <Typography component='h3'>{lead?.ownerName}</Typography>
            </Box>    
        
        </>
    )
}

export default LeadDetailsPage;