import React,{useEffect,useState} from 'react'
import {useQuery,gql} from "@apollo/client"
import {LOAD_USERS} from "./GraphQl/Queries"
function GetUsers() {
    const{error,loading,data} =useQuery(LOAD_USERS)
    const [users,setusers]=useState([]);
      useEffect(()=>{
        if(data){
           setusers(data.findAll) 
        }
       setusers(data.findAll);

      },[data])
  return (
    <div>{users.map(val)=>{
        return <h1>{val.firstName}</h1>
    }}</div>
  )
}

export default GetUsers