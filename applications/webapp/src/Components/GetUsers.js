import React ,{useEffect}from 'react'

import {useQuery,gql} from '@apollo/client'
import {HELLO_QUERY} from '../GraphQL/HelloQuery'
function GetUsers() {
    const {error,loading,data}= useQuery(HELLO_QUERY)
    useEffect(()=>{
console.log(data);
    },[data])
  return (
    <div></div>
  )
}

export default GetUsers