import { useGetAllPostsQuery } from "./redux/RTKqueries/userQueries";
import { Post } from "./Post";
import { CommonButton } from "./components/Button";
import { Container,Box } from "@mui/material";
import SideMenu from "./modules/sideMenu/SideMenu";
import PermanentDrawerLeft from "./modules/SideNavigation";
import { SearchBar } from "./modules/SearchBar/SearchBar";
import { ExplorePosts } from "./modules/ExplorePosts/ExplorePosts";
import { useState } from "react";

function App() {
  const { data, error, isLoading } = useGetAllPostsQuery(undefined);
  const rest = {
    userId: "672bf88d764bb030e903b86b",
  };
  const [isOpenDrawer, setIsOpenDrawer]=useState<boolean>(false)
  console.log(data);
  console.log(isOpenDrawer)
  return (
    <Box sx={{position:"relative"}}>
    <PermanentDrawerLeft setIsOpenDrawer={setIsOpenDrawer}/>
    <ExplorePosts isOpenDrawer={isOpenDrawer}/>
    </Box >
  );
}

export default App;
