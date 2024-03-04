import React from 'react';
import style from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


export default function ProtectedRoute(props) {
  let token = localStorage.getItem('userToken');
  
try {
  const decoded = jwtDecode(token);

} catch (error) {
  
  localStorage.clear()
  return <Navigate to = {'/login'}/>

}


  if(token !== null){
    return props.children
  }
  else{
    return <Navigate to = {'/login'}/>
  }
}
