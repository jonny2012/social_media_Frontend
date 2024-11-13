import { Navigate, Route, Routes } from "react-router-dom";
import SideMenu from "./modules/sideMenu/SideMenu";
import Login from "./pages/Login";
import { Box } from "@mui/material";
import Register from "./pages/Register";
import { HomePage } from "./pages/HomePage";
import { ExplorePosts } from "./modules/ExplorePosts/ExplorePosts";
import Profile from "./pages/Profile";
import PrivateRoute from "./privateRoute";
import ProfileTemplate from "./pages/ProfileTemplate";

export const AppRouter = () => {

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
    <SideMenu />
    <Routes>
        <Route element={<PrivateRoute/>}> 
          <Route path={"/"} element={<HomePage />} />
          <Route path={`/profile/:id`} element={<Profile />} />
          <Route path={"/explore"} element={<ExplorePosts />} />
          <Route path={`/user/:id`} element={<ProfileTemplate/>} />
          <Route path={"/create"} element={<div />} />
        </Route>
        
      
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"*"} element={<Navigate to={"/login"} replace />} />
        </Routes>
    </Box>
  );
};
