import React from "react";
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";

import { AppBar, Button, Toolbar, Typography,Box } from "@mui/material";
import Dashboard from "./Dashboard";
import LeadDetailsPage from "./LeadDetailsPage";



const Navigation = (props) => {

    return (
        <>
            <BrowserRouter>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" style={{backgroundColor:"#032454"}} >
                        <Toolbar>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            <Link style={{color:"white",textDecoration:"none",fontFamily:"Helvetica"}} to='/'>DASHBOARD</Link>
                        </Typography>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            <Link  style={{color:"white",textDecoration:"none",fontFamily:"Helvetica"}} to='/lead-details'>DETTAGLIO LEAD</Link>
                        </Typography>
                        <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Routes>
                    <Route path={'/'} element={<Dashboard/>}/>
                    <Route path={'/lead-details/:leadId'} element={<LeadDetailsPage/>}/>
                </Routes>
                
            </BrowserRouter>
              
        </>
    )
}

export default Navigation;