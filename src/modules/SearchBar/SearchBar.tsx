import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import { Typography } from "@mui/material";



export const  SearchBar=()=> {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };


  const DrawerList = (
    <Box sx={{ width: "240px"}}  onClick={toggleDrawer(true)}>
     <Typography variant="h5">Search</Typography>
    </Box>
  );
  return (
    <Box >
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer sx={{
        '& .MuiDrawer-root':{
            left:"250px"
        },
          '& .MuiDrawer-paper': {
            width: '240px',
            left: '240px', 
            boxShadow:"none"
          },
        }} hideBackdrop={true} open={open} onClose={toggleDrawer(true)}>{DrawerList}</Drawer>
    </Box>
  );
}