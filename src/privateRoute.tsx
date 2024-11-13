import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from './redux/store'; // Make sure this is correctly pointing to your store file



const PrivateRoute: React.FC = () => {
  const token = useSelector((state: RootState) => {
  
    return state.auth.token});
  const user = useSelector((state: RootState) => state.auth.user);


  // Redirect to login if token or user is missing
  if (!token ) {
 return <Navigate to={"/login"}  replace/>;

  }else

  return <Outlet/>;
};

export default PrivateRoute;