import { useState } from "react";
import { DrawerList } from "./DrawerList";
import {Box} from "@mui/material"
import TemporaryDrawer from "../SearchBar/searchDrawer";
import {Button} from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearToken } from "../../redux/slices/authSlice";

export default function SideMenu() {
  const [open, setOpen] =useState(false);
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const toggleDrawer = (newtoggle:boolean) => {
    setOpen(newtoggle);
  };
  return (
 
      <Box>
       <DrawerList open={open} toggleDrawer={toggleDrawer}/>
      
       <TemporaryDrawer open={open} toggleDrawer={toggleDrawer}/>
      <Button onClick={()=>{
        localStorage.removeItem("token")
        dispatch(clearToken())
        navigate("/login")
        }}>Logout</Button>
      </Box>
 
  );
}
