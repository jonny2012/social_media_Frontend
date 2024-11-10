import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Toolbar,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";



export default function PermanentDrawerLeft({setIsOpenDrawer}:any) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [clickedText, setClickedText] = useState("");

  const icons = [
    <HomeOutlinedIcon />,
    <SearchOutlinedIcon />,
    <ExploreOutlinedIcon />,
    <EmailOutlinedIcon />,
    <FavoriteBorderOutlinedIcon />,
    <AddCircleOutlineOutlinedIcon />,
  ];

  const handleItemClick = (text: string) => {
    setClickedText(text);
    setOpenDrawer(true);
    setIsOpenDrawer(true)
    if (openDrawer === true && text === clickedText) {
      setOpenDrawer(false);
      setIsOpenDrawer(false)
    }
  };

  return (
    <Box sx={{position:"relative"}}>
      <Drawer
        sx={{
          width: "240px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "240px",
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open
      >
        <Toolbar>
          <Typography>Instagram</Typography>
        </Toolbar>

        <List>
          {[
            "Home",
            "Search",
            "Explore",
            "Messages",
            "Notification",
            "Create",
          ].map((text, index) => (
            <ListItem
              key={text}
              onClick={() =>
                text === "Search" || text === "Notification"
                  ? handleItemClick(text)
                  : undefined
              }
            >
              <ListItemButton>
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Drawer
        sx={{
          width: "240px",
          position: "absolute",
          left: "240px",
          "& .MuiDrawer-paper": {
            width: "240px",

            left: "240px",
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Toolbar>
          <Typography>{clickedText}</Typography>
        </Toolbar>
        <List>
          <ListItem>
            <ListItemText primary={`You clicked on "${clickedText}"`} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
