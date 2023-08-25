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
     <div>
      <h1>Users</h1>
      <ul>
        {data.findAll.map(user => (
          <li key={user.id}>
            {user.firstName} {user.lastName} from {user.city}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GetUsers