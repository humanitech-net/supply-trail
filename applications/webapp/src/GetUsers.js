import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { LOAD_USERS } from "./GraphQl/Queries";

function GetUsers() {
  const { error, loading, data } = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data.findAll);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.firstName} {user.lastName} from {user.city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetUsers;