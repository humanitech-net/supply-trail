import React from 'react'
import {gql} from '@apollo/client'
export const LOAD_USERS =gql`
query{
    findAll{
        id
        firstName
        lastName
        city
    }
}
`
