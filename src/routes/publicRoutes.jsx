import React from 'react'
import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";


function PublicRoutes() {
    const isAuthenticated=useSelector((state)=>state.user.validUser)
  if(!isAuthenticated){
    return(
        <>
        <Outlet/>
        </>
    )
  }
  return <Navigate to='/user/posts' />
}

export default PublicRoutes

